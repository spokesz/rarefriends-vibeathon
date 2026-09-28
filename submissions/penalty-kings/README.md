# Penalty Kings

[![Penalty Kings in 15 seconds: the cold-open top-bin goal, a shot off the post, a Golden Boot ball reveal, then 3, 5 and 10 goals in a row](https://raw.githubusercontent.com/tulipoaaaaa/penalty-kings/claude/clever-mccarthy-ay7qv7/docs/media/money-shot.gif)](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/media/money-shot.webm)

*15 s of real play, recorded at full motion in the SDK preview (simulated economy): cold-open goal → off the post → Golden Boot reveal (the demo pins that roll; the real odds are 1%) → 3, 5 and 10 in a row.*

[![The twelve keepers, each with an idle and a dive frame and its tell](https://raw.githubusercontent.com/tulipoaaaaa/penalty-kings/claude/clever-mccarthy-ay7qv7/docs/media/cast-sheet.png)](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/media/cast-sheet.png)

*The cast: 12 original keepers, each with an idle frame, a dive frame and a tell.*

Your hardwired Rare Friend is the striker in a pixel-art football game. You swipe to shoot
penalties and free kicks against 12 original keepers. In the Big Match you open packs of balls
bought with $RAREFRIENDS; each ball's rarity comes from on-chain randomness and sets its RF value.

**Builder:** tulipo · contact **@phon_ro** · **Category:** Economy Potential (also fits
Character Spotlight and Token Activity) · **SDK:** FriendSDK v0.1.2 · UX shaped by founder feedback

**Links:**
- **Playable preview (simulated economy):** https://tulipoaaaaa.github.io/penalty-kings/ (Pro stadium: `/pro/` · Champions: `/champions/`)
- **Free practice, no wallet:** https://tulipoaaaaa.github.io/penalty-kings/practice/
- **Judge-path video (under 60 s):** [docs/media/judge-path.webm](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/media/judge-path.webm)
- **Money shot (15 s):** [GIF](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/media/money-shot.gif) · [WebM](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/media/money-shot.webm)
- **Source:** [branch `claude/clever-mccarthy-ay7qv7`](https://github.com/tulipoaaaaa/penalty-kings/tree/claude/clever-mccarthy-ay7qv7) · judged build: [tag `judging-stable-2`](https://github.com/tulipoaaaaa/penalty-kings/tree/judging-stable-2) (tag created at the freeze)
- **Design docs:** [Economy](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/ECONOMY.md) ·
  [Ball market](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/BALL-MARKET.md) ·
  [Handoff to Rare Friends](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/HANDOFF-RF.md) ·
  [Two random rolls](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/RNG-INTEGRATION.md) ·
  [Status: live, simulated, roadmap](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/STATUS.md) ·
  [Action-flow audit](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/FLOW-AUDIT.md)

**One sentence:** Penalty Kings makes your Rare Friend the striker in a skill-based pixel-art
shootout. The optional Big Match sells packs of balls for RF whose rarity is decided by
on-chain randomness, and every ball is backed by RF and redeemable.

## Pilot with Rare Friends

Penalty Kings is a **pilot being adapted by Rare Friends to FriendSDK v0.2.1**. Rare Friends will
fork the repo, adapt it to SDK v0.2.1 and deploy its own contracts for the game's **two random rolls**:
- **Roll 1, buying a pack:** the rarity of each ball.
- **Roll 2, taking a penalty:** the shot is **committed first**; the random value then seeds only the keeper's dive.

SDK v0.2.1 brings Google sign-up, embedded wallets, a loaned Friend, Apple/Google Pay and a managed
backend. So the game keeps only a thin adapter with marked integration points (progress storage and
the random beacon). The pilot ships **without $GBOOT**; the token design stays a tested, undeployed
upgrade package. This repo deploys nothing. The architecture, entry points and data formats are in
[docs/RNG-INTEGRATION.md](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/RNG-INTEGRATION.md)
and [docs/HANDOFF-RF.md](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/HANDOFF-RF.md).

**Designed for a ~15-second random beacon.** Waiting up to 15 s for randomness should feel like
suspense, not lag:
- **Pack reveal:** the sealed pack shakes and glows more as the wait goes on, then the balls reveal from lowest to highest, with a building sting before the best one.
- **Penalty:** the ball warms up on the spot, the keeper plays mind games, the crowd drumrolls, the stadium hushes, then the payoff.

Short waits skip straight to the payoff, so instant randomness stays as fast as today (release → result ≤ 1.2 s, asserted in CI).

## What's in the game

- **Six free modes** (skill only, no RF) plus the optional **Big Match** (see Modes below).
- **Big Match economy:** a **Ball shop** that opens on a display case of every ball with its exact
  chance and RF value; **packs** of 1 / 2 / 5 / 10 balls; a pack reveal with true totals; the
  **Bag** (per-ball kicks, goals and top bins, your lucky ball, editions); redeem any ball for RF.
- **Cups:** the Golden Boot Cup pot on the title, modes and Results screens, with a draw countdown
  and a "last week" winners ticker, and **Champions Night** (Saturday 19:00–21:00 UTC: every
  stadium takes the Champions look and the preview's simulated race points double).
- **Scouting Book:** a pixel sticker album of the 12 keepers (stamped, scouted or locked, each with
  its tell and dive read) plus the Ball Collection.
- **Share cards and challenge codes:** one tap under Results draws a 640×360 card with your
  Friend's canonical sprite and score; a checksummed challenge code replays the same kicks against
  the same keeper for a friend.
- **Keeper of the Week** (3+ goals in a round against them doubles the XP) and a **Daily streak**
  ("Day N" check-in XP, a cosmetic on day 7). The **NEXT GOAL** line always points at a free unlock.
- **Kit shop:** cosmetics only, with a free try-on.
- **Free practice page** (`/practice/`): five kicks on the real engine and scene for anyone, no
  wallet, then a share card and "Get your Friend to play for real".
- **Game feel, sound and atmosphere:** hit-stop, zoom punch and net bulge on goals; post clangs,
  fingertip saves and close-call slow motion; streak fever at 3 / 5 / 10 (OLE! chant and crowd
  wave); a synthesised crowd that hushes and roars, a layered kick and a master limiter; weather,
  a floodlight pool and crowd band behind the goal; a Match Director with keeper rotation and 275
  commentary lines (cosmetic only). All of it has a reduced-motion equivalent.

## Play

### Judge path (60 s)

**Video (under 60 s, first kick within 10 s):** [docs/media/judge-path.webm](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/media/judge-path.webm).
It was recorded in the SDK's own test harness (mock wallet, SDK sample Friend #7730, full motion),
so the economy in it is **SIMULATED**, the same as in the preview.

1. **Title:** watch the cold-open showreel for a moment, then **Skip intro ▸** → **Kick off**.
2. **Tutorial:** 3 swipes up from the ball. Your first goal gets the big celebration and a crowd wave.
3. **Modes:** the **NEXT GOAL** line always points at a free unlock (here, today's Daily Challenge).
4. **Free Kicks:** 2 kicks over the wall (curl the swipe to bend it). Then **Menu → Change mode**.
5. **Big Match:** **Ball shop** (odds printed on the pack) → buy a 2-ball pack → **Open** →
   **Reveal all** (true totals: spent, pulled, net) → **Go to my Bag** → choose a ball.
6. **Kick** with your chosen ball; the HUD shows your Bag (balls are not used up by kicking).

| | |
|---|---|
| ![Tutorial: the first goal, with the big celebration](https://raw.githubusercontent.com/tulipoaaaaa/penalty-kings/claude/clever-mccarthy-ay7qv7/docs/screenshots/judge-goal.png) | ![Modes screen with the NEXT GOAL line](https://raw.githubusercontent.com/tulipoaaaaa/penalty-kings/claude/clever-mccarthy-ay7qv7/docs/screenshots/judge-modes.png) |
| ![Free Kicks: aiming over the wall](https://raw.githubusercontent.com/tulipoaaaaa/penalty-kings/claude/clever-mccarthy-ay7qv7/docs/screenshots/judge-freekick.png) | ![Big Match: pack summary after Reveal all (simulated)](https://raw.githubusercontent.com/tulipoaaaaa/penalty-kings/claude/clever-mccarthy-ay7qv7/docs/screenshots/judge-pack-summary.png) |

No wallet? The [free practice page](https://tulipoaaaaa.github.io/penalty-kings/practice/) plays
without one ([screenshot](https://raw.githubusercontent.com/tulipoaaaaa/penalty-kings/claude/clever-mccarthy-ay7qv7/docs/screenshots/practice-844x390-kick.png)).
The video and the `judge-*.png` frames are regenerated only by `npm run record:judge`, not by CI.

**Playable preview (simulated economy):** https://tulipoaaaaa.github.io/penalty-kings/
(Pro stadium: `/pro/` · Champions: `/champions/`)

**Free practice, no wallet needed:** https://tulipoaaaaa.github.io/penalty-kings/practice/.
Anyone can take a few practice kicks against the keepers (no wallet, no Friend art, no economy),
then "Get your Friend to play for real".

The preview requires a browser wallet on **Robinhood mainnet (4663)** holding a **hardwired Rare
Friends Generations NFT (generation ≥ 1)**. The SDK's real wallet connection and ownership gate
run before play. The preview needs no RF, signature or transaction; every purchase and reward
in it is **SIMULATED** and labelled.

**Controls**
- **Touch / mouse:** swipe up from the ball. Where you release aims the shot and the reticle
  shows the landing point; speed sets the pace; bending the swipe curls the ball.
- **Keyboard:** arrow keys aim, A / D curl, W / S topspin (free kicks), hold **Space** to charge and
  release to shoot.
- **Quick shot** button; **Menu** (Bag, Ball shop, Cups, Scouting Book, Rules, Settings).
- **Settings:** mute, reduced motion, haptics. The game pauses whenever the runtime menu is open.

### Modes

**Free modes (skill only, no RF):**
- tutorial (3 coached kicks);
- Penalties against a ladder of 12 keepers, each with a stamp in the Scouting Book;
- Free Kicks: a wall, wind, curl and knuckleballs, with wall heights by stadium;
- Target Practice: 60 s, combos, crossbar bonus;
- World Tour: 30 data-driven levels (6 cities × 5 levels) with 3-star objectives;
- Daily Challenge: the same scenario for everyone that day, 3 attempts.

A difficulty director keeps goal rates in a 55–65% band. Progression is XP and cosmetics only;
there is no off-chain currency.

**Big Match (optional, RF):**
1. **Buy** a pack of 1 / 2 / 5 / 10 balls.
2. **Open** it (the SDK `play` + `settle`).
3. **Reveal** the balls one by one or all at once. You see the true totals: spent, pulled, net.
4. Keep the balls in your **Bag**, which tracks each ball's kicks, goals and top bins, your lucky ball, editions, and an S0 discontinued sample.
5. **Choose** a ball to kick. Choosing changes only the score multiplier, trail and commentary. It never changes rarity, RF value, odds or prizes, and balls are not used up by kicking.
6. **Redeem** any ball for its RF value at any time.

> **Your kick never changes what you win: ball rarity is decided by on-chain randomness.
> Skill is for glory, streaks, stars and the leaderboard.**

| Ball | Chance | RF value (× price) | Park (10 RF) | Pro (1,000 RF) | Champions (10,000 RF) |
|---|---:|---:|---:|---:|---:|
| Scuffed | 31.5% | 0 | 0 RF | 0 RF | 0 RF |
| Training | 27% | 0.5 | 5 RF | 500 RF | 5,000 RF |
| Match | 20% | 1 | 10 RF | 1,000 RF | 10,000 RF |
| Pro | 11% | 1.5 | 15 RF | 1,500 RF | 15,000 RF |
| Silver | 7% | 2.5 | 25 RF | 2,500 RF | 25,000 RF |
| Gold | 2.5% | 5 | 50 RF | 5,000 RF | 50,000 RF |
| Golden Boot | 1% | 10 | 100 RF | 10,000 RF | 100,000 RF |

- The expected RF return is **exactly 90.00%** in every stadium, asserted in CI. Every ball
  reserves the top prize until it settles.
- USD figures convert with the real RF price from the RF/WETH and WETH/USDG Uniswap v4 pools on
  4663. In the SDK preview this is a labelled on-chain snapshot, because the preview may only
  read the game contract. Live stadiums read the price every 60 s and show "—" on failure.

## $GBOOT (not in the pilot: a tested, undeployed upgrade)

The pilot ships without $GBOOT. The upgrade package is kept for later:
- a 100M fixed-supply token paired with RF;
- the 10% edge split 40% RF burn / 30% $GBOOT buy-back and burn / 30% Golden Boot Cup;
- sinks: the Skill Cup, Wildcards, cosmetics;
- farm-proofed rewards: at most 2 RF-equivalent per entry and 3 per day;
- a free-price, RF-backed ball market (BallVault).

It is covered by Foundry unit, fuzz, invariant and mainnet-fork tests. The owner approved it as a **design only**; the recorded defaults (a plain pool with a 1% LP fee and no hook until audited, whose fees are split 50% burned / 50% to the Cup pot; a proposed season-0 bootstrap, what the perk tiers mean) are in
[docs/GBOOT-UPGRADE.md](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/GBOOT-UPGRADE.md),
and the full maths is in [docs/ECONOMY.md](https://github.com/tulipoaaaaa/penalty-kings/blob/claude/clever-mccarthy-ay7qv7/docs/ECONOMY.md).

## What is live, simulated, and roadmap

- **Live on-chain (Robinhood 4663):** only the builder burner's Friend **#336583 hardwired at Gen
  2**, [tx 0xd6a6a8b9…c78d0](https://robinhoodchain.blockscout.com/tx/0xd6a6a8b911e7a7eba8b5e5771a4ad17ed3fe3af785a1b7e16e0640e86acc78d0).
  No game contract, $GBOOT or pool is deployed, and none will be deployed from this repo: Rare
  Friends deploys the pilot's contracts.
- **Real, but not a deployment:** the SDK wallet connection and the hardwired-Friend ownership
  gate (checked against mainnet in CI), and the RF/USD price (a labelled on-chain snapshot in the preview).
- **Simulated (preview), and labelled SIMULATED:** the RF balance (20 RF, the SDK default), packs,
  reveals, the Bag and redemptions, $GBOOT drops, Cup pots, the winners ticker, race tables and
  rivals, and Champions Night's doubled race points. The beacon wait is simulated in the Showroom
  (0 / 5 / 15 s).
- **Free and real, no wallet:** the practice page (the real engine and scene; no economy).
- **Roadmap:**
  - the Rare Friends SDK v0.2.1 pilot (sign-up, wallets, loaned Friends, payments and the backend come from the SDK);
  - the two random rolls on Rare Friends' contracts;
  - saved progress on the SDK backend;
  - the live Skill Cup referee;
  - later, the $GBOOT upgrade after an audit and legal review.

## Run it

Node.js 22+ on Linux or Ubuntu/WSL2.

```sh
git clone -b claude/clever-mccarthy-ay7qv7 https://github.com/tulipoaaaaa/penalty-kings.git
cd penalty-kings
npm ci
npm run dev          # connect a wallet holding a hardwired Friend
npm run build:site   # static site in site/ (Park /, Pro /pro/, Champions /champions/, practice /practice/)
```

## Checks, credits and limitations

**Checks** (in GitHub Actions; the preview only redeploys after a fully green CI run):
- typecheck, `friendsdk check`, the secret scan, and the site build with no dev-only code;
- game-logic tests (209): levels, progress, save codes, daily, target, the reveal ethics rule,
  prizes, the live-price maths, pitch geometry, Bag honesty, share cards and challenge codes, the
  weekly clock, game feel, audio, and an action-flow state machine covering every action in every state;
- engine tests (54): zones, keepers, the swipe mapping regression table, free-kick physics;
- Match Director tests (27): cadence, rotation, commentary, cosmetic-only output;
- Skill Cup referee tests (15) and weekly Cup computation tests (9);
- odds verification (EV 90.00%), the difficulty simulation (55–65% band) and the economy simulator;
- browser suites (Chromium, the SDK harness):
  - `test:smoke`: the SDK's own harness at 960 px and 360 px;
  - `test:game`: the buy → open → reveal → Bag → kick → redeem flow;
  - `test:modes`: every free mode, and Champions Night;
  - `test:skillzones`: top bin, in off the post, streak text;
  - `test:flow`: the action-flow audit (double release, key plus mouse, walkout, pack reveal, resize mid-swipe, 2 s and 5 s randomness waits, and release → result ≤ 1.2 s);
  - `test:phone`: phone layouts at 360×800, 390×844, 800×360 and 844×390;
  - `test:practice` and `test:landing`: the free practice page and the no-wallet landing (no wallet or RPC requests);
  - `qa:90s`: 90-second first-session QA with reduced motion on and off;
  - `test:overflow:ci`: no text escapes, clips, overlaps or taps under 44 px, at 4 viewports × 2 fonts;
- Foundry: 206 unit, fuzz and invariant tests offline, plus mainnet-fork tests;
- a real mainnet ownership-gate test, and a mainnet-fork rehearsal of the undeployed launch script.

**Known issues and limitations:**
- **Saved progress:** the SDK v0.1.2 sandbox has no storage, so the preview offers a **save code**
  in Settings. Durable progress comes from the SDK v0.2.1 backend (the integration point is already
  in the code).
- The preview wallet holds 20 simulated RF, which buys a 2-ball Park pack.
- Browser tests use the SDK's mocked wallet; a human real-wallet playthrough is recommended.
- **Risks:** live mode would use real RF. Paid chance with a redeemable prize needs legal review
  before any live promotion (an 18+ gate and region notices are planned). Official production
  publication needs Rare Friends review.

**Assets:** all art is original and drawn in code:
- the pitch, the three stadiums, crowd, goal and wall;
- 12 keepers;
- ball sprites per rarity.

The Friend is its canonical on-chain Generations sprite (FriendSDK sprite reader), unaltered. The
crowd of little Friends reuses the player's own sprite (downscaled nearest-neighbour, pixels
unaltered, props held around it); no other Friend's art is read.
UI sounds come from the FriendSDK sound kit; crowd, kick and music are synthesised in code. Fonts:
Pixelify Sans and Departure Mono (SIL Open Font License 1.1). No real clubs, crests, players or brands appear.
