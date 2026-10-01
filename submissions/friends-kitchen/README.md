# Friend's Kitchen

Your Rare Friend runs a cafe. Cook the order, then spend the simulated RF customers pay so the kitchen can stay open.

**Builder:** [Trislit / @trislit](https://github.com/trislit) · **Category:** Economy Potential · **SDK:** FriendSDK v0.1.4

You play as your own Generations NFT, using its original character artwork. The preview till is simulated. Ingredient orders, heat lamps, and a tip jar are priced in RF, and a bad plate pays too little to restock. [Source code](https://github.com/trislit/friends-kitchen) · [Playable preview](https://trislit.github.io/friends-kitchen/) · [Menu](https://github.com/trislit/friends-kitchen/blob/main/game/game.json) · [Notices](https://github.com/trislit/friends-kitchen/blob/main/NOTICE.md)

## Run it

Use Node.js 22+ and a browser wallet holding a hardwired Rare Friends Generations NFT (generation ≥ 1) on Robinhood mainnet (chain 4663).

Play it here: [https://trislit.github.io/friends-kitchen/](https://trislit.github.io/friends-kitchen/)

Or run it locally:

```sh
git clone https://github.com/trislit/friends-kitchen.git
cd friends-kitchen
npm ci
npm run dev
```

Open the printed URL, normally `http://127.0.0.1:4173`, connect your wallet, and select your Friend. The SDK verifies ownership before play. No RF funding or transaction signature is needed for this simulated preview.

## Play

You look over your Friend's shoulder. Left and right arrows, or A and D, move between the refrigerator, prep table, menu book, serving counter, and order computer. E, Up, or a tap uses the station. Customers arrive in waves of 2 or 3. About one wave in five is a lunch rush of 5. After the counter clears, it stays quiet for 20, 28, or 36 seconds. Each customer has a name, calls out a dish, and keeps a different timer. A finished dish that matches an order is handed to that person. Settings include mute and reduced motion. Everything stays inside the SDK's 960 × 640 container.

## Rules and rewards

**All dish payments, ingredient orders, and counter purchases are simulated.** Cash starts at 0 RF. The fridge starts with one of each ingredient. After that, replacements come out of what customers have paid.

| Dish | How often | Full tab | Wrong plate |
|---|---:|---:|---:|
| Toast | 28% | 1 RF | 0.25 RF |
| Garden Tea | 22% | 1.50 RF | 0.375 RF |
| Miso Soup | 16% | 2 RF | 0.50 RF |
| Friend Sandwich | 12% | 3 RF | 0.75 RF |
| Night Noodles | 10% | 4 RF | 1 RF |
| Curry | 7% | 5 RF | 1.25 RF |
| Banquet | 3% | 8 RF | 2 RF |
| Signature Special | 2% | 12 RF | 3 RF |

A correct fresh plate averages **2.52 RF**. From 45 seconds on the pass that pay is cut in half, and after 75 seconds the dish pays nothing. Bread, butter, tea, and vegetables cost 0.50 RF. Broth, noodles, spice, and rice cost 1 RF. Toast's ingredients cost 1 RF to replace, and a wrong Toast pays 0.25 RF, so a bad plate can leave you unable to cook it again.

A heat lamp costs 2 RF, up to two. Each one adds 30 seconds before a dish turns and before it spoils. A tip jar costs 2 RF, once. It raises a quick correct tip from 45% to 60% and a late tip from 15% to 25%.

In a live version, those computer purchases would spend RF from the player or the Friend's wallet. Half of each purchase can burn and half can fund rewards, and dish tabs can pay the cooking Friend. This preview does not do that. Token Activity is not claimed.

## Checks, credits, and limitations

Run `npm test`, `npm run typecheck`, `npm run check:games`, and `npm run build`. For desktop and mobile browser checks, run `npx playwright install chromium` then `npm run check:browser`. Those checks passed, including cook, serve, pay, restock, mute, and reduced motion at desktop and phone widths. Browser checks use the SDK's mocked wallet. A real-wallet playthrough is still outstanding.

Kitchen surfaces, customers, the notebook, the computer, the counters, and the music loop are original. The Friend uses canonical Generations sprites. Cue sounds are the FriendSDK v0.1.4 kit. No trading, wearable NFTs, creator fees, or live economy is included. Production publication needs a separate Rare Friends review. Preview progress resets when the session ends.
