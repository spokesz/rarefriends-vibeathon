"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameFrame, type GameConfirmation, type GameFriend } from "../../src/game-frame.js";
import { createGamePreview, RF, type GameSnapshot, type PreviewGameClient } from "../../src/game.js";
import { FishingGame, fishingGame } from "./index.js";

const SAMPLE_FRIENDS: readonly GameFriend[] = [
  { id: 7730n, label: "Sample Friend A", kind: "sample" },
  { id: 3412n, label: "Sample Friend B", kind: "sample" },
];

/** Internal SDK test fixture. Creator/player prototypes must verify wallet/NFT eligibility in the host. */
export function FishingPreview() {
  const sessions = useRef(new Map<bigint, PreviewGameClient>());
  const pending = useRef<(() => void) | null>(null);
  const [friendId, setFriendId] = useState<bigint | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [confirmation, setConfirmation] = useState<GameConfirmation | null>(null);
  const [paused, setPaused] = useState(true);
  const confirm = useCallback((title: string, description: string, amount?: bigint) => new Promise<void>((resolve, reject) => {
    const close = () => { pending.current = null; setConfirmation(null); };
    pending.current = () => { close(); reject(new Error("Preview action cancelled.")); };
    setConfirmation({ title, description, amount, onConfirm: () => { close(); resolve(); }, onCancel: () => pending.current?.() });
  }), []);
  useEffect(() => () => pending.current?.(), []);
  const client = useMemo(() => {
    if (friendId === null) return undefined;
    let original = sessions.current.get(friendId);
    if (!original) {
      original = createGamePreview(fishingGame, { stake: 100n * RF, rfBalance: 20n * RF, friendId }).client;
      sessions.current.set(friendId, original);
    }
    const selected = original;
    return {
      ...selected,
      async buy(quantity: bigint) { await confirm("Buy bait", `${quantity} bait for this Friend.`, fishingGame.price * quantity); await selected.buy(quantity); },
      async play(quantity = 1n) { await confirm("Cast at the lake", `Use ${quantity} bait from this Friend.`); return selected.play(quantity); },
      async redeem(outcomeId: number, quantity: bigint) { await confirm("Sell catch", `${quantity} ${fishingGame.outcomes[outcomeId - 1].name}; RF returns to this Friend.`, fishingGame.outcomes[outcomeId - 1].reward * quantity); await selected.redeem(outcomeId, quantity); },
    } satisfies PreviewGameClient;
  }, [friendId, confirm]);
  const receiveSnapshot = useCallback((value: GameSnapshot) => { if (value.friendId === friendId) setSnapshot(value); }, [friendId]);
  return <GameFrame mode="preview" friends={SAMPLE_FRIENDS} selectedFriendId={friendId}
    onSelectFriend={id => { setFriendId(id); setSnapshot(null); }} wallet={{ balance: snapshot?.rfBalance }} confirmation={confirmation} onMenuChange={setPaused}>
    <FishingGame friendId={friendId} client={client} onSnapshot={receiveSnapshot} paused={paused} />
  </GameFrame>;
}
