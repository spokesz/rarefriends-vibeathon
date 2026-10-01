## Friend Guild

A guild-management game where Rare Friends work for each other. Hire real Friends as mercenaries: 70% of every fee goes to the hired Friend's own wallet, 20% is burned and 10% funds the season.

> **Baseline model, 1,000 players, 30 days:** 2,509,709 RF spent · 765,347 RF burned (30.5%) · 1,526,317 RF paid to Friend owners (60.8%) · a Gen 1 Friend's wallet earns ~3.5× a Gen 6's (198 vs 56 RF/day) · 0 RF minted.
>
> - **Every fee pays a real Friend's wallet:** 70% of each hire goes to the hired Friend's own canonical wallet.
> - **Generation sets the value:** Gen 1 ×3 … Gen 6 ×1 on the fee, so in-game value tracks market value.
> - **Stress-tested economy:** growth and churn, scenario presets (bear, hype, whales), a bot attack and a per-Friend hire cap, all conserving RF.
> - **Chiptune soundtrack (tavern theme, family expedition themes, jingles) and animated fights:** each expedition encounter plays as a short fight that replays the already-decided result.
>
> FriendSDK v0.1.4 · the preview never asks for a transaction, signature or approval · played by the builder with a real wallet and a Generation 6 Friend

**Builder:** Fablizio · [GitHub @Fablizio](https://github.com/Fablizio) · [X @FabrizioCottone](https://x.com/FabrizioCottone) · [Telegram @Fablizio](https://t.me/Fablizio) · **Category:** Economy Potential · **SDK:** FriendSDK v0.1.4

Every hardwired Generations Friend has its own canonical wallet, and Friend Guild gives that wallet a job. Your verified Friend runs a guild and hires real Friends (read live from the SDK's artwork registry) for expeditions, and each fee pays the hired Friend's owner. Expeditions never create RF: they bring Shards, a soft currency that is spent together with RF (burned) on upgrades and gear. An in-game economy simulator runs the whole economy for 30 days with adjustable parameters.

## Generation sets the value

In-game value follows market value: a Friend's generation (read on chain, `generation(id)`, batched through Multicall3) multiplies its hire fee, so its wallet earns in step with its market price, and raises its expedition power by a quarter of that premium, so rare mercenaries are worth hiring but never mandatory. Holding rarer Friends pays. Tier multipliers (fee ×, power ×): **Gen 1 Legendary ×3 (1.5) · Gen 2 Epic ×2 (1.25) · Gen 3 Rare ×1.5 (1.125) · Gen 4 Uncommon ×1.25 · Gen 5 Common ×1.1 · Gen 6+ Standard ×1 · unknown/failed read "Gen ?" ×1.** Every mercenary card and your own Friend show a badge such as **GEN 1 · LEGENDARY ×3**; the 70/20/10 split, demand pricing and RF conservation are unchanged. In the simulator a listed Gen 1 Friend earns about 198 RF/day vs 56 for a Gen 6 (exactly 3× per hire, about 3.5× overall). Genesis NFTs are a separate collection that FriendSDK v0.1.4 cannot select as a player; a Genesis tier is on the roadmap.

![friend-guild demo](https://raw.githubusercontent.com/Fablizio/friend-guild/79689bcab4075854cb9e9ba1469415a472aa7aa7/games/friend-guild/media/demo.gif)

*Demo recorded headlessly with SDK sample sprites and a bot at the controls (the GIF has no sound); in play you see your own Friend and live Friends from the chain.*

- **Play:** https://fablizio.github.io/friend-guild/
- **Source:** https://github.com/Fablizio/friend-guild/tree/79689bcab4075854cb9e9ba1469415a472aa7aa7 (game in [`games/friend-guild/`](https://github.com/Fablizio/friend-guild/tree/79689bcab4075854cb9e9ba1469415a472aa7aa7/games/friend-guild))
- **Economy design:** [`ECONOMY.md`](https://github.com/Fablizio/friend-guild/blob/79689bcab4075854cb9e9ba1469415a472aa7aa7/games/friend-guild/ECONOMY.md)
- **Wallet and network:** a browser wallet on **Robinhood mainnet (4663)** holding a hardwired Generations NFT (generation ≥ 1). On a phone, open the link in your wallet's in-app browser. The SDK runtime handles connection, Friend selection and the fresh ownership check. No transaction or signature is requested.

## Run it

Node.js 22+ on Linux or Ubuntu/WSL2:

```sh
git clone https://github.com/Fablizio/friend-guild.git
cd friend-guild
git checkout 79689bcab4075854cb9e9ba1469415a472aa7aa7
npm ci
npm run build
npm run dev:game -- games/friend-guild
```

Open `http://localhost:4173`, connect your wallet and select your Friend. Static build: `npx friendsdk build games/friend-guild`.

## Play

Tap or click. Everything is also keyboard-accessible.

- **Guild:** your Friend's generation tier, family and seed stats, rating, hire fee and gear.
  - **List** it in the tavern and simulated guilds hire it, with 70% of each fee going to its wallet.
  - A live feed shows every hire, and the season board ranks guilds by fame.
- **Tavern:** eight real Friends with generation tier badge, stats, trait and live fee.
  - Hire up to 2 for your next expedition. Each hire raises that Friend's price by 5%, and demand fades over time.
- **Expedition:** four family zones (tier 1–4). Each zone favours two counter-families.
  - The success chance (team power, guild level, affinity) is shown before launch.
  - A short animated run has four encounters against real Friends (12–24 s demo speed, skippable).
  - Rewards: Shards, fame and sometimes gear. **Never RF.**
- **Workshop:** guild upgrades (+3% success per level, up to 5) and gear crafting (+2 to a stat). Both cost Shards plus RF, and the **RF is 100% burned**.
- **Economy:** a 30-day agent-based simulator with charts, where you can change players, expeditions per day, burn %, owner % and price step.
- **Settings:** Mute and Reduce motion.

## Economy (simulated)

**All RF, balances, hires, other guilds, fame and earnings are simulated and labelled in the UI.** No contract is deployed and no RF moves.

| | |
| --- | --- |
| Mercenary fee | (1 + 0.22 × rating) RF × generation multiplier (Gen 1 ×3 … Gen 6 ×1) × 1.05^recent hires |
| Fee split | **70% hired Friend's canonical wallet · 20% burned · 10% season fund** |
| Guild upgrade | ◆ 40·L + 8·L RF (RF burned) |
| Gear craft | ◆ 30 + 4 RF (RF burned) |
| Expeditions | Shards, fame, gear. **No RF** |
| Season fund | Weekly 50/30/20 to the top guilds by fame |
| Starting balance | 150 RF, simulated, per session |

- **Backing:** the game mints no RF. Shards and gear are never redeemable for RF, so no prize backing is required.
- **Simulator, default settings** (1,000 players, 3 expeditions a day, 30 days, assumed generation mix skewed toward Gen 5–6):
  - about 2.51M RF spent: ≈765K burned and ≈1.53M paid to Friend owners;
  - the average fee settles from 8.7 to 12.4 RF;
  - a listed Gen 1 Friend earns ≈198 RF/day, a Gen 6 ≈56 RF/day;
  - the top 10% of Friends earn about 18% of owner income;
  - Shard supply levels off;
  - the conservation check passes.
- **Chance-game API:** the SDK's chance game is not used. The required `game.json` carries **unused schema-only terms**: a 1 RF token with a single 10,000 bps reward of 1 RF, both `1000000000000000000` base units.
- **Going live** needs custom integration beyond v0.1.4, which has no hire, listing, currency or persistence API:
  - a GuildHire contract (`hire` pays 70% to the canonical wallet, burns 20% and sends 10% to the season);
  - a game server for Shards and fame;
  - a legal review of holder earnings.

## Relation to the protocol's 50/50 rule

The Rare Friends protocol splits activation, hardwire, promote and upgrade payments 50% burned / 50% RF rewards for Friends' NFT wallets ([source](https://iq.wiki/en/wiki/rare-friends)). Friend Guild's hire split is **70% to the hired Friend's own wallet, 20% burned, 10% to the season fund** (workshop RF is 100% burned): a hire is a service paid to one specific Friend, so its wallet gets the largest share, unlike protocol-level upgrades. A **protocol-aligned variant** (50% to the hired Friend's wallet, 50% burned), run with the model's split parameters on the same Baseline, spends the same 2,509,709 RF but burns 1,419,482 (56.6%) and pays owners 1,090,226 (43.4%): Gen 1 vs Gen 6 wallets earn 141.5 vs 39.7 RF/day. The default stays 70/20/10 ([details](https://github.com/Fablizio/friend-guild/blob/79689bcab4075854cb9e9ba1469415a472aa7aa7/games/friend-guild/ECONOMY.md#relation-to-the-protocols-5050-rule)).

## Stress-tested economy

- **Model:** players join and leave the simulator each day, and the listed-Friend pool follows them. RF conservation and determinism still hold.
- **Scenario presets** (1,000 players, seed 42, 30 days):
  - **Baseline:** 765K RF burned (30% of RF spent). A listed Friend earns about 64 RF/day, and a player spends about 84 RF/day.
  - **Bear market:** players fall 1,000 → 413. The daily burn falls 52% from its peak, but a listed Friend still earns about 36 RF/day, because the listed pool shrinks too.
  - **Hype:** players grow 1,000 → 4,115, and the daily burn grows from 33K to 104K RF.
  - **Whales:** 5% of players spend 16% of all RF, and the top 10% of Friends still earn only 18% of owner income.
  - **Bot attack:** self-hiring bots lose 30% of what they spend (burn plus season). A per-Friend hire cap of 3 a day cuts wash volume by 63%.
- **Flow diagram:** RF flows are shown in the game and as a Mermaid chart in ECONOMY.md.

## Checks, credits and limitations

- **Passed:**
  - `npx friendsdk check games/friend-guild`: valid.
  - Strict `tsc -p games/friend-guild/tsconfig.json`.
  - `npm test` (SDK): 116 passed, 2 skipped. `npm run typecheck` passes.
- **Model checks** (`node games/friend-guild/tests/run-econ.mjs`): 17 passed. Fee splits and growth/churn conserve RF, the model never mints RF and is deterministic, a higher burn burns more, earnings stay spread, Shard supply is bounded, all presets run, the bot attack is net-negative for the attackers, the hire cap limits wash volume, fees scale with the generation tier (a Gen 1 wallet gets 3× a Gen 6's at equal demand) and the model with a generation mix still conserves RF.
- **Browser check** (`node games/friend-guild/tests/browser.mjs`): the real SDK runtime in headless Chromium with the SDK's mock wallet and RPC fixtures, extended for the artwork registry and for `generation(id)` inside Multicall3 (including failed reads, which fall back to ×1). It checks the tier badges and walks guild → hire two → launch → skip → result → workshop → economy on desktop and phone layouts, with no browser errors.
- **Real-wallet playtest:** done by the builder with a hardwired Generation 6 Friend.
- **Known check failure:** the stock `npx friendsdk test` fixture only answers artwork reads for sample Friend #7730, so it rejects the tavern's roster reads by design.
- **Limitations:**
  - Other guilds and their hires are simulated in the browser, and hires are non-exclusive.
  - No persistence: the session resets on reload.
  - The simulator is a model with stated assumptions, not a forecast.
  - Tavern Friends depend on the public Robinhood RPC, and a failed read shows Retry. Generation reads are best effort (×1 on failure).
  - The tavern cast is sampled from token IDs 1–100,000; hardwired Friends also exist above that range (e.g. #332833 is a Gen 6).
- **Credits:** code and design by Fablizio (AI-assisted). Scenery is drawn in code. Character art: canonical Rare Friends Generations sprites via the FriendSDK sprite reader. Sounds come from the FriendSDK sound kit (see the SDK `NOTICE.md`). The same builder's other entries are *The Binding of RareFriend* (#84, Character Spotlight) and *Daily Crypt* (#85, Token Activity). No trading, wearable NFTs, creator fees or live economy. Production publication needs separate Rare Friends review.
