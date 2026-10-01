# Rare Bonds

![Rare Bonds](https://raw.githubusercontent.com/AlbertGit360/rare_bonds/main/docs/screenshots/bond-street.gif)

**Project name**
Rare Bonds — Depth Bonds for $RAREFRIENDS

**Builder / contact**
AlbertGit360 · [@AlbertGit360](https://github.com/AlbertGit360)

**Category**
Economy Potential

**What did you build?**
A bond desk where your Rare Friend trades WETH for discounted RF (or credit for its own upgrades), and every bond permanently deepens the RF/WETH pool.

**How does it use Rare Friends?**
- **Your Friend is the bond owner.** You connect a wallet and pick one of your hardwired Generations NFTs. Discovery and the fresh-block eligibility check come from FriendSDK.
- **Payouts go to the Friend's own ERC-6551 wallet.** They vest over 7 days, like ActivationManager's reward streams.
- **Per-Friend caps scale with generation.** Gen-1 can bond the most, Gen-6 the least.
- **The upgrade-rebate payout repays the Friend's own ActivationManager costs** (`activate` / `upgrade` / `promote`). ActivationManager burns 50% of that RF and streams 50% to active Friends.
- **The Friend's on-chain sprite walks through "Bond street"**, an animated scene that shows where every WETH goes.

**Source code**
- Repository: https://github.com/AlbertGit360/rare_bonds
- SDK: FriendSDK v0.1.2. Unmodified `dist` modules are vendored in `js/sdk/`: wallet session, owned-Friend discovery, `readGenerationEligibility`, generation sprites.
- Stack: plain ES modules and viem 2.56.3. There is no build step.

**Playable demo / how to run**
- Preview: https://albertgit360.github.io/rare_bonds/
- Local on Windows: double-click `start.bat` (opens http://localhost:8787).
- Local on any OS: `npx serve .` in the repo folder, then open the URL.
- Requirements:
  - a browser wallet on **Robinhood Chain mainnet (4663)** (the app offers to switch);
  - an account that owns a **hardwired Generations NFT (Gen ≥ 1)**.
- Connecting is read-only: no signature and no transaction.

**How do you play?**
1. Connect your wallet and pick a Friend. The picker has generation filters and search for big wallets.
2. Press **▶ Watch a bond** to see the flow. A 3-step guide shows on the first visit.
3. Enter a WETH amount, choose **Vest RF** or **Upgrade rebate +8%**, and press **Bond (simulated)**.
4. Use **+1 day / +7 days** to move the sim clock, then **Claim** vested RF.
5. Or spend a rebate on **Activate / Upgrade / Promote**. **Check chain for real upgrades** rebates spending the chain confirms.
6. **Treasury** projects pool depth and the Bond Reserve over 26 weeks. **Stress test** compares the same dump against today's pool and the deeper pools.

**Costs and rewards** (all simulated; no RF or WETH moves)
- **Deposit:** WETH.
- **Where it goes:** about ½ buys RF through the canonical pool, which pays the 5% hook fee to active Friends. The rest plus the bought RF becomes a permanent full-range position.
- **Discount:** 10% → 2%, linear in daily capacity (1 WETH per day across all Friends). Per-Friend daily cap is `0.01 × 2^(6−gen)` WETH.
- **Vest:** `wethIn × (1 + discount) / spot` RF, linear over 7 days, to the Friend wallet.
- **Rebate:** `wethIn × (1 + discount + 8%) / spot` RF credit for 7 days, paying the Friend's ActivationManager costs. Unused credit vests without the bonus.
- **Upgrade costs** mirror ActivationManager: activate = 10% of denomination; tier step = denomination × Δ`cumulativeBps`; promote = denomination difference; each payment is 50% burned, 50% streamed.
- **Backing:** the Bond Reserve (50M RF proposed), with an optional refill from a share of the existing 5% hook fee via `RareFriendsHook.setRewards()` → splitter. A bond the reserve can't cover is refused.
- **Odds:** no randomness and no outcome probabilities. Every payout is deterministic.

**What have you tested?**
- `node tests/engine.test.mjs` passes: AMM math against a live pool snapshot, zap conservation, caps, epochs, vesting, claims, rebate costs versus ActivationManager, rebate fallback, projection.
- `node --check` passes on every module.
- Browser checks on live Robinhood Chain data with read-only wallets:
  - 2-, 210- and 800-Friend wallets;
  - eligibility gate;
  - bond, claim and rebate flows;
  - Treasury and Stress test;
  - scene animation and guide.
- There is no typecheck or SDK game validation: the project is a standalone page, not a CLI game component.

**Known limitations**
- **Economy actions are simulated.** There is no depository contract; the calldata of intended calls is shown for review at a placeholder address.
- **Pricing uses spot.** The on-chain version needs a TWAP and zap slippage bounds.
- **The projection holds price constant.**
- **Sim state is stored per browser and account.** Seeded demo bonds are marked DEMO.
- **Wallets with hundreds of Friends take 10–40 s to load.** The public RPC limits `eth_getLogs` to 10M-block spans, so discovery is chunked.

**Credits**
- FriendSDK 0.1.2 (Apache-2.0) and canonical Rare Friends Generations sprites, read on-chain.
- viem (MIT).
- Fonts: Silkscreen, Space Grotesk, JetBrains Mono (OFL).
