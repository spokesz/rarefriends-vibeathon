# Friend Forge

Explore a small isometric island as your own Rare Friend. Spend simulated RF on Iron Ore, use it for SDK-settled Forge plays, and collect twelve artifacts. Each return to the Forge starts another RF-funded play.

- **Builder / contact:** [@RomaMartynyuk](https://github.com/RomaMartynyuk)
- **Category:** Token Activity
- **Source:** [Friend Forge on GitHub — `sdk-integration`](https://github.com/RomaMartynyuk/friend-forge/tree/sdk-integration)
- **Playable preview:** [Play Friend Forge](https://romamartynyuk.github.io/friend-forge/)
- **Stack:** FriendSDK v0.1.2, TypeScript/React, HTML/CSS/canvas

## What did you build?

The main loop is a repeatable RF-spending activity: buy Iron Ore for 1 simulated RF, spend one Ore on a Forge play, and discover an artifact. The selected Generations NFT is the character you control while walking between the Ore Mine, Central Forge, Collection and Reforge. The twelve artifacts have distinct artwork and rarity. A Forge play ends in a game-styled rarity roll, silhouette and full-artwork reveal; the client never chooses the result.

The SDK selects an owned hardwired Friend and keeps its simulated RF, Ore and artifacts with that Friend's canonical wallet. Mining Dig offers an optional 2 RF expedition that buys exactly two Ore; Reforge can recycle an eligible duplicate through SDK redemption, another Ore purchase and an ordinary Forge play. These are different routes into the same spending loop, not extra reward faucets or improved odds. The playable Friend, canonical art and sound remain central to the experience, but **Token Activity** is the submission's primary category because RF spending drives its collecting loop.

## Playable demo and local run

Open [the public preview](https://romamartynyuk.github.io/friend-forge/) in a browser with a wallet on **Robinhood mainnet** holding a hardwired Rare Friends Generations NFT (generation 1 or higher). The preview economy is simulated: no real RF funding or transaction signature is required. The builder reports that the public preview works; the automated browser tests use a mock wallet.

To run from source with Node.js 22+:

```bash
git clone --branch sdk-integration https://github.com/RomaMartynyuk/friend-forge.git
cd friend-forge
npm ci
npm test
npm run check:game
npm run build:game
npx friendsdk dev ./games/friend-forge --host 0.0.0.0 --port 4173
```

## How do you play?

1. Select your Friend. Move with WASD, arrow keys, or a tap/click on the island. Tap a building label to auto-walk there.
2. At **Ore Mine**, buy Iron Ore for 1 simulated RF each. Mining Dig offers free practice or a 2 RF expedition that buys exactly two ordinary Iron Ore; dig score does not grant bonus Ore.
3. At **Central Forge**, spend one Iron Ore for one FriendSDK play. The SDK commits and settles the artifact; the cinematic only presents it.
4. Open **Collection** to inspect discovered and undiscovered items, duplicates, rarity, artwork and redeemable value. A positive-value duplicate may be redeemed through the SDK.
5. **Reforge** is a salvage loop: redeem one eligible surplus copy, buy Iron Ore, then make an ordinary Forge play. Dice, Lots and Cases change the presentation, not the odds or outcome. **Community Furnace** has three local mini-games with no RF or item rewards.

MIX controls volume, mute and ambience. Sound and motion can be reduced; the menus work inside the SDK container on desktop and mobile.

## RF activity, outcomes and authority

All RF balances, purchases and rewards in this submission are **simulated FriendSDK preview activity**—not real token transactions or on-chain burns. The core repeatable path is **1 RF → 1 Iron Ore → 1 Forge play → 1 SDK-settled artifact**. A Mining Dig expedition costs **2 RF for exactly 2 Iron Ore** and changes the activity, not the guaranteed Ore quantity. Reforge redeems one eligible surplus artifact, buys Iron and performs a standard Forge play; it adds no special rarity odds. Only Iron is actionable; Gold and Diamond are odds previews, not additional SDK tiers. The configured Iron outcome table is:

| Rarity | Chance | RF on redemption |
|---|---:|---:|
| Common | 50% | 0 RF |
| Uncommon | 27% | 0.05 RF |
| Rare | 14% | 0.10 RF |
| Epic | 6% | 0.25 RF |
| Legendary | 2.5% | 0.50 RF |
| Mythic | 0.5% | 2 RF |

The configured expected redemption value is **0.065 RF per Forge**, with a **2 RF** maximum. This is a collecting game, not a promise of profit. Zero-reward artifacts remain collectibles and cannot be redeemed. RF paid for Ore is a **simulated SDK purchase**, not a claimed burn; there is no separate burn counter or live RF volume. The exact twelve outcomes and weights live in [`game.json`](https://github.com/RomaMartynyuk/friend-forge/blob/sdk-integration/games/friend-forge/game.json); the [economy notes](https://github.com/RomaMartynyuk/friend-forge/blob/sdk-integration/ECONOMY.md) explain costs and limitations.

The SDK owns `buy`, `play`, `settle`, `redeem` and pending-play recovery. The UI's rarity roll may be seeded by `playId`, but it cannot reroll or change an outcome. Reforge is **not atomic** and does **not** guarantee an upgrade. No live contracts, RF transfers or global contribution state are claimed.

## Screenshots and short video

The builder will add captures from the public demo here:

> **01 — Island and playable Friend:** add a screenshot here.
>
> **02 — Central Forge rarity/artifact reveal:** add a screenshot or short GIF here.
>
> **03 — Collection detail and artwork:** add a screenshot here.

An existing [mock-wallet UI walkthrough](https://github.com/RomaMartynyuk/friend-forge/blob/sdk-integration/media/walkthrough-mock.gif) is available in the source repo; it is labelled as a test-fixture capture, not a real-wallet recording.

## Checks and known limitations

FriendSDK `check` and `build` pass. Ten release tests cover odds, pending-play resume, zero-value redemption guards, Mining Dig, VFX and audio. Official mock-wallet browser checks passed at 960 and 360 px; focused desktop/mobile tests exercised island navigation, Ore Mine and Forge. The public HTTPS build serves the SDK wallet gate and main assets, and the builder reports the preview working. The [QA report](https://github.com/RomaMartynyuk/friend-forge/blob/sdk-integration/QA.md) records what was and was not independently checked. A formal TypeScript typecheck has not yet been recorded.

Simulated progress lasts only for the SDK preview session. Gold/Diamond forging, global Furnace milestones and an atomic Reforge upgrade are not implemented. The island is visually dense at 360 px; phone touch comfort and the final audio mix need more human review. Official Rare Friends production publication would require separate review.

**Credits:** Friend identity, canonical sprites and sound cues come from FriendSDK. The twelve artifact images derive from the project owner's approved artwork sheet; their provenance is documented in [`assets/artifacts/SOURCE.md`](https://github.com/RomaMartynyuk/friend-forge/blob/sdk-integration/games/friend-forge/assets/artifacts/SOURCE.md). Other presentation is original to Friend Forge.
