# Lemon Island Tycoon 🍋

![Lemon Island gameplay](https://raw.githubusercontent.com/bbczzzs/lemon-island/b3edd9e/media/lemon-demo.gif)

🎮 **Play: https://bbczzzs.github.io/lemon-island/** · 👀 **No wallet? [Preview page](https://bbczzzs.github.io/lemon-island/preview/)** · 📦 [Source](https://github.com/bbczzzs/lemon-island) · 📈 [Economy report](https://github.com/bbczzzs/lemon-island/blob/main/ECONOMY.md)

🎬 [Watch the full recording (MP4)](https://github.com/bbczzzs/lemon-island/blob/main/media/lemon-demo.mp4)

| Selling day | Lemon market | Evening report | Economy + live RF supply |
|---|---|---|---|
| ![Day](https://raw.githubusercontent.com/bbczzzs/lemon-island/b3edd9e/media/day.png) | ![Market](https://raw.githubusercontent.com/bbczzzs/lemon-island/b3edd9e/media/market.png) | ![Report](https://raw.githubusercontent.com/bbczzzs/lemon-island/b3edd9e/media/report.png) | ![Economy](https://raw.githubusercontent.com/bbczzzs/lemon-island/b3edd9e/media/economy.png) |

**Project name**
Lemon Island Tycoon

**Builder / contact**
Ishan · GitHub [@bbczzzs](https://github.com/bbczzzs)

**Category**
Economy Potential

**One sentence**
Your Rare Friend opens a lemonade stand on a beach island and grows it into a juice empire: real Generations Friends walk by and decide whether your price is worth it, lemons trade on a player-driven market, every build burns RF, wages flow into other Friends' wallets, and a 30-day simulation of the game's own code shows the economy works (all RF simulated in this preview).

**What did you build?**
A tycoon where the economy is the gameplay you watch. Each day lasts about 36 seconds:
1. **Morning.** Check the weather, buy lemons on the shared market (1 lemon = 2 cups; every lemon bought today pushes the price up for everyone) and set your cup price.
2. **Open.** Real Rare Friends arrive by ferry and walk the boardwalk. Each has a thirst point and a price they'll pay today (weather, reputation, tourists). Cheap enough and they queue, then walk off holding a lemonade; too pricey and you get "TOO $$$"; run out and it's "SOLD OUT". A mood meter and a one-line hint ("Too pricey! Friends pay ~0.90 today") tell you what to fix.
3. **Evening.** A report card shows cups, sales, lemons squeezed, rot, wages and profit. A quarter of leftover lemons rot overnight, so stocking is a forecast.
4. **Grow.** Reinvest in more **Lemon Stands** (Friends get thirsty at different points, so stands spread along the beach catch more of them), an **Ice Pop Cart** (1.4× price, loves heatwaves), a **Juice Bar** (2× price, 2× lemons), **Umbrellas**, **Big Jugs**, a **Neon Sign**, a **Lemon Grove** (12 free lemons a day) and a **Tour Balloon** (+35% tourists). Every extra stall needs a real Friend hired to run it.
5. **Island events** on about half the days ask for a decision: a **cruise ship** (bigger crowd; tourists in straw sun hats pay 30% more), a **lemon shortage** (+40% lemon price), a **rival stand** (Friends pay 15% less: price war), a **food critic** (end the day HAPPY for +10% reputation, or lose 5%). Every 7th day is a **Festival**.
6. **Eight island goals** (Grand opening, Lunch rush, In the black, Crowd pleaser, Tourist trap, Team player, Fire starter, Juice empire) each pay +5% reputation, never RF. Goals and good days end in fireworks over the sea.

The look follows the FriendSDK style (paper, ink, `GAME_PALETTE`, square corners, hard shadows) on a pixel beach with a ferry dock, lighthouse, palms, a sunset over the sea and lanterns at night. All UI icons are pixel art drawn in code (no emoji), buttons press down like keys, and the button to press next blinks.

**How does it use Rare Friends?**
- **Your verified Friend owns the island** and runs the first stand. The SDK handles the wallet, Friend selection and the ownership gate, and the sprite is read with `createFriendReader()`.
- **The crowd, farmers, helpers and rival tycoons are real Generations Friends**, drawn from their canonical on-chain sprites (baked into the build). Tourists' straw hats sit on each Friend's own head; Friends stay canonical black and white.
- **RF lands in real Friends' wallets:** half of every lemon purchase goes to the farmer Friends, and helper wages go straight to the hired Friend.

**The economy (why it fits Economy Potential)**
RF is never minted by the game. Every flow moves RF between players and Friends, or burns it.

| Flow | Rule |
|---|---|
| **Cups** | Friends pay your cup price |
| **Lemons** | Shared market, 0.50 RF base, +0.25% per lemon bought today, moves overnight with total demand (you + rival tycoons), shocks on heatwaves, blight and shortages. **50% burned, 50% to the farmer Friends' wallets** |
| **Stalls & upgrades** | 25–200 RF. **50% burned, 50% to active Friend rewards** (the Rare Friends 50/50 gameplay-payment rule) |
| **Helpers** | 1.5 RF/day per extra stall, **straight into the hired Friend's wallet** |
| **Spoilage** | 25% of leftover lemons rot overnight: a sink that punishes over-buying |

**Proven in simulation.** `npm run economy` plays the game headlessly with its own crowd sim, market, ledger and events: 4 strategies × 25 seeds ([ECONOMY.md](https://github.com/bbczzzs/lemon-island/blob/main/ECONOMY.md)).

| Strategy (30 days) | Cups | Daily sales, week 4 | RF on day 60 | RF burned | RF to other Friends |
|---|---:|---:|---:|---:|---:|
| **Steady** (in-game "good price", reinvests) | 945 | 65.6 | **1,519** | **591** | **723** |
| Bargain (30% cheaper) | 1,164 | 59.7 | 800 | 573 | 696 |
| Greedy (40% pricier) | 364 | 28.1 | 235 | 286 | 373 |
| Saver (never builds) | 372 | 15.4 | 677 | 80 | 80 |

- **Pricing is a real decision:** overcharging sells 61% fewer cups; undercharging sells more but earns less.
- **Investing pays like a tycoon should:** builders overtake savers on day 36 and end day 60 2.2× richer.
- **Sinks scale with success:** the builder burns 7× more RF than the saver. No run went broke.

**Paired with the real $RAREFRIENDS token.** The in-game Economy sheet reads the live RF `totalSupply()` on Robinhood mainnet (one read-only call, on demand; token address from the FriendSDK deployment config: 948,594,402 RF on 2026-09-29) and shows what 100 / 1K / 10K steady players would do: **10,000 players burn ~5.9M RF and pay ~7.2M RF to other Friends a month, about 7.5% of the live supply burned a year.** The sheet also shows a 30-day forecast chart and every RF flow of your session.

**What would be on-chain?**
Nothing in this build: no contracts or transactions, as the vibeathon asks. Going live would need:
- a shared lemon market contract (price impact from all players' buys, 50% burned through the RF token's `burn()`, 50% streamed to farmer Friends);
- stall and upgrade payments through the Rare Friends 50/50 gameplay-payment rule;
- helper wages as direct transfers to the hired Friend's wallet;
- cup sales from real players' Friends visiting each other's islands.

**Costs and rewards**
All balances, purchases and wages are **simulated demo RF** (100 to start), labelled in the UI. Lemons 0.50 RF base (market-driven). Builds: Lemon Stand 30 · Ice Pop Cart 55 · Juice Bar 120 · Umbrellas 25 · Big Jugs 35 · Neon Sign 45 · Lemon Grove 150 · Tour Balloon 200 RF. Wages 1.5 RF/day per helper. No chance-game payouts: weather, events and the crowd use a seeded PRNG; goals pay reputation, never RF.

**Controls**
Space: open the day / next day · **[ ]**: change price · M: sound. Everything also works by tap, with a phone layout. The reduced-motion toggle follows the system setting. The runtime's pause freezes the day.

**Playable demo / how to run**
https://bbczzzs.github.io/lemon-island/ (GitHub Pages) requires a browser wallet on **Robinhood mainnet (4663)** holding a hardwired Generations NFT (generation ≥ 1). This is the SDK's standard gate. Connecting only reads: no RF, signatures or transactions. The only chain call the game makes itself is the on-demand read-only RF `totalSupply()`. For anyone without a wallet: the [preview page](https://bbczzzs.github.io/lemon-island/preview/), GIF and MP4 show gameplay.

Built with **FriendSDK v0.1.4** (rebuilt 2026-09-29). v0.1.4 fixes the "Could not load this account's Friend transfers" error that v0.1.2 games now hit, because the public Robinhood RPC rejects log reads spanning more than 10,000,000 blocks. Checked against the live RPC: a real holder's Friends load and the game opens.

```sh
git clone https://github.com/bbczzzs/lemon-island && cd lemon-island
npm install
npx friendsdk dev games/lemon
npm run economy   # regenerates ECONOMY.md from the game's own sim
```

**What have you tested?**
All of these pass:
- `node test-interaction.mjs` at **960 px and 390 px**, in the real sandboxed runtime with the SDK's mock wallet: buying lemons (balance falls by exactly the quoted cost), changing the price, opening the day, pausing and resuming via the runtime menu, cups selling, the evening report, building a stall, hiring a Friend to run it, the Economy sheet (burn split, leaderboard), the goals sheet (first sale earns a trophy), the next morning and the sound toggle. No browser errors.
- `npm run typecheck`: strict TypeScript, 0 errors.
- `npx friendsdk check games/lemon` (valid) and `npx friendsdk test` at 1200 px and 360 px.
- `npm run economy`: 4 strategies × 25 seeds × 60 days, deterministic.
- The live RF supply read was checked against Robinhood mainnet; the public Pages build and preview load with no errors.
- **Real-wallet playtest: done** by the builder on the public GitHub Pages preview (Robinhood mainnet, owned hardwired Generations Friend).

**Known limitations**
- The crowd, rival tycoons and farmer purchases are simulated (the SDK has no multiplayer or shared state); they are labelled as such.
- `game.json` holds the placeholder chance-game definition the runtime schema requires. Lemon Island runs its own documented ledger (`economy.ts`).
- Progress resets on reload (no SDK storage).
- The GIF and screenshots come from a local harness mounting the same game component (the wallet screen isn't shown).

**Credits**
All scenery, pixel UI icons, particles and UI are drawn in code, and all audio is synthesized with WebAudio. Friend sprites are canonical Rare Friends Generations artwork via FriendSDK (`NOTICE.md`). The palette is FriendSDK's `GAME_PALETTE`. Fonts: Silkscreen, Sometype Mono and Archivo (SIL OFL, bundled). Built with Claude Code.
