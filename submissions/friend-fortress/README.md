# Friend Fortress

Your Friend guards a crystal node from waves of glitches — not as a sprite in the scene, but as the weapon. It fires automatically at anything in range — a deliberately short range — so where you stand decides how much of a wave you actually stop. Turrets only ever fill the gaps you leave.

**Category:** Token Activity · **SDK:** FriendSDK v0.1.2

**Builder:** Deez (GitHub: [@phillipppppp](https://github.com/phillipppppp)) · **Contact:** X [@deeznuts_ron](https://x.com/deeznuts_ron) · Telegram [@deeznuts_ron](https://t.me/deeznuts_ron)

Every run spends Power Cells — one to start, one per roll banked — and runs are short and repeatable by design, so the token leaves circulation continuously rather than once.

[**Playable preview**](https://phillipppppp.github.io/rarefriends-fortress/) · [Source code](https://github.com/phillipppppp/rarefriends-fortress) · [Full documentation](https://github.com/phillipppppp/rarefriends-fortress#readme)

## Run it

Node.js 22+ and a browser wallet holding a hardwired Generations NFT (generation ≥ 1) on Robinhood mainnet (4663). Windows works natively; WSL2 is not required.

```sh
git clone https://github.com/spokesz/friendsdk.git
cd friendsdk && npm ci
# copy game/ from the source repo into friendsdk/games/fortress/
npm run dev:game -- games/fortress
```

Or open the [playable preview](https://phillipppppp.github.io/rarefriends-fortress/) directly.

## Play

| | Keyboard | Touch |
|---|---|---|
| Move | WASD or arrow keys | Tap the ground |
| Enter a station | Press **E** when near | Tap the station |
| Build a turret | Tap **Build**, then the spot | Tap **Build**, then the spot |
| Upgrade or merge | Click a placed turret | Tap a placed turret |
| Close a panel | **Esc**, one layer at a time | The **X** on the panel |
| How to Play | **?** in the HUD | **?** in the HUD |

**Esc** closes the topmost layer only — the turret panel before a menu — and never interferes with the SDK's own purchase confirmation, which belongs to the host.

Stations deliberately have no floating label over the world: the SDK prompt is sized in CSS pixels while the world canvas scales down, so on a phone one prompt covers roughly 300x85 canvas pixels and swallows the taps that are the only way to walk. Keeping the action in the HUD leaves the whole canvas tappable, which is verified at 390px and 960px.

1. **Buy a Power Cell** at the Generator, 1 RF each.
2. **Start a defence run** at the Node.
3. **Waves arrive from four lanes.** Your Friend auto-fires; you reposition to intercept and keep the node covered. Turrets are support, paid for with scrap earned inside the run rather than with RF.
4. **After wave 3, bank or push.**


**Why rolls rather than better odds:** `game.json` defines one fixed outcome table and the client enforces it, so weighting outcomes by performance would mean paying out RF the client never issued. Buying more rolls raises expected reward honestly, keeps the published table true, and leaves the bank-or-push tension intact.

## Rules and rewards

**All balances, purchases and rewards are simulated.** Start with 20 RF. One Power Cell costs 1 RF.

| Salvage | Chance | Redemption value |
|---|---:|---:|
| Slag Fragment | 16% | 0 RF |
| Cracked Core | 29% | 0.30 RF |
| Charged Cell | 26% | 0.70 RF |
| Focus Lens | 18% | 1.50 RF |
| Prime Shard | 9% | 2.90 RF |
| Node Heart | 2% | 5.00 RF |

Expected reward **0.90 RF per roll — a 10% house edge**, matching both shipped SDK examples and verified by the SDK's own `expectedReward`.

## Staking, and why the top prize is 5 RF

Every Cell you commit becomes a **pending play**. Starting a run stakes one; each gun upgrade
stakes more. **Depth decides how many you are allowed to settle**, so the stake is a bet on how
far the run will get:

| Bank at | Cells recoverable |
|---|---|
| Wave 3 | 3 |
| Wave 6 | 7 |
| Wave 9 | 11 |

Match your stake to the depth you can reach and you lose only the 10% house edge. Over-stake and
fall short, and the difference is forfeited — that is the sink.

| Staked | Bank at | RF out | RF back | Net | Break-even |
|---|---|---|---|---|---|
| 1 | any | 1 | 0.90 | −0.10 | 29% |
| 4 | wave 6 | 4 | 3.61 | −0.39 | 37% |
| 7 | wave 6 | 7 | 6.29 | −0.71 | 35% |
| 11 | wave 9 | 11 | 9.89 | −1.11 | 34% |
| 11 | wave 3 | 11 | 2.70 | −8.30 | 0% |

**No configuration can be net-positive in expectation** — every Cell returns 0.90 against a 1 RF
cost, and the SDK will not let a game alter that. What staking buys is *more shots at the table*,
which is why break-even rises from 10% on a plain run to 34–37% on a well-judged one.

The top prize is deliberately **5 RF rather than 10**. A pending play holds the maximum prize of
backing until it settles, so an 8.1 RF prize capped the stake at ten pending plays; 5 RF allows
eleven while keeping expected reward at exactly 0.900.


### Two currencies, deliberately

**Scrap** is earned inside a run and never costs RF. **Cells** cost RF and are staked.

| Bought with scrap | Cost |
|---|---|
| Gun levels 2–4 | 25 / 45 / 75 — available any time, including mid-wave |
| Turret placement | base × 1.6 per turret standing: Pulse 30 → 48 → 77 → 123 → 197 |
| Node repair (+15 HP) | 20, rising by 10 each time |

| Staked in Cells | Cost |
|---|---|
| Gun levels 5–8 | 2 / 2 / 3 / 3 — between waves only |
| Turret upgrades | 1 / 1 / 1 / 1 / 2 / 2 / 2 |
| Merging | free |

Scrap income climbs steeply — about 120 by wave 3 and 819 by wave 9 — so every scrap cost
**escalates**. A flat price stops competing with anything by wave 6. At 120 scrap you can afford
two Pulses, *or* gun L2+L3, *or* three repairs, never all three.

**Staking is what unlocks the deepest wave.** Simulated over 24 runs per profile:

| Build | Reaches wave 8 | Clears wave 9 | Average wave |
|---|---|---|---|
| Scrap only, gun capped at L4 | **0%** | **0%** | 6.8 |
| Staked build, gun to L8 | **100%** | **≈82%** | 8.8 |

A scrap-only run clears waves 3 and 6 comfortably and then stalls around wave 7. **It cannot reach
wave 8 at all** — a hard wall rather than a difficulty setting, because the L4 gun tops out near 386
damage per second against the staked build's 668. Staking Cells on gun levels 5–8 is the only route
past it, and even then wave 9 fails about one run in six —
so the stake is a real bet, not a formality.

### What happens to pending plays

A run always settles every play it staked. The first *recoverable* become your reward; the rest
are settled with their outcome shown but never redeemed, so the backing they held is released
rather than stranded. **If you quit mid-run**, those plays stay pending and keep holding backing —
so the next run you start settles them first, discarding them, before staking anew. Nothing is
left hanging, and purchases never silently stop working.

## The Friend is the fighter

The SDK paints the Friend onto its own `<canvas>`, so combat is drawn on a second transparent canvas stacked exactly over it. Each frame reads the live Friend position the runtime publishes and projects enemies, beams, turrets and the node through the SDK's exported `project()`. Nothing reaches into the SDK canvas, the parent page, or the wallet.

A **How to Play** card opens on load, before anything else: four lines covering the goal, the controls, what scrap buys and the bank-or-push choice. It names taps on a phone and keys on a desktop. It closes with **Got it**, the **X** or **Escape**, and the **?** in the HUD reopens it.

Four decorative effects sit on top of that: a white flash on an enemy that survives a hit, a ring burst where one dies, a wave-number banner, and an edge pulse when the gun levels. **None of them touch `combat.ts`** — hits are detected by comparing health between frames in the renderer, so the simulation remains the only thing that decides balance. **Reduced motion removes them rather than freezing them**, and the frame loop reads that setting through a ref so toggling it never restarts the loop. They cost no measurable frame rate at phone size.

## Difficulty, measured rather than guessed

The combat model is pure simulation with no DOM, so whole runs play headlessly and the curve was tuned before any pixel existed. Wave 9 clear rate for a staked build, by how far the Friend pushes out from the node, 600 runs per row: hugging the node **≈2%**, cautious ≈70–75%, and forward, aggressive and chasing to the spawn lanes all ≈80–85%. **Camping the node is what fails** — about 2% against about 82%. With the gun's range cut to 68 units, standing on the node leaves most of each wave never engaged. That one decision is the skill the game asks for. Beyond "move out" the distance stops mattering: the three forward styles are indistinguishable from one another, so they are given as a range rather than a ranking.

The simulation also revealed combat was fully deterministic, every wave identical between runs, so spawn position and health now carry a little jitter. A **daily modifier** — Steady, Swarm, Dense or Lean — is derived from the UTC date, so it is the same for everyone that day and needs no server.

## Checks and known issues

Typecheck, `friendsdk check`, `friendsdk test`, two headless balance simulations and **11 suites** all pass: turret placement, merging, staking, taps, both turret types, sound, visual effects, the full buy-run-bank-settle loop through the real sandboxed runtime, controls, Escape layering, and How to Play. UI suites run at both 390px and 960px. All are in [`tools/`](https://github.com/phillipppppp/rarefriends-fortress/tree/main/tools) and runnable. Automated checks use the SDK fixture identity; a real-wallet playthrough of this game is still outstanding.

**The content is deliberately small**: three enemy kinds (motes throughout, shards from wave 4, hulks from wave 5), two turret types that are both buildable, upgradeable and mergeable, and nine waves as the full run with no endless mode. Run progress does not survive a reload, since the SDK preview ledger is in memory. **The game does not load inside MetaMask's in-app mobile browser** — the SDK renders games in `<iframe sandbox="allow-scripts">` and the bridge handshake does not complete there, though it works in Chromium and WebKit at desktop and phone viewports, so it is that app's webview rather than the engine, and it affects every FriendSDK game equally. Desktop with a browser-extension wallet works.

Wallet connection, NFT ownership verification and Friend selection are handled entirely by the SDK runtime and are not reimplemented in game code. World scenery, character sprites and the sound kit are the SDK's; combat simulation, economy, overlay renderer, wave design and the bank-or-push structure are original to this submission. No live economy, trading or creator fees are included. Production publication would need separate Rare Friends review.
