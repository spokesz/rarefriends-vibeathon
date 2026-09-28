# Rare Invaders — a Rare Friends Vibeathon submission

Your own connected Rare Friend flies as the ship against a formation of original "signal glitch" invaders, with a simulated Ammo Cache pack economy on the side.

**Builder:** [@beijingdou](https://github.com/beijingdou) · **Category:** Character Spotlight · **SDK:** FriendSDK v0.1

An invader-formation shooter where the ship is the player's own connected Rare Friend, rendered through FriendSDK's canonical sprite reader unmodified; the enemies, UFO, barriers and Ammo Cache salvage icons are original art made for this game. [Source code](https://github.com/beijingdou/Claude-Code/tree/ea03190/games/rare-invaders) · [Playable preview](https://beijingdou.github.io/Claude-Code/rare-invaders/)

## Run it

Use Node.js 22+, plus a browser wallet holding a hardwired Rare Friends Generations NFT (generation ≥ 1) on Robinhood mainnet.

```sh
git clone https://github.com/beijingdou/Claude-Code.git
cd Claude-Code
git checkout ea03190
npm install
npx friendsdk dev ./games/rare-invaders
```

Open the printed URL (normally `http://localhost:4173`), connect your wallet and select your Friend. Build a static bundle with `npx friendsdk build ./games/rare-invaders`; a hosted preview built this way is live at the link above.

## Play

Move with `←`/`→` or `A`/`D`, or the on-screen arrows on touch. Fire with `Space` or the on-screen FIRE button. Ammo Cache and Settings are buttons in the top HUD bar. Clear a wave to advance — the formation speeds up as it thins; erodible barriers and a bonus UFO appear along the way. Lose all 3 lives and the run ends; score persists as a local high score. No RF or wallet action is required to play the core game.

## Rules and rewards

**All balances and outcomes are simulated for this prototype** — no live contracts or real-money transactions. Ammo Cache costs **1 RF**:

| Salvage | Chance | Value |
| --- | --- | --- |
| Empty Shell | 15% | 0 RF |
| Scrap Chip | 30% | 0.25 RF |
| Signal Core | 22% | 0.5 RF |
| Charge Cell | 14% | 0.75 RF |
| Photon Cartridge | 9% | 1.5 RF |
| Ion Battery | 5% | 2.5 RF |
| Fusion Core | 3% | 5 RF |
| Genesis Fragment | 2% | 10 RF |

Every purchased cache reserves its maximum possible prize (10 RF) from free stake. Kept salvage has no redemption expiry.

## Checks, credits and limitations

Verified against the pinned commit: the repository clones and `npm install` completes cleanly (24 packages, 0 reported vulnerabilities); `package.json` defines `typecheck:rare-invaders` (`tsc -p games/rare-invaders/tsconfig.json`), `dev:rare-invaders` and `build:rare-invaders` scripts; and `games/rare-invaders/README.md`'s Ammo Cache odds table matches `games/rare-invaders/game.json` exactly. Typecheck and build were **not independently executed** for this submission — running code from an external repository is blocked by this session's sandbox policy — so their pass/fail status is unverified here rather than confirmed. No automated test suite, Playwright spec, or browser-check fixture exists in the repository at this commit, so no end-to-end or browser-compliance test was run or could be run.

Known limitations: no real-wallet/real-NFT playthrough has been recorded. The FriendSDK monorepo's own `scripts/check-games.mjs` validator is hardcoded to games inside the friendsdk repo's own `games/` folder and does not apply to this external checkout.

Credits: the ship is the player's own canonical Friend sprite via the SDK's sprite reader, never recolored or modified. Enemies, UFO, barriers and the Ammo Cache salvage icons are original art for this game, not Rare Friends character artwork. Sound is synthesized live via the Web Audio API — no audio files.
