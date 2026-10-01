# Overdrive

**Project:** Overdrive
**Builder:** Rt ([@nothing010101](https://github.com/nothing010101))
**Category:** Character Spotlight · Token Activity · Economy Potential
**SDK:** FriendSDK **v0.1.4** (SDK game)
**Source:** https://github.com/nothing010101/overdrive
**Playable preview:** https://nothing010101.github.io/overdrive/

## One sentence

Overdrive turns your selected Generations NFT into the fighter in a 75-second
neon arena survival run, spends a 1 RF Run Ticket to crack a post-run cache of
fixed RF value, and lets you spend that same simulated RF in an Armory of weapons
and systems — so the Friend is the character *and* the game both earns and burns
$RAREFRIENDS.

## How it connects to Rare Friends / $RAREFRIENDS

- **Character Spotlight:** the freshly verified Generations NFT is the on-screen
  fighter. Its canonical walking frames come from the SDK sprite reader, drawn
  with a neon glow; facing follows movement and the walk cycle plays while moving.
  No substitute character is ever drawn once artwork loads.
- **Token Activity:** one Run Ticket costs **1 RF** (simulated) and is consumed
  when the post-run cache is opened, and the Armory is a second RF sink. Every
  purchased ticket reserves the maximum prize before purchase.
- **Economy Potential:** the Armory/Pilot layer is the shape a durable
  progression system would take. Persisting it needs save and extra-currency APIs
  the SDK v0.1.4 runtime does not expose, so it is documented as future work
  rather than claimed as implemented.

## Setup and run

```sh
git clone https://github.com/spokesz/friendsdk.git
cd friendsdk
git clone https://github.com/nothing010101/overdrive.git games/overdrive
npm ci
npm run dev:game -- games/overdrive
```

Open the printed URL (normally `http://localhost:4173`).

**Requirements:** Node.js 22+, Git, and a browser wallet on **Robinhood mainnet
(chain 4663)** holding a **hardwired Generations NFT, generation 1 or higher**.
The SDK ownership gate applies to the preview too and is not bypassed.

## Controls and rules

- **Move:** WASD, arrow keys, or press-and-drag on touch and mouse. The Friend
  auto-fires at the nearest foe, so the game is playable one-thumbed.
- **Shards** from defeated foes drift toward you from anywhere, so fights at
  range still pay out. Each level offers three upgrades (keys 1–3 or tap):
  Overclock, Split shot, Slipstream, Magnet, Piercing, Pulse nova, Patch.
- Foes **telegraph** for half a second before hatching, then fade in as drawn
  creatures: a six-legged crawler, a darting darter and an armoured brute.
- **Spawn pattern is seeded from the UTC date**, so everyone faces the same arena
  that day.
- Survive **75 seconds** to clear. Being downed early still ends the run and
  still opens a cache.
- Score = kills, time, level and a clear bonus, ranked **S / A / B / C**. Score
  and rank are **cosmetic only** — they tint the reveal and never change odds.
- **Sound** starts on, with a mute toggle on the arena HUD and in Settings.

## Weapons and systems (Armory)

| Weapon | Cost | Behaviour |
| --- | --- | --- |
| Blaster | free | Balanced single shot |
| Scatter | 4 RF | Three pellets in a wide arc |
| Lance | 5 RF | Fast beam that pierces two foes |
| Orbiter | 7 RF | Twin drones circle you and burn on contact |

| System | Cost | Effect per level | Max |
| --- | --- | --- | --- |
| Hull plating | 2 RF | +25 max HP | 4 |
| Thruster | 2 RF | +8% move speed | 4 |
| Magnet coil | 2 RF | +35 pickup range | 4 |
| Power core | 3 RF | +12% fire rate | 4 |

**Weapons you buy stay in your rack.** Once paid for, a weapon is yours for the
session and switching back to it is free — buying a second weapon never destroys
the first. **One Run Ticket is always held back**, so the Armory can never spend
the last RF you need to play again.

**Everything you buy is drawn on the Friend**, so the loadout is visible in the
arena: hull plating adds a gold-rimmed armoured chassis that thickens per level,
thrusters add nozzles below with live exhaust, the magnet coil draws its real
pickup radius as a dashed ring, the power core is a pulsing chest emitter, and
the equipped weapon sits on a shoulder turret with a muzzle flash per volley.

The **Pilot profile** shows the session record: runs flown, best score and rank,
total kills, caches cracked, weapons owned, RF redeemed and RF spent.

| Cache | Chance | Value |
| --- | --- | --- |
| Scrap cache | 55% | 0.5 RF |
| Copper cache | 30% | 1 RF |
| Silicon cache | 13% | 2 RF |
| Quantum cache | 2% | 3 RF |

**Consumable:** Run Ticket, price **1 RF**, spent on opening the cache.
**Expected reward:** 0.895 RF per ticket. **Maximum prize:** 3 RF.
Kept caches retain their RF backing with no redemption expiry. All balances,
purchases and rewards are **simulated** and labeled `Preview · … RF` in the UI.

## Checks

Run from the FriendSDK checkout with this game at `games/overdrive`:

```sh
npm run build
npx friendsdk check games/overdrive
npx friendsdk test games/overdrive --screenshot ./artifacts/game.png
npx friendsdk test games/overdrive --width 360 --screenshot ./artifacts/game-360.png
```

Results on SDK v0.1.4:

- `friendsdk check` — valid; expected reward `895000000000000000`, maximum
  `3000000000000000000` base units.
- `tsc` type-check — clean.
- `friendsdk test` at 960px and 360px — PASS, no browser errors.
- Full economy loop driven in the harness: buy ticket → run → open cache →
  reveal → keep → Vault → redeem, with level-ups resolved mid-run.
- Armory, Pilot profile, level-up overlay, Odds, Vault and Settings exercised;
  a weapon purchase was confirmed to move the balance 19 RF → 15 RF.
- Audio verified in the harness: the kit starts unmuted, an `AudioContext`
  reaches `running` on the first gesture, and audio sources are counted starting
  during live play (13 in one short run) — not just on menu actions. Shots,
  kills, damage, level-ups, cache tiers, low-HP and the final countdown all cue.
- Armory ownership verified: buying Orbiter (7 RF) then Scatter (4 RF) leaves
  both owned and re-equipping Orbiter costs nothing.
- The ticket reserve verified: the Armory blocks a purchase rather than letting
  the balance drop below the 1 RF a Run Ticket costs.

## Known issues

- **Real-wallet playtest is partial.** An earlier revision was played on Robinhood
  mainnet with a hardwired Generations NFT with no errors reported. This revision
  changed the renderer and audio path and added the Armory, so it has not had its
  own real-wallet pass yet.
- **Session-only progress.** No `localStorage`/IndexedDB and no save API in the
  bridge, so the Pilot profile and Armory upgrades reset on reload.
- **The Armory is a game-local RF sink**, not an SDK ledger action, so the
  runtime's own balance readout does not reflect it.
- **Purchases do not survive a reload** — owned weapons and systems live in React
  state only, because the sandbox exposes no storage.
- **Small viewports are tight.** The world is a fixed 960 × 640 arena. On phones
  the frame is made taller via `host.css` and the canvas letterboxes to 3:2, so
  menus stay usable, but the arena stays small. The HUD keeps clear of the
  runtime toolbar at every tested size.
- **Economy scope.** One consumable and one weighted outcome table only;
  persistent upgrades and extra currencies are not implemented.
- **Odds are fixed at build time** in `game.json` and cannot vary per player.

## Assets

All sprites, foes, particles and sound cues come from FriendSDK v0.1.4
(Apache-2.0; artwork used under the SDK's `NOTICE.md` permissions). No third-party
art, fonts or audio were added.
