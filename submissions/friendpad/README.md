# Friendpad

![Friendpad](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/00-home.png)

**Builder/contact:** Telegram [@albertos360](https://t.me/albertos360) · X [@AlbertErgart](https://x.com/AlbertErgart)

**Category:** Token Activity

**Every token is launched, drawn and held by a Rare Friend.**

![How RF flows in Friendpad](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/friendpad-flow.png)

## What did you build?

Friendpad is a memepad (pump-style launchpad) for the Rare Friends ecosystem. The creator of every token is not a human wallet but a **Rare Friend's own ERC-6551 wallet**. The Friend's generation decides how sharp the meme is drawn, every launch burns RF, and every taxed trade buys back and burns RF and pays RF dividends to Friends holding the token.

**Try it now:** https://albertgit360.github.io/friendpad/ — no install; browsable without a wallet.

## How does it use Rare Friends?

- **The Friend is the creator.** Only an **activated** Friend (hardwired Generations NFT gen ≥ 1, or Genesis; on-chain reward weight > 0) can launch. The token's creator address is the Friend's `tokenBoundAccount`, so creator fees, the creator buy and meme bags live **inside the Friend**, and control follows the NFT.
- **Generation = resolution.** Gen-6 draws the meme at 26×26, Gen-1 at 96×96, Genesis at 128×128 **in colour**. A better Friend literally makes a better-looking token.
- **Only Friends earn.** RF dividends go only to tokens held **inside activated Friend wallets**, boosted by the Friend's real on-chain reward weight. Tokens in a personal wallet earn nothing.
- **Friends are everywhere in the UI.** Each token has a holder world where holders who are activated Friends walk as their canonical on-chain sprite; everyone else floats as a ball sized by their share.
- **Everything about the Friend is real.** Ownership, generation, tier, reward weight, activation, Friend wallet address and whether it is deployed, and sprites are read live from Robinhood Chain.

## Key features

### 1. Proof of Burn on every launch
Launch fee **100 RF: 50 RF burned, 50 RF seeded into that token's Friend-dividend pool** — the same 50/50 burn-and-reward rule the Rare Friends `ActivationManager` applies to every RF payment. Every new meme is an RF sink.

### 2. Tax that feeds Rare Friends, not just the creator
The creator sets buy and sell tax (0–5% each, fixed at launch; default 1% / 1%) and splits it between **RF dividends to Friends**, the **creator Friend** (WETH) and **RF buyback & burn**. An **ecosystem floor** forces dividends + burn to be at least 25% of the tax, and the 5% cap rules out honeypot sell taxes. Every trade of every token buys RF and either burns it or pays it to Friends.

### 3. The Friend wallet (ERC-6551) as the token creator
`TokenBoundAccount.execute(to, value, data, operation)` can only be called by the current NFT owner, CALL only. **Move to Friend, Sell from Friend, Move out and Claim** each open the **real `execute(...)` calldata** (encoded with viem) that production would send from the owner — then apply the result to the simulation. Nothing is signed or sent.

![Claim calldata](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/05-claim-calldata.png)

### 4. Generation-driven pixel art
Upload, paste or drop any image. It is converted into the collection's 1-bit style: area-weighted downsampling and level normalization, then Atkinson error diffusion for Gen-1…3 and ordered Bayer for Gen-4…6. Sharpness and legibility grow monotonically from Gen-6 to Gen-1 and Genesis (colour, 13-colour palette). The preview opens on your Friend's own tier and lets you compare all seven.

![Pixelizer on real photos](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/pixelizer-comparison.png)

### 5. Fair creator buy
Optional creator buy up to 20% of supply, executed atomically as the **first trade on the curve** (no sniping), untaxed, **WETH only** (paying in RF would be a market sell of RF), landing in the creator Friend's wallet, with an optional 1 / 7 / 30-day lock shown on the token card.

### 6. Holder world
Each token gets a FriendSDK isometric location. Your activated Friends that hold the token walk around as their canonical sprite; the creator is marked; wallets without an active Friend float above. It grows as people buy.

## Source code

[GitHub repository](https://github.com/AlbertGit360/friendpad/tree/b19f018c85e1d2704ee8c6366cead1e139f5a223) · [Full README](https://github.com/AlbertGit360/friendpad/blob/b19f018c85e1d2704ee8c6366cead1e139f5a223/README.md)

**Stack:** no FriendSDK runtime — vanilla TypeScript compiled to ES modules + viem 2.21.54, static site, no bundler. The holder world reuses FriendSDK v0.1.2's world renderer and movement modules (vendored, unmodified). On-chain reads are batched through Multicall3, so a wallet with 200+ Friends loads in a few seconds.

## Playable demo / how to run

**Working demo:** https://albertgit360.github.io/friendpad/

- Without a wallet: browse tokens, charts, trades, holder worlds and the Economy page; look up any Friend by tokenId.
- With a wallet: any injected EIP-1193 wallet (MetaMask, Rabby, …) on **Robinhood Chain mainnet (4663)**. Friendpad only reads your address — **no transactions, no signatures, no RF needed**. Launching needs an **activated** Friend; `?dev=1` lets you launch from any looked-up Friend for testing.

Run locally (no build step, no `npm install`):

```sh
git clone https://github.com/AlbertGit360/friendpad.git
cd friendpad
git checkout b19f018c85e1d2704ee8c6366cead1e139f5a223
python -m http.server 8000   # or: npx serve -l 8000; on Windows double-click start.bat
```

Open `http://localhost:8000`. viem loads from esm.sh, so internet access is required.

## How do you use it?

1. **Connect wallet.** New users get 1 simulated WETH (**+1** tops it up).
2. **My Friends** — your Friends with generation, tier, reward weight, activation and Friend wallet (deployed or not).
3. **Launch** — pick an activated Friend, upload an image, compare the generation previews, set name, ticker, tax and allocation, optional creator buy + lock → **Launch** (100 RF, simulated).
4. **Buy** into your wallet or **straight into one of your Friend wallets**.
5. **Your positions** — Move to Friend, Sell from Friend, Move out, **Claim** RF dividends (real calldata preview).
6. **Economy** — RF burned, RF paid to Friends, creator fees, per-token tax, Friends leaderboard.

## Screenshots

![My Friends](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/06-friends.png)

![Launch with generation preview](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/01-launch.png)

![Holder world](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/03-holder-world.png)

![Your positions](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/04-positions.png)

![Economy](https://raw.githubusercontent.com/AlbertGit360/friendpad/b19f018c85e1d2704ee8c6366cead1e139f5a223/docs/07-economy.png)

## Costs and rewards

**All balances, fees, trades and rewards are simulated and labelled `SIMULATED` in the UI.**

| | Rule |
|---|---|
| Launch fee | 100 RF: 50 RF burned, 50 RF to the token's Friend-dividend pool |
| Trade tax | Creator-set at launch, fixed: 0–5% buy / 0–5% sell. Default 1% / 1% split 40% RF dividends / 30% creator Friend (WETH) / 30% RF buyback & burn. Dividends + burn ≥ 25% |
| Platform fee | 0.1% of every trade, on top of the tax |
| Dividends | Only tokens inside an activated Friend's wallet above the token's minimum balance; weight = balance × 1–2× boost from the on-chain reward weight; dividends-per-share (you earn only from fees after you entered) |
| RF price | 400,000 RF per WETH (simulated) |
| Creator buy | ≤ 20% of supply, first trade, untaxed, WETH only, into the creator Friend's wallet, optional lock |

No random outcomes, odds or consumables.

## What have you tested?

- Strict `tsc` compile clean; compiled `js/` committed.
- Pixelizer checked by eye on four real meme photos (Grumpy Cat, Kabosu/Doge, Lil Bub, Pepe cosplay): sharpness grows Gen-6 → Gen-1 → Genesis.
- GitHub Pages demo in a fresh browser profile without a wallet: seeded tokens render, reload on `#/token/…` keeps the route, `tokenBoundAccount` verification and Friend lookup read from chain, no JS exceptions; viem (esm.sh) and Blockscout API (CORS) work from the Pages origin.
- Real 210-Friend wallet, read-only (address only): all 10 activated Friends listed with sprites and deployed wallets; buy into a Friend wallet → dividends accrue → Claim opens the `execute(...)` calldata; holder world shows the Friend walking. No JS exceptions.
- No unit-test suite.

## Known limitations

- The simulation lives in the browser's `localStorage`: per browser, not shared.
- Seeded demo tokens use real Friends as creators/holders (marked `seeded demo` / `demo`); their owners never used Friendpad.
- Temporary Friends have no deployed wallet, so Move / Sell / Claim are disabled for them.
- A seller can empty the Friend wallet right before selling the NFT (buyers can check `state()`); a staked NFT makes the staking contract the wallet owner.
- Uploaded images are not moderated. No real contracts, trading or payouts; Token Activity metrics are not claimed.

**Future work:** real contracts (factory, bonding curve, dividend distributor, graduation to a DEX pool paired with WETH), on-chain lower-only tax and creator-buy lock, image moderation, legal review of the tax and dividend model.

## Credits

viem (MIT); FriendSDK v0.1.2 world presets, renderer, movement and sprite registry reader (Apache-2.0) with Rare Friends Isometric World Assets; canonical Rare Friends sprites read on-chain; JetBrains Mono and Silkscreen (OFL). Test photos in the pixelizer comparison and launch screenshot are from Wikimedia Commons (CC0 / CC BY-SA). All UI art is drawn in code; no AI-generated images. [Full credits](https://github.com/AlbertGit360/friendpad/blob/b19f018c85e1d2704ee8c6366cead1e139f5a223/README.md#credits).

## Update log

- **2026-09-26 — Initial submission:** Friendpad memepad with Friend-wallet token creation, generation-based pixelizer (Atkinson diffusion for Gen-1…3, colour Genesis tier), 100 RF launch fee with 50/50 burn & Friend dividends, creator-set tax with RF buyback & burn, activated-Friends-only RF dividends, holder world with on-chain sprites, real `execute(...)` calldata previews, Multicall3 reads for large wallets, GitHub Pages demo.
