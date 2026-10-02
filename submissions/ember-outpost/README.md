# Ember Outpost: Siege & Defense

**Project name**  
Ember Outpost: Siege & Defense  

**Builder / contact**  
proplayer688 — https://github.com/proplayer688  

**Category**  
Economy Potential & Token Activity (Non-SDK Track)  

**One sentence**  
A 2.5D isometric tactical strategy and real-time demolition combat game set in the Rare Friends universe, where players deploy autonomous assault squads and fortify base defenses to pillage and burn $RF in 100% deterministic warfare without wallet or gambling friction.

---

## 🕹️ Playable Demo & Repository
- **Live Playable Game (Desktop & Mobile):** https://proplayer688.github.io/ember-outpost/
- **Source Code Repository:** https://github.com/proplayer688/ember-outpost
- **Platform:** Web Browser (Desktop WASD/Mouse & Mobile Virtual Touch Analog)
- **Engine & Architecture:** TypeScript, Phaser 3, Vite, 100% Procedural Web Audio API Synthesis, GitHub Actions CI/CD.

---

## ⚔️ What Did You Build?

Ember Outpost is a complete real-time tactical strategy and active combat base game:

1. **Tactical Siege Assault Arena:**
   - Real-time squad deployments (Volt Imps, Pulse Rangers, Obsidian Breachers, EMP Overcharge).
   - Energy pacing (10 max, recharges at 1.0 energy/sec) demanding tactical wave timing.
   - Autonomous unit AI: Pathfinding, turret line-of-sight targeting, and barrier wall breaching.
   - 3-Star destruction formula: 50% Demolition (⭐), Core Demolished (⭐⭐), 100% Annihilation (⭐⭐⭐).
   - 4 Unique AI Rival Fortresses: *Sentinel Vex (Iron Bastion)*, *Architect Milo (Aether Spire)*, *Artificer Nova (Clockwork Foundry)*, and *Envoy Cleo (Sunken Sanctum)*.

2. **Active Base Defense Mode:**
   - Inbound raid alert system where rival legions march on the player's Outpost.
   - Defend the Outpost Core and Token Vault using Pulse Turrets, Tesla Coils, and Mortars.
   - Earn tactical defense bounties for repelling waves.

3. **Living Settlement Exploration:**
   - Control **Ignis the Keeper** in a 2.5D isometric pixel outpost.
   - Harvest Timber Groves, Aether Crystals, and Obsidian Outcrops.
   - Transmute harvest into Brass Ingots and Aether Alloys at the Grand Forge.
   - Upgrade settlement from Ember Hearth to Brass Citadel.

---

## 💎 Token Activity & Economic Tension ($RF Mechanics)

### 100% Deterministic & Zero Gambling
There is zero gambling, roulette, or RNG dice rolls. All combat outcomes, loot pillaging, and damage calculations are purely mathematical and governed by player deployment skill, timing, and base defense layouts.

### Economic Sinks & Burns:
| Economic Action | Cost | Economic Mechanism | Impact on Economy |
|---|---|---|---|
| **Deploy Volt Imp** | 10 $RF | Swarm Munitions | **Burned permanently** upon deployment |
| **Deploy Pulse Ranger** | 20 $RF | Plasma Battery | **Burned permanently** upon deployment |
| **Deploy Obsidian Breacher** | 35 $RF | Demolition Armor | **Burned permanently** upon deployment |
| **Cast EMP Overcharge** | 25 $RF | Aether Lightning Conduit | **Burned permanently** upon deployment |
| **Upgrade Base Defense** | 50 $RF + 200 Coins | Fortification Blueprint | Sunk into defense infrastructure |
| **Upgrade Outpost Core** | 100 $RF + 500 Coins | Citadel Tier Advancement | Sunk into settlement progression |

Every assault costs simulated $RF to muster, creating true economic tension between risk and pillage reward.

---

## 🎨 Procedural Craftsmanship
- **Zero Audio Files:** 100% procedural real-time sound synthesis using native Web Audio API oscillators (laser bolts, mortar thumps, explosions, tesla zaps, demolition crunches, and 8-bit chiptune BGM).
- **Zero Image Files:** 100% procedural pixel-art rasterization directly on HTML5 canvas. Instantaneous load time with zero external asset dependencies.
- **Visual Palette:** Authentic Rare Friends aesthetic (Neon Lime `#22C55E`, Cyan `#38BDF8`, Amber `#F59E0B`, Coral `#F43F5E`, Violet `#8B5CF6`).

---

## 🧪 Verification & Automated QA
- **Automated Chromium E2E Test Suite (`node scripts/test-combat-final.mjs`):** 8/8 assertions passed with **0 console errors**.
- **Automated CI/CD:** Live on GitHub Pages with continuous deployment via GitHub Actions.
