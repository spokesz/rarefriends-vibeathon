# Steal an Egg

**Project name**
Steal an Egg

**Builder / contact**
[@spokesz](https://github.com/spokesz)

**Category**
Economy Potential

**What did you build?**
A real-time 3D egg heist, as an example of an SDK game with a custom three.js renderer. Your Rare Friend raids guarded nests across six biomes, outruns each biome's Guardian back to base, hatches the egg into a pet that earns cash every second, then upgrades a treadmill to train Speed and push into deeper, richer biomes. Three AI rival Friends steal eggs alongside you and raid your pens, so you lock your base and raid theirs. It has a Roblox-style third-person orbit camera, 48 species with mutations and sizes, a fuse machine, a day/night cycle and a Pet Index, all inside the SDK's sandboxed 960 × 640 container.

**How does it use Rare Friends?**
The selected, ownership-verified Friend is the thief you play. Its canonical 16 × 16 frames (all four facings, idle and walk) are read through the SDK and drawn unmodified, black mask with a white halo, as a camera-facing billboard whose facing follows the orbit camera. The three rivals are Rare Friends too (#1337 Skeleton, #2024 Family, #808 Cellular), drawn the same way from canonical frames recorded from the SDK's pinned registry, so every character on screen is a Rare Friend. They are single-player AI, not other people. The SDK runtime handles wallet connection, Friend selection and the ownership gate; the game adds no wallet code.

**How RF is spent, and the economy**
In-game cash is an off-chain game resource with no RF value, never redeemable. **RF is spent in exactly one place:** a Shrine Key costs 1 RF and cracks into one of six relics (0 to 10 RF, expected value **0.875 RF**, 12.5% vendor edge). The prize is a *productive asset*: a kept relic multiplies the income of every pet (+10% to +400%, boosts add up) for as long as the Friend holds it, and redeeming it pays its fixed RF and gives the boost up. That **hold-or-redeem** decision is the economy hook: the rarer the relic, the more it is worth keeping, so RF tends to stay in the game as backing instead of returning to circulation. The boost is read from the SDK snapshot's inventory, so it always matches the ledger. Backing follows the SDK unchanged: 10 RF reserved per key, kept relics backed with no expiry. [Full table and numbers](https://github.com/spokesz/steal-an-egg/blob/26eb8bef9d42ada704a9cd9b140e0fda53f3059d/games/steal-an-egg/README.md#rarefriends-rf-integration--all-simulated-in-preview-mode).

**What would be on-chain?**
Nothing in this build; no transaction is ever sent. Going live needs no new contract, only a deployment of the SDK's chance game with this `game.json`: `buy` moves RF from the Friend wallet and mints keys, `play` burns a key and commits a play, `settle` mints the relic to the Friend's canonical wallet, `redeem` burns it for its fixed RF. Cash, pets, Speed, upgrades and the world stay off-chain. The one bridge is a read: the Friend wallet's relic balances become the income multiplier. Persistence of pets and Speed, RF-priced cosmetics (trails, base skins) and player-to-player egg trading would need save, upgrade and trading APIs that SDK v0.1.2 does not supply.

**How does it use randomness?**
Only a Shrine Key's relic is a paid random outcome, and it comes from the SDK ledger (preview) or contract (live); the shrine reveal is presentation only and the browser never chooses it. Egg species, mutations, sizes and nest resets are browser-random gameplay with no RF value.

**Source code**
[GitHub repository](https://github.com/spokesz/steal-an-egg/tree/26eb8bef9d42ada704a9cd9b140e0fda53f3059d) · FriendSDK v0.1.2 · three.js 0.186 · React 19 · TypeScript

**Playable demo / how to run**
**Play: https://spokesz.github.io/steal-an-egg/** (GitHub Pages, built with `friendsdk build`). You'll need a browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet (chain 4663). No RF funding or transaction signature is needed for the preview.

To run locally, with Node.js 22+ installed:

```sh
git clone https://github.com/spokesz/steal-an-egg.git
cd steal-an-egg
git checkout 26eb8bef9d42ada704a9cd9b140e0fda53f3059d
npm ci
npm run dev        # or: npm run dev:lan to play from a phone on the same Wi-Fi
```

**How do you play?**
Run with **WASD** or the up/down arrows (camera-relative); turn the camera by dragging or with the left/right arrows; zoom with the wheel or **I** / **O**; **Space** jumps. On touch, a thumbstick appears under your left thumb, drag elsewhere to look, pinch to zoom, and there is a JUMP button. Press **E** or tap the floating prompt to interact; selling a pet and stealing from a rival are **hold** actions and the prompt shows a progress bar while you hold. Steal an egg, escape the Guardian (it gives up 22 m outside its biome; if it touches you the egg goes back), carry the egg home to hatch, spend cash at the Upgrades board, stand on the treadmill to train Speed, and work from the Forest up to the Volcano (Lake 900 → Desert 10K → Jungle 40K → Snow 170K → Volcano 700K Speed). Lock your base with the red button, tackle rivals that are carrying something, and fuse three identical pets into the next mutation. Mute, reduced motion and camera sensitivity are in the HUD / Settings.

**Costs and rewards**
Everything is simulated. Each Shrine Key costs 1 RF and gives one relic: 30% Cracked Shell (0 RF), 35% Bronze Relic Egg (0.5 RF, +10% income), 20% Silver (1 RF, +25%), 10% Golden (2 RF, +60%), 4% Diamond (5 RF, +150%), 1% Rare Friend Egg (10 RF, +400%). Kept relics have no redemption expiry. Upgrades, pets and everything else cost in-game cash only.

**What have you tested?**
Game validation (`friendsdk check`), typecheck and build pass. An automated browser playtest drives the real sandboxed runtime in headless Chromium through the whole loop (run, orbit and zoom, steal, carry home, hatch, earn, train, upgrade, buy and crack a relic through the SDK confirmations, get caught by a Guardian) and passes at 960 × 800 and at a 390 × 844 phone frame; a soak test fast-forwards six minutes of rival and Guardian AI and passes. Those use the SDK's mock wallet and sample Friend. The hold-to-sell progress and the rival Friends were also checked in the real runtime with screenshots. It was played by hand over the local network during development, which is how the missing hold-progress indicator was found and fixed. The hosted Pages build was loaded in a browser and reaches the SDK wallet gate with no errors, but a full real-wallet playthrough of the *hosted* build is still outstanding.

**Known limitations**
Progress resets when the session ends: the sandbox has no storage and the bridge has no save API, so hatch times, prices and Speed targets are compressed to fit one sitting of about 20 minutes. Rivals are single-player AI; there is no multiplayer. Live mode has never run against a deployed contract. No live token spending, trading, wearable NFTs or creator fees.

**Credits**
All models, biomes and bases are generated in code; no external models, textures, fonts or audio files. Character sprites and sounds come from FriendSDK; rendering is three.js (MIT). Species, biome, Guardian and rarity names follow the public Roblox game *Steal An Egg* as a tribute; this is an unaffiliated fan prototype that uses none of its assets or code. [Assets and sources](https://github.com/spokesz/steal-an-egg/blob/26eb8bef9d42ada704a9cd9b140e0fda53f3059d/games/steal-an-egg/README.md#assets-and-sources).
