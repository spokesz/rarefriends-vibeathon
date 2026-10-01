# Friend Crossing

Hop your own Rare Friends Generations NFT across an endless, changing world of roads, rivers and railways while staying ahead of the camera.

**Builder / contact:** [@zongaaajj333](https://github.com/zongaaajj333) · [X / Twitter: @papablad](https://x.com/papablad) · contact through X or the submission PR.

**Category:** Character Spotlight

**Stack:** FriendSDK v0.1.2, React, TypeScript and Canvas 2D.

**Source code:** [Public source snapshot](https://github.com/zongaaajj333/friend-crossing/tree/6808d0b442a8bcc7f9882559f4163268f98b6232) · [Game source and instructions](https://github.com/zongaaajj333/friend-crossing/blob/6808d0b442a8bcc7f9882559f4163268f98b6232/games/friend-crossing/README.md).

**Public playable preview:** [Play Friend Crossing](https://rare-friend-crossing.slacherbh.chatgpt.site).

## What we built

A free arcade survival game starring the selected NFT's original character artwork. Hops animate over 200 ms, with one buffered next move. Traffic accelerates gradually. Every 30 rows, the landscape changes between Sunny Meadow, Downtown, Pinewood and Frostlands, with different scenery and obstacle patterns. Rivers require riding logs; trains have a two-second warning. The advancing camera prevents unlimited waiting. Safe banks allow brief waits between crossings.

The canonical Friend sprite is read through FriendSDK. Its trusted runtime handles wallet connection, Friend selection, fresh ownership/generation verification and the sandbox. The game does not implement a second wallet or identity flow.

## Try it

Use an injected EVM wallet holding a hardwired Rare Friends Generations NFT, generation 1 or higher, on **Robinhood mainnet, chain ID 4663**. Connect, select your Friend and press **Let's hop**. On phones, use the wallet's browser. WalletConnect is not included in this SDK. No transaction signature, RF or gas funding is needed.

- **Desktop:** arrow keys or WASD; P or Escape pauses.
- **Phone:** swipe, use the directional buttons, or tap the field to hop forward.
- Avoid cars and trains, cross rivers on logs, and stay ahead of the lower camera edge.
- Earn one point per new forward row reached safely. Repeated rows give no points. Retry for free.
- SDK menus and hidden tabs freeze gameplay; resuming after leaving the tab is explicit.
- Reduced motion follows system preferences and has a menu toggle. There is no audio.

The desktop game uses the SDK's 960 × 640 reference frame and adapts to portrait on phones. Game controls stay inside the sandbox.

## Run from source

From the source repository root with Node.js 22.18+:

```sh
git clone https://github.com/zongaaajj333/friend-crossing.git
cd friend-crossing
git checkout 6808d0b442a8bcc7f9882559f4163268f98b6232
npm ci
npm run build
node scripts/dev-game.mjs dev games/friend-crossing --host 0.0.0.0 --port 4173
```

Open `http://localhost:4173` in a browser with an injected wallet. The same wallet, network and NFT requirements apply locally. For a static HTTPS preview:

```sh
node scripts/build-crossing.mjs
```

Host the contents of `.output/public/`. The custom build packages the sandbox document with its script and styles so opaque iframe asset requests do not depend on private-host cookies. It preserves the SDK ownership gate, `allow-scripts` sandbox and restricted content security policy.

## Costs and rewards

Runs cost **0 RF**. No purchases, consumables, token rewards, redemption promises or on-chain game actions. Distance and best score are nonredeemable session scores. No Token Activity metrics are claimed.

The runtime requires a chance-game definition, so `game.json` contains an unused schema reference with a 1 RF price and 100% 1 RF outcome. The game never calls buy, play, settle or redeem; these fields are not actual gameplay costs or rewards. The runtime stays in simulated preview mode.

## Checks

Source revision: [`6808d0b`](https://github.com/zongaaajj333/friend-crossing/commit/6808d0b442a8bcc7f9882559f4163268f98b6232). The published source was installed and built afresh; all eight generated HTML/JavaScript/CSS files matched the approved hosted build byte for byte. These checks passed:

- TypeScript check, static build and FriendSDK game validation.
- Engine regressions for animated hops, buffered input, pause, log carry, collisions during movement, speed limits, biome transitions, safe banks, idle death and train warnings/collisions.
- Automated Chromium gameplay at 960 and 390 px, covering movement, score, pause/resume, game over, retry, the idle warning and viewport bounds.
- SDK runtime checks at 1100 and 360 px: missing wallet, wrong network, unowned/generation-zero NFTs, failed RPC and account changes.
- Production-bundle startup under an HttpOnly SameSite=Lax cookie, reproducing private-host restrictions.

After installation and SDK build, reproduce with:

```sh
node node_modules/typescript/bin/tsc -p games/friend-crossing/tsconfig.json
node scripts/check-crossing-engine.mjs
node scripts/build-crossing.mjs
node scripts/dev-game.mjs check games/friend-crossing
npx playwright install chromium
node scripts/check-crossing.mjs
node scripts/check-crossing-world.mjs
node scripts/check-private-frame.mjs
node scripts/check-runtime-browser.mjs
```

Automated browser checks use test-only wallet/RPC fixtures; they do not independently verify a live holder session. The builder tested the preview and approved its feel. The normal Playwright browser download failed in the build environment, so recorded checks used a temporary serverless Chromium executable. No mock identity or browser workaround package ships in the game.

## Known limitations

Best score resets on reload or Friend change. No account save or global leaderboard. Random courses are not certified for competitive fairness. Real play depends on an injected wallet, network RPC and an eligible NFT. No WalletConnect, live economy or official Rare Friends production integration is implemented.

## Credits

[FriendSDK](https://github.com/spokesz/friendsdk) v0.1.2 is retained under Apache-2.0. Original Rare Friends character sprites are read through the SDK and remain unchanged; see [LICENSE](https://github.com/zongaaajj333/friend-crossing/blob/6808d0b442a8bcc7f9882559f4163268f98b6232/LICENSE) and [NOTICE.md](https://github.com/zongaaajj333/friend-crossing/blob/6808d0b442a8bcc7f9882559f4163268f98b6232/NOTICE.md) for attribution and artwork terms. The procedural world, renderer and crossing mechanics were created for this project with AI coding assistance. No Crossy Road code, artwork or branding is included.
