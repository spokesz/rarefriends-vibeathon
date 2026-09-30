# Cinder Crew

Your hardwired Generations NFT is the smith. The wallet's other Friends are the crew. You spend and burn simulated $RAREFRIENDS at the furnace.

Source: https://github.com/stevereynolds2006-ship-it/cinder-crew

**Builder:** Steven Reynolds · [GitHub](https://github.com/stevereynolds2006-ship-it) · [@Sharpbigred](https://x.com/Sharpbigred)

**Category:** Character Spotlight (also Token Activity and Economy Potential)

**Stack:** FriendSDK v0.1.4 (`game`, `sprites`, `wallet`, `owned`, `identity`) inside a Node 22 web app. The pit is a 960×640 stage scaled to the screen. It is not inside the FriendSDK sandbox frame, because the crew roster and burn ledger need the page around that stage.

## Run it

Node.js 22+.

```sh
git clone https://github.com/stevereynolds2006-ship-it/cinder-crew.git
cd cinder-crew
npm ci
npm run dev
```

Open the printed URL (normally `http://127.0.0.1:8080`).

Practice yard needs no wallet. It uses FriendSDK sample sprites for tokens #7730 and #3412, plus original stand-ins, and labels them as practice.

To play your own Friends, open the page in the MetaMask app browser, or in a desktop browser with the MetaMask extension. Tap **Connect MetaMask** and approve Robinhood mainnet (chain 4663). The app reads that wallet's Generations with FriendSDK and draws their canonical sprites. Purchases, redemptions, and burns stay simulated. No RF funding and no spend signature are required.

There is no separate static host. Friend reads and the furnace board run in this Node app, so `npm run dev` is the playable preview.

## Play

- Pick who stands at the furnace. The rest of the roster is crew.
- Kindle up to three crew for 0.25 RF each. That RF is burned. The attunement lasts one stoke. Lower generations widen the stamp more. Generation 1 widens it the most.
- Stoke spends 1.00 RF and starts the needle. Press Space or Stamp while it sits in the ember band. On a phone, tap the furnace or Stamp.
- The relic is already locked by the FriendSDK chance table. Timing does not change it.
- Redeem pays the relic's RF back to that Friend's simulated purse. Keep reserves it. Burn destroys the payout and grants forge heat.
- A perfect stamp doubles burn heat and builds a combo. A good stamp is 1× and holds the combo. A graze just outside the band slips the combo and is not a strike. A miss is ½ heat and a strike. Three misses crack the shift.
- At combo 3, white heat burns hotter. Every fourth stoke is a blaze: a faster needle and richer shift points.
- Bounties pay bonus points when you clear their goal. Post a callsign to the furnace board. Each callsign keeps only its best shift.
- Offering burns 1.00 RF for 4 heat and no prize.
- Board holds the leaderboard, kept relics, rules, and the motion toggle. Mute is in the header. In the MetaMask app browser the page fills the visible webview.

## Costs and rewards

**All balances, purchases, and burns are simulated.** Purse starts at 24 RF. The house float starts at 100 RF so the 6 RF maximum prize can be reserved. Expected redeem value is about 0.90 RF per ember. Chances sum to 10,000 basis points.

| Relic | Chance | Redeem |
| --- | --- | --- |
| Cinder Dust | 16% | 0 RF |
| Warm Coal | 27% | 0.25 RF |
| Bright Shard | 22% | 0.64 RF |
| Tempered Ingot | 16% | 1.00 RF |
| Crew Brand | 11% | 1.60 RF |
| Furnace Heart | 5% | 3.50 RF |
| Mythic Core | 3% | 6.00 RF |

Burns, simulated and permanent inside the local purse:

- Kindle: 0.25 RF destroyed per crew Friend, up to three per stoke.
- Offering: 1.00 RF destroyed, +4 heat, no relic.
- Scorch: the relic's redeem value is destroyed instead of paid. Dust still grants a little heat.

Ranks from lifetime burned RF on that Friend: Spark, Coalhand (1), Furnace Kin (5), Mythic Smith (15), Cinder Saint (40).

FriendSDK v0.1.4 can buy, play, settle, and redeem. It has no burn method. Cinder Crew follows that accounting for the ember and adds burn beside it. A production sink would burn RF from the Friend's canonical wallet on Robinhood Chain and leave redeem on the chance-game contract.

## Checks and known limits

`npx tsc --noEmit` passes. Ledger parity with FriendSDK `createGamePreview` and the shift rules are covered by `src/game/ledger.test.ts` and `src/game/shift.test.ts`. Production build and desktop/mobile browser checks passed in preview. A real MetaMask playthrough on Robinhood mainnet is still outstanding. Browser checks did not use a funded wallet.

- Economy is simulated on purpose. No live token leaves the wallet.
- Friend discovery depends on the public Robinhood RPC. A huge wallet can be slow or fail closed, the same as FriendSDK.
- Generation 0 Friends are hidden.
- Practice stand-ins are not NFTs. #7730 and #3412 art is SDK sample artwork, not proof of ownership.
- The furnace board is stored for this deployment. On a fresh `npm run dev` it starts empty and uses a local database.

## Credits

FriendSDK and the sample Generations sprites (#7730, #3412) are from [spokesz/friendsdk](https://github.com/spokesz/friendsdk). SDK code is Apache-2.0. SDK-supplied Rare Friends artwork is used under the SDK notice. Stand-in crew is original. No third-party sound files. Tones are synthesized in the browser.
