# Rumble Friends Club

Your Rare Friend is the fighter: read each challenger, pick a style, and wager simulated RF on how deep you can go, with a daily prize pot fed only by players and half of every payment burned.

**Builder:** [@0xdgw](https://x.com/0xdgw) · GitHub [@daweezy13](https://github.com/daweezy13) · **Category:** Economy Potential · **Stack:** Vite + TypeScript, Netlify Functions + Blobs; FriendSDK v0.1.2 used as a library (wallet, owned, identity, sprites), not the SDK game runtime

**Play:** **https://rumble-friends-club.netlify.app** · [Promo video](https://x.com/0xdgw/status/2104594732185948270) · [Source](https://github.com/daweezy13/rumble-friends-club/tree/4f1173c2ee93543e739cdc7d68b6af717602980f) · [Full rules and odds](https://github.com/daweezy13/rumble-friends-club/blob/4f1173c2ee93543e739cdc7d68b6af717602980f/README.md#rules-and-odds-exactly)

## Run it

Node.js 22+. A browser wallet on Robinhood mainnet (4663) holding a hardwired Generations NFT (generation ≥ 1), or no wallet at all with **Demo**.

```sh
git clone https://github.com/daweezy13/rumble-friends-club.git
cd rumble-friends-club
npm ci
npm run dev:api   # the ledger, in memory
npm run dev       # http://127.0.0.1:5180
```

**Browser wallet** reads your Friends through FriendSDK and asks you to sign one plain message (never a transaction) proving you hold the one you pick; the server verifies the signature and reads its owner, generation and family from the chain. **Demo** lends you a wild Friend at a generation of your choice on a separate demo ledger with its own board and pot.

## Play

Walk your Friend through level B2 of a parking garage (WASD, arrows or tap), give the doorman the password (the first regular you pass tells you; the doorman drops a hint after three wrong tries), and pick a wager. Each challenger shows what they will throw and your chance in each style: Brawler beats Grappler beats Boxer beats Brawler. Pick one, watch the fight (skippable), then walk away with your winnings or fight on; one loss ends the night. Between nights, train one style at the weekly camp, dress your fighter in kit, or leave a bet in the garage for another player to take. Sound, music and reduced-motion toggles; keyboard and touch; works on phones.

## Rules, costs and odds

**All balances, wagers, fees, bets and prizes are simulated.** Everyone gets 100 RF, topped up to 100 once a UTC day.

| | |
|---|---|
| Win chance | 65% base; ±5% per generation gap (rarer is stronger); +2% per camp session in that style; −10% on a champ (every 5th fight); +10% if your style counters what they throw, −10% if it walks into it. Opponents throw their lean 65% of the time (a champ 100%). Clamped 10–95%. |
| Payout | each win multiplies the wager by pay ÷ priced chance; priced chance includes everything known before the fight plus the best available counter; pay 90% easing to 96% (+1% per generation rarer than 6, capped at 96%). No fight returns more than 0.96 per RF wagered (tested across every case). |
| Score | 10 × fight number per win (×2 on a champ), plus 2 per point of chance under 50% on an upset. |
| Prize pot | half of every lost wager, camp fee, kit purchase and Lot cut; the other half burned. Midnight UTC: the top score among players with at least one win takes it; ties split it; otherwise it rolls over. House fighters never feed or take it. |
| Costs | wager 1–500 RF; camp sessions 5/10/15/20/25 RF (sessions per week: gen 1 five … gen 6 two); kit 5–25 RF (cosmetic); rename 5 RF (burned). |
| The Lot | bets of 5/10/25 RF; taker's chance 50% ±5% per generation gap (20–80%); taker puts in at the odds; winner takes both less a 10% cut. |

By simulation, a good player countering every fight averages about 2 wins a night at gen 6 and 5.5 at gen 1, and beats a random picker of the same generation about two nights in three.

## Checks, credits and limitations

`npm run typecheck`, `npm run test:unit` (39 tests: odds and pricing across every generation, style, lean, champ and camp level; a house-edge sweep; 800 fight scripts; the ledger including sign-in, the pot split and roll-over, the Lot, and race conditions under concurrency with fifty simultaneous players), `npm run test:e2e` (2 Playwright runs on a dev mock wallet), `npm run build`. All pass. The server's signature check was verified live against Robinhood mainnet; browser tests use a mock wallet.

Character art is the canonical Generations sprites via FriendSDK and the on-chain families registry (opponents and demo fighters are unminted registry seeds, never anyone's NFT). Everything else is drawn and synthesised in code. Fonts: Press Start 2P and Silkscreen (SIL OFL 1.1). Wallet risk: sign-in is a plain message only; the per-device key lives in browser storage. No contracts, transfers or live economy; Token Activity is not claimed. Production publication needs separate Rare Friends review.
