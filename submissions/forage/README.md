# Forage

Your Rare Friend gathers what it really earns, in its own on-chain world.

**Builder:** cassxbt · GitHub [@Cassxbt](https://github.com/Cassxbt) · X [@cassxbt](https://x.com/cassxbt) · **Category:** Character Spotlight · **SDK:** FriendSDK v0.1.4

**Play:** **[rarefriends-forage.vercel.app](https://rarefriends-forage.vercel.app)** · [Source](https://github.com/Cassxbt/rarefriends-forage/tree/7a5db19) · [Full README](https://github.com/Cassxbt/rarefriends-forage/blob/7a5db19/README.md) · [Game rules](https://github.com/Cassxbt/rarefriends-forage/blob/7a5db19/game/game.json)

Forage turns the selected Generations Friend's real on-chain life into the level. Its **Scenery** trait picks its world, its **real unclaimed RF** (`ActivationManager.earned`) is laid out as pickups it gathers, new pickups appear only when a chain read shows it earned more, and its **Memory wall** replays its own `Transfer` and `Activated` events with transaction hashes. Take the Friend away and there is no level: no world, no ground, no history.

## Run it

Needs a browser wallet holding a hardwired Generations NFT (generation ≥ 1) on Robinhood mainnet (4663). No RF funding or signature is needed; every chain call is a read.

```sh
git clone https://github.com/Cassxbt/rarefriends-forage.git
cd rarefriends-forage
git checkout 7a5db19
npm ci
npm run dev        # http://127.0.0.1:4173
```

## Play

Move with WASD, arrow keys or tap. Walk into glowing pickups; they stack above your Friend's head. Press E at a station:

- **Den:** bring what you carry home; read the Memory wall (real milestones with copyable explorer URLs, then this session's trips, labelled as session-only).
- **Homecoming:** after the first trip, hang one of the Friend's real milestones in the Den. It hangs there as a keepsake and the Friend answers in its family's voice with the real title and block (session only, and labelled so).
- **Treat stand:** buy and crack treats; keep a snack for magnet pull or redeem it.
- **Proof board:** each financial value with the contract call behind it, all from one snapshot at the block shown.

**First Forage** runs in the objective bar each session: gather what it earned (3 pickups, or fewer if fewer exist), bring them home, then catch a spark that appeared after the trip. The Friend reacts in its family's voice and a receipt opens (reopenable) that separates what the chain showed, including every increase between reads, from this session's play. A claim mid-journey restarts gathering from the next earnings.

A Friend out of the reward pool **rests**: its pickups dim and can't be gathered, and the Den says why and what reactivation costs. If the RPC fails, the pouch stops at its last read value instead of guessing. A claim on rarefriends.com clears the ground and the carried stack.

## Rules and rewards

**Treats are simulated with the SDK ledger and labelled in game.** Chain readings are live and read-only; gathering moves nothing and claiming stays on rarefriends.com.

A treat costs **1 RF** and cracks into one snack:

| Snack | Chance | Redeems for | Pull while kept |
|---|---:|---:|---:|
| Crumb | 40% | 0.25 RF | +6 |
| Berry | 30% | 0.75 RF | +12 |
| Honeycomb | 20% | 1.5 RF | +20 |
| Stardrop | 10% | 2.5 RF | +40 |

Expected value **0.875 RF** per treat (12.5% edge). Base pull 20, up to +60 from kept snacks. Each treat reserves its 2.5 RF maximum; kept snacks stay backed with no expiry. No custom contract is proposed: going live would use the SDK's `ChanceGame` with this `game.json` (`buy` → `play` → `settle` → `redeem`); deploying, funding and verifying it is still to do.

## Checks, credits and limitations

All pass at the pinned commit in [CI](https://github.com/Cassxbt/rarefriends-forage/actions/runs/36770349924): `npm test` (38 unit and world tests), `npm run typecheck`, `npm run check` (FriendSDK game validation), `npm run build`, and `npm run test:browser` (9 end-to-end runs of the real SDK runtime in headless Chromium with the SDK's wallet fixture and Forage's chain reads mocked: claims, resting and waking, a delayed read, an outage, ownership history, the golden spark, a Den trip and a Homecoming keepsake, treat keep and redeem, First Forage with an exact receipt, and a claim mid-journey). `npm run test:live` reads Friend #93858's real state, world and history from mainnet. The README screenshots are the hosted preview with #93858's real chain data.

Uses FriendSDK 0.1.4's runtime, worlds, character sprites and sound kit (Apache-2.0); see [NOTICE](https://github.com/Cassxbt/rarefriends-forage/blob/7a5db19/NOTICE.md). Forage's code is MIT.

Trips, treats and the receipt reset on reload (the sandbox has no storage; the game labels them session-only). The golden spark's 12 seconds count active play; menus pause it. The Memory wall shows up to four ownership moves and says when it stops early. Tested on desktop Chrome. No live token spending, trading or contract deployment is included; Token Activity metrics are not claimed.
