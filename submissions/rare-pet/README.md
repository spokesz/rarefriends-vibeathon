# RarePet

**Every Rare Friend is a Rare Pet. Your Rare Friend, every day.**

- **Builder / contact:** XIBOT · [@xavieriturralde on X](https://x.com/xavieriturralde) · [GitHub](https://github.com/xibot).
- **Category:** Character Spotlight; also relevant to Economy Potential.
- **One sentence:** RarePet gives Genesis and Generations Rare Friends a Tamagotchi-inspired daily life: onchain care, a floating home, arcade play, shareable moments, an NFT-owned wallet, token launches and in-app trading.
- **Working demo:** [rarepet.app](https://rarepet.app) · [Visual care guide](https://rarepet.app/docs/).
- **Public source:** [xibot/rare-pet](https://github.com/xibot/rare-pet), submitted revision [f019a08](https://github.com/xibot/rare-pet/tree/f019a0804e2df86fc84e2191451a47ce6436488a).
- **Stack:** React, TypeScript, SVG, Solidity and viem; FriendSDK **0.1.2** for wallet sessions and canonical identity, artwork and worlds; Doppler SDK **1.0.43** for launches.

**Current V1:** onchain Pet, Feed and Poop are deployed and connected on Robinhood Chain. Rare Wallet, the Doppler launchpad and Buy / Sell are available inside the app. Verified onchain Play XP and rarity-farming prize seasons remain later work. The wallet-free Preview is the simulated judging path; no purchase or transaction is needed to evaluate it.

RarePet brings daily care, a personal habitat, arcade play, exports, Rare Wallet, launches and trading together around your selected Friend.

## Try it without a wallet

1. Open [rarepet.app](https://rarepet.app). **Preview** is the default; no wallet, RF balance or signature is needed.
2. Use **Choose Friend → Preview Friends** to try a Genesis or Generations sample.
3. **Pet**, **Feed** and **Poop** to see different reactions, speech bubbles, trait changes and independent countdowns. Preview progress stays on this device, separately for each sample.
4. Pick one of **11 islands** across Worlds and Classic. Matching background islands drift through space with visiting Friends. Genesis samples also have **36 cosmetic bodies**, preserving the original portrait.
5. Open **Play** to take the selected Friend into the in-app arcade. Complete a run for Preview XP; an unfinished run earns none. Courses include turning shafts, free falls, spinning Friends, flying coins, shields and magnets.
6. Open **SHARE ↗**. Choose Pet, Feed or Poop, try another pose, and add a custom speech bubble of up to **21 characters**. Export a **2000 × 2000 PNG** or **800 × 800 animated GIF** with a 2.4-second loop, including the Friend and island. Download + Share on X prepares a draft; attach the file and publish only if you want to.
7. Open **LAUNCH in Daily Care** to explore the launch form in Preview, and **BUY / SELL** to browse the token catalog. Preview launches create no token and award no Brain. Browsing needs no wallet; actual trades use real assets and are not part of the simulated demo.
8. Read the [visual guide](https://rarepet.app/docs/) for the action cards, streak timeline, interactive island/body examples and live-versus-later feature map.

The arcade supports keyboard and touch: Space/Up/W jumps and double-jumps, Down/S slides, Left/Right steers or adjusts pace, and P/Escape pauses. Sound controls and reduced-motion preferences are supported.

## Daily care and permanent history

| Action | Starting rule | Reward / status |
| --- | --- | --- |
| **Pet** | Once every 24 hours | +1 Kinship; advances the care streak |
| **Feed** | Once every 4 hours; at most 6 per rolling 24 hours | +1 Strength and +5 Stamina |
| **Play** | Up to 3 rewarded completed runs per rolling 24 hours in Preview | +10 Preview XP per completion; owned Friends play for practice, **XP soon** |
| **Launch as a Friend** | One confirmed token launch per rolling 24 hours | +1 Brain in the launch ledger; Preview creates no token or Brain |
| **Poop** | Once every 4 hours; at most 6 per rolling 24 hours | +1 Health |
| **Keep a streak** | Every 7 consecutive care cycles | +1 RarePet Rarity |

Pet unlocks 24 hours after the last Pet, followed by a **24-hour grace window**. Miss the deadline and the current streak and its RarePet Rarity reset; Kinship decays. Lifetime earned points, action counts, best streak and action records remain onchain and follow the Friend when ownership changes. RarePet traits are separate from original NFT metadata and collection rarity; cosmetic bodies and islands do not alter either.

The care ledger preserves past records while allowing the care administrator to propose future rule changes through a public **24-hour delay**. Current rewards, limits and countdowns are shown in the dashboard. Stamina accumulates as a trait; it is not spent to enter Play. Preview progress is local, separate from owned care, and has no promised onchain conversion.

**Still to come:** verified game-completion receipts and the client claim flow for onchain Play XP. Rarity-farming seasons are planned to reward greater earned Rarity; season eligibility and prize distribution are not active. Care has no consumable purchase, randomized payout or live prize claim. The arcade's displayed demo RF/$RUSH economy is simulated.

## Your Friend's wallet, launches and trading

Use an injected browser wallet on **Robinhood Chain, chain ID 4663**. Owned care supports Genesis and Generations; **Rare Wallet and owned Play require Genesis or hardwired Generations**. Ownership and original artwork are rechecked when selecting a Friend. Click the top-right wallet address to disconnect; Choose Friend is for selection and refresh. Mobile users need a compatible wallet browser; WalletConnect is not included.

### Rare Wallet

- View the Friend's canonical wallet address, ETH, ERC-20 tokens and ERC-721/ERC-1155 NFTs; copy addresses and use manual asset lookup when history is incomplete.
- Send tokens or NFTs **from the Friend's wallet**. The connected NFT owner authorizes the action and pays ETH gas.
- View **Tokens Launched** with contract addresses, check accrued creator trading fees and claim them into the Friend's wallet. Fees may accrue in both pool tokens.
- Open **Buy / Sell** inside Rare Wallet to trade using the Friend's balances and receive the output in that same wallet.

### Rare Launchpad

Open it only through **LAUNCH in Daily Care**; there is no separate Launch page. Choose **Launch as Yourself** or **Launch as Your Rare Friend**, then set a name, ticker, image, quote token and **0.3%, 1% or 2%** trading fee.

The live catalog includes **199 quote assets**: **WETH, $RAREFRIENDS, USDG, cbBTC and all 195 stock/ETF tokens in the pinned supported Robinhood catalog**. Token identity, decimals and price inputs are checked before preparation; unavailable or stale prices block the launch.

The Doppler preset assigns **1 billion tokens, 100% of supply, to liquidity** with no creator token allocation. The approximately **$10,000 starting fully diluted value** is a pricing preset, not funds raised or a guaranteed value. Friend launches receive +1 Brain with a 24-hour cooldown. Self launches require no NFT, have no Friend cooldown and award no Brain.

| Share of collected trading fees | Recipient |
| --- | --- |
| **85%** | Creator: the connected wallet or selected Rare Wallet |
| **10%** | RarePet treasury, intended to fund future prizes |
| **5%** | Doppler |

Fees depend on actual trading. V1 includes creator fee claims; token-holder rewards are not included. Brain is recorded by the separate launch ledger.

### Buy / Sell inside RarePet

**Find a Token** is a searchable dropdown for ecosystem assets and confirmed RarePet launches. Browse compact horizontal token cards in a scrollable four-column desktop grid, with category filters and a mobile layout.

The main Buy / Sell action spends from and returns tokens to the **connected owner wallet**. The same form inside Rare Wallet uses the **Friend's wallet**. Neither route opens an external DEX, changes traits or has a care cooldown. Trading and self launches do not require an NFT.

Trades use existing Uniswap V3/V4 infrastructure and the launched tokens' Doppler pools. Review the amount, quote, slippage and minimum received, approve the displayed amount when needed, then confirm. Routing credentials remain server-side. RarePet adds no extra trading fee and preserves each pool's fee setup. A listing does not guarantee an available route or liquidity; ETH is needed for gas.

## Mainnet contracts and source verification

| Current RarePet contract | Address / Blockscout | Source status |
| --- | --- | --- |
| **Care ledger** | [0x0082229d9592292E2542cb29a6b94d9a2F22d124](https://robinhoodchain.blockscout.com/address/0x0082229d9592292E2542cb29a6b94d9a2F22d124?tab=contract) | Verified — exact match |
| **Launch router** | [0xc6a4b2D4D369747B26e4Ff805a79A57da2505dC3](https://robinhoodchain.blockscout.com/address/0xc6a4b2D4D369747B26e4Ff805a79A57da2505dC3?tab=contract) | Verified — partial match |

Source badges were checked on September 26, 2026. Exact deployed runtime and configuration checks are recorded separately in the [care manifest](https://github.com/xibot/rare-pet/blob/f019a0804e2df86fc84e2191451a47ce6436488a/contracts/rare-pet/deployments/4663.json) and [launch manifest](https://github.com/xibot/rare-pet/blob/f019a0804e2df86fc84e2191451a47ce6436488a/contracts/rare-launchpad/deployments/4663-0xc6a4b2d4d369747b26e4ff805a79a57da2505dc3.json). **Source verification is not a security audit; the custom RarePet contracts have not been independently audited.**

The original router, `0x8c46baA63079B8648b1cd5689058E0AAB33DF063`, remains for historical launch discovery and fee claims, not new launches. It does not have its own verified-source badge. Historical holder-reward experiments are not used by V1.

## Run locally

Use **Node.js 22.18 or later in the 22.x line** and npm:

```sh
git clone https://github.com/xibot/rare-pet.git
cd rare-pet
git checkout f019a0804e2df86fc84e2191451a47ce6436488a
npm ci
npm run dev
```

Open **http://localhost:4175**. No secrets or environment variables are needed for the Preview demo. `npm run build` produces `dist-pet/`, including the main app and `/docs/`. Launch opens from its Daily Care action. Live contract addresses, image storage and server-side routing use the documented configuration; never put a private key in the frontend.

See the [source README](https://github.com/xibot/rare-pet/blob/f019a0804e2df86fc84e2191451a47ce6436488a/README.md) and [developer guide](https://github.com/xibot/rare-pet/blob/f019a0804e2df86fc84e2191451a47ce6436488a/docs/DEVELOPMENT.md) for configuration, contract tests, browser suites and validation records.

## Checks and known limitations

- Application and server TypeScript checks pass and **409 unit tests pass with no failures or skips**, rerun under Node **22.22.0**. The production build passed for the deployed application; the latest revision changes README wording only. Coverage includes care timers/history, artwork/identity, embedded gameplay, custom speech, launch validation, wallet holdings, transfers, swaps and receipt recovery. Commands: `npm run typecheck`, `npm run typecheck:server`, `npm test`, `npm run build`.
- Browser checks cover Preview, care reactions/countdowns, collection/island/body selection, gameplay, PNG/GIF sharing with custom speech, wallet controls, the modal-only Launch entry, redirects, Docs and desktop/mobile layouts. Fixture suites are available for wallet, launch, exports and fee claims.
- Onchain Play XP is disabled until the completion service and claim flow are connected. Prize seasons and holder rewards are not active. Preview data is local and untrusted.
- Optional live care, sends, launches, swaps and fee claims require wallet confirmation and gas. Financial operations can move real assets even when reached while browsing Preview; they are not needed for judging. Source/runtime checks and transaction simulations do not constitute an audit or proof that every end-user financial flow has completed on mainnet.
- Public RPC availability and bounded history scans can limit discovery; manual lookup is available. Catalog assets need liquidity and a supported route. Price checks can block a launch; token-image publication requires configured storage, and broad route discovery requires server-side routing configuration.

## Credits

App, interface and gameplay: **XIBOT**. Rare Friends character artwork, canonical body frames and six complete Worlds presets come from Rare Friends/FriendSDK, preserving original artwork and notices. Classic floors and care effects are decorative interface artwork. Doppler supplies launch modules/SDK, and Uniswap supplies trading infrastructure. Silkscreen, Archivo and Sometype Mono retain their font licenses. See [third-party notices](https://github.com/xibot/rare-pet/blob/f019a0804e2df86fc84e2191451a47ce6436488a/THIRD_PARTY_NOTICES.md).

**Take care. Play. Stay rare.**
