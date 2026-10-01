# Rare Friends · Character Spotlight Studio

A tactile retro arcade suite where your Rare Friends Generations NFT stars across 4 mini-games, leveling up through 5 modular component upgrades and simulated on-chain artifact forging with FriendSDK.

- **Builder / contact:** [@emer-eth](https://github.com/emer-eth)
- **Category:** Character Spotlight
- **Playable Demo:** [https://emer-eth.github.io/character-spotlight/](https://emer-eth.github.io/character-spotlight/)
- **Source Code:** [emer-eth/character-spotlight](https://github.com/emer-eth/character-spotlight)
- **Stack:** FriendSDK v0.1.4, TypeScript, React, HTML5 Canvas, Vanilla CSS

---

## Demo Video & Gameplay Showcase

https://github.com/user-attachments/assets/demo.mp4

![Character Spotlight Gameplay Demo](https://raw.githubusercontent.com/emer-eth/rarefriends-vibeathon/submission/character-spotlight/submissions/character-spotlight/demo.gif)

> **Direct Demo Video Link:** [Download / View demo.mp4](https://raw.githubusercontent.com/emer-eth/rarefriends-vibeathon/submission/character-spotlight/submissions/character-spotlight/demo.mp4)

---

## 1. What did you build?

**Character Spotlight Studio** turns the player's connected Rare Friends NFT into the central protagonist of a retro arcade studio hub:
- **Hero Showcase Stage:** A real-time pixelated dynamic character doll stage rendering your Generation 0 or 1+ Rare Friend with dynamic walk cycles and glowing aura tiers.
- **5 Modular Component Upgrades:**
  1. *Core Power* (improves power output and drop rates)
  2. *Optics Visor* (magnet pull in Fruit Game & visor lenses)
  3. *Nano Plating* (extra shield hits in Ball Rush & Parkour Dash)
  4. *Aura Spark* (multiplies score payouts across all games)
  5. *Thruster Boots* (boosts speed and jump height in runner trials)
- **Ascension System:** Players must upgrade all 5 modular components to ascend their Friend to the next tier level.
- **FriendSDK Artifact Forge:** Uses simulated Robinhood mainnet RF tokens & batteries to settle on-chain game plays, earning rare components (Core Fragments, Visor Lenses, Titanium Plates).

---

## 2. The 4 Arcade Cabinets

1. **Cabinet 01: Block Puzzle**
   - Classic falling tetromino spatial puzzle on a 10×18 grid with bold 22px cells.
   - Smooth multi-step SRS wall-kicking, ghost drop projection, soft drop, and hard drop.
   - Clears award score scaled by Aura Spark and drop rare Core Fragments.

2. **Cabinet 02: Parkour Dash**
   - High-speed side-scrolling obstacle runner with retro parallax cityscape and moving ground.
   - Jump over spikes and slide underneath high hanging laser barriers.
   - Collect floating coins and Jetpack Thruster parts while shielded by Nano Plating.

3. **Cabinet 03: Ball Rush**
   - 360° survival dodge arena bounded inside a 640×320 court.
   - Weave past bouncing hazard orbs while vacuuming up energy batteries and Titanium Plates before time expires.

4. **Cabinet 04: Fruit Game**
   - Fast-paced arcade catcher.
   - Catch apples, cyber berries, and golden melons to build up combo multipliers up to 8×.
   - Features Optics Visor magnetic fruit pull while dodging hazard bombs.

---

## 3. How to Run Locally

```bash
# Clone the repository
git clone https://github.com/emer-eth/character-spotlight.git
cd character-spotlight

# Install dependencies (Node 22+)
npm install

# Run the Character Spotlight Game
npm run dev:game -- games/character-spotlight --host 0.0.0.0 --port 4173
```

Open `http://localhost:4173/` in your browser. Connect a wallet holding a Rare Friends Generations NFT (or use preview mode).
Or visit the live deployed GitHub Pages build: [https://emer-eth.github.io/character-spotlight/](https://emer-eth.github.io/character-spotlight/)

---

## 4. RF Activity, Outcomes & Economy Authority

FriendSDK acts as the authoritative outcome engine for the Artifact Forge:

| Artifact | Probability | Reward |
|---|---|---|
| Common Scrap | 50.0% | 0.01 RF |
| Nano Battery | 25.0% | 0.05 RF |
| Turbo Booster | 15.0% | 0.10 RF |
| Quantum Core | 7.0% | 0.25 RF |
| Mythic Overdrive | 2.5% | 0.50 RF |
| Friend Artifact | 0.5% | 2.00 RF |

*Note: All economy values, RF tokens, and rewards are simulated for preview testing on Robinhood mainnet (chain 4663).*

---

## 5. Visual Aesthetics & Accessibility

- **Font:** Strictly `"Courier New", monospace` across all HUD, modals, dialogues, and cabinets.
- **Palette:** Warm tactile cream (`#efefed`), dark ink (`#131313`), fresh grass (`#8fb45b`), and bridge gold (`#efd28a`).
- **Responsive & Contained:** Viewport locked at 100% height with zero outer scrollbar overflow.
- **Full Touch & Accessibility Controls:** On-screen virtual buttons for mobile devices, sound effects mute toggle, and reduced-motion option.
