# Sky Omen

**One sentence:** Sky Omen turns every land-defense event into a live $RAREFRIENDS economy — your Friend stakes RF (the game's in-world $RAREFRIENDS unit) into a pari-mutuel pool against a whole cohort of neighboring lands, while a self-sustaining treasury, streak/loss pools, passive structures and a mark-fusing Mutation Cauldron all circulate that same RF back out, modeling what a real ongoing token economy around $RAREFRIENDS could look like rather than a one-off purchase.

- **Category:** Economy Potential — best potential for a token economy paired with $RAREFRIENDS (also stronk for Token Activity)
- **Builder:** Alex — [X/Twitter](https://x.com/so_givemeasigh) · [OpenSea](https://opensea.io/givemeasigh) · [sighsighsigh89@gmail.com](mailto:sighsighsigh89@gmail.com)
- **SDK:** FriendSDK v0.1.2
- **Source code:** https://github.com/givemeasigh89/sky-omen
- **Game rules (full detail):** [`games/omen/README.md`](https://github.com/givemeasigh89/sky-omen/blob/main/games/omen/README.md)
- **Playable preview:** https://givemeasigh89.github.io/sky-omen/ (see "Publish a playable preview" below if this link isn't live yet)

## The idea

Sky Omen is a **recurring world event, not a one-off minigame** — there's no fixed campaign length or "level 1/2/3"; events just keep arriving on their own timer, one after another, forever, the way a real live-service game ticks along whether or not you're watching. Each event opens with a short scene ("☄ Event N: The Falling Star — a burning shape breaks through the clouds") and gives you **exactly 3 of the game's 5 defenses** to pick from — which 3 rotates event to event, so a long session doesn't keep showing the same three buttons. You pick one, walk your Friend to a spot on the plot, and stake RF on it — one single countdown covers the whole thing, "Time to choose" while you're deciding, "Impact in Ns" once you've staked.

**The choice is a real economic bet, not flavor text.** When the timer hits zero, one of the three options is drawn as the winner, one as neutral, one as the loss — and that draw is shared with a whole simulated cohort of neighboring lands also betting that same event. Whichever you (and they) picked, the RF moves for real:

- **Win** — you get your stake back plus a cut of everyone else's losing stakes (pari-mutuel), plus a small bonus yield from the game's own treasury, plus a random share of that event's secret jackpot.
- **Neutral** — your stake back in full, same treasury yield and jackpot share, just smaller.
- **Loss** — your stake burns into the pool the winners just split (that's where their payout actually comes from), though you still get a jackpot share and a small "resilience charge" that softens your *next* loss.

That's the core loop that makes this an economy rather than a coin-flip: every stake either gets redistributed to other players, funds the treasury's own yield, or turns into a permanent mark on your plot. Marks that stay on the plot (from wins/neutrals) quietly pay you a small RF income every future event forever — so old decisions keep mattering. Once you've got enough of them, you can walk up to the **Mutation Cauldron** and fuse 3 same-outcome marks into a stronger one with its own perk (extra income, a chance to bank resilience, a chance to dodge a future loss outright), and fuse three of *those* into an even bigger Tier-2 mutation — turning a pile of old results into compounding infrastructure instead of just clutter. The **Mutation Codex** is the second building, and just reads all of that back as a small tech-tree diagram so you can see at a glance how far each lineage has come.

## Run it

From a checkout of this repo (a fork of the FriendSDK):

```sh
npm ci
npm run build
npm run dev:game -- games/omen
```

Open the printed URL (normally `http://localhost:4173`), connect a wallet on Robinhood mainnet holding a Rare Friends Generations NFT (generation ≥ 1), select that Friend, and play.

**Wallet/network requirements:** a wallet connected on Robinhood mainnet, holding a Rare Friends Generations NFT (generation ≥ 1). No real RF/$RAREFRIENDS is spent anywhere — this is a simulated preview economy (see "Rules and rewards" below).

## Publish a playable preview

```sh
npm run build
npx friendsdk build games/omen
npx friendsdk check games/omen
```

This writes a static build to `games/omen/.friendsdk/`. Publish it to GitHub Pages via a `gh-pages` branch (see the terminal commands in the PR description / build notes), then enable it under this repo's **Settings → Pages** (Source: "Deploy from a branch", branch `gh-pages`, folder `/`).

## Play

Pick one of the 3 offered defenses (Carrots, Radio, Dome, Scarecrow or Mirror — the roster rotates), then tap anywhere clear on the plot to choose where it goes. Your Friend walks there; once arrived, a thought bubble lets you pick a stake (quick chips, a slider, or an exact number) and confirm. A single countdown covers the whole event — "Time to choose" while picking, "Impact in Ns" once staked — and when it resolves, one of the three defenses is drawn as the win, one as neutral, one as the loss, with a pari-mutuel payout, a treasury yield bonus, and a secret per-event jackpot split among everyone who staked, win or lose.

Two permanent buildings stand on the plot: the **🧪 Mutation Cauldron** (fuse 3 of your own marks that share the same outcome into one stronger mark) and the **📖 Mutation Codex** (a tech-tree readout of what each of the 3 fused lineages currently grants). Click either building's own glyph to walk over and open it.

## Rules and rewards

| Rule | Exact value |
| --- | --- |
| Starting balance | 20,000 RF (simulated, resets on reload or restart) |
| Stake range | 100 – 100,000 RF, in steps of 100 |
| Decision window | one countdown (compressed from the design's 24h) per event |
| Win payout | stake back + pari-mutuel share of the losing pool, plus a treasury yield, plus a share of that event's secret jackpot |
| Neutral payout | stake returned in full, plus treasury yield, plus jackpot share |
| Loss payout | 0 (or a resilience-charge refund), plus a jackpot share regardless |
| Structure upkeep | every non-crater mark already on the plot pays a flat RF income every event |
| Mutation Cauldron | fuse 3 marks sharing an outcome into 1 stronger Tier-1 mark; fuse 3 same-lineage Tier-1s into a Tier-2 Grand Mutation |

This is a simulated preview economy — no RF is real, nothing is redeemed against a contract, and reloading the page resets the run. `game.json` ships a valid `ChanceGameDefinition` because the runtime requires one, but this game does not call `buy`/`play`/`settle`/`redeem` against it; its own economy (a variable-stake, cross-participant pool with a treasury, passive structures and mutations) is implemented entirely in `sim.ts`. See [`games/omen/README.md`](https://github.com/givemeasigh89/sky-omen/blob/main/games/omen/README.md) for the full numbers and design reasoning.

## Economy in depth (why this fits "Economy Potential")

RF doesn't just move once per bet — it keeps circulating through several linked systems, all funded from the same rake rather than new cuts on players:

- **Treasury.** Takes a 10% cut (capped 1,000 RF/event) of every event's losing pool, then pays a yield back out — +0.5% of that event's *whole* pool on a win, +0.25% on a neutral — so a busier event with more total RF staked pays a bigger yield. Bounded so it can never pay out more than it takes in (verified over 5,000 simulated events: rake and yield converge to a ~1:1 ratio).
- **Secret growth-fund jackpot.** Every single event, a random 1–10% slice of a separate developer-seeded fund is drawn and split among *everyone who staked that event, win or lose,* by their share of the pool — so a quiet, low-turnout event pays a bigger jackpot per stake than a crowded one, keeping small events worth showing up for.
- **Streak pools.** Hitting the same outcome 3/6/9... events running earns a claim on a dedicated pool (🏆 win streaks, 🕯 loss streaks) — funded purely by splitting the treasury's own rake, not a new skim.
- **Structures that pay rent forever.** Every mark that isn't a crater (a win or neutral result) keeps paying a flat RF income every future event, whether that event goes well or not — so early decisions compound instead of just sitting there.
- **The Mutation Cauldron — 3 lineages, each a genuinely different shape, not palette swaps:**
  - 🔥 **Forge** (fused from 3 wins) — the highest flat income, no special ability.
  - 🛡 **Steady Ground** (fused from 3 neutrals) — a lower flat income, but each mark independently rolls a 15% *per-event* chance to bank a free bonus resilience charge (softens a future loss).
  - 🧫 **Warding** (fused from 3 craters) — turns a losing streak into the plot's first-ever income from craters, plus each mark rolls an 8% chance *on any future loss* to dodge it outright (full stake back, no charge spent).
  - Fuse 3 Tier-1 mutations of the *same* lineage (9 original marks total) into a **Tier-2 Grand Mutation** — sums the 3 incomes plus a 10% bonus, and that lineage's special chance carries over unchanged, not doubled.
- **The Mutation Codex** is the readout for all of this — a small tech-tree diagram (one branch per lineage) showing Tier 1/Tier 2 progress live, so the economy's current state is always visible without digging through menus.

## Checks, credits and limitations

- `npx friendsdk check games/omen` — build validity: passes.
- `npx tsc` (project typecheck) — passes.
- Verified live with Playwright against the actual FriendSDK dev server: placement, staking, event resolution, streaks, the World/Log/Settings menus, the Mutation Cauldron (fusing, Tier-2 grand mutations, availability during every game phase) and the Mutation Codex all confirmed working end to end.
- Built entirely with FriendSDK's own `GameWorld` renderer, `GameMenu`/`GameFrame` chrome and Friend identity/sprite system — no custom rendering pipeline. The only hand-drawn assets are this game's own economy marks (a planted carrot, a locator station, a dome, a scarecrow, a mirror, a crater, and the Mutation Cauldron's fused-gem glyphs), drawn to match the SDK's own monochrome hand-drawn style.
- Limitation: the neighboring cohort each event is simulated (26–58 simulated plots), not live multiplayer — called out plainly in the UI itself (the World and Streaks menus), never presented as real other players.
