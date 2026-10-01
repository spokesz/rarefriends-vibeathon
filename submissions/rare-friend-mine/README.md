# Rare Friends: MINE

- **Builder:** pipedrimer (https://github.com/pipedrimer)
- **Category:** Character Spotlight
- **One sentence:** Plunge your selected Rare Friend into a 5×5 shaft of hidden mines, dig safe tiles for a compounding RF haul, and fight the urge to bank before the inevitable blast.

## Source code

- **Repository:** https://github.com/pipedrimer/friendsdk
- **Submitted revision:** `git checkout ef19bd04b66491b5a5c5c85bc537467ff16fca33`
- **FriendSDK version:** v0.1.2

The code will be exported from that exact repository and revision.

## How to run

From the repository root, with Node.js 22+ (WSL2 on Windows):

```sh
git clone https://github.com/pipedrimer/friendsdk.git && cd friendsdk
git checkout ef19bd04b66491b5a5c5c85bc537467ff16fca33
npm ci
npm run dev:game -- games/rare-friend-mine
```

Open the displayed URL, connect a wallet, select an owned eligible Friend, choose a difficulty and dig.

> **Try it without a wallet first:** the hosted test server runs in
> `--test-mode`, which mounts the game under the SDK runtime with a mocked
> Friend (#7730) and simulated RF — no wallet connection and no NFT required.

## How to play

Your Friend walks into the shaft with a pickaxe. Each run costs **1 RF**, and
every safe tile you dig multiplies the haul you currently sit on — the longer
you survive, the bigger the growth. Any mine detonation wipes **your entire
at-risk haul**. Bank whenever you like: **Bank returns exactly the at-risk
amount, never more** — do you cash out, or push deeper?

- **Choose difficulty** before each run: 5, 7, 10, 15, 20 or 24 mines on the
  board (tier names Novice → Inferno). More mines = higher per-round multipliers.
- **Dig** safe tiles to grow your at-risk haul via the compounding round
  multiplier. The round multiplier grows every safe dig at the fair survival
  odds for that board, discounted by a `900` basis point house margin each
  round.
- **Bank [C]** secures your at-risk haul; the run ends.
- **Shield** and **Boost** are rare in-board finds, never purchasable. A Shield
  absorbs one mine detonation; a Boost adds +0.50× to your next two digs.
- **Lucky Seam** (green) is a lucky anomaly — it **doubles the round it
  replaces** (including any active Boost), so the round still counts. It is
  never placed on a board with fewer than three safe tiles.
- **Two paired limits bound every delve**, and neither is safe alone:
  - **Seam yield cap** — a delve can never pay more than **×10,000** of its
    stake (`RULES.maxHaulMultipleBps`). The raw compounding curve runs to
    ×1,272,799 on a 15-mine board, but no delve can ever bank past ×10,000. The
    HUD shows **YIELD CAP** once the haul can no longer grow, and the remaining
    safe tiles are only worth digging for ore.
  - **Per-run stake ceiling** — a delve can never risk more than **7,331 RF**
    (`RULES.maxStakeRf`) *whatever the player holds*. This is a backing control,
    not a preference: a live player's balance is their real wallet balance and
    the game cannot bound it, so without this rule developer backing would be
    *(richest player's balance × cap)* — unbounded. With it, the worst case for a
    run in flight is a fixed **7,331 × 10,000 = 73,310,000 RF**, independent of
    any wallet size.

    The ceiling is **denominated in RF, not USD**. 7,331 RF was chosen because it
    was $10 at the $0.001364/RF reference price on 2026-09-28, but the number is
    fixed in RF and its dollar value is allowed to drift with the token price.
    Backing is what has to be stable, and backing is denominated in RF. The live
    contract must therefore take the ceiling as a governance parameter rather
    than a literal.

  Losing every RF is recoverable — **RESET SESSION** restores 10 RF while
  keeping all gear and achievements.
- **Ores** (Copper, Moon, Cosmic, Golden, Shadow) are collectible finds with no
  RF value at the bank; they lay the groundwork for future crafting/market
  mechanics.
- **Gear Locker**: durable cosmetic skins (9 shop items: coats, helmets,
  pickaxes, auras) bought with simulated RF, plus 4 achievement trophies earned
  by play (full clear, 25 RF single bank, 100 safe digs, 100 RF banked total).
  Visual-only — never changes odds or payouts. Unlocks persist for the run
  session; an unviewed **NEW** badge appears on the GEAR button.
- Controls: Arrow keys + Enter/Space to dig, `C` bank; tap/touch targets on
  mobile. Audio uses procedural Web Audio (mute + reduced-motion options
  included).

## Economy (simulated)

Each preview ledger starts with **10 RF** and the player chooses the stake, up
to their balance and the per-run ceiling below. The one run cost is that stake;
lost stakes are not refunded except by **RESET SESSION**. All amounts use bigint
RF base units. The preview ledger is **entirely simulated** — it calls only
`client.read` and never purchases, settles or redeems, so no reserve is actually
held. The reserve and backing rules below describe the **intended live**
settlement, specified in `docs/rare-friend-mine-live-economy.md` and not yet
deployed.

Per-round multipliers are fair survival odds per board discounted by a `900`
basis point house margin each round. Two engine-enforced rules keep the
economy fundable: a **×10,000 stake-relative yield cap** paired with a
**7,331 RF per-run stake ceiling**, and no Lucky Seam on boards with fewer
than three safe tiles.

**Why the two limits are inseparable.** Raising the cap alone would have been
unsafe, because a player reinvests their winnings: a ×10,000 payout becomes a
×10,000 *stake* on the next delve, and the economy compounds. Clamping the
stake is what bounds that. Together they fix backing at 73,310,000 RF for a run
in flight; separately, a cap without a ceiling leaves the requirement
proportional to the richest wallet on the network, which is unknown and
unbounded.

**The cap does not set the house edge.** The `900` bps per-round discount does,
because a full clear is far too rare to move the mean. This was verified by
re-running the real reducer at the new cap: the measured edge is unchanged from
the ×250 configuration it was fitted at.

The house edge is **measured, not asserted**. `tests/economy-sim.ts` drives the
real reducer across every selectable mine count (5–24) and sweeps eight legal
bank policies including *never bank*, the greediest possible strategy, and
asserts that the **best** policy found still loses money. Board generation and
dig order do not depend on when the player banks, so one pass records the whole
haul trajectory and every threshold is read off that same path. At 60,000
paired runs the house wins on all 20 counts: 18 of 20 measure a **5–9% edge**,
and the near-impossible Inferno boards (21 and 22 mines) read player-favourable
within the noise band, so the enforced invariant is that **no count is
reliably player-profitable** rather than any specific margin.

| Mines | Start mult | Peak (capped) | Raw compounding curve |
| ----- | ---------- | ------------- | -------------------- |
| 5     | ×1.14      | ×8,050        | — (under the cap)    |
| 7     | ×1.26      | ×10,000       | ×87,984              |
| 10    | ×1.52      | ×10,000       | ×794,008             |
| 15    | ×2.28      | ×10,000       | ×1,272,799           |
| 20    | ×4.55      | ×10,000       | ×33,155              |
| 24    | ×22.75     | ×22.75        | — (one safe tile)    |

The in-game Help table shows the capped peak and, where the cap truncates it,
the raw curve in muted text — so the cap is visibly doing work rather than
being an unexplained ceiling.

Ores, shields and boosts are rare board finds. Purchases, balances, at-risk
hauls, banks and outcomes in this preview are strictly simulated — no real
tokens are transferred, burned or required.

**Gear economy (simulated):** cosmetic purchases deduct a flat simulated RF
price (2–6 RF) once per item and never pay out RF — no backing reservation is
required for goods with no payout promise. Rewards stayed fully recoverable
from a funded account balance at all times.

## Hosted demo

**YES.**

- **Test server (no wallet / no NFT):** <https://pipedrimer.github.io/friendsdk/>
  Running in `--test-mode` — mocked Friend, simulated RF, instant play.
- **Main playable preview:** <https://pipedrimer.github.io/friendsdk/play/>
  Wallet/network requirements: a browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired Rare Friends Generations NFT (generation ≥ 1). No RF funding or transaction signature is needed for the preview.

## Checks and known issues

- 54 deterministic engine unit tests (multipliers, wipes, shields, boosts, green seam, yield cap, stake ceiling, full-clear auto-bank, 0-RF soft-lock recovery, advertised-peak clamping, gear locker economy and trophies).
- Monte Carlo economy simulation sweeping 8 legal bank policies (including *never bank*) against every selectable mine count, 5–24. Board and dig order are independent of when the player banks, so one pass scores every threshold off the same path. At 60,000 paired runs the house wins on all 20 counts; the gate fails only when the best policy beats the house by more than two standard errors, because the 20- and 23-mine jackpots are rare enough to swing the point estimate several points between runs.
- Automated browser smoke test: real sandboxed runtime, mock wallet, gear purchase/equip + NEW badge flow, banked haul verified (e.g., +1.21 RF run).
- Responsive mobile smoke test: portrait 390×740 and short-landscape 667×375, frame layout + touch-target geometry checks.
- `npx friendsdk check games/rare-friend-mine` validates the game directory; TypeScript typecheck clean.
- Known limitations: no on-chain economy (deferred); SDK's chance-game client is used as one supported action bound — game rules run in the contained engine; cosmetics and session balances reset on reload (runtime has no save bridge).
