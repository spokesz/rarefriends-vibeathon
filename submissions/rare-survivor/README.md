# Rare Survivor: Crypto Winter

Fast-paced 2D bullet-heaven survival action minigame powered by FriendSDK. Dodge swarms of crypto bear market enemies (Jeets, Red Candlestick tanks, and FUD ghosts) while auto-blasting green candle lasers, and collect simulated $RF gems to survive the winter.

**Builder:** [Karatboo](https://github.com/Karatboo) (X: [@Markestolle](https://x.com/Markestolle))  
**Payout Address (EVM / Robinhood Chain):** `0xad5460efaf11d4c34edfb8c0bbbdc660754084cb`  
**Category:** Character Spotlight & Token Activity  
**SDK:** FriendSDK v0.1.2

- **Game source code:** [game/](game/) (includes `index.tsx`, `style.css`, `game.json`)
- **Game rules & weights:** [game/game.json](game/game.json) (10,000 basis points weighted chance table)

---

## Run it

Use Node.js 22+ on Windows/Linux or Ubuntu in WSL2, plus a browser wallet holding a hardwired Rare Friends Generations NFT (generation ≥ 1) on Robinhood mainnet (chain 4663).

```sh
git clone https://github.com/spokesz/friendsdk.git
cd friendsdk
npm ci
# Copy submissions/rare-survivor/game into games/rare-survivor
npm run dev:game -- games/rare-survivor
```

Open `http://localhost:4173`, connect your wallet, and select your verified Rare Friend. Simulated balances and outcomes require no real-money transactions or RF funding.

---

## Gameplay & Features

- **Character Spotlight**: Powered by `createFriendReader` from `@rarefriends/friendsdk/sprites`. Renders the player's authentic on-chain Rare Friend Generations NFT sprite with directional animations and damage flashes.
- **Weapons & Combos**:
  - *Green Candle Laser*: High-speed piercing auto-targeting blaster.
  - *Diamond Hands Shield*: Orbiting barrier crystals damaging and deflecting foes.
  - *Bull Run Chain Lightning*: Electric discharges arcing across enemy groups.
  - *Airdrop Bombs*: Timed area detonations clearing the screen.
- **Enemies**: Fast Jeet swarms, Red Candlestick tanks, and Giga Bear bosses.
- **Controls**: Full WASD / Arrow keys for desktop and a smooth virtual touch joystick for mobile.
- **Sound Engine**: Synthesized retro audio cues using `@rarefriends/friendsdk/sounds` (`impact`, `reward`, `reveal-legendary`, `purchase`, `select`).

---

## Simulated Economy & Rewards

All purchases, drops, and rewards are simulated for the MVP.
- **Consumable**: Survival Pack (1 RF entry)
- **Chance Table (10,000 basis points total)**:
  - `Paper Hands Scrap` (50% chance · 0.5 RF redemption)
  - `Bull Run Catalyst` (35% chance · 1.2 RF redemption)
  - `Diamond Hands Grail` (15% chance · 3.0 RF redemption)
- Expected reward: **1.12 RF** per pack.

---

## Checks & Verification

- `node scripts/dev-game.mjs check games/rare-survivor`: **PASS** (671,687 bytes build, valid 10,000 bps outcomes)
- `npm run typecheck`: **PASS** (0 errors)
- `npm run build`: **PASS** (Clean build)
