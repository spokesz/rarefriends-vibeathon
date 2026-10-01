# RHRF Bullseye

- **Project name:** RHRF Bullseye
- **Builder:** perpetuumcontinuum
- **Contact:** X @mdesoc_eth (https://x.com/mdesoc_eth) · github.com/perpetuumcontinuum
- **Category:** Character Spotlight
- **Stack:** React, TypeScript, FriendSDK, SVG renderer
- **FriendSDK version:** v0.1.4
- **License:** MIT
- **Source repository:** https://github.com/perpetuumcontinuum/RHRF_Bullseye
- **Playable preview:** https://perpetuumcontinuum.github.io/RHRF_Bullseye/

**One sentence:** RHRF Bullseye is a cyber archery minigame where the selected Rare Friend is the shooter defending the planet, building streaks and managing inventory; the Friend's original sprite art is preserved as the player character, and RF is only a label for simulated score points, not a convertible balance.

## RF disclaimer

RF in this game is a simulated score label. It is not a token balance, not a wallet balance, not redeemable, not transferable and not connected to live $RAREFRIENDS activity in this preview. The MIT license allows other developers to adapt the project for future token or economy integrations if they choose.

## Wallet and network

This is a FriendSDK game, so the preview runtime requires a browser wallet connected to Robinhood mainnet (chain 4663) holding an owned hardwired Rare Friends Generations NFT, generation 1 or higher. This applies to the preview link as well as the hosted game, per the event rules. Without a qualifying wallet the runtime shows the Friend-selection gate and no gameplay. The preview keeps purchases and rewards simulated; no live RF transfer, contract write, signature or gas payment is required.

## How to play

The selected Rare Friend becomes the archer. The player shoots a moving target, dodges ghosts, deflects asteroids, earns simulated RF, manages inventory and can generate a screenshot plus share text for X. Game UI stays inside the sandboxed FriendSDK container. Reference layout is 960 x 640 and the scene scales to fit smaller viewports.

### Controls

- SHOT button or key 2 — fire the arrow
- JUMP button or key 3 — dodge ghosts
- TOWER LASER button or key 1 — destroy asteroids
- PAUSE button or key 4 or Space — freeze gameplay while shop, mute and screenshot controls remain available
- MUTE button or key 5 or M — toggle audio
- SHOP button or key 6 or S — buy, equip and sell items
- PROFILE button or key 7 or P — inspect equipment, stats and cyber style
- GUIDE button or key 8 or G — open rules and controls
- X SHARE — generate scene snapshot and share text
- Esc — close overlays

Touch controls are available through on-screen buttons. Keyboard shortcuts are listed in the in-game Guide.

### Target scoring

- Bullseye: 10 points, animated cyber shimmer
- Epic zone: 9 to 7 points, violet ring
- Rare zone: 6 to 4 points, lime ring
- Common zone: 3 to 1 points, cyan ring
- Miss: 0 points and streak reset

### Streaks

- Cyber streak: consecutive bullseye hits
- Ghost streak: consecutive ghosts dodged without being hit
- Asteroid streak: consecutive asteroids destroyed

Streaks below 3 are shown as "--" in the leaderboard.

### Passive income

- A satellite event awards a rare energy consumable.
- Energy inventory is capped at 100.
- Passive accrual continues while gameplay is paused.
- The player can sell energy up to the cap.

### Cyber Style

- Requires Legendary Bow, Legendary Outfit and Legendary Amulet in inventory.
- Changes character presentation and applies a x4 multiplier.
- Grants reduced screen shake during asteroid impacts.
- Blocks equipping non-consumable items while active.

## Simulated economy

All values below are simulated score points. They are not token balances and have no financial value. Prices are sourced from engine/catalog.ts.

    | Item              | Category   | Rarity    | Price |
    |-------------------|------------|-----------|-------|
    | RARE BOW          | bow        | rare      | 40 RF |
    | EPIC BOW          | bow        | epic      | 90 RF |
    | LEGENDARY BOW     | bow        | legendary | 180 RF |
    | RARE OUTFIT       | hat        | rare      | 35 RF |
    | EPIC OUTFIT       | hat        | epic      | 80 RF |
    | LEGENDARY OUTFIT  | hat        | legendary | 160 RF |
    | RARE AMULET       | amulet     | rare      | 45 RF |
    | EPIC AMULET       | amulet     | epic      | 100 RF |
    | LEGENDARY AMULET  | amulet     | legendary | 200 RF |
    | RARE ARROWS       | consumable | rare      | 25 RF |
    | EPIC ARROWS       | consumable | epic      | 60 RF |
    | LEGENDARY ARROWS  | consumable | legendary | 120 RF |
    | RARE ENERGY       | consumable | rare      | 30 RF |
    | EPIC ENERGY       | consumable | epic      | 80 RF |
    | LEGENDARY ENERGY  | consumable | legendary | 160 RF |
    | RARE ARMOR        | consumable | rare      | 40 RF |
    | EPIC ARMOR        | consumable | epic      | 85 RF |
    | LEGENDARY ARMOR   | consumable | legendary | 160 RF |

Consumables are split into arrows, armor and energy. Arrows affect shot rarity and color, armor affects ghost-hit protection, and energy affects tower laser power. Sell rates: quick sale 50% of price, offer 60% of price.

## SDK chance-game definition

The bundled game.json provides the validator-compatible chance-game definition. Core gameplay is skill-based and all RF outcomes are simulated. The consumable is Lucky Arrow at 1 RF. Expected simulated reward 1 RF, maximum simulated prize 10 RF. RF uses bigint base units where 1 RF equals 10^18 base units.

    | Outcome          | Chance   | Reward RF |
    |------------------|----------|-----------|
    | Miss             | 4000 bps | 0 RF      |
    | Hit              | 4000 bps | 0.5 RF    |
    | Bullseye         | 1500 bps | 2 RF      |
    | Robin's Blessing | 500 bps  | 10 RF     |

This table is the validator spec, not the shipped runtime economy. See Known issues.

## Run and validate

Dependencies install from the v0.1.4 GitHub release tarball declared in package.json, so npm install needs outbound HTTPS access to github.com.

    npm install
    npx friendsdk dev ./games/rhrf-bullseye
    npx friendsdk build ./games/rhrf-bullseye
    npx friendsdk check ./games/rhrf-bullseye
    npx friendsdk test ./games/rhrf-bullseye --width 360 --screenshot ./artifacts/mobile-360.png
    npx friendsdk test ./games/rhrf-bullseye --width 960 --screenshot ./artifacts/desktop-960.png

## Checks

- npm run typecheck: passed
- npx friendsdk build: passed
- npx friendsdk check: valid
- Browser test at 360px: passed
- Browser test at 960px: passed
- English-only game UI
- No emoji in gameplay code or UI
- Touch controls available
- Keyboard controls available
- Mute control available
- Pause control available
- Loading and error states available
- Reduced motion supported
- Ownership gate intact: renders "Choose a Friend to play" until the SDK resolves a friendId
- Test cheat hook is hostname-gated to localhost and never registered on the preview host

## Known issues

- Runtime economy is not the chance-game spec. game.json, engine/balance.ts and engine/state.ts describe a future real-RF economy (1 RF per shot, shot regeneration, shot packs, chanceBps draws). None of it is wired into the runtime: shots are free and uncapped, and rewards are baseScore times rarity multipliers. This is intentional for the MVP per the event rules, but it means the two economies in the repo do not match until the SDK game runtime is connected.
- Score and leaderboard are client-side. They persist in localStorage and are trivially editable in DevTools. They are not authoritative and carry no financial weight.
- The FriendSDK sandbox does not provide persistent localStorage or IndexedDB access, so local stats are session-only in the hosted preview.
- Native sharing, downloads and popups may be blocked inside sandboxed iframes. The share button degrades safely: native share, then download, then X intent.
- Cross-origin stylesheet access may be blocked during screenshot serialization. The screenshot logic falls back from JPEG to SVG.
- The runtime toolbar can overlap the lowest scene pixels on very small viewports.
- Server-backed multiplayer leaderboard is not implemented yet. The current leaderboard is local-only.
- Hook ordering caveat: the ownership early-return precedes useMemo(createFriendSoundKit). It is safe in the normal SDK flow because friendId does not flip from null to a value after mount, but it would violate the rules of hooks if that changed.
- Exact economy values are sourced from engine/catalog.ts and game.json; update this README if those files change.

## Credits

- FriendSDK runtime, wallet gate, Friend selection, sprites and sound kit: FriendSDK project, Apache-2.0 source, artwork terms per NOTICE.md.
- Game code and original design: MIT License.
- No third-party gameplay assets are required for the core experience; all character art is read from the Friend sprite reader at runtime.
