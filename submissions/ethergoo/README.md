# Ethergoo

An idle goo economy you *walk*: your own Rare Friend explores an endless isometric world grown from its token ID, taps goo springs, and spends RF on Ether Vials whose catalysts either boost production while held or redeem for a fixed RF value.

**Builder:** [@spokesz](https://github.com/spokesz) · **Category:** Economy Potential · **SDK:** FriendSDK v0.1 (0.1.0, built from `da4828f`)

[Source code](https://github.com/spokesz/ethergoo/tree/9f5c92a3d237744bed94added7abe3552237fc40) · [Exact RF terms](https://github.com/spokesz/ethergoo/blob/9f5c92a3d237744bed94added7abe3552237fc40/game/game.json) · [Every tunable number](https://github.com/spokesz/ethergoo/blob/9f5c92a3d237744bed94added7abe3552237fc40/game/engine/balance.ts) · [Full economy, on-chain and randomness write-up](https://github.com/spokesz/ethergoo/blob/9f5c92a3d237744bed94added7abe3552237fc40/README.md#the-economy)

## Run it

Use Node.js 22.18+ on Linux or Ubuntu/WSL2, plus a browser wallet holding a hardwired Rare Friends Generations NFT (generation ≥ 1) on Robinhood mainnet (4663).

```sh
git clone https://github.com/spokesz/ethergoo.git
cd ethergoo
git checkout 9f5c92a3d237744bed94added7abe3552237fc40
npm ci
npm run dev
```

Open the printed URL (normally `http://localhost:4173`), connect your wallet and select your Friend; `npm run dev:lan` serves it to a phone on your network. The SDK verifies ownership before play. No RF funding or transaction signature is needed for this simulated preview. No hosted demo is provided yet.

## How it uses Rare Friends

The Friend is the character *and* the map. Its token ID seeds the terrain, so every Friend walks a different world and always returns to its own. Its canonical 16 × 16 sprites are read through the SDK and drawn unmodified at a whole-number scale; the world is rendered at 240 × 160 so the Friend is native to it rather than pasted on. Catalysts live in the Friend's canonical wallet, so a Friend's production bonus travels with the NFT.

## Play

Walk with WASD or arrow keys, tap a spot to walk there, or hold and drag to steer. Press **E** or tap the prompt to use what you stand beside. **Z** zooms, **M** opens the map, **C** your catalysts, **B** builds. Settings include mute and reduced motion. Everything stays inside the SDK's 960 × 640 container, and **the world has no edge**: a custom renderer scrolls a camera over terrain generated on demand.

You start with one free siphon pumping goo. Build siphons on springs and upgrade them; a siphon stops when its tank fills, so you walk past to empty it until you install an Ether Link. Springs grow vastly richer with distance (Cyan from 50 tiles, Magenta 120, Amber 220, Prismatic 350). Pop wild blobs, attune monoliths for permanent research, place warp pads, and follow a 13-step objective chain. A day/night cycle lights the goo after dark.

## How RF is spent, and the economy

**All balances, purchases and rewards are simulated.** You start with 20 RF and 100 RF of simulated prize backing.

Goo is an off-chain game resource, never a token: it cannot be bought with, sold for or converted to RF. **RF is spent in exactly one place:** an Ether Vial costs **1 RF** and cracks into exactly one catalyst.

| Catalyst | Chance | Redemption value | Goo production while held |
|---|---:|---:|---:|
| Inert Sludge | 20% | 0 RF | +2% |
| Lime Spark | 30% | 0.25 RF | +5% |
| Cyan Flux | 20% | 0.50 RF | +10% |
| Magenta Bloom | 15% | 1 RF | +20% |
| Amber Core | 9% | 2 RF | +45% |
| Prism Heart | 4% | 4 RF | +100% |
| Ether Singularity | 2% | 10 RF | +300% |

Expected redemption value **0.865 RF per vial** (13.5% vendor edge); an average vial adds **+20.95%** production if kept. Cracking cannot change the odds and there is no reroll.

The prize is a **productive asset**. A kept catalyst multiplies everything the Friend's world produces for as long as the Friend holds it; redeeming pays its fixed RF and the bonus vanishes. Every reveal asks *2 RF now, or +45% forever?*, and rarer catalysts give more bonus per RF locked (20% → 30%), pushing the largest prizes toward being held. For the token, holding means **RF stays inside the game as backing** instead of returning to circulation.

Backing follows the SDK unchanged: every vial reserves the maximum 10 RF prize, kept catalysts stay backed with no redemption expiry, and new purchases stop, taking no RF, when free stake cannot cover another maximum prize.

## What would be on-chain

Nothing is on-chain in this build. Going live needs no new contract: it is a deployment of the SDK's `ChanceGame` with this `game.json`, through the SDK's live runtime, signed via the Friend's canonical wallet.

| In the game | SDK action | On-chain effect |
|---|---|---|
| Buy vials | `buy` | Exact RF approval, RF moves from the Friend wallet into the game, 10 RF reserved per vial, vial tokens minted |
| Crack a vial | `play` | Burns the vial and commits a play. No outcome exists yet |
| *(same button)* | `settle` | Requests Dice randomness once, then derives the outcome on-chain and mints the catalyst (ERC-1155) to the Friend wallet |
| Redeem | `redeem` | Burns the catalyst, pays its fixed RF to the Friend wallet |

On-chain: RF, vials, catalysts, backing, every outcome, and ownership checks. Off-chain: goo, siphons, pads, research, blobs and the world itself, which is recomputed from the token ID and never stored. The one bridge is a read: the Friend wallet's catalyst balances become the production multiplier, so the multiplier is verifiable from chain state.

## How randomness is used

Only a vial's contents are random. Live, the SDK's Dice flow is commit-then-reveal: `play` burns the vial **before** any randomness exists; one request per play is paid to Dice (fee capped at 0.000025 ETH plus gas) with a fixed game contribution of `keccak256(game, chainId, batchId)`; only the pinned Dice contract and provider can answer, once; then anyone may settle and the contract computes `roll = keccak256(word, game, chainId, batchId, playId) % 10000` against the cumulative weights above. The browser never chooses an outcome; the reveal only presents one. A slow delivery shows **Finish pending reaction**, resuming the same play without another vial. In this preview the SDK's simulated ledger draws the roll with `crypto.getRandomValues`.

Everything else is deterministic: terrain, springs, richness, monoliths and blob spawns are a hash of the token ID and tile coordinates. `Math.random` appears only in particle effects.

## Needs future SDK support

Per-Friend saved progress (the sandbox has no storage, so progress lasts one session); more than one consumable or a spend/burn action for further RF sinks; a burn or treasury split of the 13.5% edge; a production-share RF pot in the spirit of the original EtherGoo, which needs provable production; and trading for catalysts.

## Checks, credits and limitations

`npm test` (18 tests: world generation, pathfinding, goo economy, exact vial odds across all 10,000 rolls, and RF backing), `npm run typecheck`, `npm run check:games` and `npm run build` all pass, including from a fresh clone. The SDK's own `check:games`, run with the game copied into an SDK checkout, rejects it for importing `assets/game-frame.css`: that is the SDK's own `frame.css`, imported as the SDK starter does, and an untouched `friendsdk init` copy of the starter fails identically. With that one path allowed, Ethergoo passes.

No automated browser suite is included. Browser testing was by hand with a real wallet and an owned Generations Friend; two rendering bugs were found and fixed that way. A phone playthrough, the 360-px layout and touch steering are unconfirmed, and live mode has never run against a deployed contract.

All world artwork is generated from code; there are no image, font or audio files and no third-party assets. Character sprites and sounds come from FriendSDK. The premise is a homage to EtherGoo (2018). [Notices](https://github.com/spokesz/ethergoo/blob/9f5c92a3d237744bed94added7abe3552237fc40/NOTICE.md). No trading, wearable NFTs, creator fees or live economy is included, and no Token Activity metrics are claimed. Production publication needs separate Rare Friends review.
