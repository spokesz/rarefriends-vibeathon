# Friendogram

Picross puzzles drawn from **your own Rare Friend's 16 × 16 on-chain sprite**, wrapped in a daily RF economy that pays daily players more, can't pay out more than it takes in, and pays the featured Friend's own wallet.

**Builder:** Pavan Raj R. ([@pavanraj08-boop](https://github.com/pavanraj08-boop)) · **Category:** Economy Potential (also fits Character Spotlight) · **SDK:** FriendSDK v0.1.2

- **Source:** https://github.com/pavanraj08-boop/friendogram (game in `game/`, economy model in `game/economy/`)
- **Playable preview:** https://pavanraj08-boop.github.io/friendogram/
- **Requirements:** browser wallet on Robinhood mainnet (4663) holding a hardwired Rare Friends Generations NFT (generation ≥ 1). No RF, private key or signature needed; the economy is simulated.

## The economy (why it fits Economy Potential)

Built on how the SDK's `ChanceGame` actually works: a 1 RF Mystery Canvas pays back 0.90 RF on average in relics, and the 0.10 RF edge stays in the prize stake. Friendogram proposes routing that edge:

| Flow | Rule |
|---|---|
| Canvas edge (0.10 RF) | 60% ☀ Daily Pot · 20% burned · 20% developer |
| ☀ Daily Pot | Split each day by task points × streak weight (×1 → ×3 at 30 days) among players who opened ≥ 1 canvas |
| Claim cap | 3% → 9% of *that day's own canvas spend*, rising with streak; always below the 10% edge |
| Featured Friend royalty | 10% of the pot to the day's ☀ Friend of the Day, **paid into that Friend's own wallet** |
| Unclaimed pot | Above 2 days of inflow is burned |
| Lens | 0.1 RF, 100% burned |
| Ink (soft currency) | From daily tasks; buys lenses; never redeemable for RF. Earlier generations earn more (Gen 1 +50% … Gen 6 +0%) |

**Simulated (1,500 players, 45 days, `game/economy/simulate.py`):**

- Daily players get **96.9%** of canvas RF back vs 93.1% for casual players. That's **2.2× the pot bonus per RF**.
- The simulation caught an exploit in the uncapped design (a one-canvas-a-day grinder took **105.5%** back). The streak-scaled cap closes it. An exhaustive test of all 1,280 task/streak/spend combinations gives a best case of **99.0%**.
- Burn rises from 5.7% to **7.7%** of all RF spent. The featured Friend earns ≈ **7.8 RF/day**.

## The game (Character Spotlight side)

- Every Generations Friend is a unique 16 × 16 picture, so **every Friend is a unique level**: up to five poses of your own Friend become puzzles.
- **Never a guess:** a line solver proves every puzzle can be finished by logic, adding locked anchor cells only where needed. The two rarest relics needed 2 each; 200 random pictures pass too. Puzzles are rated ★–★★★★ with a par time.
- **Family perks** from the Friend's real on-chain lineage (the rare 2.5% families get the strongest). **Generation** is read from the Generations contract.
- **☀ Friend of the Day** (same Friend for everyone), **stamps** (◆ Perfect, ∴ Pure logic, » Swift), a walking-Friend solve celebration, and simulated **♥ Happiness** from daily tasks.

## Run it

```sh
git clone https://github.com/spokesz/friendsdk.git && cd friendsdk && git checkout v0.1.2
git clone https://github.com/pavanraj08-boop/friendogram.git ../friendogram
mkdir -p games && cp -r ../friendogram/game games/friendogram
npm ci && npm run dev:game -- games/friendogram
```

Open `http://localhost:4173`, connect your wallet and select your Friend.

## Play

- Clue numbers are runs of filled squares per row/column. **Tap/drag** to fill, **right-click** or **✕ Mark** for empty squares. Keys: arrows/WASD, Space, F, X, T (tool), L/K (lens).
- **☀ Daily:** five tasks: open a canvas, solve Friend of the Day, solve a canvas instead of revealing it, earn a stamp, use a lens. *Preview: next day / skip a day* fast-forward the calendar, because the SDK can't save between visits.
- **Canvases:** buy, open, solve the sealed relic (or reveal it), then keep or sell.

## Rules and rewards (simulated)

One canvas costs **1 RF** and produces one relic, fixed by the SDK chance client when opened. Solving never changes odds.

| Relic | Rarity | Chance | Value |
|---|---|---:|---:|
| Smudge | Junk | 23% | 0 RF |
| Pixel Pebble | Common | 35% | 0.5 RF |
| Warm Egg | Uncommon | 25% | 1 RF |
| Gen-1 Crown | Rare | 10% | 2 RF |
| Hollow Relic | Epic | 5% | 3.5 RF |
| Sparkling Star | Legendary | 2% | 5 RF |

Expected reward **0.90 RF**. Each purchased or pending canvas reserves the 5 RF maximum prize. Kept relics have no expiry.

## Checks, credits and limitations

- Typecheck, `friendsdk check` (valid; EV 0.9 RF; max 5 RF) and build: pass
- Node tests: solver guarantee (all relics, 18 daily Friends, 200 random pictures) and reward invariants (1,280 cases, best return 99.0%): pass
- Mock-wallet browser tests: SDK smoke test and full play-through at 960 px and 360 px, 28 gameplay/economy checks, 15 feature checks, 13 solver/stamp checks, 20 daily-system checks: all pass (111 game checks in total, plus the SDK's own 114 tests)
- Real-wallet playthrough: _pending_ (the builder's free Friend is held by the Rare Friends custody contract, so it can't be selected in SDK previews yet)

Credits: canonical Friend sprites via the FriendSDK sprite reader; SDK sound kit. Relic art is original.

Needs integration before launch: persistence (streaks), a pot contract receiving the edge split and paying claims and royalties to canonical Friend wallets, a lens-burn action, and a Happiness feed. Token rewards for gameplay may need legal review. No live transactions. Production publication needs Rare Friends review.
