# Rare Survivor: Crypto Winter ❄️⚡

> An adrenaline-pumping 2D survival action minigame built for the **Rare Friends Vibeathon** ($40,000 prize pool).

**Builder:** [Karatboo](https://github.com/Karatboo) (X: [@Markestolle](https://x.com/Markestolle))  
**Payout Address (EVM / Robinhood Chain):** `0xad5460efaf11d4c34edfb8c0bbbdc660754084cb`  

---

## 🎮 Overview

**"Rare Survivor: Crypto Winter"** is a fast-paced bullet-heaven survival game inspired by *Vampire Survivors*. 
Take control of your verified **Rare Friend** NFT inside the native 960 × 640 sandboxed canvas. Dodge swarms of bear market foes—fickle Jeets, red candlestick drops, and ghostly FUD specters—while your auto-blaster fires piercing green candle lasers at incoming targets!

Defeated enemies burst into **simulated $RF gems**. Collect them to charge your XP meter, trigger level-up milestones, and build an overpowered character with randomized crypto perks (Diamond Hands Shield, Bull Run Chain Lightning, Airdrop Bombs, and Rocket Boots).

---

## 🕹️ Controls

| Platform | Action | Controls |
| :--- | :--- | :--- |
| **Desktop** | Movement | `W` `A` `S` `D` or `Arrow Keys` |
| **Mobile** | Movement | **Touch & Drag** anywhere on the screen (Dynamic Virtual Joystick) |
| **All** | Attacks | **Auto-Aim & Auto-Fire** (Targeting nearest threat) |
| **All** | Audio | Dedicated **Sound Toggle** in HUD |

---

## 💎 Features & Economy

- **Authentic Rare Friend Character**: Uses `@rarefriends/friendsdk/sprites` (`createFriendReader`) to dynamically render the player's on-chain Generations NFT character sprite, complete with directional facing and hit feedback.
- **Synthesized Audio Engine**: Integrated with `@rarefriends/friendsdk/sounds` (`createFriendSoundKit`) for responsive, low-latency sound cues (`impact`, `reward`, `reveal-legendary`, `purchase`, `select`).
- **60 FPS Canvas Physics**: Optimized collision detection, particle explosions, floating damage indicators, screen shake, and smooth gem magnet physics.
- **Simulated $RF Progression**:
  - Gained from defeated enemies and stored in game session memory.
  - Interacts with FriendSDK's `game.json` consumable chance definition (Energy/Survival Packs with weighted outcomes totaling 10,000 bps).
- **Responsive Viewport**: Fully scalable inside the standard 960 × 640 sandbox container with high-DPI crisp pixel rendering.

---

## 🚀 How to Run & Test

Ensure you are inside the `friendsdk` project directory:

```bash
# 1. Install dependencies
npm ci

# 2. Build the SDK runtime
npm run build

# 3. Launch the game in preview dev server
npm run dev:game -- games/rare-survivor
```

Open your browser at:
👉 **`http://localhost:4173`**

Connect your browser wallet (on Robinhood mainnet, holding a generation ≥ 1 Rare Friend NFT), select your Friend, and jump straight into the arena!

---

## 📦 Vibeathon Submission Details

- **Project Name**: Rare Survivor: Crypto Winter
- **Builder**: Karatboo (X: [@Markestolle](https://x.com/Markestolle))
- **Payout Address**: `0xad5460efaf11d4c34edfb8c0bbbdc660754084cb`
- **Submission Target**: [spokesz/rarefriends-vibeathon](https://github.com/spokesz/rarefriends-vibeathon)
- **Runtime**: FriendSDK v0.1.2 Sandboxed React Runtime
- **Contract / Economy**: Simulated $RAREFRIENDS token reward calculations & chance packs (strictly compliant with hackathon simulated MVP rule).
