# RarePet

**Every Rare Friend is a Rare Pet.**

- **Builder / contact:** XIBOT · [@xavieriturralde on X](https://x.com/xavieriturralde) · [GitHub](https://github.com/xibot).
- **Category:** Character Spotlight; also relevant to Economy Potential.
- **One sentence:** RarePet is a Tamagotchi-inspired home for Genesis and Generations Rare Friends, combining daily care, Rare Rush play, floating islands, shareable moments, NFT-owned wallets and a token launchpad.
- **Working demo:** [rarepet.app](https://rarepet.app) · [App guide](https://rarepet.app/docs/) · [Rare Launchpad](https://rarepet.app/launch/).
- **Public source:** [xibot/rare-pet](https://github.com/xibot/rare-pet), submitted revision [778e7d2](https://github.com/xibot/rare-pet/tree/778e7d22dd9307c6b307afbf2b33125382668656).
- **Stack:** React, TypeScript, SVG, Solidity and viem; FriendSDK **0.1.2** for wallet sessions, canonical identity/art/worlds and the embedded Rare Rush integration; Doppler SDK **1.0.43** for token launches.

This is a separate pet-care application from [Rare Rush, entry #22](https://github.com/spokesz/rarefriends-vibeathon/pull/22). It reuses that game's engine for its Play action. The care loop, habitat, exports, Rare Wallet and Rare Launchpad are the focus of this entry.

## Try the core interaction without a wallet

1. Open [rarepet.app](https://rarepet.app). **Preview** is the default; no wallet, RF balance or signature is needed.
2. Use **Choose Friend → Preview Friends** to try a Generations or Genesis sample.
3. **Pet**, **Feed** and **Poop** to see reactions, speech bubbles, trait changes and independent cooldowns. Progress stays on this device, separately for each sample Friend.
4. Choose a **Worlds** or **Classic** island. There are 11 floors with matching drifting background islands. Genesis Friends also have 36 cosmetic body choices while preserving their original portrait.
5. Open **Play** to run Rare Rush with the selected Friend. Complete a run for Preview XP; closing an unfinished game does not grant XP. The game includes turning shafts, free falls, spinning Friends, flying coins, shields and magnets. Keyboard and touch controls are included.
6. Open **Share to X**. Pick Pet, Feed or Poop and download a **2000 × 2000 PNG** or **800 × 800 animated GIF**, including the Friend, selected island and speech bubble. Sharing opens a draft; posting and attaching the file remain the user's choice.
7. Explore the [launch form](https://rarepet.app/launch/) and [guide](https://rarepet.app/docs/). Evaluating the Preview experience does not require a transaction.

Rare Rush controls are Space/Up/W to jump, Down/S to slide, Left/Right to steer or adjust pace according to direction, and P/Escape to pause. The on-screen buttons support touch. Sound and reduced-motion controls are available.

## Care rules and roadmap

| Action | Current Preview rule |
| --- | --- |
| Pet | Once every 24 hours; +1 Kinship and advance the care streak |
| Feed | Once every 4 hours; +1 Strength and +5 Stamina |
| Play | Up to 3 rewarded completions per rolling 24 hours; +10 Experience each |
| Poop | Once every 4 hours; +1 Health |
| Rarity | +1 RarePet Rarity per 7 consecutive care cycles |

After Pet unlocks at 24 hours, a further 24-hour grace window preserves the bond. Missing the deadline breaks the streak, resets its RarePet Rarity and decreases Kinship. Each additional missed day decreases Kinship again, down to zero. These are separate RarePet traits; original NFT metadata and collection rarity are unchanged.

**Vibeathon status:** the new care ledger is implemented and locally tested but is **not deployed**. Pet/Feed/Poop points and gameplay XP are currently Preview features. Connecting an owned Friend does not turn Preview points into onchain records. Fully onchain care traits are planned after this testing stage; live XP also requires a verified game-completion service.

**Later, after the mainnet care rollout:** a rarity farming season is planned in which higher RarePet Rarity earns larger prize rewards. The season, prize distribution and eligibility are not active. No Preview-to-mainnet progress conversion is promised.

Care has no RF purchase, consumable spend, randomized payout or live prize claim. Rare Rush's displayed demo RF/$RUSH economy is simulated; it is not an asset balance or redemption promise.

## Optional owned-wallet features

**My Wallet** requires an injected browser wallet on **Robinhood Chain, chain ID 4663**, holding a supported Genesis or Generations NFT. Ownership and canonical artwork are checked again when selecting a Friend. Rare Wallet and owned Rare Rush play support Genesis and hardwired Generations; a self launch does not require an NFT. WalletConnect is not included; mobile users need a compatible wallet browser.

- **Rare Wallet:** inspect the Friend's canonical account address, ETH, ERC-20 tokens and ERC-721/ERC-1155 NFTs. Copy addresses, review sends from the **Friend's wallet**, inspect launched-token contract addresses and claim accrued creator trading fees into that wallet. The connected owner authorizes transactions and pays network gas.
- **Rare Launchpad:** choose **Launch as Yourself** or **Launch as Your Rare Friend**; enter name, ticker and image; choose WETH or an individually supported Robinhood stock/ETF token and a 0.3%, 1% or 2% trading fee. The Doppler preset assigns the full one-billion-token supply to liquidity, with no creator token allocation. The RF route allows one confirmed launch per rolling 24 hours; the self route has no daily limit.
- **Initial trading-fee split:** **85% creator / 10% RarePet treasury / 5% Doppler**. The creator is the connected wallet or selected RF wallet. Fee income depends on actual trading; treasury-funded prizes remain a future feature.

These optional wallet and launch operations are **live**, separate from Preview care. The deployed launch router is [0x8c46baA63079B8648b1cd5689058E0AAB33DF063](https://robinhoodchain.blockscout.com/address/0x8c46baA63079B8648b1cd5689058E0AAB33DF063). Its separate launch ledger records RF launches/Brain independently of the undeployed care ledger. [Deployment evidence and limitations](https://github.com/xibot/rare-pet/blob/778e7d22dd9307c6b307afbf2b33125382668656/contracts/rare-launchpad/README.md).

## Run locally

Use Node.js **22.18 or later in the 22.x line** and npm:

```sh
git clone https://github.com/xibot/rare-pet.git
cd rare-pet
git checkout 778e7d22dd9307c6b307afbf2b33125382668656
npm ci
npm run dev
```

Open **http://localhost:4175**. No secrets or environment variables are needed for the Preview demo. `npm run build` produces `dist-pet/`, including `/docs/` and `/launch/`. Live contract addresses and server-side image storage require the documented configuration; never add a private key to the frontend. See the [source README](https://github.com/xibot/rare-pet/blob/778e7d22dd9307c6b307afbf2b33125382668656/README.md) for setup, contract tests, browser suites and asset credits.

## Checks and known limitations

- Submission checks: application and server TypeScript checks, **259 passing unit tests**, and the production build. Tests cover care timers/streaks, artwork/identity, the embedded engine, launch validation, wallet holdings, authorized transfers and receipt recovery.
- Browser verification covers the public wallet-free demo, care reactions/timers, collection selection, island/body choices, embedded gameplay, image sharing and desktop/mobile layouts. The repository also includes fixture-based wallet, launch, GIF export and claim suites.
- Preview progress is local and untrusted. Onchain care deployment, verified XP completion and the rarity farming season remain future work.
- Real wallet sends, launches and claims can move assets and spend gas. They are optional for judging. The launch router's deployed runtime/configuration were independently compared with source, but **the contracts are not audited**. No successful end-user token launch or fee claim is claimed by the submission checks; live-route verification used public reads and simulations.
- Public RPC availability and bounded history scans can limit asset discovery; manual asset lookup is available. The stock/ETF catalog is pinned and fail-closed price checks can prevent a launch. Token images depend on configured Vercel Blob storage. Browser wallets, chain access and gas are required for live operations.

## Credits

App, interface and Rare Rush integration: **XIBOT**. Rare Friends character artwork, canonical body frames and six complete Worlds presets come from Rare Friends/FriendSDK, preserving original character artwork and notices. Classic floors and care effects are decorative interface artwork. Doppler provides the launch modules/SDK. Silkscreen, Archivo and Sometype Mono retain their font licenses. See [third-party notices](https://github.com/xibot/rare-pet/blob/778e7d22dd9307c6b307afbf2b33125382668656/THIRD_PARTY_NOTICES.md).
