"use client";

import { useEffect, useRef, useState } from "react";
import { createGamePreview, parseChanceGame, RF, type GameClient, type GamePlay, type GameSnapshot, type PreviewGameClient } from "../../src/game.js";
import { createFriendSoundKit, type FriendSoundCue, type FriendSoundKit } from "../../src/friend-sounds.js";
import { ActivityPrompt, ExperiencePanel, GameHud, ItemArt, formatGameAmount } from "../../src/experience-ui.js";
import { GameMenu } from "../../src/game-frame.js";
import type { GameItem } from "../../src/items.js";
import definition from "./game.json" with { type: "json" };
import art from "./art.json" with { type: "json" };
import { FishingWorld, type FishingTarget } from "./world.js";
import { fishingBait, Bobber, SettingsIcon, SoundIcon } from "./art.js";
import "../../assets/experience-ui.css";
import "../../assets/reward-reveal.css";
import "../../assets/game-frame.css";
import "./style.css";

export { FishingPreview } from "./preview.js";

export const fishingGame = parseChanceGame(definition);
export const fishingItems: readonly GameItem[] = fishingGame.outcomes.map((outcome, index) => ({
  id: art[index].id, name: outcome.name, rarity: art[index].rarity, art: { rows: art[index].rows },
}));
const rf = (amount: bigint) => `${formatGameAmount(amount, 18)} RF`;
const currency = { symbol: "RF", decimals: 18 };
type Screen = "world" | "pond" | "shop" | "reveal" | "collection" | "odds" | "settings";
export type FishingGameProps = { friendId: bigint | null; client?: GameClient; onSnapshot?: (snapshot: GameSnapshot) => void; paused?: boolean };

/** Developer viewport only. The host supplies the shared frame and selected Friend. */
export function FishingGame({ friendId, client, onSnapshot, paused = false }: FishingGameProps) {
  const sessions = useRef(new Map<bigint, PreviewGameClient>());
  if (friendId === null) return <div className="fv1 fv1-empty">Choose a Friend to enter the lake.</div>;
  let active = client ?? sessions.current.get(friendId);
  if (!active) {
    const preview = createGamePreview(fishingGame, { stake: 100n * RF, rfBalance: 20n * RF, friendId }).client;
    sessions.current.set(friendId, preview);
    active = preview;
  }
  return <FishingSession key={`${friendId}:${active.mode}`} friendId={friendId} client={active} onSnapshot={onSnapshot} paused={paused} />;
}

function FishingSession({ friendId, client, onSnapshot, paused }: Required<Pick<FishingGameProps, "friendId" | "paused">> & { client: GameClient; onSnapshot?: FishingGameProps["onSnapshot"] }) {
  const isPreview = client.mode === "preview";
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [screen, setScreen] = useState<Screen>("world");
  const [shopTab, setShopTab] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState("1");
  const [selectedCatch, setSelectedCatch] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<GamePlay | null>(null);
  const [casting, setCasting] = useState(false);
  const [bite, setBite] = useState(false);
  const [muted, setMuted] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [worldRevision, setWorldRevision] = useState(0);
  const [near, setNear] = useState<FishingTarget | null>(null);
  const locked = useRef(false);
  const alive = useRef(true);
  const sound = useRef<FriendSoundKit | null>(null);

  useEffect(() => {
    alive.current = true;
    sound.current = createFriendSoundKit({ muted: true });
    void client.read().then(value => { if (alive.current) setSnapshot(value); }).catch(cause => { if (alive.current) setError(cause instanceof Error ? cause.message : "The game could not load."); });
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update(); query.addEventListener("change", update);
    return () => { alive.current = false; sound.current?.dispose(); sound.current = null; query.removeEventListener("change", update); };
  }, [client]);
  useEffect(() => { if (snapshot) onSnapshot?.(snapshot); }, [snapshot, onSnapshot]);
  useEffect(() => {
    if (!casting || !result) return;
    const timer = setTimeout(() => { setBite(true); sound.current?.play("action-ready"); }, reduceMotion ? 0 : 800);
    return () => clearTimeout(timer);
  }, [casting, result, reduceMotion]);

  async function action(work: () => Promise<void>, cue?: FriendSoundCue) {
    if (locked.current || paused) return;
    locked.current = true; setBusy(true); setError(""); setMessage("");
    void sound.current?.unlock();
    try { await work(); const value = await client.read(); if (alive.current) { setSnapshot(value); if (cue) sound.current?.play(cue); } }
    catch (cause) {
      const failure = cause instanceof Error ? cause.message : "Game action failed.";
      // A cast may have committed before a later oracle request or settlement failed.
      // Recover that play from the client so the player resumes its existing ID.
      try {
        const value = await client.read();
        if (alive.current) { setSnapshot(value); setError(failure); }
      } catch {
        if (alive.current) setError(`${failure} Could not refresh the game state. Retry before continuing.`);
      }
    }
    finally { locked.current = false; if (alive.current) setBusy(false); }
  }
  if (!snapshot) return <div className="fv1 fv1-empty" role={error ? "alert" : "status"}>{error || (isPreview ? "Loading fishing preview…" : "Loading fishing…")}{error && <button type="button" disabled={busy || paused} onClick={() => void action(async () => {})}>Retry</button>}</div>;
  if (snapshot.friendId !== friendId) return <div className="fv1 fv1-empty" role="alert">The selected Friend does not match this game session.</div>;

  const count = /^[1-9]\d?$/.test(quantity) ? BigInt(quantity) : 0n;
  const cost = count * fishingGame.price;
  const hasBacking = snapshot.freeStake >= 10n * RF && snapshot.freeStake + cost >= count * 10n * RF;
  const canBuy = count > 0n && hasBacking && snapshot.rfBalance >= cost;
  const pendingPlays = snapshot.plays.filter(play => play.outcomeId === null);
  const pendingPlay = pendingPlays[0];
  const caughtId = result?.outcomeId ?? null;
  const caughtItem = caughtId ? fishingItems[caughtId - 1] : null;
  const caughtValue = caughtId ? fishingGame.outcomes[caughtId - 1].reward : 0n;
  const totalValue = snapshot.inventory.reduce((sum, amount, index) => sum + amount * fishingGame.outcomes[index].reward, 0n);
  const totalCount = snapshot.inventory.reduce((sum, amount) => sum + amount, 0n);
  const bestIndex = snapshot.plays.reduce((best, play) => play.outcomeId !== null && play.outcomeId - 1 > best ? play.outcomeId - 1 : best, -1);
  const selectedItem = fishingItems[selectedCatch];
  const selectedValue = fishingGame.outcomes[selectedCatch].reward;
  const selectedCount = snapshot.inventory[selectedCatch];
  const navigate = (next: Screen) => { if (!casting && !busy && !paused) { setScreen(next); setError(""); setMessage(""); sound.current?.play("select"); } };
  const openShop = () => { setShopTab("buy"); navigate("shop"); };
  const toggleSound = () => { const next = !muted; setMuted(next); sound.current?.setMuted(next); if (!next) void sound.current?.unlock(); };
  const sell = (outcomeId: number, amount: bigint) => action(async () => {
    await client.redeem(outcomeId, amount); setMessage(`Sold ${amount} ${fishingItems[outcomeId - 1].name}. ${isPreview ? "Simulated RF added to this Friend." : "RF returned to this Friend wallet."}`);
  }, "reward");
  async function settleCast(playId: bigint) {
    const settled = await client.settle(playId);
    if (!alive.current) return;
    setBite(false);
    if (settled.outcomeId === null) {
      setResult(null); setCasting(false);
      setMessage(`Cast #${playId} is waiting for its result. Resume this cast to check again; no additional bait is used.`);
      return;
    }
    // Only a settled result can begin the bite/reel/reveal presentation.
    setResult(settled); setCasting(true); setMessage("");
  }
  const cast = () => action(async () => {
    if (pendingPlay) throw new Error(`Cast #${pendingPlay.id} is pending. Resume that cast at the lake.`);
    setResult(null); setBite(false); setCasting(false);
    const [play] = await client.play(1n);
    if (!play) throw new Error("The cast was not returned. Refresh the game state before trying again.");
    await settleCast(play.id);
  }, "action-start");
  const resumeCast = () => pendingPlay && action(() => settleCast(pendingPlay.id), "action-start");
  const soundButton = <button className="fv1-icon" type="button" aria-label={muted ? "Turn sound on" : "Mute sound"} aria-pressed={!muted} onClick={toggleSound}><SoundIcon muted={muted} /></button>;
  const feedback = <p className="fv1-feedback" role={error ? "alert" : "status"}>{error || message}</p>;
  const panelTitle = screen === "pond" ? "The lake" : screen === "shop" ? "Bait & tackle" : screen === "reveal" ? "Your catch" : screen === "collection" ? "Your catches" : screen === "odds" ? "Odds" : "Settings";
  const collection = <>
    <div className="fv1-collection-scroll">
    <div className="fv1-collection-best"><span>{totalCount.toString()} kept</span><span className="fv1-scroll-hint">Scroll for all catches ↓</span><span>Best: {bestIndex < 0 ? "None yet" : fishingItems[bestIndex].name}</span></div>
    <div className="fv1-collection" aria-label="Catch collection">{fishingItems.map((item, index) => <button type="button" key={item.id} aria-label={`${item.name}, ${snapshot.inventory[index]} owned`} aria-pressed={selectedCatch === index} data-owned={snapshot.inventory[index] > 0n} onClick={() => setSelectedCatch(index)}><ItemArt item={item} /><span>{item.name}</span><small>×{snapshot.inventory[index].toString()}</small></button>)}</div>
    <div className="fv1-catch-detail"><div><strong>{selectedItem.name}</strong><span>{rf(selectedValue)}</span></div><p>{selectedCount > 0n ? `${selectedCount} owned · ${rf(selectedValue)}${selectedValue ? " · No expiry" : " · Collectible only"}` : "Not caught yet."}</p></div>
    </div>
    <div className="fv1-actions"><button className="fv1-primary" type="button" aria-label={`Sell one ${selectedItem.name}`} disabled={busy || paused || selectedCount === 0n || selectedValue === 0n} onClick={() => void sell(selectedCatch + 1, 1n)}>Sell · {rf(selectedValue)}</button><button type="button" disabled={busy || paused || totalValue === 0n} onClick={() => void action(async () => { for (let index = 0; index < fishingItems.length; index++) if (snapshot.inventory[index] > 0n && fishingGame.outcomes[index].reward > 0n) await client.redeem(index + 1, snapshot.inventory[index]); setMessage("Sold all fish. Boots stay in your collection."); }, "reward")}>Sell all · {rf(totalValue)}</button></div>
    {feedback}
  </>;

  return <section className="fv1" aria-label="Fishing game" aria-busy={busy} data-screen={screen}>
    <div className="fv1-world-ui" inert={screen !== "world" || paused || undefined}>
      <FishingWorld key={worldRevision} friendId={snapshot.friendId} paused={paused || screen !== "world"} reducedMotion={reduceMotion} onNearChange={setNear} onInteract={target => target === "pond" ? navigate("pond") : openShop()} />
      <GameHud balance={snapshot.rfBalance} currency={currency} itemCount={snapshot.consumables} itemCountLabel="bait" inventoryCount={totalCount} onInventory={() => navigate("collection")} quest={pendingPlay ? `${pendingPlays.length} pending cast${pendingPlays.length === 1 ? "" : "s"} · Resume at the lake` : undefined} labels={{ balance: isPreview ? "Preview RF" : "Friend wallet RF", inventory: "Your catches" }} />
      <button className="fv1-settings fv1-icon" type="button" aria-label="Settings" onClick={() => navigate("settings")}><SettingsIcon /></button>
      <div className="fv1-sound">{soundButton}</div>
      <ActivityPrompt className="fv1-pond-prompt" label="Go fishing" detail={pendingPlay ? `Resume cast #${pendingPlay.id}` : "Choose your bait"} active={near === "pond"} onClick={() => navigate("pond")} />
      <ActivityPrompt className="fv1-shop-prompt" label="Bait & tackle" active={near === "vendor"} onClick={openShop} />
      <span className="fv1-accessible" data-testid="bait">{snapshot.consumables.toString()}</span><span className="fv1-accessible" data-testid="balance">{rf(snapshot.rfBalance)}</span>
      {screen === "world" && (error || message) && <div className="fv1-world-feedback">{feedback}</div>}
    </div>
    {screen !== "world" && <GameMenu title={panelTitle} onClose={busy || casting || screen === "reveal" ? undefined : () => navigate("world")}>
      {screen === "pond" || screen === "reveal" ? <ExperiencePanel
        stage={screen === "reveal" ? "reward" : casting ? "working" : "activity"}
        itemCatalog={[fishingBait, ...fishingItems]} itemCounts={{ bait: snapshot.consumables }} selectableItemIds={pendingPlay ? [] : ["bait"]} selectedItemId="bait" activeItemId="bait" itemCost={pendingPlay ? 0n : 1n}
        balance={snapshot.rfBalance} currency={currency} onSelectItem={() => {}} workingReady={bite}
        reward={caughtItem && result ? { id: result.id.toString(), itemId: caughtItem.id, quantity: 1n } : null} rewardValue={caughtValue}
        revealKey={result?.id.toString()} reducedMotion={reduceMotion}
        onRevealComplete={() => sound.current?.play(caughtValue >= 5n * RF ? "reveal-legendary" : caughtValue >= RF ? "reveal-rare" : "reveal-common")}
        onAction={!busy && !paused ? () => { void (pendingPlay ? resumeCast() : cast()); } : undefined} onShop={openShop}
        onResolve={!busy && !paused ? () => { setCasting(false); setScreen("reveal"); sound.current?.play("impact"); } : undefined}
        onKeep={!busy && !paused ? () => { setSelectedCatch((caughtId ?? 2) - 1); setScreen("collection"); setMessage(`Kept ${caughtItem?.name}.`); } : undefined}
        onSellReward={caughtValue > 0n && !busy && !paused ? () => void action(async () => { await client.redeem(caughtId!, 1n); setScreen("world"); setMessage(`Sold ${caughtItem?.name} for ${rf(caughtValue)}${isPreview ? " in preview" : ""}.`); }, "reward") : undefined}
        onClose={busy || casting || screen === "reveal" ? undefined : () => navigate("world")}
        status={message} error={error}
        labels={{ activityLocation: "The lake", rewardLocation: "Your catch", activityTitle: pendingPlay ? `Cast #${pendingPlay.id} pending` : "Choose bait", activityDescription: pendingPlay ? "Check this cast's result. Your bait has already been used." : "One bait. One cast.", action: pendingPlay ? `Resume cast #${pendingPlay.id}` : "Cast · 1 bait", activityCost: pendingPlay ? "No additional bait" : "One bait per cast", openShop: "Visit bait shop", missingItems: "Pick up bait at the shop to get started.", workingTitle: "Gone fishing", workingDescription: "Waiting for a bite…", readyTitle: pendingPlay && !casting ? "Result pending" : "A bite!", readyDescription: "Your catch is ready.", resolve: "Reel in", waiting: "Waiting for a bite…", rewardTitle: "You caught", keep: "Keep catch", sell: `Sell catch · ${rf(caughtValue)}`, reveal: "Skip reveal", close: "Close The lake" }}
        slots={{ activityArt: <Bobber />, workingArt: <Bobber ready={bite} />, headerActions: soundButton, footer: <span>Bait · 1 RF at the shop</span>, rewardDetails: screen === "reveal" && caughtId ? <span>{fishingGame.outcomes[caughtId - 1].chanceBps / 100}% chance · {caughtValue ? "Fixed value. No expiry." : "Collectible only."}</span> : undefined }} />
        : screen === "shop" ? <div className="fv1-shop-panel" data-tab={shopTab}>
          <div className="fv1-tabs" role="tablist" aria-label="Bait & tackle" onKeyDown={event => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); const next = event.key === "Home" ? "buy" : event.key === "End" ? "sell" : shopTab === "buy" ? "sell" : "buy"; setShopTab(next); event.currentTarget.querySelector<HTMLButtonElement>(`[data-tab="${next}"]`)?.focus(); }}><button type="button" role="tab" data-tab="buy" tabIndex={shopTab === "buy" ? 0 : -1} disabled={busy || paused} aria-selected={shopTab === "buy"} onClick={() => setShopTab("buy")}>Bait</button><button type="button" role="tab" data-tab="sell" tabIndex={shopTab === "sell" ? 0 : -1} disabled={busy || paused} aria-selected={shopTab === "sell"} onClick={() => setShopTab("sell")}>Sell fish</button></div>
          {shopTab === "buy" ? <>
            <div className="fv1-shop-stock"><div className="fv1-bait-card"><ItemArt item={fishingBait} /><strong>Bait</strong><span>1 RF each</span><small>{snapshot.consumables.toString()} owned</small></div><div className="fv1-shop-copy"><h3>A little bait.<br />A little luck.</h3><p>One bait gives one cast at the lake.</p><label className="fv1-quantity">Quantity <input inputMode="numeric" type="number" min="1" max="99" value={quantity} onChange={event => setQuantity(event.target.value)} /></label><button className="fv1-link" type="button" onClick={() => navigate("odds")}>View odds</button></div></div>
            <div className="fv1-summary"><span>{count.toString()} bait</span><strong>{rf(cost)}</strong></div>
            <div className="fv1-actions"><button className="fv1-primary" type="button" disabled={busy || paused || !canBuy} onClick={() => void action(async () => { await client.buy(count); setMessage(`Bought ${count} bait${isPreview ? " with simulated RF" : ""}.`); }, "purchase")}>Buy bait <span aria-hidden="true">↗</span></button><button type="button" disabled={busy} onClick={() => navigate("pond")}>Back to the pond <span aria-hidden="true">→</span></button></div>
            <p className="fv1-feedback" role={error ? "alert" : "status"}>{error || message || (!hasBacking ? "Bait sales paused: not enough free stake. Purchased bait remains playable." : snapshot.rfBalance < cost ? isPreview ? "Not enough simulated RF." : "Not enough RF in this Friend wallet." : count === 0n ? "Choose 1 to 99 bait." : `${rf(snapshot.rfBalance)} available · ${isPreview ? "Simulated RF" : "Friend wallet"}`)}</p>
          </> : <div className="fv1-collection-panel">{collection}</div>}
        </div>
        : screen === "collection" ? <div className="fv1-collection-panel">{collection}</div>
        : <div className="fv1-text-panel">{screen === "odds" ? <>
          <p>1 RF per bait · Expected return 0.90 RF · 10% vendor edge</p>
          <table><thead><tr><th>Catch</th><th>Chance</th><th>Value</th></tr></thead><tbody>{fishingGame.outcomes.map(outcome => <tr key={outcome.name}><th scope="row">{outcome.name}</th><td>{outcome.chanceBps / 100}%</td><td>{rf(outcome.reward)}</td></tr>)}</tbody></table>
          <p>Every bait reserves 10 RF. Kept fish remain backed until sold.</p><p>Free stake: <span data-testid="free-stake">{rf(snapshot.freeStake)}</span></p>
        </> : <>
          <p>{isPreview ? "Local preview. Simulated RF and outcomes; no live transactions. Progress resets on reload." : "Robinhood mainnet. Purchases and rewards use this Friend's canonical RF wallet. Resume pending casts at the lake."}</p>
          <button type="button" aria-pressed={!muted} onClick={toggleSound}>{muted ? "Sound off" : "Sound on"}</button>
          <label className="fv1-motion"><input type="checkbox" checked={reduceMotion} onChange={event => setReduceMotion(event.target.checked)} /> Reduce motion</label>
          <button type="button" onClick={() => setWorldRevision(value => value + 1)}>Reset walking position</button>
          <button type="button" onClick={() => navigate("odds")}>Odds</button>
          <p>Click or tap to walk. Use arrows or WASD while the world is focused; press E near the pond or shop.</p>
        </>}{feedback}</div>}
    </GameMenu>}
  </section>;
}

export default FishingGame;
