"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { GameComponentProps } from "@rarefriends/friendsdk/runtime";
import { formatGameAmount } from "@rarefriends/friendsdk/ui";
import { expectedReward, maximumPrize, type GamePlay, type GameSnapshot } from "@rarefriends/friendsdk/game";
import { createFriendReader, type GenerationSprites } from "@rarefriends/friendsdk/sprites";
import { createFriendSoundKit, type FriendSoundCue, type FriendSoundKit } from "@rarefriends/friendsdk/sounds";
import { GameMenu } from "@rarefriends/friendsdk/frame";
import { createScene, descendMs, layoutFor, riseMs, TIMING, type Layout, type Pattern, type Phase, type SceneState } from "./scene.js";
import "@rarefriends/friendsdk/frame.css";
import "./style.css";

/** Proposed live split: this share of every lantern is burned; the rest funds the gift pool. */
const WICK = 10n ** 17n;
const RARITY = ["Common", "Uncommon", "Rare", "Legendary"] as const;
const REACTION = [
  "catches a Paper Star and tucks it away.",
  "hops for a Moon Charm!",
  "spins with joy. A Comet!",
  "can't believe it. The Golden Lantern came home!",
] as const;
const REVEAL_CUE: readonly FriendSoundCue[] = ["reveal-common", "reveal-common", "reveal-rare", "reveal-legendary"];
const PAPERS: readonly { name: string; pattern: Pattern; unlock: number }[] = [
  { name: "Plain paper", pattern: "plain", unlock: 0 },
  { name: "Striped paper", pattern: "stripes", unlock: 3 },
  { name: "Dotted paper", pattern: "dots", unlock: 8 },
  { name: "Checked paper", pattern: "checks", unlock: 15 },
];
type Panel = "gifts" | "festival" | "settings" | null;
const rf = (value: bigint) => `${formatGameAmount(value, 18)} RF`;

/** Gift card placed above the scene so the Friend's reaction stays visible. */
function RevealCard({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.querySelector<HTMLElement>("button")?.focus(); }, []);
  return <div ref={ref} className="ln-reveal-card" role="dialog" aria-modal="true" aria-label={title}
    onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); onClose(); } }}>
    <header><h2>{title}</h2><button type="button" className="ln-close" onClick={onClose} aria-label="Close">×</button></header>
    {children}
  </div>;
}

export default function LanternNight({ friendId, client, paused }: GameComponentProps) {
  const definition = client.definition;
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [sprites, setSprites] = useState<GenerationSprites | null>(null);
  const [artError, setArtError] = useState(false), [artRevision, setArtRevision] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle"), [result, setResult] = useState<GamePlay | null>(null);
  const [panel, setPanel] = useState<Panel>(null), [busy, setBusy] = useState(false);
  const [error, setError] = useState(""), [message, setMessage] = useState("");
  const [muted, setMuted] = useState(true), [reducedMotion, setReducedMotion] = useState(false), [tapToLight, setTapToLight] = useState(false);
  const [layout, setLayout] = useState<Layout>({ width: 960, height: 640 });
  const [lit, setLit] = useState(0), [paper, setPaper] = useState(0), [charging, setCharging] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null), sound = useRef<FriendSoundKit | null>(null);
  const locked = useRef(false), epoch = useRef(0);
  // Scene values read by the animation loop without re-rendering every frame.
  const live = useRef({ phase: "idle" as Phase, phaseStart: 0, charge: 0, chargeFrom: 0, outcome: null as number | null, clock: 0, cueSent: false });
  const props = useRef({ paused, reducedMotion, inventory: [] as number[], pattern: "plain" as Pattern, holding: false });
  const ready = snapshot !== null;
  const onPhaseEnd = useRef<(phase: Phase) => void>(() => {});
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);

  const moveTo = useCallback((next: Phase) => {
    live.current.phase = next; live.current.phaseStart = live.current.clock; live.current.cueSent = false; setPhase(next);
  }, []);

  // New Friend or client: reset the whole session.
  useEffect(() => {
    const version = ++epoch.current;
    sound.current = createFriendSoundKit({ muted: true });
    setSnapshot(null); setResult(null); setPanel(null); setError(""); setMessage(""); setBusy(false); setMuted(true); setLit(0); setPaper(0);
    locked.current = false; moveTo("idle");
    void client.read().then(value => { if (version === epoch.current) setSnapshot(value); }).catch(cause => {
      if (version === epoch.current) setError(cause instanceof Error ? cause.message : "Could not load the festival.");
    });
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches); update(); preference.addEventListener("change", update);
    return () => { epoch.current++; sound.current?.dispose(); sound.current = null; preference.removeEventListener("change", update); };
  }, [client, friendId, moveTo]);

  // Canonical Friend artwork, with retry.
  useEffect(() => {
    let cancelled = false; setSprites(null); setArtError(false);
    createFriendReader().read(friendId).then(value => { if (!cancelled) setSprites(value); }).catch(() => { if (!cancelled) setArtError(true); });
    return () => { cancelled = true; };
  }, [friendId, artRevision]);

  useEffect(() => {
    props.current = { paused, reducedMotion, inventory: snapshot ? snapshot.inventory.map(Number) : [], pattern: PAPERS[paper].pattern,
      holding: Boolean(snapshot && snapshot.consumables > 0n) };
  }, [paused, reducedMotion, snapshot, paper]);

  // Match the scene to the frame's shape (wide on desktop, tall on portrait phones).
  useEffect(() => {
    const node = canvas.current;
    if (!node || !ready) return;
    const measure = () => {
      if (!node.clientWidth || !node.clientHeight) return;
      const next = layoutFor(node.clientWidth / node.clientHeight);
      setLayout(current => current.width === next.width && current.height === next.height ? current : next);
    };
    measure();
    const observer = new ResizeObserver(measure); observer.observe(node);
    return () => observer.disconnect();
  }, [ready]);

  // Animation loop on a pausable scene clock.
  useEffect(() => {
    const node = canvas.current;
    if (!node || !sprites || !ready) return;
    let scene: ReturnType<typeof createScene>;
    try { scene = createScene(node, sprites, layout); } catch (cause) { setError(cause instanceof Error ? cause.message : "Cannot draw."); return; }
    sceneRef.current = scene;
    let frame = 0, previous = 0;
    const render = (now: number) => {
      const state = live.current, options = props.current;
      const dt = previous ? Math.min(64, now - previous) : 0; previous = now;
      if (!options.paused && !document.hidden) state.clock += dt;
      if (state.phase === "charging") state.charge = Math.min(1, (state.clock - state.chargeFrom) / TIMING.charge);
      const elapsed = state.clock - state.phaseStart;
      if (state.phase === "rising" && !state.cueSent && elapsed > riseMs(options.reducedMotion) * 0.5) { state.cueSent = true; sound.current?.play("anticipation"); }
      if (state.phase === "rising" && elapsed >= riseMs(options.reducedMotion)) onPhaseEnd.current("rising");
      else if (state.phase === "descending" && elapsed >= descendMs(options.reducedMotion)) onPhaseEnd.current("descending");
      const sceneState: SceneState = { phase: state.phase, phaseStart: state.phaseStart, charge: state.charge, outcome: state.outcome,
        holding: options.holding, inventory: options.inventory, pattern: options.pattern, reducedMotion: options.reducedMotion };
      scene.draw(state.clock, sceneState);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); sceneRef.current = null; };
  }, [sprites, ready, layout]);

  onPhaseEnd.current = ended => {
    if (ended === "rising") moveTo("descending");
    else if (ended === "descending") { moveTo("reveal"); const outcome = live.current.outcome; if (outcome !== null) sound.current?.play(REVEAL_CUE[outcome]); }
  };

  // Cancel a held charge if the runtime pauses the game.
  useEffect(() => { if (paused && live.current.phase === "charging" && live.current.charge < 1) { moveTo("idle"); setCharging(false); } }, [paused, moveTo]);

  async function act(work: () => Promise<void>, cue?: FriendSoundCue, after?: () => void) {
    if (locked.current || paused) return false;
    const version = epoch.current; locked.current = true; setBusy(true); setError(""); setMessage(""); void sound.current?.unlock();
    try {
      await work(); const value = await client.read();
      if (version === epoch.current) { setSnapshot(value); if (cue) sound.current?.play(cue); after?.(); }
      return true;
    } catch (cause) { if (version === epoch.current) setError(cause instanceof Error ? cause.message : "The preview action failed."); return false; }
    finally { if (version === epoch.current) { locked.current = false; setBusy(false); } }
  }

  if (!snapshot) return <div className="ln-loading" role={error ? "alert" : "status"}>
    <p>{error || "Lighting the festival…"}</p>
    {error && <button type="button" onClick={() => { setError(""); void client.read().then(setSnapshot).catch(cause => setError(cause instanceof Error ? cause.message : "Could not load.")); }}>Retry</button>}
  </div>;
  if (snapshot.friendId !== friendId) return <p className="ln-loading" role="alert">This festival session does not match the selected Friend.</p>;

  const maxPrize = maximumPrize(definition);
  const pending = snapshot.plays.find(play => play.outcomeId === null);
  const canBuy = (quantity: bigint) => snapshot.rfBalance >= definition.price * quantity && snapshot.freeStake >= maxPrize && snapshot.freeStake + definition.price * quantity >= maxPrize * quantity;
  const outcome = result?.outcomeId ? definition.outcomes[result.outcomeId - 1] : null;
  const kept = snapshot.inventory.reduce((total, amount) => total + amount, 0n);
  const inFlight = phase === "rising" || phase === "descending";
  const blocked = busy || paused || inFlight || !sprites;
  const unlocked = PAPERS.filter(item => lit >= item.unlock).length;

  const buy = (quantity: bigint) => void act(() => client.buy(quantity), "purchase",
    () => setMessage(`${quantity.toString()} simulated lantern${quantity > 1n ? "s" : ""} added.`));

  function startCharge() {
    if (blocked || phase !== "idle" || (!pending && snapshot!.consumables === 0n)) return;
    void sound.current?.unlock();
    if (tapToLight) { release(true); return; }
    live.current.chargeFrom = live.current.clock; live.current.charge = 0; moveTo("charging"); setCharging(true);
    sound.current?.play("select");
  }

  function release(force = false) {
    if (!force && live.current.phase !== "charging") return;
    const full = force || live.current.charge >= 1;
    setCharging(false);
    if (!full) { moveTo("idle"); setMessage("Hold until the lantern glows fully."); return; }
    live.current.charge = 1;
    const version = epoch.current;
    void act(async () => {
      const play = pending ?? (await client.play(1n))[0];
      const settled = await client.settle(play.id);
      if (version !== epoch.current) return;
      setResult(settled); live.current.outcome = settled.outcomeId === null ? null : settled.outcomeId - 1;
    }, "action-start", () => {
      const next = lit + 1; setLit(next);
      const newPaper = PAPERS.find(item => item.unlock === next);
      if (newPaper) setMessage(`Unlocked ${newPaper.name}. Choose it in Festival.`);
      sceneRef.current?.addDrifter(PAPERS[paper].pattern);
      moveTo("rising");
    }).then(ok => { if (!ok && live.current.phase === "charging") moveTo("idle"); });
  }

  const closeReveal = () => { moveTo("idle"); setResult(null); live.current.outcome = null; };
  const redeem = (outcomeId: number, after?: () => void) => void act(() => client.redeem(outcomeId, 1n), "reward", after);
  const burned = BigInt(lit) * WICK;

  let action: ReactNode;
  if (!sprites) action = null;
  else if (pending && phase === "idle") action = <button type="button" className="rf-frame-primary ln-primary" disabled={blocked} onClick={() => release(true)}>Finish your lantern</button>;
  else if (snapshot.consumables === 0n && phase === "idle") action = <div className="ln-buy">
    <button type="button" className="rf-frame-primary ln-primary" disabled={blocked || !canBuy(1n)} onClick={() => buy(1n)}>Buy a lantern · {rf(definition.price)}</button>
    <button type="button" disabled={blocked || !canBuy(5n)} onClick={() => buy(5n)}>Buy 5</button>
  </div>;
  else if (phase === "idle" || phase === "charging") action = <button type="button" className={`ln-primary ln-hold${charging ? " is-charging" : ""}`} disabled={blocked}
    aria-label={tapToLight ? "Light and release lantern" : "Hold to light lantern, release to let it go"}
    onPointerDown={event => { event.currentTarget.setPointerCapture?.(event.pointerId); startCharge(); }}
    onPointerUp={() => release()} onPointerCancel={() => { if (live.current.phase === "charging") { moveTo("idle"); setCharging(false); } }}
    onKeyDown={event => { if ((event.key === " " || event.key === "Enter") && !event.repeat) { event.preventDefault(); startCharge(); } }}
    onKeyUp={event => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); release(); } }}
    onContextMenu={event => event.preventDefault()}>
    {tapToLight ? "Light & release" : charging ? "Hold… then release" : "Hold to light"}<small>{snapshot.consumables.toString()} ready</small>
  </button>;

  const status = error || message || (busy ? "Waiting for preview confirmation…" : "");

  return <section className="ln-game" aria-label="Lantern Night" aria-busy={busy}>
    <canvas ref={canvas} className="ln-canvas" role="img"
      aria-label={`Night festival. Your Friend #${friendId.toString()} stands on a hill${snapshot.consumables > 0n ? " holding a paper lantern" : ""}. ${kept.toString()} kept gifts shine in the sky.`}
      onPointerDown={event => { if (!panel && phase === "idle" && (snapshot.consumables > 0n || pending)) { event.currentTarget.setPointerCapture?.(event.pointerId); startCharge(); } }}
      onPointerUp={() => release()} />
    {!sprites && <div className="ln-loading ln-overlay" role={artError ? "alert" : "status"}>
      <p>{artError ? "Your Friend's artwork could not load. Check your connection." : "Loading your Friend…"}</p>
      {artError && <button type="button" onClick={() => setArtRevision(value => value + 1)}>Retry artwork</button>}
    </div>}
    <div className="ln-hud" inert={Boolean(panel) || phase === "reveal" || undefined}>
      <span className="ln-pill">Simulated · {rf(snapshot.rfBalance)}</span>
      <span className="ln-pill ln-burn" title="Proposed wick burn from lanterns lit this session">Burned {rf(burned)}</span>
      <span className="ln-spacer" />
      <button type="button" onClick={() => setPanel("gifts")}>Sky · {kept.toString()}</button>
      <button type="button" onClick={() => setPanel("festival")}>Festival</button>
      <button type="button" className="ln-hide-phone" aria-pressed={!muted} aria-label={muted ? "Sound off" : "Sound on"} onClick={() => { const next = !muted; setMuted(next); sound.current?.setMuted(next); if (!next) void sound.current?.unlock(); }}>{muted ? "♪ off" : "♪ on"}</button>
      <button type="button" aria-label="Settings" onClick={() => setPanel("settings")}>⚙<span className="ln-hide-phone"> Settings</span></button>
    </div>
    <div className="ln-controls" inert={Boolean(panel) || phase === "reveal" || undefined}>
      <p className="ln-status" role={error ? "alert" : "status"}>{status}</p>
      {action}
    </div>
    {phase === "reveal" && outcome && result?.outcomeId && <RevealCard title={`${outcome.name} · ${RARITY[result.outcomeId - 1]}`} onClose={closeReveal}>
      <div className={`ln-reveal rarity-${result.outcomeId}`}>
        <p className="ln-rarity">{outcome.chanceBps / 100}% chance</p>
        <p>Friend #{friendId.toString()} {REACTION[result.outcomeId - 1]}</p>
        <p className="ln-value">Worth {rf(outcome.reward)} <small>(simulated)</small></p>
                <div className="ln-row">
          <button type="button" className="rf-frame-primary ln-primary" onClick={closeReveal}>Keep in the sky</button>
          <button type="button" disabled={busy} onClick={() => redeem(result.outcomeId!, closeReveal)}>Redeem · {rf(outcome.reward)}</button>
        </div>
      </div>
    </RevealCard>}
    {panel === "gifts" && <GameMenu title="Your night sky" onClose={() => setPanel(null)}>
      <p>Gifts you keep shine above the hill. Redeem any of them for their fixed simulated value.</p>
      {definition.outcomes.map((item, index) => <div className="ln-item" key={item.name}>
        <span><strong>{item.name}</strong><small>{snapshot.inventory[index].toString()} kept · {rf(item.reward)} each</small></span>
        <button type="button" disabled={busy || paused || snapshot.inventory[index] === 0n} onClick={() => redeem(index + 1)}>Redeem one</button>
      </div>)}
      <p className="ln-status" role={error ? "alert" : "status"}>{status}</p>
    </GameMenu>}
    {panel === "festival" && <GameMenu title="How the festival works" onClose={() => setPanel(null)}>
      <p>Buy a lantern for {rf(definition.price)}, hold to light it, and release. As it rises, the wick burns {rf(WICK)}.
        The rest of the price funds a gift pool, and every lantern returns exactly one gift.</p>
      <table><thead><tr><th>Gift</th><th>Chance</th><th>Value</th></tr></thead><tbody>
        {definition.outcomes.map(item => <tr key={item.name}><td>{item.name}</td><td>{item.chanceBps / 100}%</td><td>{rf(item.reward)}</td></tr>)}
      </tbody></table>
      <p>Expected gift value: {rf(expectedReward(definition))} per lantern. Burned per lantern: {rf(WICK)}. Every purchased lantern reserves the top gift ({rf(maxPrize)}).</p>
      <h3>Lantern papers</h3>
      <p>Lighting more lanterns unlocks new paper patterns. Papers are cosmetic only.</p>
      <div className="ln-papers">{PAPERS.map((item, index) => <button type="button" key={item.name} aria-pressed={paper === index} disabled={index >= unlocked}
        onClick={() => setPaper(index)}><i className={`ln-swatch is-${item.pattern}`} />{item.name}<small>{index >= unlocked ? `Light ${item.unlock}` : paper === index ? "In use" : "Use"}</small></button>)}</div>
      <p className="ln-note">Everything here is simulated. In this preview the SDK prize pool receives the full price; the {rf(WICK)} wick burn is the proposed split for a live contract.
        This session: {lit} lanterns lit, {rf(burned)} marked as burned.</p>
    </GameMenu>}
    {panel === "settings" && <GameMenu title="Settings" onClose={() => setPanel(null)}>
      <button type="button" aria-pressed={!muted} onClick={() => { const next = !muted; setMuted(next); sound.current?.setMuted(next); if (!next) void sound.current?.unlock(); }}>{muted ? "Sound off" : "Sound on"}</button>
      <label><input type="checkbox" checked={reducedMotion} onChange={event => setReducedMotion(event.target.checked)} /> Reduce motion</label>
      <label><input type="checkbox" checked={tapToLight} onChange={event => setTapToLight(event.target.checked)} /> One tap lights a lantern (no holding)</label>
      <p className="ln-note">Controls: hold the button, Space or Enter (or press and hold the sky) until the lantern glows, then release.
        Balances, gifts and burns are simulated and reset on reload. Wallet connection and Friend ownership are verified by the SDK runtime.</p>
    </GameMenu>}
  </section>;
}
