# Ashwalk

## Project name

Ashwalk

## Builder / contact

Sharp · [X @Sharpbigred](https://x.com/Sharpbigred) · [stevereynolds2006-ship-it](https://github.com/stevereynolds2006-ship-it)

## Category

Character Spotlight

## What did you build?

A side-scrolling fog platformer. Your Rare Friend walks the woods, climbs ladders, lights lanterns, and solves a puzzle to leave each fog. A death leaves a pile of bones.

## How does it use Rare Friends?

You play as your own Generations NFT, using its original character artwork. Connect a wallet to choose a Friend you own and to read your Rare coin balance. Opening a later fog, buying a cape, or buying an extra life sends that full amount of Rare coins in one wallet confirmation. Nothing is burned and nothing is split.

## Source code

[github.com/stevereynolds2006-ship-it/ashwalk](https://github.com/stevereynolds2006-ship-it/ashwalk/tree/9adad377c1dcfb6813a866e0c13e8a9732f598cd) · FriendSDK v0.1.2

Node.js 22+. A browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet.

```bash
git clone https://github.com/stevereynolds2006-ship-it/ashwalk.git
cd ashwalk
npm ci
npm run dev
```

Open the printed URL.

## Playable demo

[https://stevereynolds2006-ship-it.github.io/ashwalk/?v=84](https://stevereynolds2006-ship-it.github.io/ashwalk/?v=84)

Open that link in a normal browser or in the MetaMask browser. The game fills the screen. The shore can be walked without a payment. Buying a later board, a cape, or an extra life asks the wallet to send Rare coins.

You still need a wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet.

## How do you play?

A and D, or the arrow keys, move. W, up, or space jumps. S drops through a thin plank. E pulls a rope, lights a bell, buys a lantern, or climbs a ladder. On the hoist, Down climbs down. On a phone, the buttons sit above the bottom edge. Mute and reduced motion are in the menu. Sound is on. Each fog has its own music, and a jump plays a hop.

The shore is free and starts with 2 coins picked up in the stage. Beat a fog before the next one can be bought. Every board after the shore is 25 Rare coins. The moon opens October 1, the hallow October 31, the mirror November 1, the tunnel December 1, the eve December 25, and the hoist January 1st. Until then those maps say coming soon and stay locked. Only the shore is open now.

With friends, open a room code and have the other person join it. Bells, ropes, and coins in a room are shared.

## Costs and rewards

Rare coin spends are real transfers of the Rare token on Robinhood Chain. The full amount goes to `0xb7823b2e28484382aa70952a7818712e8ac42a72`. The transfer is tagged, so a board or cape you already paid for stays open when that wallet connects again.

- The shore is free. That walk starts with 2 stage coins. Coins picked up in a stage only turn things on inside the stage. They are not Rare coins.
- Every fog after the shore is 25 Rare coins, and only after the one before it is beaten.
- A death drops half the stage coins you are carrying and leaves a pile of bones. Three lives, then one more life is 10 Rare coins.
- A lantern costs 1 stage coin and lasts 13 seconds on the dark boards. A flashlight costs 5 stage coins. On the moon that buy is a saber.
- The red cape is 15 Rare coins and is open now. Later capes open weekly from October 1. The Halloween cape and the Christmas cape are 25.

## What have you tested?

`npx tsc --noEmit` passes. Solo play was checked in the browser on desktop and a phone-sized layout: movement, jumps, ladders, lanterns, the wallet balance, the level lock, and the payment prompt. A full automated browser suite against a fresh clone has not been re-run for this submission.

## Known limitations

A paid board or cape is remembered from the tagged Rare transfer, and also in localStorage on this device. Stage coins and lives do not follow the wallet. Clearing a fog is stored on this device. Multiplayer needs `npm run dev` for the signaling route. The public Pages build is solo play. The moon, hallow, mirror, tunnel, eve, and hoist stay locked until their open dates.

## Credits

Original silhouette art, levels, and music. The Friend sprite, halo, and wallet read come from FriendSDK v0.1.2. The fog, dead trees, and the creatures are original drawings in the spirit of monochrome side-scrollers, not copied from a game.
