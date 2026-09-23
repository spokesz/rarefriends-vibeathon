# Rare Friends Vibeathon Submission: Rare Friends: Dice Dungeon Crawler

- **Project Name:** Rare Friends: Dice Dungeon Crawler
- **Category:** Token Activity / Character Spotlight
- **Builder / Wallet:** `0x1d5b81fbcd4db5a92d6f9e21d66f6da741d3da5b`
- **Chain:** Robinhood Mainnet (Chain ID: 4663)
- **Live Preview App:** https://bankr.bot/apps/dice-dungeon-crawler
- **FriendSDK Version:** v0.1.2

---

## 1. Project Overview & Concept

**Rare Friends: Dice Dungeon Crawler** is an arcade roguelite dice battler engineered for the Rare Friends ecosystem. Players bring their hardwired Generations Rare Friend into the **Crypt of Fate**, braving 5 treacherous dungeon floors filled with fearsome crypt guardians:

1. **Floor 1:** Crypt Goblin Guard (12 HP) — Drops *Goblin Loot Bag* (+0.25 simulated RF)
2. **Floor 2:** Cursed Skeleton Archer (18 HP) — Drops *Skeleton Crypt Chest* (+0.50 simulated RF)
3. **Floor 3:** Shadow Catacomb Beast (26 HP) — Drops *Beast Fang Relic* (+0.75 simulated RF)
4. **Floor 4:** Dark Necromancer (36 HP) — Drops *Necromancer's Grimoire* (+2.50 simulated RF)
5. **Floor 5:** Ancient Vault Dragon (52 HP) — Drops *Dragon's Golden Hoard* (+10.00 simulated RF)

---

## 2. Core Mechanics & Token Economy ()

- **Entry Key Sink:** Each dungeon run requires spending **1 Dungeon Key** (priced at **1.0 ** in `game.json`), introducing a steady token consumption mechanism.
- **Push-Your-Luck Stash Extraction:** When a floor guardian is vanquished, loot accumulates in the player's unbanked stash. The player faces a tactical crossroad:
  - **Delve Deeper:** Descend to the next floor to fight a stronger guardian for higher multipliers (up to 3.0x).
  - **Extract & Bank:** Safely retreat to camp and transfer all unbanked  into their permanent vault.
- **Death Penalty:** If the hero falls in battle (HP reaches 0), all unbanked loot from that run is lost in the crypt.
- **Tactical Combat:** Opposed d6 dice rolls determine strikes, blocks, and critical hits. Players can activate a shield guard (50% damage reduction) or quaff healing elixirs.

---

## 3. Tech Stack & Integration

- **Engine:** Built with **FriendSDK v0.1.2** with standard React game component lifecycle (`GameComponentProps`).
- **Responsive Viewport:** Optimized for standard 960 × 640 desktop viewport and responsive mobile touch displays.
- **Audio Feedback:** Integrated procedural Web Audio API synthesizer for dice rolling, strikes, heals, and victory fanfares without external CDN dependencies.
- **Simulated Economy:** Fully compliant with Vibeathon rules using simulated  state via `game.json` outcomes and runtime state management.

---

## 4. Verification & Testing

- **Local Development:**
  ```bash
  npx friendsdk dev ./games/dice-dungeon-crawler
  ```
- **Live Terminal App:**
  Playable directly in the Bankr Terminal container at `https://bankr.bot/apps/dice-dungeon-crawler`.
