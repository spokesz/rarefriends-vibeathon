# Sparking Stars

**Builder / contact:** Le Bûcheron ([lebucheron on GitHub](https://github.com/lebucheron)). Please contact me through this submission's PR.

**Category:** Character Spotlight

A monochrome time-trial game starring your own Rare Friend, with six generation-linked island circuits, public leaderboards and cosmetic progression.

## Play and presentation

- **[Play the public beta](https://lebucheron.github.io/sparking-stars/)**
- **[Five-slide presentation (PDF, French)](./Sparking-Stars-Presentation.pdf)**
- **[Source snapshot](https://github.com/lebucheron/sparking-stars/tree/16996f4)**, on `server/leaderboard-foundation`. Please use this snapshot rather than the repository's older default branch.
- FriendSDK **v0.1.2**, React/TypeScript and a custom Supabase leaderboard/style service. AI-assisted development with Codex. The game UI is in French.

## How it uses Rare Friends

The owned Generations NFT is the playable character. Its original SDK sprite remains visible under optional cosmetic overlays. The official SDK handles wallet connection, Friend selection and ownership eligibility. The NFT's real generation selects the circuit and its official tier unlocks equipment options. Tier upgrades are not sold in this game.

| Generation | Circuit |
|---|---|
| 1 | La Citadelle |
| 2 | La Fabrique |
| 3 | Les Ruines |
| 4 | Les Canaux |
| 5 | La Carrière |
| 6 | Le Jardin |

These are original game circuits, not a claim about official Rare Friends land dimensions.

## Requirements and a quick playthrough

Use a browser wallet owning a **hardwired Generations NFT, generation 1 or higher, on Robinhood mainnet (chain 4663)**. The gate also applies to simulated previews. The public host uses an injected wallet when available, or MetaMask Connect EVM 2.1.1 to connect the mobile app while keeping gameplay in Chrome. No RF funding, private key entry or transaction is required. Ranked login asks for a free message signature, not a token approval or payment.

1. Open the demo, connect through the SDK and choose your eligible Friend.
2. Start **Entraînement**. Move with arrows, WASD, ZQSD or click/tap. Clicks move directly and stop at obstacles, so choose detours yourself.
3. Collect every numbered star in order, then return to the finish. Going off-road slows movement.
4. In **Modes**, choose **Compétition**, use **Activer le classement** to sign in, then start a race. All stars are required, with no consumable bonus or gifted tier star.
5. Open **Chronos** and the public leaderboard. Rankings separate generation, feet/rollers/kart and daily, weekly or monthly UTC periods. Equal millisecond times share a rank.
6. Visit **Boutique** for cosmetic progression. Training also offers a personal best ghost, kept for the current session.

The creator challenge uses the current accepted GEN 3 walking best of Friend #331213. A real-wallet player completed and published **15.620 s** on the Ruines circuit on September 26. This is a dated example, not a fixed future leaderboard claim.

## Exact costs and rewards

**No real RF costs, redemptions, token transfers, financial prizes or revenue claims.** The beta has two distinct nonredeemable currencies. Random outcomes are not used.

### Local free-race garage

Start with 300 test coins. Coins and garage purchases reset on reload or Friend change. A completed free race grants `30 + 5 × level + medal bonus` once, where `level = 7 − GEN` after the circuit reversal. Medal bonuses are gold 35, silver 20 and bronze 10. For route length D and equipment pace P, the gold threshold in seconds is `round(((D / 170 × 1.65 + level × 0.25) / P) × 10) / 10`; silver is gold × 1.3 rounded to one decimal. These provisional targets need more player balancing. Training and ranked races do not award test coins.

| Item | Base test-coin cost | Effect / requirement |
|---|---:|---|
| Boost | 25 | +60% speed for 3 seconds, one successful activation consumes one |
| Breaker | 30 | Removes the nearby start barricade within 85 world units, one successful activation consumes one |
| Rollers | 180 | Tier 2+, pace 1.20, three equipped free-race starts per session |
| Kart | 450 | Tier 4, pace 1.45, three equipped free-race starts per session |

Walking pace is 1.00 and walking starts are unlimited. Only one consumable can be equipped and used once per free race (Space or the on-screen button). Restarts consume equipment energy. Tier 1+ gives one intermediate star in free mode only. Tier 3+ discounts garage prices by 20%, rounded up, with no stacked discount. Training does not spend energy or grant rewards. Ranked categories have fixed equipment pace and exclude consumables and tier shortcuts.

### Saved Constellations collection

The free mini-season runs from September 26, 2026 00:00 UTC to October 24, 2026 00:00 UTC exclusive. Each Friend earns 10 style stars for each of its first three accepted ranked races per UTC day. Additional races still count toward the season's lap milestones. There is no daily cap on playing ranked races.

Milestones unlock a stellar crown after 1 race, a moon halo after 5 and a comet trail after 10. The style shop sells a comet cap for 30 stars, double eclipse for 50 and orbital trail for 60. All are visual only. Balance, collection and outfit follow the Friend and persist through the server. No paid pass, tradable accessory NFT or RF conversion exists. The first collection remains available after the season. Four launch looks are also available locally for free.

## Source, setup and checks

Node.js 22+, npm and Git are required. Windows development uses Ubuntu in WSL2.

```sh
git clone --branch server/leaderboard-foundation https://github.com/lebucheron/sparking-stars.git
cd sparking-stars
git checkout 16996f4
npm ci
npm run build
npm run dev:game -- games/sparking-stars --port 4174
```

Open the printed local URL. This standard SDK preview supports local play but does not include the custom production leaderboard host. Use the hosted beta to review live ranked play and saved cosmetics.

`node scripts/build-sparking-public.mjs` builds the custom host to `build-public/` and regenerates the shared race-rules version and server validator. Backend source, migrations and deployment notes are in [`supabase/`](https://github.com/lebucheron/sparking-stars/tree/16996f4/supabase). A separate backend deployment requires a Supabase project and matching endpoint, origin and signature-domain configuration. The published configuration targets the hosted beta. No service credentials are included in the repository.

Validation completed during development and release:

- Strict TypeScript checks for the game and custom host, SDK game validation and production build.
- 36 complete physics traces across six circuits, three equipment categories and two frame rates. Invalid speed, teleportation, missing stars and malformed traces are rejected.
- Desktop/mobile browser tests for actual race traces, leaderboard publication, ghost replay, direct pointer controls, breaker use without reloading and cosmetic restoration.
- Generation/tier identity tests and fail-closed RPC error behavior.
- Responsive layout tests at 1440×1000, 1366×768 and 390×844, including keyboard access and fullscreen.
- SQL transaction tests with rollback for idempotency, permissions, purchases and daily style limits. Live API tests reject unauthenticated actions and forged authentication without inserting test scores.
- A real-wallet playthrough and published score supplied by the builder. Mock identities and RPC responses are restricted to automated tests.

Representative commands: `node server/test-validation.mjs`, `node server/test-public-browser.mjs`, `node server/test-live-api.mjs`, `node server/test-season-browser.mjs`, `node server/test-presentation.mjs`, `npx friendsdk check games/sparking-stars`.

## Known limitations and integration notes

- This is a beta. Server checks validate trajectories, not human play. Bots and synthetic valid traces remain possible, so no financial prizes are offered. Active time excludes pauses.
- Personal ghosts, local records and free-mode garage state are session-only. Ranked scores and Constellations progress persist. New circuit rules start a separate leaderboard while retaining old stored results.
- The public host uses a responsive viewport and desktop frame rather than a fixed 960×640 frame, following the SDK's documented custom host sizing. The Vibeathon README still mentions 960×640. This sizing difference is disclosed for organizer review. Gameplay stays in the SDK sandbox, with wallet controls and signed-login/capture controls in the trusted host.
- The leaderboard bridge is a custom application extension, not a claimed built-in SDK persistence API. Server credentials stay server-side. Ranked/style availability depends on the hosted backend and RPC services.
- No audio is included. Reduced-motion settings are respected. The Chrome-to-MetaMask relay also handles ranked message signing. Its Android app round trip still needs player confirmation. Return to the existing Chrome tab manually if Android does not switch back automatically.
- The SDK-required `game.json` retains an unused chance-game schema. No pack purchase/play/redeem actions are invoked. Its payout table is not the racing economy described above.
- This entry targets Character Spotlight. There is no implemented RF-backed economy or token spending. Any future paid season or RF integration would require separate design and review.

## Credits

Original circuit layouts and racing rules by Le Bûcheron with AI coding assistance. Scenery, original Friend artwork and adapted rendering come from FriendSDK. See the source snapshot's [NOTICE.md](https://github.com/lebucheron/sparking-stars/blob/16996f4/NOTICE.md) and [Apache-2.0 license](https://github.com/lebucheron/sparking-stars/blob/16996f4/LICENSE). Screenshots in the presentation come from the project. No third-party music is used.

The ranked login bar now appears only for authenticated actions and hides after login or when returning to training. Dependency audit reports a moderate transitive uuid advisory (GHSA-w5hq-g745-h8pq) in the current MetaMask dependency chain, with no fix offered by npm for that chain. The adapter does not directly use the affected v3/v5/v6 buffer APIs.

