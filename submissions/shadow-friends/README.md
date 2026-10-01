# Shadow Friends (かげぼうし)

- **Builder:** akt papa — X: @aktpapa · GitHub: @akt-papa
- **Category:** Character Spotlight
- **One sentence:** A 3D night shadow-theatre puzzle where you turn floating pieces in lamplight until their shadow on a shoji screen matches a Rare Friends silhouette, after which the pieces reassemble into your own verified Friend, and the twelfth and final shadow is your Friend itself.

## Links

- **Playable preview:** https://akt-papa.github.io/friendsdk/kageboshi/
  Requires a browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired Rare Friends **Generations NFT (generation ≥ 1)**. No RF, signature or transaction is needed; the economy is simulated. WebGL is required.
- **Trailer (46 s, English and Japanese captions, original music):** attached at the end of the pull request description.
- **Source:** https://github.com/akt-papa/friendsdk/tree/main/games/kageboshi
- **SDK:** FriendSDK **v0.1.2** (CLI game directory: `index.tsx`, `game.json`, `host.css`, assets; three.js r170 engine prebuilt from `src/`)

## Run locally

```sh
git clone https://github.com/akt-papa/friendsdk.git
cd friendsdk
npm ci
npm run build
npm run dev:game -- games/kageboshi
```

Open `http://localhost:4173`, connect the wallet and select an eligible Friend.
Static build: `npx friendsdk build games/kageboshi` → `games/kageboshi/.friendsdk/`.
The workflow `.github/workflows/twin-isles-pages.yml` publishes it to GitHub Pages under `/kageboshi/`, next to Twin Isles.
To rebuild the engine from `src/`: `cd games/kageboshi && npm i --no-save three@0.170.0 esbuild && node build-engine.mjs`.

## How it plays

- An andon lamp shines through pieces floating in front of a shoji screen. Turn them until the shadow matches the silhouette card; a "Shadow match" meter shows how close you are, and a weak snap settles the last few degrees.
- **Your Friend is the star:** after every clear the pieces fly apart and reassemble as your selected, verified Friend (read from the SDK's canonical sprite reader), which steps out of the shadow. Stages 1–11 use the 16 official creator-kit silhouettes; **stage 12's goal is your own Friend's silhouette.**
- 12 stages on a gentle ramp: sideways only (1), sideways + tilt (2–9), plus twist (10–12). Every starting angle is checked by a solver before play, and from stage 2 on sideways turning alone is never enough.
- A **free-turning** toggle (click the turning-mode chip) lets you drag in any direction; a **reset** button (or R) returns to the starting angle. A short control guide appears next to the buttons whenever a new move is introduced.
- **Presentation:** real-time shadows on washi paper, a flickering andon lamp with four free cosmetic colors (andon, moonlight, crimson, firefly), soft lights drifting behind the screen that lean very slightly toward the helpful direction while you turn, light motes that occasionally cross the stage like one calligraphy brush stroke, and a calligraphy title on a hanging scroll. Original koto and shakuhachi music in the miyako-bushi scale, synthesised at runtime. Reduced motion is respected.

**Controls:** drag/swipe left-right (sideways) · up-down (tilt, from stage 2) · hold ⟲ ⟳, Q/E or two-finger rotate (twist, from stage 10) · arrows/WASD · ↺ or R reset · click the mode chip for free turning · Enter to start. Language (JA/EN) and sound toggles. The game pauses while the runtime menu is open or the tab is hidden.

## Economy (simulated, SDK chance-game client)

The hint is an **omikuji**, a Japanese shrine fortune slip.

| Rule | Value |
| --- | --- |
| Omikuji | 1 RF per draw (`client.buy` → `play` → `settle`) |
| Great Luck (大吉) 10 % | the slip lists the next 3 moves; the 1 RF is refunded (`client.redeem`) |
| Good Luck (中吉) 30 % | the next 2 moves |
| Small Luck (小吉) 45 % | the next move |
| Bad Luck (凶) 15 % | the pieces turn back to the starting angle |
| Expected reward | 0.1 RF per draw (0.9 RF sink) |
| Backing | Each purchased or pending omikuji reserves the 1 RF refund |

An in-game confirmation (price, RF before → after, odds) comes first, then the runtime confirmations. Drawing plays a short shrine ritual: the wooden box rattles and turns over, a numbered stick slides out and the slip unfolds with the result and the moves ("1. Turn right about a quarter turn 2. Tilt up a little"). The moves are computed from the current angle using the moves the stage allows. After the slip closes, the oracle stays on screen for 30 seconds. The clock pauses during the ritual; a draw costs the third star; skill never changes the odds. All balances are labelled "(sim)" in preview.

## Tests

| Check | Result |
| --- | --- |
| `npx friendsdk check games/kageboshi` | valid · expected reward 0.9 RF · max 3 RF |
| `npm run check:games` | all games valid |
| `npx friendsdk test games/kageboshi` (960 px) | PASS |
| `npx friendsdk test games/kageboshi --width 360` | PASS |
| TypeScript (`tsc` on the game with the examples config) | 0 errors |
| Scripted browser run (mock wallet, 1280 px): start → Omikuji (buy + draw, two in-frame confirmations) → ritual → slip → oracle shown 30 s; clear stage 1 (Friend reassembles) → stage 12 goal is the Friend | PASS; RF 20 → 19, no browser errors |
| Solver check of all 12 starting angles | all solvable; stages 2+ need tilt, 10+ need twist |
| Runtime menu opens → `paused` | input and timer stop, resume on close |
| Static build served from a sub-path (`/kageboshi/`) | wallet gate shown, no errors |
| Real wallet on Robinhood mainnet (live preview at akt-papa.github.io/friendsdk/kageboshi/, Chrome desktop, 2026-09-26) | PASS: wallet connected, owned Friend #9235 selected, stage 1 cleared (3 stars) and the Friend stepped out of the shadow; omikuji drawn after the omikuji update (2026-09-27) |

Browsers checked: Chromium (desktop 960/1280 px, phone 360/390 px portrait).

## Known issues

- The sandbox has no storage: stars reset on reload, like the SDK's simulated ledgers.
- If canonical Friend artwork cannot be read, the game stays playable; the pieces then do not reassemble and stage 12 uses an official silhouette.
- Safari/Firefox not yet tested by the builder.
