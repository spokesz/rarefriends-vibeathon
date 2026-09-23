# Vault Island

- **Builder:** Matteo · @Teino-92
- **Category:** Token Activity (also Economy Potential and Character Spotlight)
- **SDK version:** FriendSDK v0.1 (built and tested on v0.1.2) + three.js 0.169.0

**One sentence:** Your Rare Friend walks a 3D floating island, masters skill mini-games to earn Stardust, decorates the island its own way, and spends RF keys on a vault whose lock only skill can pick.

## Links

- **Source:** https://github.com/Teino-92/friendsdk/tree/main/games/vault-island
- **Playable preview:** https://teino-92.github.io/vault-island/
- **Requirements:** browser wallet on Robinhood mainnet (chain 4663) holding a hardwired Generations NFT (generation ≥ 1). Economy is simulated; no RF, ETH or signatures needed.

## How it uses Rare Friends and RF

- The verified Friend is the playable character everywhere: its canonical sprite walks the 3D island as a billboard and stars in the Star Rain mini-game.
- **RF sink:** every vault attempt needs a 1 RF key. Expected return 0.905 RF, so each opening burns about 9.5% of the RF spent, with a 20 RF jackpot.
- **Skill gates access, never payout.** The vault lock must be picked to open the vault; a failed pick keeps the key. The chance game alone sets the loot.
- **Economy potential:** Stardust is a second, skill-earned currency with no RF value. Streaks, daily evaporation and free-placement decorations make every island different and give players a reason to return daily, which drives regular key purchases. Future sinks (RF-priced decorations, streak protection) need SDK support for extra purchase types.

## Rules

| RF loot | Chance | Reward |
| --- | --- | --- |
| Crystal dust | 55% (5,500 bps) | 0.2 RF |
| Silver coin | 30% (3,000 bps) | 1 RF |
| Gold bar | 11% (1,100 bps) | 2 RF |
| Ruby | 3.5% (350 bps) | 5 RF |
| Friend crown | 0.5% (50 bps) | 20 RF |

Key price 1 RF (`10n ** 18n`). 1 key = 1 opening = 1 loot. Each key reserves 20 RF of backing. Kept loot has fixed value, no expiry. All RF actions simulated and labelled.

Stardust (no RF value): Crystal Echo 10 per round, Star Rain 4 per star, lock picked 20, times a streak bonus (+10% per consecutive day, max x2). Each mini-game recharges after play (60 s demo / 3 min real). The vault has 5 charges per day and jams after a failed pick (45 s demo / 2 min real). Skipping a day resets the streak and evaporates 25% of unspent Stardust per missed day. Decorations (15 to 120 Stardust, 7 kinds, up to 40 per island) are placed freely on a 0.25 grid with 4 rotations; paths and station access always stay clear. Island level (Stardust spent / 100) raises mini-game difficulty. A demo clock (1 day = 5 minutes) lets judges see the full loop in one session.

Controls: click or tap the ground or a station label to walk there (A* pathfinding), WASD/arrows, E to use a station. Full controls in the game README.

## Run locally

```sh
git clone https://github.com/Teino-92/friendsdk && cd friendsdk
npm ci && npm i three@0.169.0 @types/three@0.169.0 && npm run build
npm run dev:game -- games/vault-island
```

## Assets

All 3D models built in code from primitives. Original 8×8 loot icons. Friend sprite from the SDK sprite reader. Audio from the SDK sound kit. three.js (MIT). No other third-party assets.

## Checks

| Check | Result |
| --- | --- |
| `npm test` | 114 pass, 0 fail, 2 skipped (Foundry not installed) |
| `npm run typecheck` + game typecheck | Pass |
| `npm run check:games` | Pass: `expected reward 905000000000000000; maximum 20000000000000000000` |
| `npm run check:browser` | Pass |
| Vault play-through, click-only (720 px) | Pass: walk to merchant, buy key, walk to vault around obstacles, pick 3-pin lock, reveal and keep loot (20 → 19 RF, charges 5 → 4, +22 Stardust) |
| Mini-games (480 px) | Pass: Star Rain 4 stars → 18 Stardust; Crystal Echo 3 rounds → 33 Stardust, 60 s recharge shown |
| Decorate mode (720 and 390 px) | Pass: fountain, cherry tree and lantern placed; path, station and occupied spots rejected with reasons; Move returned the fountain to stock; save code restored exact positions (cherry 2.75, 5; lantern −4, 6.25) |
| Progression unit tests | Pass: streak and evaporation (day 1 → 77, day 2 → 197, one skipped day → 50 evaporated); decoration buy, place, pick-up and save round trip; tampered or other-Friend codes rejected |

## Known issues and future SDK needs

- RF ledger resets on reload: SDK v0.1 has no persistence. The island survives via save codes because the sandbox blocks browser storage. A wallet-bound save API would remove the codes.
- Save codes trust the device clock; editing them can only affect cosmetic Stardust.
- The route-blocking placement rule is a safety net and was not triggered in tests (paths and station surroundings are already off-limits).
- Headless tests ran on software WebGL (3 to 7 fps). Real GPU performance not yet measured.
