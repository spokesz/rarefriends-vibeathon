# Tide & Treasure

- **Builder:** tama2223
- **Contact:** https://github.com/tama2223
- **Category:** Character Spotlight
- **Playable preview:** https://tama2223.github.io/tide-and-treasure/
- **Source repository:** https://github.com/tama2223/tide-and-treasure
- **Stack:** FriendSDK 0.1.2, React 19, TypeScript, Canvas and CSS; English UI.

## Experience

Explore a seaside island as your owned Rare Friend, dig up treasures, and deliver customer orders inside your little shop during a three-minute shift.

The SDK supplies wallet connection, owned Friend selection, fresh ownership verification, canonical character sprites and the sandboxed runtime. The selected Friend is the playable explorer and shopkeeper. Original character pixels and directional walking frames are preserved. Scenery, treasure icons, shop interior and customer artwork are custom code-drawn assets.

## Play requirements

Use a wallet-enabled browser with an account holding a hardwired Rare Friends Generations NFT (generation 1 or higher) on Robinhood mainnet, chain 4663. Connect, switch networks if needed, select your Friend, then choose **Open the shop**. No funding, transaction signatures, token approvals or real payments are required.

## Controls and rules

- Move with WASD/arrow keys, hold the on-screen directional buttons, or tap/click a destination. The character walks around obstacles.
- Follow the customer hint to Shore, Grove or Rocks. Walk near an X and press E or **Dig here**. Each dig costs 3 seconds and yields one treasure, with a digging and reveal animation.
- Return to the shop counter and press E or **Enter shop**. The view switches to the furnished interior. Deliver the requested treasure for 100 score points and a handover animation.
- The bag holds six items. Tap a bag item to discard it.
- **Restock dig spots** in the shop resets all dig spots for 8 seconds and preserves the bag.
- The shift ends after 180 active seconds or when the player closes early. Restart resets the round. Reloading loses progress.
- Help, runtime menus, hidden tabs and action animations pause the round timer. Help includes reduced motion. There is no audio.

Six Shore spots yield shell/glass at 50% each, five Grove spots yield amber at 100%, and five Rocks spots yield fossil/coin at 50% each. Each spot's result is independently chosen once when stocked, with no reroll during animation. Orders cycle through shell, glass, amber, fossil and coin.

## Simulated economy and limitations

All gameplay is local and simulated. Score is not currency and cannot be redeemed for RF. There are no RF costs or rewards, on-chain items, trading, persistent inventory or custom contracts. The SDK requires a valid chance-game definition; game.json supplies an unused reference definition whose price and reward are not gameplay terms. The game only calls client.read(); treasure inventory is transient game state.

Public RPC reads are used for NFT ownership and artwork. RPC availability and a compatible browser wallet are required. No guarantee is made about compromised wallets, browsers, infrastructure or third-party dependencies.

Desktop uses the SDK's 960 x 640 reference frame. Mobile uses the SDK's configurable portrait layout; all content remains inside the sandbox. The SDK documentation allows configurable layouts, while the event README mentions 960 x 640; this difference is disclosed for reviewer confirmation.

## Run from source

Node.js 22+ and pnpm are required. From the source repository root:

~~~sh
pnpm install --frozen-lockfile
pnpm dev
~~~

Open http://localhost:4173 in a wallet-enabled browser. Run pnpm build to produce static files in dist/. The source repository includes the complete built preview in its root for GitHub Pages.

The included friendsdk-0.1.2-wasm.tgz contains SDK source, compiled modules, assets and notices. The game builder/checker uses esbuild-wasm 0.28.2 for Windows compatibility; wallet, runtime and ownership code is unchanged. Setup details are in the source README.

## Validation

Passed locally: TypeScript checking, SDK game validation, game logic tests, routes to all 16 dig spots and the shop, obstacle/coastline collision checks, and automated browser flows at 960px and 390px. Browser tests cover keyboard and pointer/touch movement, proximity interactions, digging, shop entry, delivery, pause, results and restart. Animated digging and the interior handover were visually inspected at both widths. The builder reported successful local playtesting.

SDK wallet/bridge tests: 22 passed. Tests also check the sandbox boundary and that the fixture wallet receives no signature or transaction requests. Mock identity/artwork is used only in automated tests, never in the playable build. The public HTTPS preview loads the SDK ownership/wallet gate. Full real-wallet playtesting on the published site and physical phone testing remain user-assisted checks.

~~~sh
pnpm typecheck
pnpm check
pnpm exec playwright install chromium
pnpm test
~~~

## Credits

FriendSDK source: https://github.com/spokesz/friendsdk (Apache-2.0). Rare Friends character artwork is used under the SDK's NOTICE.md permissions. Original scenery, treasure SVGs, shop interior and customer illustration were created for this project with AI coding assistance. No external music or font assets are used.
