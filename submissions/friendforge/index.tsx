"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GameComponentProps } from "@rarefriends/friendsdk/runtime";
import type { GamePlay, GameSnapshot } from "@rarefriends/friendsdk/game";
import { GameMenu } from "@rarefriends/friendsdk/frame";
import { formatGameAmount } from "@rarefriends/friendsdk/ui";
import "@rarefriends/friendsdk/frame.css";
import "./style.css";

type Menu = "summon" | "collection" | "settings" | "reward" | null;

const rf = (value: bigint) => `${formatGameAmount(value, 18)} RF`;
const rarityClass = (name: string) => name.split(" ")[0].toLowerCase();

const sigils: Record<string, string> = {
  "Common Friend": "✦",
  "Uncommon Friend": "◆",
  "Rare Friend": "✧",
  "Epic Friend": "⬢",
  "Mythic Friend": "✹",
};

export default function RareGacha({ friendId, client, paused }: GameComponentProps) {
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [menu, setMenu] = useState<Menu>(null);
  const [result, setResult] = useState<GamePlay | null>(null);
  const [busy, setBusy] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [error, setError] = useState("");
  const [muted, setMuted] = useState(true);
  const epoch = useRef(0);
  const locked = useRef(false);

  const definition = client.definition;

  useEffect(() => {
    const version = ++epoch.current;
    setSnapshot(null);
    setMenu(null);
    setResult(null);
    setError("");
    setBusy(false);
    setRevealing(false);
    locked.current = false;

    void client.read()
      .then((value) => {
        if (version === epoch.current) setSnapshot(value);
      })
      .catch((cause) => {
        if (version === epoch.current) {
          setError(cause instanceof Error ? cause.message : "Could not load the game.");
        }
      });

    return () => {
      epoch.current++;
    };
  }, [client, friendId]);

  async function refresh() {
    const value = await client.read();
    if (epoch.current) setSnapshot(value);
  }

  async function summon() {
    if (locked.current || paused || !snapshot || snapshot.consumables <= 0n) return;
    locked.current = true;
    setBusy(true);
    setError("");
    setResult(null);
    setRevealing(true);

    const version = epoch.current;
    try {
      const pending = snapshot.plays.find((play) => play.outcomeId === null);
      const play = pending ?? (await client.play(1n))[0];
      const settled = await client.settle(play.id);
      if (version === epoch.current) {
        setResult(settled);
        await refresh();
        setTimeout(() => {
          if (version === epoch.current) {
            setRevealing(false);
            setMenu("reward");
          }
        }, 900);
      }
    } catch (cause) {
      if (version === epoch.current) {
        setRevealing(false);
        setError(cause instanceof Error ? cause.message : "The summon failed. Try again.");
      }
    } finally {
      if (version === epoch.current) {
        locked.current = false;
        setBusy(false);
      }
    }
  }

  async function buy() {
    if (locked.current || paused || !snapshot) return;
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      await client.buy(1n);
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not add a capsule.");
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  const inventoryCount = useMemo(
    () => snapshot?.inventory.reduce((total, amount) => total + amount, 0n) ?? 0n,
    [snapshot],
  );
  const outcome = result?.outcomeId ? definition.outcomes[result.outcomeId - 1] : null;
  const packs = snapshot?.consumables ?? 0n;
  const balance = snapshot?.rfBalance ?? 0n;
  const price = definition.price;
  const canBuy = balance >= price;

  if (!snapshot) {
    return (
      <div className="gacha-loading" role={error ? "alert" : "status"}>
        <div className="loading-orb">✦</div>
        <strong>{error || "Syncing your Friend…"}</strong>
        {error && <button type="button" onClick={() => void refresh()}>Retry</button>}
      </div>
    );
  }

  if (snapshot.friendId !== friendId) {
    return <p role="alert">This game session does not match the selected Friend.</p>;
  }

  return (
    <section className="gacha-game" aria-label={definition.name} aria-busy={busy}>
      <div className="gacha-backdrop" aria-hidden="true">
        <div className="star-field star-field-a" />
        <div className="star-field star-field-b" />
        <div className="portal portal-a" />
        <div className="portal portal-b" />
      </div>

      <header className="gacha-header">
        <div>
          <span className="eyebrow">RARE FRIENDS · CAPSULE LAB</span>
          <h1>Friend<span>Forge</span></h1>
          <p>Summon a new cosmic companion.</p>
        </div>
        <div className="wallet-chip">
          <span>SIMULATED RF</span>
          <strong>{rf(balance)}</strong>
        </div>
      </header>

      <main className="gacha-main">
        <div className="summon-stage" aria-live="polite">
          <div className={`summon-orbit ${revealing ? "is-revealing" : ""}`}>
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="capsule">
              <span className="capsule-top" />
              <span className="capsule-core">{revealing ? "?" : "✦"}</span>
              <span className="capsule-bottom" />
            </div>
          </div>
          <div className="summon-copy">
            <span className="live-pill">● PREVIEW SUMMON</span>
            <h2>{revealing ? "Reading the signal…" : "Who is waiting inside?"}</h2>
            <p>Every capsule reveals exactly one Friend rarity.</p>
          </div>
        </div>

        <div className="rarity-strip">
          {definition.outcomes.map((item) => (
            <div className={`rarity ${rarityClass(item.name)}`} key={item.name}>
              <span>{sigils[item.name] ?? "✦"}</span>
              <div><strong>{item.name.replace(" Friend", "")}</strong><small>{item.chanceBps / 100}%</small></div>
            </div>
          ))}
        </div>

        <div className="action-panel">
          <div className="pack-count"><span>CAPSULES</span><strong>{packs.toString()}</strong></div>
          <button className="summon-button" type="button" disabled={busy || paused || packs <= 0n} onClick={() => void summon()}>
            <span>{revealing ? "SUMMONING…" : "SUMMON FRIEND"}</span>
            <small>1 capsule · free in preview</small>
          </button>
          <button className="secondary-button" type="button" disabled={busy || paused || !canBuy} onClick={() => void buy()}>
            Add capsule · {rf(price)}
          </button>
        </div>

        <nav className="bottom-nav" aria-label="Game menus">
          <button type="button" onClick={() => setMenu("collection")} disabled={busy || paused}>Collection <b>{inventoryCount.toString()}</b></button>
          <button type="button" onClick={() => setMenu("summon")} disabled={busy || paused}>Rates</button>
          <button type="button" onClick={() => setMenu("settings")} disabled={busy || paused}>Settings</button>
        </nav>
      </main>

      {menu && (
        <GameMenu
          title={menu === "summon" ? "Summon rates" : menu === "collection" ? "Friend collection" : menu === "reward" ? "New Friend" : "Settings"}
          onClose={busy ? undefined : () => setMenu(null)}
        >
          {menu === "summon" && (
            <div className="menu-stack">
              <p>Each capsule consumes one simulated pack and rolls one weighted outcome.</p>
              {definition.outcomes.map((item) => (
                <div className="rate-row" key={item.name}>
                  <span className={rarityClass(item.name)}>{sigils[item.name] ?? "✦"}</span>
                  <div><strong>{item.name}</strong><small>{item.chanceBps / 100}% chance · {rf(item.reward)} simulated value</small></div>
                </div>
              ))}
              <p className="fine-print">Rates are fixed in game.json. Preview rewards and balances are simulated and reset when the session reloads.</p>
            </div>
          )}

          {menu === "collection" && (
            <div className="collection-grid">
              {definition.outcomes.map((item, index) => (
                <article className={`collection-card ${rarityClass(item.name)}`} key={item.name}>
                  <span>{sigils[item.name] ?? "✦"}</span>
                  <strong>{item.name}</strong>
                  <small>{snapshot.inventory[index]?.toString() ?? "0"} owned</small>
                  {item.reward > 0n && snapshot.inventory[index] > 0n && (
                    <button type="button" disabled={busy || paused} onClick={() => void client.redeem(index + 1, 1n).then(refresh)}>
                      Redeem 1
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}

          {menu === "reward" && outcome && (
            <div className={`reward-screen ${rarityClass(outcome.name)}`}>
              <div className="reward-sigil">{sigils[outcome.name] ?? "✦"}</div>
              <span className="reward-label">YOU SUMMONED</span>
              <h2>{outcome.name}</h2>
              <p>{outcome.chanceBps / 100}% drop rate · {rf(outcome.reward)} simulated value</p>
              <p className="fine-print">This collectible is recorded in the Friend's simulated session inventory.</p>
              <button type="button" onClick={() => setMenu(null)}>Keep exploring</button>
            </div>
          )}

          {menu === "settings" && (
            <div className="menu-stack">
              <button type="button" aria-pressed={!muted} onClick={() => setMuted((value) => !value)}>{muted ? "Sound off" : "Sound on"}</button>
              <p>Friend identity, wallet connection and ownership checks are provided by FriendSDK. This game does not create a second wallet flow.</p>
              <p className="fine-print">Economy actions are simulated for the prototype. No private key or signing transaction is used by this game.</p>
            </div>
          )}

          {error && <p role="alert" className="error-line">{error}</p>}
        </GameMenu>
      )}
    </section>
  );
}
