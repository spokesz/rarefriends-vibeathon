# Rare Friend Spotlight: Becoming

A character-driven action RPG and identity progression game where your Rare Friend fights through live boss arenas and evolves their permanent personality, chronicle, and reputation archetype.

---

### Project Name
**Rare Friend Spotlight: Becoming**

### Builder / Contact
**emer-eth** (GitHub: [@emer-eth](https://github.com/emer-eth))

### Category
**Character Spotlight** (Best use of a Generations NFT as the main character)

---

## What did you build?

**Rare Friend Spotlight: Becoming** is a real-time combat action RPG and character evolution experience built specifically for Rare Friends. Instead of treating the NFT as a static profile picture or simple clicker, the game places your selected Rare Friend at the center of live combat encounters, tactical dilemmas, and permanent personality growth:

1. **60 FPS Real-Time Combat Arena**: Control your Rare Friend in top-down combat with WASD movement, directional plasma blasters, rapid dash evasions, and destructible cover pillars.
2. **Escalating 4-Stage Campaign**:
   - **Stage 1 (Crimson Ridge)**: Razor Stalker Alpha (fast needle lunges).
   - **Stage 2 (Rust Outpost)**: Enforcer Kaelen (kinetic shield turret & ricochet wall fire).
   - **Stage 3 (Ancient Monolith)**: Gorgon Core Construct (rotating radial lasers & bullet-hell barrages).
   - **Stage 4 (Chamber of Echoes)**: Shadow Reflection (dynamic doppelgänger mirroring your Friend's traits and speed).
3. **8-Dimensional Emergent Trait Engine**: Your combat decisions shape permanent traits (*Courage, Caution, Loyalty, Ruthlessness, Compassion, Cunning, Cooperation, Independence*), progressing across 6 tiers (*Undeveloped* → *Defining*).
4. **Emergent Reputation Titles**: Your Friend dynamically earns reputation archetypes based on their dominant traits (e.g., *Shield of the Vulnerable*, *Dread Whisperer*, *The Undaunted Maverick*).
5. **Persistent Chronicle & NPC Memories**: A persistent in-game journal records every battle outcome, while an NPC memory system tracks how world characters view your Friend.
6. **In-Game Campaign & Ecosystem Roadmap**: Integrated 4-stage campaign tree and future ecosystem updates.

---

## How does it use Rare Friends?

- **Generations NFT as Hero**: You play directly as your own Generations NFT (Gen ≥ 1), dynamically rendered with authentic sprite animations across idle, walking, and directional combat states.
- **Identity Isolation**: Progression, XP, traits, and chronicle entries are stored strictly isolated per-Friend ID. Switching NFTs swaps your character's stats and history.
- **FriendSDK World & Audio**: Uses FriendSDK v0.1.2's canonical world presets and procedural WebAudio sound kit.

---

## Source Code

- **Game Files in Submission**: [`submissions/spotlight/`](./)
- **Engine / SDK Repo**: FriendSDK v0.1.2
- **Tech Stack**: TypeScript, React, HTML5 Canvas, Vanilla CSS (zero external UI bloat), FriendSDK WebAudio.

---

## Playable Demo / How to Run

### 🌐 Live Public Playable Preview (with Spoken Audio Walkthrough)
👉 **[Launch Live Game & Audio Commentary](https://emer-eth.github.io/rarefriends-vibeathon/)**

Features:
- Includes sample Rare Friends (no wallet or funding barrier required for preview).
- Includes top banner with an **Audio Walkthrough** covering the mechanics, design choices, and emergent trait engine.

### Local Setup
```bash
# Clone the repository
git clone https://github.com/spokesz/friendsdk.git
cd friendsdk
npm ci

# Start the game server
npm run dev:game -- games/spotlight
```

Then navigate to `http://localhost:4173` in your browser.

> **Requirements**: A browser wallet holding a hardwired Generations NFT (Gen ≥ 1) on Robinhood mainnet (chain 4663). No real-money transaction or RF spending is required for preview.

---

## How do you play?

- **Move**: `W`, `A`, `S`, `D` or `Arrow Keys` (or click/tap on touchscreen).
- **Attack**: `Spacebar` (fires directional plasma bursts towards cursor/heading).
- **Dash**: `Shift` (instant evasive roll through enemy projectiles).
- **Combat Dilemma**: Upon defeating each boss, choose how your Friend resolves the encounter (Mercy, Extraction, or Honor) to evolve specific traits.
- **Menu Controls**: Access **Profile**, **Roadmap**, and **Settings** from the in-world HUD.

---

## Costs and Rewards

All economy interactions are simulated for the MVP:
- **Consumable**: Expedition Supply (1.00 RF simulated cost).
- **Outcomes**:
  - Frontier Keepsake (60% chance) — 0.50 RF reward
  - Vanguard Signal Flare (30% chance) — 1.00 RF reward
  - Ancient Relic Shard (10% chance) — 3.00 RF reward
- **Expected Return**: 0.90 RF per run.

---

## What have you tested?

- **SDK Game Validation**: Passed with `node scripts/dev-game.mjs check games/spotlight`. Valid build size (874 KB, well under the 3 MB threshold).
- **Real-Time Combat**: 60 FPS requestAnimationFrame canvas loop, collision detection against destructible obstacles, bullet ricochets, and boss AI routines verified.
- **Responsive Controls**: Fully playable on desktop (keyboard + mouse) and mobile/touch controls.
- **Accessibility & Settings**: Supports WebAudio mute/unmute toggle and prefers-reduced-motion settings.

---

## Known Limitations

- Real-money on-chain contract transactions for token rewards are simulated for the Vibeathon MVP.
- Co-op multiplayer raids are roadmapped for Phase 3.

---

## Credits

- Built using the official [FriendSDK v0.1.2](https://github.com/spokesz/friendsdk).
- Scenery, sprite decoders, and audio cues provided by Rare Friends FriendSDK.

