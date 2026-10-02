# Submission: Rare Haven - Mythic Sanctuary & Realm Expeditions

- **Project Name:** Rare Haven: Mythic Sanctuary & Realm Expeditions
- **Builder Name / Contact:** Vibeathon Participant
- **Category:** Character Spotlight, Token Activity, Economy Potential

---

## 🚀 One-Sentence Summary

**Rare Haven** is an interactive virtual pet sanctuary and realm expedition minigame where players care for their canonical Rare Friend, forge Realm Keys with $RAREFRIENDS, navigate real-time 2D void expeditions to discover mythic relics, and manage a balanced 91% EV token economy.

---

## 💻 Source Repository & Instructions

- **Source Code Directory:** [`friendsdk_repo/games/rare-haven/`](https://github.com/spokesz/rarefriends-vibeathon)
- **SDK Version:** FriendSDK v0.1.2 (`@rarefriends/friendsdk@0.1.2`)

### Run Instructions
From the repository root directory, execute:

```bash
cd friendsdk_repo
npm ci
npm run build
node scripts/dev-game.mjs dev games/rare-haven
```

Open `http://localhost:4173` in your web browser. Connect a wallet containing a Rare Friends Generations NFT (Gen ≥ 1) on Robinhood Mainnet (Chain ID 4663).

---

## 🎮 Controls & Game Rules

### Game Controls
- **Sanctuary Movement:** WASD, Arrow keys, or tap/click anywhere on screen to set a destination point.
- **Station Interaction:** Walk near an interactive station or press <kbd>E</kbd> / tap the label prompt.
- **Realm Expedition Minigame:** Touch or click on the canvas to guide your Rare Friend toward glowing mana orbs and touch the Realm Chest to unlock your relic.
- **Accessibility:** Toggle **Reduce Motion / Fast Reveal** in settings for instant chest reveals without minigame animation, and toggle sound FX on/off.

### Game Stations & Mechanics
1. **Altar of Fortune:** Buy Realm Keys for **1.00 RF** (`1000000000000000000` wei).
2. **Realm Portal:** Embark on a Realm Expedition to open Realm Keys and reveal relic rewards.
3. **Pet Care Altar:** Feed Star Fruit (+25 Energy) and groom coat (+2% Luck Buff) to nurture your Rare Friend.
4. **Crystal Forge:** Upgrade Sanctuary levels to boost passive yield efficiency.
5. **Relic Vault:** View owned relics, redeem for $RAREFRIENDS token backing, or salvage unwanted items.

### Outcome Probabilities & Tokenomics

Each **Realm Key** costs **1.00 RF**. Every purchased key reserves a maximum prize backing of **10.00 RF**.

| Outcome Relic | Tier | Chance (BPS) | Reward Value (RF) |
|---|---|---|---|
| **Corrupted Dust** | Junk | 20.00% (2000 BPS) | 0.00 RF |
| **Mystic Herb** | Common | 28.00% (2800 BPS) | 0.25 RF |
| **Luminous Shard** | Uncommon | 22.00% (2200 BPS) | 0.50 RF |
| **Astral Ore** | Rare | 15.00% (1500 BPS) | 1.00 RF |
| **Enchanted Rune** | Epic | 9.00% (900 BPS) | 2.00 RF |
| **Crown of the Ancients** | Legendary | 4.00% (400 BPS) | 5.00 RF |
| **Heart of the Sanctuary** | Mythic | 2.00% (200 BPS) | 10.00 RF |

- **Expected Value (EV):** **0.91 RF** per key (9.0% house margin burn sink).
- **Kept Relics:** Stored in inventory with guaranteed RF redemption value and no expiration.
- **Third-Party Asset Credits:** Uses canonical FriendSDK vector artwork, sound kit synthesis, and standard icons.

---

## 🧪 Verification & Automated Checks

All SDK tests, type checking, game validation, and browser runtime build checks were executed and **passed with 0 failures**:

- `npm run typecheck` — **PASSED** (0 TypeScript errors across SDK and game components)
- `npm test` — **PASSED** (109 passed, 0 failed, 2 skipped local Anvil contract integration tests)
- `npm run check:games` — **PASSED** (`games/rare-haven: valid; expected reward 910000000000000000; maximum 10000000000000000000 RF base units; build 772219 bytes`)

### Known Issues / Future Capability Gaps
- Simulated preview mode active by default as per v0.1 guidelines. On-chain live deployment can be enabled via standard `--deployment` manifest flags.
