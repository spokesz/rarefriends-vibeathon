"use client";

import { useEffect, useRef, useState } from "react";
import type { GameComponentProps } from "@rarefriends/friendsdk/runtime";
import { GameWorld, type GameWorldInteraction } from "@rarefriends/friendsdk/world-view";
import { getWorldPreset, validateWorld } from "@rarefriends/friendsdk/world";
import { GameMenu } from "@rarefriends/friendsdk/frame";
import { formatGameAmount } from "@rarefriends/friendsdk/ui";
import { maximumPrize, type GameSnapshot, type GamePlay } from "@rarefriends/friendsdk/game";
import { createFriendSoundKit, type FriendSoundKit, type FriendSoundCue } from "@rarefriends/friendsdk/sounds";
import "@rarefriends/friendsdk/frame.css";
import "@rarefriends/friendsdk/world-view.css";
import "./style.css";

const garden = getWorldPreset("01-garden-oval-complete");
const world = validateWorld({ ...garden, props: [...garden.props,
  { type: "terminal", x: 220, y: 155, scale: 1.5 }, { type: "crate", x: 386, y: 250, scale: 1.5 }], actors: [] });
const spawn = [288, 192] as const;
const interactions: readonly GameWorldInteraction[] = [
  { id: "buy", label: "Pack dispenser", position: [220, 155], reach: 90, labelOffset: -180 },
  { id: "open", label: "Open a pack", position: [386, 250], reach: 90, labelOffset: -120 },
];
type Menu = "buy" | "open" | "inventory" | "settings" | "reward" | null;
const rf = (value: bigint) => `${formatGameAmount(value, 18)} RF`;

/** Only the requested game. The SDK runtime supplies the selected owned Friend and fixed preview client. */
export default function GardenPacks({ friendId, client, paused }: GameComponentProps) {
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null), [menu, setMenu] = useState<Menu>(null);
  const [result, setResult] = useState<GamePlay | null>(null), [busy, setBusy] = useState(false);
  const [error, setError] = useState(""), [message, setMessage] = useState("");
  const [muted, setMuted] = useState(true), [reducedMotion, setReducedMotion] = useState(false);
  const sound = useRef<FriendSoundKit | null>(null), locked = useRef(false), epoch = useRef(0);
  const definition = client.definition;
  useEffect(() => {
    const version = ++epoch.current;
    sound.current = createFriendSoundKit({ muted: true });
    setSnapshot(null); setMenu(null); setResult(null); setError(""); setMessage(""); setBusy(false); setMuted(true); locked.current = false;
    void client.read().then(value => { if (version === epoch.current) setSnapshot(value); }).catch(cause => {
      if (version === epoch.current) setError(cause instanceof Error ? cause.message : "Could not load the preview.");
    });
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches); update(); preference.addEventListener("change", update);
    return () => { epoch.current++; sound.current?.dispose(); sound.current = null; preference.removeEventListener("change", update); };
  }, [client, friendId]);
  async function act(work: () => Promise<void>, cue?: FriendSoundCue, after?: () => void) {
    if (locked.current || paused) return;
    const version = epoch.current; locked.current = true; setBusy(true); setError(""); setMessage(""); void sound.current?.unlock();
    try { await work(); const value = await client.read(); if (version === epoch.current) { setSnapshot(value); if (cue) sound.current?.play(cue); after?.(); } }
    catch (cause) { if (version === epoch.current) setError(cause instanceof Error ? cause.message : "The preview action failed."); }
    finally { if (version === epoch.current) { locked.current = false; setBusy(false); } }
  }
  const navigate = (next: Menu) => { if (!busy && !paused) { setMenu(next); setError(""); setMessage(""); } };
  const feedback = <p role={error ? "alert" : "status"}>{error || message || (busy ? "Waiting for preview confirmation…" : "Simulated RF and outcomes.")}</p>;
  if (!snapshot) return <div className="starter-loading" role={error ? "alert" : "status"}>{error || "Loading game…"}
    {error && <button type="button" disabled={busy || paused} onClick={() => void act(async () => {})}>Retry</button>}</div>;
  if (snapshot.friendId !== friendId) return <p role="alert">This game session does not match the selected Friend.</p>;
  const maxPrize = maximumPrize(definition);
  const canBuy = snapshot.rfBalance >= definition.price && snapshot.freeStake >= maxPrize && snapshot.freeStake + definition.price >= maxPrize;
  const pending = snapshot.plays.find(play => play.outcomeId === null);
  const outcome = result?.outcomeId ? definition.outcomes[result.outcomeId - 1] : null;
  const count = snapshot.inventory.reduce((total, amount) => total + amount, 0n);
  const openPack = () => act(async () => {
    const version = epoch.current;
    const play = pending ?? (await client.play(1n))[0];
    const settled = await client.settle(play.id);
    if (version === epoch.current) { setResult(settled); setMenu("reward"); }
  }, "reveal-common");
  return <section className="starter-game" aria-label={definition.name} aria-busy={busy}>
    <div className="starter-world" inert={Boolean(menu) || paused || undefined}>
      <GameWorld world={world} spawn={spawn} interactions={interactions} friendId={friendId} paused={Boolean(menu) || paused} reducedMotion={reducedMotion}
        onInteract={id => navigate(id === "buy" ? "buy" : "open")} />
      <div className="starter-hud"><span>Preview · {rf(snapshot.rfBalance)} · {snapshot.consumables.toString()} packs</span>
        <button type="button" onClick={() => navigate("inventory")}>Inventory · {count.toString()}</button>
        <button type="button" onClick={() => navigate("settings")}>Settings</button></div>
      <p className="starter-hint"><span className="starter-desktop-hint">WASD / arrows to walk · Tap a destination · E near an activity</span><span className="starter-mobile-hint">Tap to walk · E / tap near a station</span></p>
    </div>
    {menu && <GameMenu title={menu === "buy" ? "Pack dispenser" : menu === "open" ? "Opening station" : menu === "reward" ? "Your preview reward" : menu === "inventory" ? "Inventory" : "Settings"}
      onClose={busy ? undefined : () => navigate(null)}>
      {menu === "buy" ? <>
        <p>One pack costs {rf(definition.price)} and gives one collectible.</p>
        <table><thead><tr><th>Collectible</th><th>Chance</th><th>Value</th></tr></thead><tbody>{definition.outcomes.map(item => <tr key={item.name}><td>{item.name}</td><td>{item.chanceBps / 100}%</td><td>{rf(item.reward)}</td></tr>)}</tbody></table>
        <button type="button" className="rf-frame-primary" disabled={!canBuy || busy || paused} onClick={() => void act(() => client.buy(1n), "purchase", () => setMessage("One simulated pack added to your Friend."))}>Buy one pack · {rf(definition.price)}</button>
        {!canBuy && <p>{snapshot.rfBalance < definition.price ? "Not enough simulated RF." : "New purchases are paused until there is enough free backing."}</p>}
        <p>Every pack reserves {rf(maxPrize)}. Purchased packs remain usable.</p>
      </> : menu === "open" ? <>
        <p>{snapshot.consumables.toString()} packs ready. One opening consumes one pack.</p>
        <button type="button" className="rf-frame-primary" disabled={busy || paused || !pending && snapshot.consumables === 0n} onClick={() => void openPack()}>{pending ? "Finish pending opening" : "Open one pack"}</button>
      </> : menu === "reward" && outcome ? <div className="starter-reward">
        <span aria-hidden="true">◇</span><h3>{outcome.name}</h3><p>{rf(outcome.reward)} · {outcome.chanceBps / 100}% chance</p>
        <p>This simulated collectible is already in your Friend's inventory.</p>
        <button type="button" disabled={busy || paused} onClick={() => navigate(null)}>Keep collectible</button>
        {outcome.reward > 0n && <button type="button" disabled={busy || paused} onClick={() => void act(() => client.redeem(result!.outcomeId!, 1n), "reward", () => setMenu("inventory"))}>Redeem · {rf(outcome.reward)}</button>}
      </div> : menu === "inventory" ? <>
        <p>Kept collectibles retain their fixed value with no expiry.</p>
        {definition.outcomes.map((item, index) => <div className="starter-item" key={item.name}><span><strong>{item.name}</strong><small>{snapshot.inventory[index].toString()} owned · {rf(item.reward)}</small></span>
          <button type="button" disabled={busy || paused || snapshot.inventory[index] === 0n || item.reward === 0n} onClick={() => void act(() => client.redeem(index + 1, 1n), "reward")}>Redeem one</button></div>)}
      </> : menu === "settings" ? <>
        <button type="button" aria-pressed={!muted} onClick={() => { const next = !muted; setMuted(next); sound.current?.setMuted(next); if (!next) void sound.current?.unlock(); }}>{muted ? "Sound off" : "Sound on"}</button>
        <label><input type="checkbox" checked={reducedMotion} onChange={event => setReducedMotion(event.target.checked)} /> Reduce motion</label>
        <p>All economy actions are simulated. Reloading resets this preview. Wallet connection and ownership verification are provided by the SDK.</p>
      </> : null}{feedback}
    </GameMenu>}
  </section>;
}
