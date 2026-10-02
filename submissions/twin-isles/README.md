# Twin Isles (ふたご島)

- **Builder:** akt papa — X: @aktpapa · GitHub: @akt-papa
- **Category:** Character Spotlight
- **One sentence:** A Japanese-flavoured spot-the-difference game where you and your own verified Rare Friend compare a real island with an evil Genesis's fake copy, using the official creator-kit Friends, islands and Genesis faces, with RF-bought keys that open treasure chests earned by clearing stages.

## Links

- **Playable preview:** https://akt-papa.github.io/friendsdk/
  Requires a browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired Rare Friends **Generations NFT (generation ≥ 1)**. No RF, signature or transaction is needed; the economy is simulated.
- **Source:** https://github.com/akt-papa/friendsdk/tree/main/games/futago-jima
- **SDK:** FriendSDK **v0.1.2** (CLI game directory: `index.tsx`, `game.json`, `host.css`, assets)

## Run locally

```sh
git clone https://github.com/akt-papa/friendsdk.git
cd friendsdk
npm ci
npm run build
npm run dev:game -- games/futago-jima
```

Open `http://localhost:4173`, connect the wallet and select an eligible Friend.
Static build: `npx friendsdk build games/futago-jima` → `games/futago-jima/.friendsdk/`.
The included workflow `.github/workflows/twin-isles-pages.yml` publishes that folder to GitHub Pages.

## How it plays

- An evil Genesis forged a fake of every island. Tap each difference between the **REAL** and **FAKE** pictures before the timer ends; the fake then shatters and the Genesis flees.
- 30 stages on 6 creator-kit islands (Garden, Workshop, Crystal Cavern, Rooftop, Tidal Isles, Orbital Outpost) plus a seeded **Daily Puzzle** shared by all players, with a copyable result.
- Differences: missing/extra item, colour, a different Friend species, facing, headwear, size, mirroring, **animation timing** (frozen, double-speed or out-of-step Friends and birds) and **subtle terrain edits** to the creator-kit island art. 3–7 per stage on a gentle difficulty ramp (island 1 uses only obvious kinds), balanced across kinds (max one timing and one terrain difference per stage). Every generated difference is verified pixel-by-pixel at 12 moments before the stage starts.
- Wrong taps cost 5 s (spam lock after 3 quick misses). Stars depend on time left and help used.
- **Juicy feedback:** click/tap bursts, a 5-4-3-2-1 countdown with sound, a flash and confetti on START, a typed Genesis parting line and a chest-opening animation. The system reduce-motion preference is respected everywhere.
- **Your Friend is the co-star:** the selected, verified NFT is drawn from the SDK's canonical sprite reader, is named on the title screen, stands (labelled with its token number) on every island, and reacts in the HUD card.

**Controls:** tap/click to mark · press-and-hold or drag to zoom both pictures · arrows/WASD aim, Enter/Space tap, hold Z zoom · H hint · T +15 s · P/Esc pause (pictures hidden) · M mute. Title screen: language (JA/EN), sound. The game pauses when the runtime menu opens.

## Economy (simulated, SDK chance-game client)

| Rule | Value |
| --- | --- |
| Treasure Key | 1 RF |
| Pebble / Golden Daruma / Lucky Cat | 60 % 0.5 RF / 30 % 1 RF / 10 % 3 RF |
| Expected reward | 0.9 RF per key (0.1 RF sink) |
| Chest access | One chest per first-time stage clear and per first daily clear; opening uses one key (`buy` → `play` → `settle`) with a chest-opening animation (skippable, reduced-motion aware); treasures can be kept or redeemed (`redeem`) after an in-game confirmation screen, with a gold-coin burst |
| Backing | Each key reserves 3 RF; kept treasures reserve their fixed value |

Skill earns chests but never changes odds. **Genesis shards** are an in-session, non-redeemable soft currency earned from clears and spent on hints (2), +15 s (3) and continues (3). SDK v0.1.2 has no additional-currency/upgrade action, so shards are local; the intended RF integration is an RF-priced shard pack (RF sink). All balances and outcomes are labelled as simulated.

## Tests

| Check | Result |
| --- | --- |
| `npx friendsdk check games/futago-jima` | valid · expected reward 0.9 RF · max 3 RF |
| `npm run check:games` | all games valid |
| `npx friendsdk test games/futago-jima` (960 px) | PASS |
| `npx friendsdk test games/futago-jima --width 360` | PASS |
| TypeScript (`tsc --noEmit` on the game) | 0 errors |
| Scripted browser run (mock wallet): start → clear stage 1-1 by tapping → buy key (in-frame confirmation) → open chest → reveal | PASS; RF 20 → 19, key consumed, no browser errors |
| Puzzle generation: 30 stages + 8 daily seeds | all built and pixel-verified on the first attempt |
| Full browser suite (mock wallet, 960/1280 px and 390 px): countdown, all 30 stages, back from intro, close result, daily, chest | 68–69 checks, 0 failures |
| Runtime menu opens → `paused` | timer stops, pictures hidden |
| Real wallet on Robinhood mainnet (live preview at akt-papa.github.io/friendsdk, Chrome desktop, 2026-09-25) | PASS: wallet connected, owned Friend selected, stage 1-1 cleared |

Browsers checked: Chromium (desktop 960/1280 px, phone 360/390 px portrait).

## Known issues

- The sandbox has no storage: stars, unlocks, shards and chests reset on reload, like the SDK's simulated ledgers.
- If canonical Friend artwork cannot be read, the game stays playable and shows only the token number.
- Safari/Firefox not yet tested by the builder.
