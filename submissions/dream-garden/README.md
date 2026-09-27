# Dream Garden

- **Builder:** [harelcornel](https://github.com/harelcornel)
- **Contact:** [@Syth0x on X](https://x.com/Syth0x)
- **Category:** Character Spotlight
- **Public playable preview:** https://dream-garden-rarefriends-harel.harelcornel.chatgpt.site
- **Source code:** https://github.com/harelcornel/dream-garden
- **Stack:** React, TypeScript, FriendSDK v0.1.2

## What it is

Dream Garden puts your selected Rare Friend in a pixel-art moonlit garden where simulated RF buys mystery seeds that bloom into six collectible flower varieties. Your own Friend appears with its original canonical sprite; the SDK handles wallet connection, verified Friend selection, purchase confirmations, balances, inventory and settlement.

## Try it

Open the public preview in a desktop wallet browser or a mobile wallet's built-in browser. You need a wallet holding a hardwired Rare Friends Generations NFT, generation 1 or higher, on Robinhood mainnet (chain 4663), including in preview mode. The SDK does not provide WalletConnect. No RF funding, transaction or signature is needed: all costs and rewards are simulated.

Connect your wallet and select your Friend. Click/tap a plot, buy a dream seed, plant it, water twice, then wait five active seconds and reveal its flower. The flower journal shows discoveries and lets you redeem flowers for simulated RF. "Keep & replant" frees the plot and retains the flower in your inventory.

Mouse, touch, Tab and Enter/Space are supported. Escape closes menus. Sound starts muted; mute and reduced-motion controls are available. Growth pauses during menus, confirmations and hidden tabs. The outer game frame is at most 960 x 640; narrow screens use internal scrolling so controls stay readable.

## Costs, odds and rewards

You start with 20 simulated RF. Each dream seed costs 1 RF and is consumed once when planted. Watering is free. Every plot and seed uses the same fixed odds; timing and plot choice do not improve outcomes.

| Flower | Chance | Redemption | Net result after a 1 RF seed |
| --- | ---: | ---: | ---: |
| Moon Daisy | 35% | 0.25 RF | -0.75 RF |
| Peach Bell | 25% | 0.5 RF | -0.5 RF |
| Stardrop | 20% | 1 RF | 0 RF |
| Velvet Orchid | 12% | 2 RF | +1 RF |
| Sunkeeper | 6% | 3 RF | +2 RF |
| Opal Lotus | 2% | 5 RF | +4 RF |

Expected redemption is 0.9325 RF per seed, an expected player loss of 0.0675 RF (6.75%). This is a simulated spending-and-reward loop, not an on-chain burn. Individual results vary. Outcomes come from the SDK settlement API.

Each purchased seed reserves the maximum 5 RF simulated reward. Kept flowers retain their fixed redemption value without expiry during the session. Redeeming consumes one inventory item and credits RF; the discovery stays in the journal. A redeemed flower may remain as a decorative plot display, but cannot be redeemed twice. Seed sales pause if simulated prize backing is insufficient.

## Run from source

With Node.js 22+:

```sh
git clone https://github.com/harelcornel/dream-garden.git
cd dream-garden
npm ci
npm run dev
```

Open http://localhost:4173 in a compatible wallet browser. The vendor folder includes the FriendSDK v0.1.2 package archive for reproducible installation.

```sh
npm run typecheck
npm run check
npx playwright install chromium
npm test
npm run build
npm run test:hosted
```

The hosted build is written to `build/`. Serve the complete directory over HTTP(S). The hosted adapter embeds the game document and artwork into an opaque sandbox via an object URL, avoiding private-host cookie issues. The child retains `sandbox="allow-scripts"` and a SHA-256-pinned script policy; it cannot access its parent document. `npm run build:sdk` also produces the standard SDK bundle in `dist/`.

## Checks and limitations

TypeScript, SDK definition/import validation, production build, automated desktop and 390/360px browser gameplay checks passed. Tests cover purchase and planting cancellation, watering, paused growth, settlement, discovery, redemption, replanting, reduced motion, frame bounds and overflow. Production-bundle tests at desktop and phone widths cover touch activation, fresh ownership checks, opaque sandbox isolation, script CSP, and authenticated-host asset loading.

Browser tests use the SDK's isolated test-wallet and artwork fixtures. Fixture wallets are not included in the playable build. A positive real-wallet playthrough and a physical-phone test by the assistant remain outstanding; real RPC availability and specific wallet apps are external dependencies.

Progress and balances reset on reload; changing Friends resets the garden layout. No persistent saves, multiplayer, live token spending, actual token burns, real payouts, NFT minting, or on-chain transactions are implemented. Real RF economics would need separate contracts, funding and review.

## Credits

Canonical Rare Friends character artwork and sounds: [FriendSDK v0.1.2](https://github.com/spokesz/friendsdk). SDK source is Apache-2.0; its asset permissions and provenance are retained in the vendored package. See [SDK-NOTICE.md](https://github.com/harelcornel/dream-garden/blob/main/SDK-NOTICE.md).

Garden scenery and flower atlas: generated for this project with OpenAI's built-in image-generation tool. Original prompts and attribution are in [ART-CREDITS.md](https://github.com/harelcornel/dream-garden/blob/main/ART-CREDITS.md). UI glyphs are original SVG controls. AI-assisted implementation with Codex.

