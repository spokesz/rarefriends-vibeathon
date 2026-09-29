# RarePet

**Every Rare Friend is a Rare Pet. Your Rare Friend, every day.**

- **Builder / contact:** XIBOT · [@xavieriturralde on X](https://x.com/xavieriturralde) · [GitHub](https://github.com/xibot).
- **Category:** Character Spotlight; also relevant to Economy Potential.
- **One sentence:** RarePet gives Genesis and Generations Rare Friends a Tamagotchi-inspired daily life: onchain care, a floating home, arcade play, shareable moments, an NFT-owned wallet, token launches, in-app trading and agent-assisted care.
- **Working demo:** [rarepet.app](https://rarepet.app) · [Visual care guide](https://rarepet.app/docs/) · [AGENT page](https://rarepet.app/agent/) · [Download rarepet skill](https://rarepet.app/skills/rarepet.zip).
- **Public source:** [xibot/rare-pet](https://github.com/xibot/rare-pet), submitted revision [ee5f7ca](https://github.com/xibot/rare-pet/tree/ee5f7cad053ee6cedb2e7d941cde6bf37ed14041).
- **Stack:** React, TypeScript, SVG, Solidity and viem; FriendSDK **0.1.2** for wallet sessions and canonical identity, artwork and worlds; Doppler SDK **1.0.43** for launches.

**Current V1:** onchain Pet, Feed and Poop are deployed and connected on Robinhood Chain. Rare Wallet, the Doppler launchpad and Buy / Sell are available inside the app. The AGENT page and downloadable rarepet skill support care checks, unsigned care plans and routines through an agent’s own authorized wallet and scheduler. Verified onchain Play XP and rarity-farming prize seasons remain later work. The wallet-free Preview is the simulated judging path; no purchase or transaction is needed to evaluate it.

RarePet brings daily care, a personal habitat, arcade play, exports, Rare Wallet, launches, trading and agent help together around your selected Friend.

## Try it without a wallet

1. Open [rarepet.app](https://rarepet.app). **Preview** is the starting mode without a connected wallet; no wallet, RF balance or signature is needed.
2. Use **Choose Friend → Preview Friends** to try a Genesis or Generations sample.
3. **Pet**, **Feed** and **Poop** to see different reactions, speech bubbles, trait changes and independent countdowns. Preview progress stays on this device, separately for each sample.
4. Pick one of **11 islands** across Worlds and Classic. Matching background islands drift through space with visiting Friends. Genesis samples also have **36 cosmetic bodies**, preserving the original portrait.
5. Open **Play** to take the selected Friend into the in-app arcade. Complete a run for Preview XP; an unfinished run earns none. Close the game after finishing to see your Friend’s controller celebration back on the island. Courses include turning shafts, free falls, spinning Friends, flying coins, shields and magnets.
6. Open **SHARE ↗**. Choose **Pet, Feed, Play, Launch, Poop or Talk** and add a custom speech bubble of up to **21 characters**. The five care-action moments each offer three poses; Play adds a controller and Launch adds a rocket. Export a **2000 × 2000 PNG** or **800 × 800 animated GIF** with a 2.4-second loop, including the Friend and island. Talk keeps only the message and a gently hovering Friend, without care effects or an action label. Download + Share on X prepares a draft; attach the file and publish only if you want to.
7. Open **LAUNCH in Daily Care** to explore the launch form in Preview, and **BUY / SELL** to browse the token catalog. Preview launches create no token and award no Brain. Browsing needs no wallet; actual trades use real assets and are not part of the simulated demo.
8. Turn **MUSIC ON** and choose **DAYDREAM** (84 BPM) or **PIXEL PARTY** (128 BPM, the default). Enable **FX** for care sounds. Track buttons sit beside the Music and FX controls and disable while music is off. Sound choices are remembered; music and effects start off.
9. Open the [AGENT page](https://rarepet.app/agent/). Explore the capabilities and example prompts, copy **Ask My Agent** setup instructions, or download the complete skill ZIP through the lime download link. Installing or reading the skill does not require a wallet signature.
10. Read the [visual guide](https://rarepet.app/docs/) for action cards, the streak timeline, interactive island/body examples and the new [Agent section](https://rarepet.app/docs/#agent).

The arcade supports keyboard and touch: Space/Up/W jumps and double-jumps, Down/S slides, Left/Right steers or adjusts pace, and P/Escape pauses. Play has its own adaptive soundtrack and independent music and sound-effect controls. Reduced-motion preferences are supported.

## Your Friend. Your agent.

The **rarepet skill v1.0.1** gives humans and agents one entry point to RarePet. The [AGENT page](https://rarepet.app/agent/) includes a visual introduction, two installation paths, capability cards, copyable care/wallet/launch/trade prompts and direct downloads. The header Friend animates using its canonical idle frames.

| Step | What the agent can do |
| --- | --- |
| **Check** | Read canonical ownership, current traits, lifetime care, streak deadlines and live cooldowns |
| **Prepare** | Check the chain, contract identity, ownership and readiness, then simulate and produce unsigned Pet, Feed or Poop transactions |
| **Care** | Use an authorized wallet integration to sign and send, then confirm the receipt and recorded result |

Choose **Ask My Agent** to copy a setup prompt, or download and unzip [rarepet.zip](https://rarepet.app/skills/rarepet.zip), move the `rarepet` folder into the agent’s skills directory and start a new session. The bundled **Node.js 22** helper needs no npm dependencies or RarePet API key. From the source checkout, this is a read-only example:

```sh
node skills/rarepet/scripts/rarepet.mjs status --collection generations --token-id 68356
```

**An agent can own and care for its own Rare Friend.** Its signing wallet must be the NFT’s current owner. With explicit authorization covering the Friend, allowed care actions, gas budget and expiry, the agent’s own scheduler or cron job can check timers and perform care when ready. The helper itself never signs, broadcasts or schedules; installing the skill grants no wallet access. Each run rechecks ownership and live rules and resolves any pending transaction before retrying.

Rare Wallet, launches, trades, transfers and fee claims have app-guided workflows and need their own authorized scope. Onchain Play XP remains pending. The skill does not create a hosted agent, custody service or delegated wallet permission.

Agent-readable resources: [SKILL.md](https://rarepet.app/skills/rarepet/SKILL.md), [llms.txt](https://rarepet.app/llms.txt), and the [JSON manifest](https://rarepet.app/agent/manifest.json) with contract identities, capabilities and SHA-256 checksums for the package and files. Public reads use Robinhood’s public RPC or the agent’s own trusted provider.

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

Use an injected browser wallet on **Robinhood Chain, chain ID 4663**. Owned care supports Genesis and Generations; **Rare Wallet and owned Play require Genesis or hardwired Generations**. Ownership and original artwork are rechecked when selecting a Friend. Connecting opens **My Wallet**; a refresh restores the session and selected Friend, then rechecks ownership. Disconnecting returns to Preview. Click the top-right wallet address to disconnect; Choose Friend is for selection and refresh. Mobile users need a compatible wallet browser; WalletConnect is not included.

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

Fees depend on actual trading. V1 includes creator fee claims; token-holder rewards are not included. Brain is recorded by the separate launch ledger. After a confirmed launch, a success modal shows the token and contract address. For a launch as your Friend, close the launch popup to see a rocket celebration in the habitat. Completed Play runs and confirmed Friend launches share their animation artwork and motion with the PNG/GIF moments; these visual celebrations do not add extra trait rewards. Image uploads show file and pixel limits before publishing: PNG/JPG/WebP up to 5 MB, with square images up to 4096 × 4096 and 2000 × 2000 recommended; images are center-cropped and resized to 512 × 512.

### Buy / Sell inside RarePet

**Find a Token** is a searchable dropdown for ecosystem assets and confirmed RarePet launches. Browse compact horizontal token cards in a scrollable four-column desktop grid, with category filters and a mobile layout.

The main Buy / Sell action spends from and returns tokens to the **connected owner wallet**. The same form inside Rare Wallet uses the **Friend's wallet**. Neither route opens an external DEX, changes traits or has a care cooldown. Trading and self launches do not require an NFT.

Trades use existing Uniswap V3/V4 infrastructure and the launched tokens' Doppler pools. Quotes load automatically without a signature. Review the amount, slippage and minimum received, then **Approve & Buy / Sell** guides each required approval and the swap automatically, with wallet confirmation at each step. A confirmed-swap card shows the amounts exchanged and dismisses with a progress bar. A changed wallet or trade, or a price move beyond the reviewed minimum, requires a fresh review. Routing credentials remain server-side. RarePet adds no extra trading fee and preserves each pool's fee setup. A listing does not guarantee an available route or liquidity; ETH is needed for gas.

## Mainnet contracts and source verification

| Current RarePet contract | Address / Blockscout | Source status |
| --- | --- | --- |
| **Care ledger** | [0x0082229d9592292E2542cb29a6b94d9a2F22d124](https://robinhoodchain.blockscout.com/address/0x0082229d9592292E2542cb29a6b94d9a2F22d124?tab=contract) | Verified — exact match |
| **Launch router** | [0xc6a4b2D4D369747B26e4Ff805a79A57da2505dC3](https://robinhoodchain.blockscout.com/address/0xc6a4b2D4D369747B26e4Ff805a79A57da2505dC3?tab=contract) | Verified — partial match |

Source badges were checked on September 26, 2026. Exact deployed runtime and configuration checks are recorded separately in the [care manifest](https://github.com/xibot/rare-pet/blob/ee5f7cad053ee6cedb2e7d941cde6bf37ed14041/contracts/rare-pet/deployments/4663.json) and [launch manifest](https://github.com/xibot/rare-pet/blob/ee5f7cad053ee6cedb2e7d941cde6bf37ed14041/contracts/rare-launchpad/deployments/4663-0xc6a4b2d4d369747b26e4ff805a79a57da2505dc3.json). **Source verification is not a security audit; the custom RarePet contracts have not been independently audited.**

The original router, `0x8c46baA63079B8648b1cd5689058E0AAB33DF063`, remains for historical launch discovery and fee claims, not new launches. It does not have its own verified-source badge. Historical holder-reward experiments are not used by V1.

## Run locally

Use **Node.js 22.18 or later in the 22.x line** and npm:

```sh
git clone https://github.com/xibot/rare-pet.git
cd rare-pet
git checkout ee5f7cad053ee6cedb2e7d941cde6bf37ed14041
npm ci
npm run dev
```

Open **http://localhost:4175**. No secrets or environment variables are needed for the Preview demo. `npm run build` produces `dist-pet/`, including the main app, `/docs/`, `/agent/`, the skill ZIP and agent-readable resources. Launch opens from its Daily Care action. Live contract addresses, image storage and server-side routing use the documented configuration; never put a private key in the frontend.

See the [source README](https://github.com/xibot/rare-pet/blob/ee5f7cad053ee6cedb2e7d941cde6bf37ed14041/README.md) and [developer guide](https://github.com/xibot/rare-pet/blob/ee5f7cad053ee6cedb2e7d941cde6bf37ed14041/docs/DEVELOPMENT.md) for configuration, contract tests, browser suites and validation records.

## Checks and known limitations

- At revision **bab5ed0**, application and server TypeScript checks and the production build pass; **532 unit tests pass with no failures or skips** under Node **22.22.0**. Coverage includes care timers/history, artwork/identity, gameplay, custom speech, six sharing moments, scoped completion celebrations, audio, launch validation, wallet session restoration, holdings, transfers, swaps, receipt recovery, agent status/plans and skill packaging/download routes. Commands: `npm run typecheck`, `npm run typecheck:server`, `npm test`, `npm run build`.
- The final **ee5f7ca** skill refresh adds the matching care-celebration and Play-audio guidance. All **14 helper/package checks** passed, the ZIP CRC and every file checksum matched, and a read-only mainnet status check completed successfully. The production build passed and the refreshed package is deployed. The helper’s transaction capabilities are unchanged.
- Browser checks cover Preview, care reactions/countdowns, collection/island/body selection, gameplay, PNG/GIF sharing with custom speech, wallet controls, the modal-only Launch entry, redirects, Docs and desktop/mobile layouts. The September 28 update also checked the AGENT setup/download link, manual setup copy, new Docs section and expandable scheduled-care guidance in the browser. The September 29 checks covered the six sharing modes, the completed-run controller celebration and return to idle, unchanged Preview XP, and closing unfinished actions without a celebration. Rocket poses and mobile layout were checked with the actual habitat components in a local fixture; no launch transaction was sent for these visual checks. Fixture suites are available for wallet, launch, exports and fee claims.
- Onchain Play XP is disabled until the completion service and claim flow are connected. Prize seasons and holder rewards are not active. Preview data is local and untrusted.
- Optional live care, sends, launches, swaps and fee claims require wallet confirmation and gas. Financial operations can move real assets even when reached while browsing Preview; they are not needed for judging. Source/runtime checks and transaction simulations do not constitute an audit or proof that every end-user financial flow has completed on mainnet.
- App reads use a server-only private RPC relay. Provider availability and bounded history scans can still limit discovery; manual lookup is available. Catalog assets need liquidity and a supported route. Price checks can block a launch; token-image publication requires configured storage, and broad route discovery requires server-side routing configuration.

## Credits

App, interface and gameplay: **XIBOT**. Rare Friends character artwork, canonical body frames and six complete Worlds presets come from Rare Friends/FriendSDK, preserving original artwork and notices. Classic floors and care effects are decorative interface artwork. The habitat’s two 8-bit soundtracks and care effects are generated in the browser with Web Audio. Doppler supplies launch modules/SDK, and Uniswap supplies trading infrastructure. Silkscreen, Archivo and Sometype Mono retain their font licenses. See [third-party notices](https://github.com/xibot/rare-pet/blob/ee5f7cad053ee6cedb2e7d941cde6bf37ed14041/THIRD_PARTY_NOTICES.md).

**Take care. Play. Stay rare.**
