# Rare Adventures

Connect your wallet and play with your own Genesis and Generations NFTs in a choose-your-adventure game with equipment, expeditions, party battles, and a simulated $RAREFRIENDS economy.

**[Play the demo](https://bludmoneyy.github.io/rare-adventures/)** · **[Source code](https://github.com/bludmoneyy/rare-adventures)** · **[Rare Friends Vibeathon](https://github.com/spokesz/rarefriends-vibeathon)**

**Reviewer walkthrough:** Open the demo, connect a wallet on Robinhood Chain, and select **Choose a pet** once ownership loading finishes. The Friends screen contains the wallet’s verified Genesis and hardwired Generations pets, with their original artwork. Select a pet, buy equipment in Shops, then enter an Adventure or assemble a party in Battles. Genesis pets receive +10% damage/healing in every battle arena; Generations pets receive +10% when their on-chain scenery matches the arena. These bonuses do not stack. Wallets without eligible pets see an empty-roster message; reviewers without NFTs can use the separately labeled guest demo.

| Submission detail | Rare Adventures |
| --- | --- |
| Builder / contact | [@bludmoneyy on GitHub](https://github.com/bludmoneyy) |
| Proposed category | **Economy Potential** |
| Approach | Standalone web game; **does not use FriendSDK** |
| Stack | React 18, TypeScript 5.7, Vite 6, CSS and SVG assets; GitHub Pages hosting |
| Wallet / network requirements | Connect an EIP-6963/EIP-1193 browser wallet on Robinhood Chain (4663) holding Genesis or hardwired Generations NFTs to play with owned pets. Guest mode uses preset pets. No signatures or funded account are required; RF stays simulated. |
| Economy status | All RF balances, purchases, sinks, wagers, rewards, and marketplace trades are simulated locally. |

## What did we build?

Connect your wallet and choose one of your owned Friends (or try the guest roster), buy equipment and potions, and attempt one of eight adventure tiers. Each room asks you to trade simulated RF for safer progress or take a free, riskier action. Clear the expedition to receive a reward from the visible pool; die and lose that Friend's carried inventory. Purchases and entry fees replenish the pool and record a separate RF sink.

The wider prototype adds party battles with replayable combat, raids with simulated teammates, elemental loot, a marketplace, and weekly guild competition. These systems explore how preparation, item loss, rewards, and social goals could create reasons to spend and reuse $RAREFRIENDS across repeated sessions.

**Why Economy Potential:** the central experiment is a traceable economy with costs, rewards, consumables, item attrition, and pool accounting. The demo records simulated spending and burning; it does not claim real token activity or a proven sustainable return. The [economy operator guide](https://github.com/bludmoneyy/rare-adventures#economy-operator-guide) includes parameters, break-even estimates, and production work still needed.

## How it connects to Rare Friends

Friends are the persistent characters carrying equipment, run history, and RF metrics. Connected wallets use their own Genesis and Generations NFTs, original on-chain artwork, and eight land scenes derived from Generations scenery. Party battles give a land-matching pet a 10% damage/healing bonus; Genesis pets receive that bonus on every land.

The connected roster is verified against the canonical collection contracts. Generations scenery comes from token metadata; Genesis identity comes from the collection address. Guest mode uses clearly labeled preset pets. Live token settlement remains future work. The custom interface uses responsive pages for inventories, economy information, and multiple game modes rather than the FriendSDK runtime.

## Try the core interaction

1. Open the [public demo](https://bludmoneyy.github.io/rare-adventures/), select **Connect wallet**, and switch to Robinhood Chain if prompted. Owned Genesis and hardwired Generations pets load automatically; dismiss the wallet panel and open **Friends**. You can also explore the guest roster without connecting. A fresh save starts with **250 simulated RF** and a reward pool of **18,420 simulated RF**.
2. Open **Friends** and select a character. Use **Shops** to buy equipment or a potion for that Friend; the item cards show costs, power, and durability.
3. Open **Adventures**, select the first tier, and enter for **12 RF**. It contains five rooms and advertises an **18–32 RF** clear reward, limited by the available pool.
4. Choose paid or free actions in each room. Fight enemies until their HP reaches zero, and use carried potions during the run as needed. Paid choices improve survival but do not guarantee a clear.
5. Finish the adventure or encounter death, then inspect the Friend's inventory, history, and RF metrics. Open **Docs** for the economy explanation and **Metrics** for the content overview.
6. Explore **Battles**, **Raids**, **Marketplace**, **Guild**, and **Guild Wars** for the connected systems. Other participants, listings, and standings are local simulations, not live multiplayer.

**Controls:** click or tap buttons and cards; use Tab to focus controls and Enter/Space to activate buttons. On small screens, use the menu button to open navigation. Characters roam automatically; there are no WASD movement controls. Battle playback supports pause, next action, show result, and replay, with reduced-motion handling.

Progress is saved in this browser's `localStorage`, separately for the guest demo and each connected wallet. Equipment and simulated RF never move between wallets. To start over, use **RESET DEMO** in the navigation drawer, preferably after leaving an active run. Reloading does not preserve an in-progress expedition.

## Costs, chances, and consumables

- Adventure entry ranges from **12 to 155 RF** across eight tiers; the complete room counts and reward ranges are in [current tier economics](https://github.com/bludmoneyy/rare-adventures#current-tier-economics).
- A room has a **42% enemy chance**. Trap, loot, and story rooms each account for approximately **19.33%**. Paid choices cost 6 RF per focused combat strike, 5 RF for traps, 8 RF for loot rooms, and 7 RF for story rooms. Free choices cost 0 RF before any optional preparation.
- Surviving a free choice in a loot room gives a **35% item-drop chance**; a Fortune charge guarantees that eligible drop. Combat and damage also depend on tier, equipment, potion effects, and random rolls, so there is no single fixed adventure win probability.
- Entry, ordinary shop purchases, and paid adventure actions contribute `ceil(payment × 0.5)` to the reward pool; the remainder is recorded as a simulated sink. Optional guild tithes add a separate charge. Raids, marketplace fees, and wagers have their own rules below.
- Potions are single-use items with nine effects and three strength tiers. Effects include healing, attack, armor, defense, evasion, loot fortune, revival, repair, and maximum HP. Run buffs last for that expedition; charges are consumed by their relevant events.
- Equipment has limited durability. Gear carried into a successful adventure loses one use; depleted gear is removed. Fatal death clears the Friend's carried inventory. Abandoning does not refund entry.
- Rewards are simulated, capped by available funds, and have no cash or token redemption. Client-side randomness and storage are suitable for this demo only.

## Checks and known limitations

Wallet and owned-pet checks (September 30, 2026). The [deployment workflow](https://github.com/bludmoneyy/rare-adventures/actions/runs/36766159828) passed for source revision `5a9217e`:

- TypeScript checking and the production build for `/rare-adventures/` passed.
- Ten wallet tests passed: connection, rejection/retry, account/network changes, network addition, declined switching, cancellation, stale balance responses, malformed responses/disconnect, timeout, and provider discovery.
- Automated Chrome checks with an injected test provider passed for missing-wallet guidance, connection, wrong-network display, switching, live balance rendering, account changes, disconnect, keyboard focus restoration, and mobile layout at 375 × 812. No browser runtime errors or signing/transaction requests were observed.
- Nine owned-pet tests passed for both collections, metadata/scenery, transfer reconciliation, incomplete history, `ownerOf` mismatches, wrong networks, metadata errors, empty wallets, generation-zero exclusion, cancellation, and buff behavior.
- Chrome integration checks passed for replacing the guest roster, displaying original artwork, selecting an owned Generations pet, entering an adventure with its sprite, account isolation, restored wallet-specific progress, removal of transferred pets, RPC failure/retry, and mobile layout.
- A read-only browser check on the deployed GitHub Pages app loaded four real mainnet holdings (one Genesis, three Generations), rendered their original artwork, and selected Generations #2640 for adventure preparation. The wallet account was supplied by a test provider; the NFT reads used real public RPC responses.
- Automated wallet controls use a mock provider. A real extension/hardware-wallet acceptance pass and a full gameplay/browser suite remain outstanding.

Checks previously recorded during deployment preparation:

- TypeScript checking and Vite production builds passed for both `/` and `/rare-adventures/` hosting paths.
- A local asset audit found all **44 referenced public SVG assets**, including dynamically selected potion art. The missing lance reference was corrected, with compatibility for old saved paths.
- Scripted checks passed for asset URL mapping, generated entry links, the web manifest, and service-worker cache isolation and offline fallback behavior.

The wallet flow has automated browser coverage; desktop/mobile gameplay, full keyboard accessibility, and every secondary game mode still need a complete reviewer pass. There is no FriendSDK validation result because this project does not use the SDK.

Known limits and future work:

- Optional wallet access reads the selected address, network, and live native ETH balance. No signatures, approvals, or transactions are requested. Owned NFT discovery, selection, original artwork, generation, and scenery loading are implemented through read-only canonical contract calls.
- Saves, guild chat, opponents, raid wallets, market activity, and balances are local. There is no shared backend, authenticated multiplayer, escrow, or authoritative settlement.
- Local saves and outcomes can be edited; `Math.random()` is not secure randomness. Production would need trusted settlement and prevention of duplicated trades/rewards.
- The initial reward pool is a demo subsidy. Economy tuning and raid-wide payout accounting need playtesting before any real RF integration.
- Browser storage must be available for persistence. Clearing site data removes progress; active expeditions are not restored on reload. Offline support covers cached resources after an online visit.

## Credits

- **Rare Friends:** character/collection concepts and Generations scenery. The extraction script at [`scripts/extract-generation-one-lands.mjs`](https://github.com/bludmoneyy/rare-adventures/blob/main/scripts/extract-generation-one-lands.mjs) reads Generations metadata from Robinhood mainnet and extracts/adapts scenery into `src/assets/lands/`. This is an optional land asset-generation tool. Connected play also reads NFT ownership and original token artwork from the public Robinhood RPC. Ownership discovery follows the owner-filtered transfer strategy documented in the [official FriendSDK source](https://github.com/spokesz/friendsdk/blob/main/src/owned-friends.ts); this app retains its standalone interface.
- **Font Awesome / Fonticons:** the `fa-*.svg` navigation icons retain their attribution and CC BY 4.0 notices. See [Font Awesome Free licensing](https://fontawesome.com/license/free).
- **Google Fonts and their designers:** Archivo, Silkscreen, and Sometype Mono, loaded through Google Fonts.
- Item illustrations and the fallback walking sprite are bundled under `public/`; additional UI SVGs are in `src/assets/svgs/`. These credits do not assert ownership of Rare Friends artwork or grant additional rights to third-party assets.

## Wallet connection

Select **Connect wallet** in the header and choose an installed wallet. The app discovers multiple injected wallets through [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), with a legacy `window.ethereum` fallback, and handles [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) account, network, and disconnect events. On mobile, open the demo inside your wallet's browser; external WalletConnect/QR sessions are not implemented.

The wallet panel shows the full account address, network, a read-only native ETH balance on Robinhood Chain, and an explorer link. If needed, select **Switch to Robinhood Chain** and approve the network prompt in your wallet. The app requests network addition only when the wallet reports an unknown chain, then verifies the selected chain. [Official network settings](https://docs.robinhood.com/chain/add-network-to-wallet/): chain ID **4663** (`0x1237`), RPC `https://rpc.mainnet.chain.robinhood.com`, native currency **ETH**, explorer `https://robinhoodchain.blockscout.com`.

Account changes immediately clear the previous account/balance; stale asynchronous responses cannot restore them. Declined requests, unsupported methods, timeouts, unavailable accounts, and network failures have recoverable states. **Refresh account** rereads the wallet; **Disconnect** ends the app's connection and removes listeners. Revoking the site's wallet permissions is a separate action inside the wallet. Connections are not persisted or automatically requested after reload.

### Owned pets and game progress

Both [official collections](https://rarefriends.com/docs/contracts) are supported:

- **Genesis:** `0x116eaa62241751e0c98da43d458600c6c17cd361` — every owned Genesis is playable and receives the non-stacking +10% damage/healing bonus on every party-battle land.
- **Generations:** `0x14c49e6118f46525de9ab41a51cbaa3c6ebf181d` — owned hardwired NFTs with on-chain generation 1 or higher are playable. The metadata's `Scenery` determines the +10% matching-land party-battle bonus. Temporary generation-zero identities are excluded.

The app reads `balanceOf`, replays paginated owner-filtered `Transfer` logs, reconciles the resulting count, and verifies each `ownerOf` at the same block before reading `generation` and `tokenURI`. No indexer key or backend is required. Collection identity is pinned to the official addresses; duplicate token numbers in different collections remain separate pets. Failed or incomplete reads show an error instead of an empty or unverified roster. Limits are 1,000 held pets per collection and 100,000 transfer logs per collection; larger histories require an indexed service.

Cards show each NFT's original on-chain SVG. Generations use the renderer's original portrait paths as the in-world sprite; Genesis uses its original artwork. These are rendered through image elements, never injected as page HTML. Unknown scenery grants no land-match bonus. The full artwork is retained if a future renderer lacks a separate portrait group.

Ownership refreshes every 60 seconds, on window focus, and via **Refresh pets**. A changed account, wrong network, disconnect, failed verification, or changed roster removes the old playable session; active adventures are not resumed across these changes. A transfer is detected at the next successful refresh, not instantly. Empty wallets get a clear explanation and a retry action, with no substitute demo pets unless the user returns to guest mode.

Wallet saves are keyed by chain and lowercased address under `rare-adventures-wallet-v1:4663:<address>`. Guest progress remains under `rare-adventures-save-v1`. Loaded saves are reconciled with fresh ownership, collection, generation, scenery, and artwork; saved identity/trait fields never authorize a pet or override its verified buffs. Items, RF, and statistics remain local to that wallet's save and do not transfer with the NFT. Artwork is refetched rather than persisted in local storage.

**Production boundary:** wallet recognition and NFT-based play are live, read-only integrations. They do not authenticate a server session or authorize real-value rewards. Signed server sessions, authoritative game state, contract settlement, and production economy validation remain future work. All game RF purchases and rewards stay simulated; no signatures, approvals, or transactions are requested.

### Verify the wallet flow

Use Node.js 22.18+:

```bash
npm run test:wallet
npm run test:pets
npx tsc -p tsconfig.app.json --noEmit
npm run build -- --base=/rare-adventures/
```

For browser checks, start `npm run dev` and a dedicated Chrome instance using `--headless=new --user-data-dir=/tmp/rare-wallet-check --remote-debugging-port=9231 about:blank`, then run `npm run test:wallet:browser` and `npm run test:pets:browser`. The test uses a mock wallet in an isolated page, never a real funded wallet. `APP_URL` and `CHROME_DEBUG_URL` override the default local addresses. Screenshots are written to `/tmp/rare-wallet-mobile.png` and `/tmp/rare-wallet-desktop.png`.

## Run locally

Use Node.js 22 (the version used by the deployment workflow) and npm. No API keys or environment variables are required.

```bash
git clone https://github.com/bludmoneyy/rare-adventures.git
cd rare-adventures
npm ci
npm run dev
```

Use `npm run build` and `npm run preview` to test the production build. Demo state is stored in `localStorage` under `rare-adventures-save-v1`.


## Full economy documentation

See the [economy operator guide](https://github.com/bludmoneyy/rare-adventures#economy-operator-guide) for tier economics, party battles, raids, elemental gear, marketplace fees, guild wars, and production integration work.

Owned-pet integration source revision: [`5a9217e`](https://github.com/bludmoneyy/rare-adventures/commit/5a9217e423431d15ee3cd8886ec17973397d8cdd).
