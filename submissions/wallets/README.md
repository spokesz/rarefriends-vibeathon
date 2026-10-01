# WALLETS

This Friend is the wallet. Scoop simulated $RAREFRIENDS and burn them as FriendSDK chance capsules to phase through five strata. Ash does not come back.

**Play:** https://stevereynolds2006-ship-it.github.io/cinder-crew/wallets/

**Source:** https://github.com/stevereynolds2006-ship-it/wallets/tree/18f4e07a57dc94e5574e15d8b4d502fb3a003105

**Builder:** Steven Reynolds · [GitHub](https://github.com/stevereynolds2006-ship-it) · [@Sharpbigred](https://x.com/Sharpbigred)

**Category:** Token Activity (also Economy Potential)

**Stack:** FriendSDK v0.1.4 (`@rarefriends/friendsdk/game`, wallet, owned friends, and sprites) inside a Node 22 web app. The dive is a full-screen canvas, not the FriendSDK 960×640 sandbox frame. Connect a wallet and the diver is that Generations NFT. With no wallet, the diver is original geometric art. Every burn goes through the SDK preview client (`buy`, `play`, `settle`, `redeem`).

## Run it

Node.js 22+.

```sh
git clone https://github.com/stevereynolds2006-ship-it/wallets.git
cd wallets
git checkout 18f4e07a57dc94e5574e15d8b4d502fb3a003105
npm ci
npm run dev
```

Open the printed URL (normally `http://127.0.0.1:8080`).

Burns and balances are simulated. Connecting a wallet does not sign a transaction or spend RF. It reads the Generations NFTs that wallet holds and draws that Friend.

**Playable preview:** https://stevereynolds2006-ship-it.github.io/cinder-crew/wallets/

## Play

- Connect wallet, under the title, reads the Friends you hold. Pick a Friend, then Dive. That NFT is the diver. Dive asks MetaMask once for 10 RF from the connected account into that Friend. Burns during play do not open the wallet. Disconnect wallet forgets the Friend on this page and does not spend RF. Prizes are not paid back in RF. The stand-in still uses simulated coins.
- Start with nothing selected dives as the stand-in, strata 01, RAIN, with 22 simulated RF.
- Steer with A and D, the arrow keys, the on-screen chevrons, or by dragging. A and the left chevron turn left.
- W or up boosts. S or down brakes.
- Space, K, or BURN spends 1 RF on a Burn Capsule and phases you. While phased, hazards pass through you and nearby RF is pulled in.
- Reach the end of a stratum only after you have burned that stratum's quota. The seal then cracks and the next stratum starts. Five strata end at GARGANTUA.
- Three hits collapse the dive. Coins add RF to the pocket. A dry pocket refuses the next burn until you scoop more.
- Mute and reduced motion are on the menu. Escape pauses.

## Costs and rewards

**All balances, purchases, and returns are simulated.** Capsule price is 1 RF. You start with 22 RF. Expected return is 0.30 RF per capsule, so the expected sink is 0.70 RF. Chances sum to 10,000 basis points.

| Outcome | Chance | Comes back |
| --- | --- | --- |
| Ash | 55% | 0 RF |
| Cinder | 25% | 0 RF |
| Echo | 15% | 1 RF |
| Drip | 5% | 3 RF |

Strata burn quotas: RAIN 6, GRID 10, WAVE 14, TESSERACT 18, GARGANTUA 24.

FriendSDK v0.1.4 settles each capsule on a preview ledger with a shadow balance so the client can buy, play, settle, and redeem. The number on screen is the 22 RF stipend plus scooped coins, not that shadow balance. A production sink would burn RF from the Friend's canonical wallet on Robinhood Chain.

## Checks and known limits

`node --experimental-strip-types --test src/game/sim.test.ts` — 6 tests, all passing (Ash sink, Drip redeem, empty-wallet refusal, A turns left, seal stays shut until the quota, strata 01 cracks after the quota). `npm run pages` builds the static preview.

- Economy is simulated on purpose. No live token leaves a wallet.
- Connect reads ownership and the canonical Generations bitmap. It does not sign a burn.
- Without a wallet, the diver is original art.
- The stage fills the visible screen, including the MetaMask browser's fullscreen control.
- Best score and lifetime burn stay in this browser.

## Credits

FriendSDK v0.1.4 from [spokesz/friendsdk](https://github.com/spokesz/friendsdk). SDK code is Apache-2.0. A connected diver uses that Friend's canonical Generations bitmap. Scenery, the stand-in, and tones are original.
