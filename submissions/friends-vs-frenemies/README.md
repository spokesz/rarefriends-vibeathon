# FRIENDS VS FRENEMIES

**Builder:** Syrup · **Contact:** @buildinginweb3 on X · **Category:** Character Spotlight · **SDK:** FriendSDK v0.1.2

FRIENDS VS FRENEMIES turns your owned Generations NFT into the hero of a living 2.5D pixel world — build and grow your Friend's home, strengthen its defenses, unlock Friend powers, and defend it from escalating Frenemy invasions across changing territories.

## What did you build?

FRIENDS VS FRENEMIES is an action-RPG, base-defense and idle-progression game built around your actual Rare Friend.

Choose your home plot, build and upgrade defenses, grow your base between invasions, unlock Friend powers, fight bosses, and move into a new territory every five waves. Your selected Generations NFT remains the playable hero throughout the experience.

**YOUR FRIEND. YOUR LAND. ENDLESS ENEMIES.**

## How does it use Rare Friends?

Your Rare Friend is not a cosmetic skin — it is the game's protagonist.

FriendSDK verifies ownership and lets you select an owned Generations NFT. That Friend becomes the character you control: it explores the world, attacks with Friend powers, uses abilities, builds and defends its home, defeats Frenemies, and progresses with you across territories.

The selected Rare Friend remains the visual and gameplay focus throughout the entire experience. Enemy Frenemies are rendered as distinct corrupted Rare Friends (official family bodies, never clones of your Friend).

**YOUR FRIEND. YOUR LAND. ENDLESS ENEMIES.**

## Playable demo

**Public preview:** https://buildinginweb3.github.io/friends-vs-frenemies/ (GitHub Pages hosting of `games/friends-vs-frenemies/.friendsdk/` built from the commit below)


**Wallet/network requirements.** A browser wallet holding a hardwired Rare Friends Generations NFT (generation 1 or higher) on Robinhood mainnet (chain 4663). The SDK runtime freshly verifies ownership of the selected Friend before play; discovery/artwork alone is not enough. No RF funding and no transaction signatures are needed — the entire preview economy is simulated.

## Source code

[Source code](https://github.com/buildinginweb3/friends-vs-frenemies/tree/f0d570330b51660d36875b97c1aa34a38a1dc6e4) · Final submission commit: `f0d570330b51660d36875b97c1aa34a38a1dc6e4`


Use Node.js 22+ on Linux or Ubuntu/WSL2.

```sh
git clone https://github.com/buildinginweb3/friends-vs-frenemies.git
cd friends-vs-frenemies
git checkout f0d570330b51660d36875b97c1aa34a38a1dc6e4
npm ci
npm run dev
```

Open the printed URL (normally `http://localhost:4173`), connect your wallet and select your Friend. The SDK verifies ownership before play.

## How do you play?

Choose a home plot → build turrets, walls, collectors, frost spires → press DEFEND → preparation briefing (scouted encounter, repairs, launch) → survive the wave → level up (pick 1 of 3) → boss every 5 waves → Rare Trader → next territory → repeat. Your home plot is the first map; after each boss the invasion moves to the next territory (Sun Garden → Copper Court → Ember Mesa → Reed Tides → Sky Terrace → Star Hex → back around), with Base-gated travel bonuses. Build, equipment, bank and rewards all carry across the transition. If the Home Core house falls, the invasion is lost (reduced rewards; the base itself is never destroyed).

**Defeat:** the run ends with a results screen (waves, kills, RF earned/spent); permanent base progression is kept.

**Progression in the Vibeathon preview is session-scoped.** Idle/AFK production can accrue while the current session is active, but the preview does not claim durable offline earnings; reloading the FriendSDK runtime resets session progression.

## Controls

| Input | Action |
| --- | --- |
| WASD / arrows | Move in MANUAL mode (normalized diagonals) |
| Mouse | Aim Friend powers in MANUAL desktop |
| Tap / click | Tap-to-move in MANUAL and at HOME; poke your Friend at home |
| AUTO / MAN chip, AFK button | Auto-pilot toggle (persisted); home AFK idle toggle |
| Space / Q / E | Ability slots 1–3: Friend Blast + up to 2 unlocked powers (R mirrors slot 3) |
| Z / X / C / V | Item belt: first four owned consumables in fixed order |
| 1 / 2 / 3 | Pick a level-up upgrade |

Mobile: touch buttons for abilities/items, tap-to-move, auto-aim in MANUAL touch mode.

Development/debug: H toggles the collision + performance overlay (development only).

## Costs and rewards

**All $RAREFRIENDS activity in the Vibeathon preview is simulated. No real tokens, contracts or NFT rewards are used.**

Simulated RF creates a complete earn-and-spend loop: defeat Frenemies and bosses, develop base production, then decide whether to invest those rewards into your Friend, Trader equipment, consumables, repairs, or the base itself.

- **Start:** 0 RF·sim. Earn from kills (per-enemy RF × map/richness multipliers), wave-clear stipends (3 + 2×wave), boss purses, Collector trickle, and capped idle production (rate scales with Collector/Generator tiers; storage scales with Vault).
- **Spend:** Trader gear (15–340 by rarity/tier), ability modules (60–190), relics (~90+), consumables (Full Heal 25, Emergency Shield 30, Power Tonic 20, Lucky Token 15, Magnet Burst 18, Rare Fury 35), Trader rerolls (5 → 10 → 20), mid-run heal (5 + 5×uses, Med-Station discount), structures (e.g. Turret 40, Wall 35, Collector 45, Frost Spire 70, Ability Altar 60 — higher tiers cost more), repairs (scaled by damage).
- **Probabilities:** boss gear drop 35% + 10% per Loot Luck (+15% wave ≥ 15, capped 90%); Trader rarity odds improve per 5-wave block and with Trader Beacon; battlefield pickups weighted RF 30 / heart 22 / haste 18 / power 18 / ward 12.
- **Salvage:** unequipped gear salvages for 40% of value; duplicate boss drops convert to +25 RF·sim.

## What have you tested?

Actually run in this environment (real headless Chromium via Playwright + SDK mock harness, plus headless engine sims):

- `npm run logic:test` — **59/59 pass**: 25-wave sims, economy calibration (wave-5 bank median ≈ 89), wave-template honesty, boss locomotion per pattern (no sliding), waves 1–6 full-block regression (boss → trader → map 2), ability hotkeys/slots/ranks, item belt incl. purchase mapping, save-v4 migration, idle-cap exploits, encounter ceilings.
- `npm run typecheck` — clean. `npm run build` + `friendsdk check` — valid (build ≈ 619KB).
- `scripts/interaction-test.mjs` — **17/17 checks pass** (home, plot choice, combat, prep, WASD, tap-move, AUTO, kills, level-up, Blast, build inspector, debug) at 960px and 360px.
- Boss/telegraph/map suites, `render-smoke.mjs` (13 draws), `map-audit.mjs` (all 6 maps), `perf-qa.mjs` (step ≈ 1ms, render ≈ 2ms, flat across maps), DOM overflow audit at 960/390/360px — all clean.
- Screenshots captured and inspected: home, prep briefing, combat, level-up, boss in motion, Trader, item belt, mobile view.
- Long-horizon scripted runs (`visual-qa`, `map2-qa`, full 25-wave browser grinds) are timing-flaky in constrained CI-like boxes (browser OOM/timeouts on 10+ minute runs); the deterministic suites above carry the regression coverage.

## Known limitations

- Session-scoped progression in the preview (sandbox has no storage); reload restarts. Idle/AFK accrues in-session only — no durable offline earnings.
- Live canonical Frenemy bodies need real RPC; automated mock runs render deterministic per-family fallback bodies (still distinct per archetype).
- Real-wallet playtest (ownership gate + live sprite reads) still requires user verification — mocks cannot prove it.
- Browser QA used headless Chromium with locally extracted system libs (no root needed).
- Balance is tuned for starter builds; late-game (25+) difficulty is untested with maxed loadouts.

## Credits

- FriendSDK v0.1.2 + Rare Friends Isometric World Assets + canonical Generations sprites + sound kit (all under SDK permissions; see `node_modules/@rarefriends/friendsdk/NOTICE.md` and `assets/provenance.json`).
- Custom Frenemy variants, structures, UI pixel system, and all game code: original to this project.
- React, esbuild, Playwright (retained licenses in installed packages).
- Official production publication through Rare Friends requires a separate review.
