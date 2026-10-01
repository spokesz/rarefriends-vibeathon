# Friend Rooms

**Try it now: https://khunchan.github.io/friendsdk/** (simulated; you need a browser wallet holding a hardwired Rare Friends Generations NFT, generation 1 or higher, on Robinhood mainnet)

1. Connect your wallet and choose your Friend.
2. Walk to the **Room 100 RF** door (WASD, arrow keys or tap) and press E.
3. Pick how many games, press **Play**, confirm the two SDK prompts and watch your Friend play at the table.

Walk your Rare Friend to a room door, then watch it play a ten-seat number table on its own: the highest number wins, and each ticket carries a 10% table fee that is burned in the model.

**Builder:** [khunchan](https://github.com/khunchan) · **Contact:** GitHub [@khunchan](https://github.com/khunchan) · **Category:** Economy Potential (also relevant: Token Activity and Character Spotlight) · **SDK:** FriendSDK v0.1.4

**[Playable preview](https://khunchan.github.io/friendsdk/)** · [Source code](https://github.com/khunchan/friendsdk/tree/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms) · [Game README with rules, measurements and Future SDK support](https://github.com/khunchan/friendsdk/blob/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/README.md) · [Notices](https://github.com/khunchan/friendsdk/blob/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/NOTICE.md)

## What it is

A black-and-white isometric hall with four doors. **Room 100 RF** works; Room 1,000, 10,000 and 100,000 RF are locked and say they need future SDK support. Behind the working door your Friend sits at a table with nine simulated bots. Everyone gets a unique number from 1 to 100 and the highest number wins the pot. You choose how many games to play, confirm two SDK prompts (buy the tickets, then use them), and your Friend plays them all. Numbers open one by one, bots from the lowest up and your Friend's number last, then the table shows how far short you were ("Your 87 — 5 short of 92").

**Everything is simulated.** No RF, private key or transaction signature is needed. Every amount is labeled SIMULATED.

## Playable preview

**https://khunchan.github.io/friendsdk/** is a static build of Friend Rooms (from commit `b9b0358`, GitHub Pages from my fork). You need a browser wallet holding a hardwired Rare Friends Generations NFT (generation 1 or higher) on Robinhood mainnet; the SDK verifies ownership before play. Everything is simulated, so no RF, private key or transaction signature is needed. The SDK panel says "Local preview": that is the SDK's label for its simulated mode. The Rare Friends team [welcomed this hosted preview](https://github.com/spokesz/rarefriends-vibeathon/pull/7#issuecomment-5748019728).

## Screenshots

![One game: the numbers open one by one, bots from the lowest up and the Friend last, then a win with HIGHEST! and +9 RF SIMULATED](https://raw.githubusercontent.com/khunchan/friendsdk/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/media/round.gif)

*One game at x1 speed: bots open from the lowest number up, the Friend's number opens last, then the win.*

| Hall with the working door and three locked doors | Table during the reveal (closed plates show ?) |
| --- | --- |
| ![The hall](https://raw.githubusercontent.com/khunchan/friendsdk/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/media/hall.png) | ![The table mid-reveal](https://raw.githubusercontent.com/khunchan/friendsdk/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/media/reveal.png) |
| **A win: HIGHEST! and +9 RF SIMULATED** | **Session receipt** |
| ![A win at the table](https://raw.githubusercontent.com/khunchan/friendsdk/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/media/win.png) | ![The session receipt](https://raw.githubusercontent.com/khunchan/friendsdk/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/media/receipt.png) |

*Captured from the game in the SDK's public runner with the SDK's mocked, read-only test wallet and its sample Friend #7730. The preview rolls are scripted (a loss, a win, a loss) so that a win can be shown; all amounts are simulated. The capture script is `capture-media.mjs` in the game folder.*

## How it uses Rare Friends

- **Character Spotlight (also relevant):** your own Generations NFT is the main character. It walks the hall and sits at the table, drawn from its canonical sprite (pixels never altered), labeled with its ID and SDK character family, and it reacts to wins and losses with effects drawn around the sprite.
- **Token Activity (also relevant):** the table fee is part of every game. Each 1 RF ticket splits at entry into 0.9 RF for the pot and a 0.1 RF table fee, which is burned in the model; the highest number takes the whole 9 RF pot. Autoplay turns two confirmations into many games, and a session receipt shows tickets spent, prizes won and the table fees burned in the model. SDK v0.1.4 does not burn RF, so this is a labeled model, not a claim of real burning.
- **Economy Potential (main category):** the game README describes how this becomes a real token economy: rounds started on a timer, made of tables of up to 10 seats and held in a contract; one allowance to sign up; a keeper that settles all tables of a round with one Dice randomness; a table fee taken at entry that pays gas and randomness with the remainder burned at once (a player left without an opponent gets the whole ticket back); several ticket tiers (the rooms are stake levels); and tournaments with an NFT prize. It also gives a minimum-ticket formula with an estimate, so the economics do not rest on a fixed price.

## Run it

Node.js 22+ on Linux or Ubuntu/WSL2, plus a browser wallet holding a hardwired Rare Friends Generations NFT (generation ≥ 1) on Robinhood mainnet (4663).

```sh
git clone https://github.com/khunchan/friendsdk.git
cd friendsdk
git checkout 2a14ebf507296d13fa2457fdf2aacfacd4873d09
npm ci
npm run dev:game -- games/friend-rooms
```

Open the printed URL (normally `http://localhost:4173`), connect your wallet and select your Friend. The SDK verifies ownership before play. To skip the setup, use the playable preview above.

## Play

Move with WASD, arrow keys or click/tap. Walk to the **Room 100 RF** door and press E (or tap its label). Pick how many games to play, then confirm the SDK prompts: one to buy tickets and one to use them. Watch the table, choose x1, x2 or **Skip to summary**, or **Stop after this game** and **Resume** later. Open **Session receipt** when you like, and press **Collect winnings** to move prizes to your balance. A Sound button in the top bar and Settings turn sound on and off (it starts off), Settings has reduced motion, and everything stays inside the SDK's 960 × 640 container.

## Rules and rewards

Everything is simulated. The SDK preview wallet is fixed at 20 RF, so the room runs at 1/100 of its design size: a "Room 100 RF" ticket costs **1 RF** in the preview. One run is limited to 11 games by the SDK's prize backing (each ticket reserves 9 RF).

| Result | Chance | Prize |
| --- | ---: | ---: |
| Highest number | 10% (1,000 basis points) | 9 RF |
| Lower number | 90% (9,000 basis points) | 0 RF |

Expected reward: **0.90 RF per 1 RF ticket** (90% return). The table has 10 seats (your Friend and 9 simulated bots), so one seat in ten holds the highest number. Each ticket splits at entry: 0.9 RF goes into the pot and 0.1 RF is a table fee, burned in the model. Ten entries fill a 9 RF pot and the highest number takes all of it. The SDK ticket result decides your outcome first, and the table is then dealt to match it; the numbers and bots are presentation only.

**Measured:** 9.89% win rate over 10,000 preview plays (95% interval 9.32% to 10.49%), 989 wins, 8,901 RF returned on 10,000 RF spent (89.01%). The run uses the SDK preview client with a fixed seed and is reproducible with `node games/friend-rooms/simulate.mjs 10000 20260920`; a unit test pins these numbers.

## Design decisions

- **Scale 1/100.** The SDK preview wallet is fixed at 20 RF, so "Room 100 RF" is played with 1 RF tickets. The ratios (a 10% table fee, a 9x prize) are the same as at full size.
- **The fee is separated at entry.** Each ticket splits into 0.9 RF for the pot and 0.1 RF for the table fee. The pot is known in full from the start, and in a future contract the fee pays the costs of a round before the rest is burned. Odds and amounts are the same as taking 10% at the end.
- **Bots are tokens, not Friends.** Neighbors are plain round tokens marked SIMULATED, so no Friend artwork is faked. In a real room they would be real Friends at the same scale.
- **Burn example (estimate).** At the 100 RF level a table of 10 players pays 100 RF in table fees. If the costs of that round are about $0.10 (about 32 RF at the estimated prices below), about 68 RF per table is burned, so 1,000 such tables burn about 68,000 RF. Estimate as of 2026-09-20; see "Minimum ticket size".
- **A tournament prize is always covered.** A tournament starts only with a minimum number of entrants, or its prize grows with the number of entry fees paid, so the prize never depends on money that has not come in.
- **Several accounts give no edge.** Sitting at a duel table against yourself is pointless: both seats have equal chances and the table fee is paid anyway. Every ticket keeps the same 90% average return, so extra accounts cannot beat the table.

## Future SDK support

**Roadmap in five steps**

1. **Duel:** two real players at one table of 2 (needs shared rooms and a room contract).
2. **Rounds on a timer:** tables of 2 to 10 for whoever has signed up, once the table fees cover the round's costs, with one keeper transaction and one Dice randomness per round.
3. **Stake levels:** the locked doors, Room 1,000 / 10,000 / 100,000 RF, become playable.
4. **Tournaments with an NFT prize:** a bracket of tables of 10 ending in a final table (needs wearable NFTs and NFT prizes).
5. **A Friend's own world as style:** the hall takes its look from the selected Friend's Scenery and Floor.

Friend Rooms is a preview. A real version needs: shared tables with real players, several ticket tiers, a room contract with one allowance, rounds started on a timer by a keeper bot with unattended settlement, seating at tables of 2 to 10 players, one Dice randomness per round, a table fee separated from the pot at entry that pays gas and randomness, with the remainder burned at once, reading shared round state from game code, a larger preview wallet, Friend traits (Scenery, Floor) as a style source, and, for tournaments with an NFT prize, wearable NFTs, NFT prizes and tournament contracts. The game README explains [how real Friends would join rooms](https://github.com/khunchan/friendsdk/blob/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/README.md#how-real-friends-join-rooms) (rounds on a timer, tables of up to 10, at least 2 players per table, one transaction and one Dice randomness per round), why a contract is better than a server, the tournament bracket, and the [minimum ticket size](https://github.com/khunchan/friendsdk/blob/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/README.md#minimum-ticket-size-estimate) formula. Rounds on a timer also help with liquidity at launch: a round starts as soon as its table fees cover its costs (about 4 players at the 100 RF level and 2 from 1,000 RF; estimate), instead of waiting for a full hall.

The economics are a formula, not a fixed price: a round is viable while (gas + RNG fee in ETH) × ETH price ≤ 10% × players in the round × ticket × RF price. The 10% table fee is taken at entry and first pays the round's costs, the rest is burned at once, and a player left without an opponent gets the whole ticket back. As an estimate as of 2026-09-20 (ETH about $2,450, 100,000 RF about 0.128 ETH from a community tracker, round costs about $0.10 assumed), a round of 10 players needs about 32 RF per ticket, so 1 and 10 RF are not viable and 100 RF is (about 3× margin, about 68% of the fees burned). At the 100 RF level a round needs about 4 players for the fees to cover the costs (2 players are enough from 1,000 RF, and a duel pays for itself from about 160 RF); smaller rounds wait for the next timer. The minimum is dynamic: the contract recomputes it before every round from the RF/ETH rate alone (gas and Dice are paid in ETH, so no dollar oracle is needed), and the game would show it at the door of each stake level.

## Checks and known issues

Run on 2026-09-29 with SDK v0.1.4 and Node.js 22: `npm test` (118 tests: 116 passed, 0 failed, 2 skipped because Foundry is not installed), `npm run typecheck`, `npm run check:games`, `friendsdk check`, `friendsdk test` and `npm run check:browser` (all SDK browser checks) pass. The game's own unit tests (9) and browser check pass at 1100 px and 360 px with the SDK's mocked, read-only wallet fixture, and the same mocked flow was run against the live preview. Manual check on the live preview with a real wallet, in a desktop browser and in a mobile wallet browser (Rabby): wallet on another network (Base) → Switch to Robinhood → pick a Friend → play. On the phone the top bar stays on one line and the whole table and buttons are visible. The builder played more than 40 games by hand with a real wallet and two Friends: Generation 2 (Cellular) and Generation 4 (Skeleton), on the v0.1.0 build, and has since played the rebuilt v0.1.2 and v0.1.3 previews by hand with a real wallet too, confirming v0.1.3's Friend-discovery fix on a real wallet.

Risks for wallets and funds: none known. Connecting a wallet only reads which Friends you own; the game never asks for a signature, a key or a transaction, and no funds are involved. SDK v0.1.4 also excludes unused live-transaction code from preview builds like this one, removing a wallet warning some browser wallets showed on earlier preview builds even though no transaction was ever requested.

Known limits: the preview wallet is fixed at 20 RF (hence the 1/100 scale and 11 games per run); bots, the shared table and the table fee burn are simulated; progress resets when the preview session ends; on a 360 px wide screen the SDK container is only 360 × 240, so the table is small. No trading, wearable NFTs, creator fees or live economy are included. Token Activity metrics are not claimed. Production publication needs separate Rare Friends review.

## Credits

Built on FriendSDK v0.1.4: its world renderer and scenery, canonical Generations sprites (read from the chain, never altered), sound kit and runtime. The pixel font, table scene, number plates, bot tokens, rules and code are original to this game. See the [notices](https://github.com/khunchan/friendsdk/blob/2a14ebf507296d13fa2457fdf2aacfacd4873d09/games/friend-rooms/NOTICE.md). Licensing: the SDK source is licensed under Apache-2.0 ([LICENSE](https://github.com/spokesz/friendsdk/blob/v0.1.4/LICENSE)); its [NOTICE](https://github.com/spokesz/friendsdk/blob/v0.1.4/NOTICE.md) covers the artwork. AI-assisted build (Claude Code).
