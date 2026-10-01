![The First Bank of Friends in 30 seconds](https://raw.githubusercontent.com/Halldon-Inc/bank-of-friends/main/docs/media/demo-lite.gif)

> **In plain English**
>
> - **What a member does:** signs once from their Friend's wallet. The Friend's RF and WETH rewards land in the
>   member's own box, and the member can take everything home at any time, with a receipt.
> - **Where the money comes from:** every swap in the $RAREFRIENDS pool pays 5%, and that 5% streams to activated
>   Friends. When the bank's swap desk trades, the toll it pays comes back to its own members.
> - **Why more members make it better:** the bigger the bank's share of all Friend weight, the more of its own toll
>   comes back. The swing a trade needs to break even falls from 10.8% at one Genesis to 5.1% at half of all weight and
>   1.0% at 90%.
>
> Everything in the demo is simulated and stamped SIMULATED. Nothing is deployed.

**Try it, no wallet:** [walk the hall](https://bank-of-friends-nu.vercel.app) &middot;
[simulate a week on the swap desk](https://bank-of-friends-nu.vercel.app/?open=floor) &middot;
[open an account](https://bank-of-friends-nu.vercel.app/?open=desk) &middot;
[see your box and receipt](https://bank-of-friends-nu.vercel.app/?open=vault) &middot;
[the live desk and research](https://bank-of-friends-nu.vercel.app/docs)

**Phones:** the hall works by touch. Tap a sign to walk there and open it, or tap anywhere to walk.

![Every Friend who joins makes every trade cheaper](https://raw.githubusercontent.com/Halldon-Inc/bank-of-friends/main/docs/media/network.png)

**Project name**

The First Bank of Friends

**Builder / contact**

Hunt &middot; GitHub [@huntclubhero](https://github.com/huntclubhero) &middot; wallet `huntclubhero.eth`

**Category**

Economy Potential

**One sentence**

Sign once and your Friend's rewards auto-deposit into your own box; a swap desk trades the $RAREFRIENDS pool, and the
5% toll it pays streams back to members.

**Source code**

<https://github.com/Halldon-Inc/bank-of-friends> &middot; Next.js 16, viem, Solidity 0.8.30 + Foundry.
**FriendSDK v0.1.2 is used as a library, not a runtime** (see Credits). Setup and run steps are under
[Run it yourself](#run-it-yourself).

**Playable demo**

<https://bank-of-friends-nu.vercel.app> &middot; no wallet, no signature, no network, no install. A 30-second
walkthrough is at the top of this file and in
[`docs/media/demo.mp4`](https://github.com/Halldon-Inc/bank-of-friends/blob/main/docs/media/demo.mp4). The live bank
would run on Robinhood Chain, signed from the Friend's own wallet.

## How the rebate works

Every swap in the $RAREFRIENDS pool pays 5%, and that 5% is exactly what every activated Friend is paid. So when the
bank's desk pays the toll, it pays its own members. A round trip of V WETH pays 0.0975 V in tolls; a bank whose members
hold share s of all Friend weight gets s of it back, a week later, so a round trip really costs members
**0.0975 V (1 - s)**. Every Friend who joins makes every trade cheaper for everyone else. That network effect exists
only because this pool pays its toll to Friends.

| if the bank holds this share of all Friend weight | toll per round trip | swing a round trip must capture |
| -: | -: | -: |
| 0.2% (one Genesis, the founding member today) | 9.73% | 10.78% |
| 10% | 8.78% | 9.62% |
| 50% | 4.88% | 5.12% |
| 90% | 0.97% | 0.98% |

**Results:** the desk is a strict swing trader, not a profit guarantee. Out of sample on 16 real 4% to 6% toll pools,
its median result against holding rises with the rebate: -0.6% with none, +6.2% at 50%, +11.6% at 90%. One pool in
four still did more than 20% worse than holding. Every result, losing pools included, is published and reproducible
[below](#the-economy). The contract is tested and unaudited.

| The hall | The Trading Floor: the swap desk, live |
| - | - |
| ![The hall](https://raw.githubusercontent.com/Halldon-Inc/bank-of-friends/main/docs/media/hall.png) | ![The Trading Floor](https://raw.githubusercontent.com/Halldon-Inc/bank-of-friends/main/docs/media/floor.png) |
| **The Desk: sign once, every guarantee with its test** | **The Vault: your box and your receipt** |
| ![The Desk](https://raw.githubusercontent.com/Halldon-Inc/bank-of-friends/main/docs/media/desk.png) | ![The Vault](https://raw.githubusercontent.com/Halldon-Inc/bank-of-friends/main/docs/media/vault.png) |

## What a member does

1. **Sign once.** From your Friend's own wallet: approve RF, approve WETH, and `join` with a daily cap per asset. One
   confirmation with a wallet that batches calls, otherwise three. The NFT never moves and your personal wallet
   approves nothing.
2. **Your rewards auto-deposit.** The keeper claims your Friend's RF and WETH when they are worth at least 20x the gas
   and moves only what that claim delivered into **your own box**. Every box holds exact RF and exact WETH; there are
   no shares.
3. **The desk trades the pooled book.** It buys RF with WETH when RF is 30% under its 24-hour average (unless it is
   collapsing), sells RF for WETH when it is 30% over (only if the sale clears its cost after both tolls), and waits
   the rest of the time.
4. **Claim any time.** Withdraw RF, WETH or both, or close the account in one step, with no owner check, no queue and
   no pause, even if the protocol's rewards contract is switched off.
5. **Get a receipt.** Deposited (your harvested rewards) | swap desk (what its trades added or cost) | toll rebate (your
   share of the toll the desk paid, back as WETH rewards) | coming home, per asset.

## How to use the demo

Walk with WASD, the arrows, or a tap; on a phone, tap a sign to go straight there. Three stations:

- **[The Desk](https://bank-of-friends-nu.vercel.app/?open=desk)** opens your account: the three signup calls, a daily
  cap per asset, what you let the bank do and what it cannot do, each line with the test that proves it.
- **[The Trading Floor](https://bank-of-friends-nu.vercel.app/?open=floor)** is the swap desk, live from chain: BUY RF,
  SELL RF or WAIT, with the reason, the buy and sell levels, and the break-even table by membership. "Simulate a week"
  runs the same desk on a made-up week (you pick how much of all Friend weight banks here), lists its swaps and ends
  on a **sample receipt**.
- **[The Vault](https://bank-of-friends-nu.vercel.app/?open=vault)** is a wall of safe deposit boxes. Open yours to see
  its RF and WETH, its **receipt so far**, take either asset out, or close the account and get the **final receipt**.
- **Use my Friend** reads any wallet or ENS name and puts its Friend in the hall. It only reads public state.

The demo spends no RF and has no odds or prizes. In the live design the desk pays the pool's 5% toll on every swap,
and members get their share of it back as rewards. Accounts in the demo live in your browser.

## The economy

![The economy in one picture](https://raw.githubusercontent.com/Halldon-Inc/bank-of-friends/main/docs/media/economy.png)

Full write-up: [`docs/TOKENOMICS.md`](https://github.com/Halldon-Inc/bank-of-friends/blob/main/docs/TOKENOMICS.md).
Evidence: [`docs/TAKER.md`](https://github.com/Halldon-Inc/bank-of-friends/blob/main/docs/TAKER.md) (`npm run taker`)
and the live forward test [`docs/PAPER.md`](https://github.com/Halldon-Inc/bank-of-friends/blob/main/docs/PAPER.md).
Every number is labelled MEASURED, DERIVED, SELECTED, SYNTHETIC or CHOICE.

**Where the RF goes**

- Every desk swap routes 5% of its WETH leg to every activated Friend, members or not: the desk's volume is real volume.
- The desk buys RF only on big dips that are not collapses, with WETH the protocol paid members in swap fees.
- It sells RF only above cost after both tolls, so the bank is never a forced seller.
- The keeper calls `allocate()` when it is due, for every Friend, so everyone's stream keeps running.

<details>
<summary><b>The rules</b>, and how each was chosen</summary>

`lib/strategy.mjs` `takerDecision`: one pure function decides in the backtests, the live test and the site, and the
shipped function reproduces its backtest on 32 of 32 runs.

| rule | value | chosen by |
| - | - | - |
| trade only on a big move | 30% away from the 24h average | 252 settings run on the FIRST half of 16 real pools with a 4% to 6% toll, the best 25th percentile won, then scored on the second halves |
| size | half of the idle side per trade | same test |
| no buying into a collapse | not while the price is 25%+ below where it was 72 hours ago | same test |
| inventory cap | RF never above 70% of the book | same test |
| profit lock | sell only above cost after both tolls and impact; re-buy only below the last sale | the product rule: trade only when it makes money after the toll |

</details>

<details>
<summary><b>The evidence, good and bad</b>: 16 real pools out of sample, RF's own history, synthetic regimes, the live test</summary>

Out of sample, 16 real 4% to 6% toll pools (8 Robinhood v4 hook tokens, 8 StonkFun), second halves, the desk picked on
the first halves only:

| the toll comes back at | vs holding, median | beat holding | 1 in 4 pools did worse than | worst | best |
| -: | -: | -: | -: | -: | -: |
| 0% (those pools: their toll goes elsewhere) | -0.6% | 7 of 16 | -29.5% | -77.3% | +91.1% |
| 50% (the RF structure) | +6.2% | 9 of 16 | -27.8% | -75.6% | +98.8% |
| 90% (nearly every Friend banks here) | +11.6% | 9 of 16 | -22.3% | -74.2% | +105.0% |

- **On RF's own history** (10,012 swaps, 9.4 days, price -89%): from launch it bought once in the first hour and lost
  35% against holding as RF fell; started after the first 24 hours, as the other pools are run, it found no dip that
  was not a collapse and never traded.
- **Synthetic regimes** (never a forecast): quiet and choppy weeks never moved 30%, so it waited; a -5%/day slide
  +62% to +66% against holding; a +5%/day rally -13% to -15%.
- **Live, no money**: the same function runs every 15 minutes on 22 live pools across 7 launchpads (Rare Friends,
  Pons v2, Project Mars, the Robinhood Index hooks, Long.xyz, StonkFun, Ember, pump.fun), every decision logged in
  `data/paper/log.jsonl`.

**In short:** a strict swing trader whose median improves with every point of toll that comes back; one pool in four
still did more than 20% worse than holding. The rebate is the structural edge.

</details>

## How it works

**Signup.** A Rare Friend's wallet is an ERC-6551 account that only the NFT's owner can use, it cannot batch calls, RF
has no permit, and WETH's permit cannot be signed by a Friend wallet. So signup is two approvals and a `join`. The Bank
records the Friend, its wallet (read from the Friend's own collection and checked against the wallet's `token()`), and
the owner at that moment. Only Genesis and real Generations Friends can enrol.

**Harvest.** `ActivationManager.claim` is permissionless and always pays the Friend's own wallet. The Bank's `collect`
claims, then moves only what that claim just delivered, up to your daily cap per asset. Before every collect it
re-checks who owns the Friend; if the NFT has moved, the account is suspended and nothing is pulled from the buyer.

**Your box.** Each member owns an exact vector of RF and WETH. There are no shares and no NAV, deposits and withdrawals
never write a step, and every member rounds down, so claims can never exceed the book and nothing another member does
can move your account. A fuzzed invariant suite checks exactly that. The receipt reads straight from it.

**The swap desk.** Every hour the keeper reads the pool, computes the 24-hour average and the 72-hour drift, and asks
`takerDecision` for buy, sell or wait. It swaps through the pool like any trader and pays the full toll. Today the desk
runs in the keeper and the live paper test; the on-chain swap module that enforces the same rules (keeper-only swaps
bounded by a time-weighted price, the profit lock and the caps, on chain) is the next contract and ships with the audit.

**Exit.** `withdrawRF`, `withdrawWETH` or both, any time, with no owner check and no pause, even if the protocol's
rewards contract is switched off; a fork test proves that against the live contracts. Closing is one action.

<details>
<summary><b>Security: v1 had three critical bugs, found by attacking it before v2</b></summary>

Each of the three critical bugs would have paid one member's money to someone else:

| attack on v1 | what happened | v2 |
| - | - | - |
| RF and WETH counted as equal | 1 RF withdrew half of another member's 1 WETH | each member owns exact RF and exact WETH |
| a fake Friend collection | the keeper drained a victim's wallet into the attacker's account | only Genesis and Generations; each Friend wallet is checked against its `token()` |
| selling the Friend | the seller kept collecting the buyer's rewards | the owner is re-checked at every collect; a sale suspends the account |
| a donation to the bank | the next member's deposit rounded to zero | donations change nobody's claim |
| the daily cap | spent twice, once per token | a cap per asset |
| the owner's own money | swept out of the Friend's wallet with the rewards | only what the bank's own claim delivered |
| the owner as keeper | could trade the book into its own sandwich | the owner can never be the keeper, and changing the keeper takes two days |

Every row is a test in `contracts/test/WhyV1WasReplaced.t.sol` that **succeeds against v1 and fails against v2**. v1
is kept, compiled and never deployable in intent, at `contracts/src/legacy/FriendBankV1.sol`.

</details>

<details>
<summary><b>What the research found</b></summary>

`npm run verify` checks 63 facts against live chain state, none skipped.

1. **Every swap pays 5% of its WETH leg to activated Friends, a week late.** The hook funds the ActivationManager;
   `allocate()` streams the queue over the next seven days. That is why a member-owned desk gets its toll back.
2. **Friend RF rewards come from activations and Reserve fees, never from trading.** WETH rewards are the toll.
3. **Trading to make volume never pays the payer.** A round trip costs members 0.0975 V (1 - s); the desk trades only
   when a move pays after that, never to paint the chart.
4. **Launches crash first.** RF fell 89% in nine days; on every young pool we tested, buying the first day lost. The
   collapse guard exists because of it.
5. **We tested the alternatives and kept them as research**: resting maker orders instead of swaps (fills at about 1.02x
   the spot at placement, `docs/EVIDENCE.md`), a two-sided range grid (`docs/STRATEGY.md`), passive liquidity (lost 42%
   to 55%, `docs/ECONOMICS.md`).

</details>

## Design suggestions for the Rare Friends team

- **`allocate()` on a schedule.** It had been called once since launch when we checked, and each call streams rewards
  for seven days. A keeper that calls it when due keeps every Friend's stream running; the bank's keeper does it for
  everyone, and any builder could run one.
- **Ownership.** Protocol contracts are owned by a single address today. Moving ownership to a multisig with a timelock
  would let builders like us make longer promises to members.
- **Genesis in SDK games.** `readGenerationEligibility` reads the Generations contract, so a Genesis cannot enter an
  SDK game, and Genesis Friends carry about 95% of all Friend weight. An eligibility check that also reads Genesis
  would let the biggest holders play. This hall uses the SDK as a library for that reason.
- **Every RF-paired pool.** Each pool on the roadmap will pay its toll to Friends the same way, so the same
  member-owned desk and the same rebate can run in each of them.

## Built for this community before the Vibeathon

- **[Rare Friends Cards](https://rare-friends-cards.vercel.app)**: every Friend as a trading card with its live yield,
  used by holders and [shared by the founder](https://x.com/poopie/status/2100364736550289483).
- **The meme machine** at `/memes` on the same site, with a Friend on every template.

## Run it yourself

```sh
npm install
npm run verify              # 63 facts against live chain state
npm run taker -- --write    # the swap desk: RF, 16 pools in and out of sample, synthetic, break-even
npm run test:taker          # the desk's rules
node scripts/paper.mjs --tick   # the live forward test across launchpads, one pass (no money)
npm run keeper -- --wallet 0xYOURWALLET   # dry run: what the keeper would claim and allocate
cd contracts && forge test
cd app && npm install && npm run dev      # the hall at /, the research at /docs
```

## Checks

| check | result |
| - | - |
| `npm run taker -- --write` | 252 settings on RF's tape and on 16 real 4% to 6% toll pools, selected on first halves, scored on second halves; the shipped desk reproduces its backtest on **32 of 32** runs (PASS); tables in `docs/TAKER.md` |
| `npm run test:taker` | **6/6**: waits inside the band, no buying into a collapse, the RF cap, sells only above cost after both tolls, no re-buy above the last sale, break-even falls with membership |
| `node scripts/paper.mjs --loop 900` | the swap desk live on 22 pools across 7 launchpads since 2026-09-26, no money. At the 2026-09-27 report: 16 swaps on 3 pools, ahead of holding on 2 (MARLIN +18.05%, AORB +232.22%) and behind on 1 (AA -8.81%), no trade yet on the other 19; every decision in `data/paper/log.jsonl` |
| `forge test` (contracts/) | **114/114**: 103 offline (re-run 2026-09-26) plus 11 on a fork of live Robinhood Chain state; the contract is unchanged by the swap desk |
| `contracts/mutate.sh` | **16/16** planted bugs caught |
| `npm run verify` | **63/63** facts asserted against live chain state, none skipped (2026-09-26) |
| `npm run test:desk` | **30/30**: the keeper's range-order planner against the contract's reverts |
| `npm run play:hall <url>` | **98/98**: open an account, the Trading Floor's word matches `/api/desk`'s swap-desk decision, the break-even table, a simulated week that ends on a sample receipt, the vault, take out, close, and a final receipt that matches the box, in all three room shapes |
| `npm run sweep:hall <url>` | **168/168** across twelve sizes, 320px to 3440px |
| `npm run sweep:mobile <url>` | **405/405**: every flow by touch at 360, 390 and 430 portrait and 844x390 landscape, plus desktop 1440; 44px tap targets, no text under 10px, nothing clipped, no console errors |
| `node scripts/visual-check.mjs <url>` | **70/70** on /docs across seven widths |
| `npm run check:lib-sync`, `npx tsc --noEmit`, `next build` | clean |

## Known issues and limitations

- **The contract is not deployed and has not been audited.** Nothing in this demo moves funds. We will not deploy it
  to hold anyone's money before an external audit.
- **The on-chain swap module is not written yet.** Today's contract handles signup, harvest, boxes, exits and close
  (and a desk that rests range orders); the swap desk's rules run in the keeper, the live paper test and the site. The
  swap module is the next contract.
- **The swap desk can lose.** Out of sample one pool in four did more than 20% worse than holding, and on RF's launch
  crash a first-hour buy would have lost 35% against holding. It is a strict swing trader, not a profit guarantee.
- **The rebate depends on the pool's fee reaching Friends**, which the protocol's owner can change and the bank cannot.
  The keeper alarms if the fee is ever re-pointed.
- **The toll rebate line of the receipt is computed, not yet tagged on chain**: the harvest needs to split the desk's
  share of each WETH claim.
- **Signing up takes more than one click**: two approvals and a `join` per Friend.
- **Small Friends are not worth enrolling yet**: a collect costs about $0.08 in gas; a Gen-3 earns cents a week.
- **Accounts in the demo live in your browser**, because there is no backend.

## Credits

**FriendSDK v0.1.2, under its Apache-2.0 licence, used as a library**: `renderWorld` draws the scene,
`createWorldMovement` handles walking, collision and pathing, `project`/`unproject` map world to screen. The building
itself is ours: `app/lib/hall-art.ts` draws the facade, the vault and the counter.

The contract vendors nine MIT files of Uniswap v4 math (`contracts/src/vendor/`), unmodified apart from import paths,
each listed with its source commit in `contracts/README.md`.

Friend artwork is each NFT's own on-chain SVG; the only change is a crop that centres each Friend in its tile. No fonts or images are
bundled. Protocol mechanics were read from the contracts themselves; pool data for the 16-pool test and the live test
is GeckoTerminal's public OHLCV.
