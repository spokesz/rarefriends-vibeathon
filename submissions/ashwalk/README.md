# Ashwalk

## Project name

Ashwalk

## Builder / contact

Sharp · [X @Sharpbigred](https://x.com/Sharpbigred) · [stevereynolds2006-ship-it](https://github.com/stevereynolds2006-ship-it)

## Category

Character Spotlight

## What did you build?

A side-scrolling fog platformer where your Rare Friend walks the woods, lights bells, and outruns the thing under the ground.

## How does it use Rare Friends?

You play as your own Generations NFT, using its original character artwork. Connect a wallet to choose a Friend you own and to read your $RAREFRIENDS balance. That balance is what the game spends.

## Source code

[github.com/stevereynolds2006-ship-it/ashwalk](https://github.com/stevereynolds2006-ship-it/ashwalk/tree/f15c6f8f62a1f9c649a5d0bab41088bde2788e40) · FriendSDK v0.1.2

Node.js 22+. A browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet.

```bash
git clone https://github.com/stevereynolds2006-ship-it/ashwalk.git
cd ashwalk
npm ci
npm run dev
```

Open the printed URL.

## Playable demo

[https://stevereynolds2006-ship-it.github.io/ashwalk/](https://stevereynolds2006-ship-it.github.io/ashwalk/)

Open that link in a normal browser or in the MetaMask browser. The game fills the screen. No transaction signature is required. Rare-coin costs are simulated against the balance the wallet reports: the game subtracts them on this device and does not send a chain transfer.

You still need a wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet.

## How do you play?

A and D, or the arrow keys, move. W, up, or space jumps. S drops through a cage. E pulls a rope, lights a bell, turns a lock, or buys a lantern. On a phone, the buttons sit above the bottom edge. Mute and reduced motion are in the corner. Sound is on, and the music starts on the first tap.

This preview opens every fog so they can be tried, including the moon. None of them charge to start. The works is a longer plank run with spiders. Choir platforms carry a light. The mirror water has alligators.

With friends, open a room code and have the other person join it. Bells, ropes, and coins in a room are shared.

## Costs and rewards

Everything is simulated.

- The shore is free. You start that walk with 5 coins.
- Every fog after the shore costs 5 Rare coins. 20 Rare coins opens every fog, and those walks do not charge again. This preview opens every fog, including the moon, at no cost.
- A death burns half the coins you are carrying. Three lives, then you can buy one more for 10 Rare coins. Leave, and the shore is still free.
- Half of every Rare coin you spend is burned. A lantern costs 1 coin you picked up and lasts 10 seconds. A flashlight costs 5 coins you picked up. Neither one spends Rare coins.
- The red cape costs 10 Rare coins. The white cape opens October 1 and then costs 10 Rare coins. Bought clothes stay on that wallet in this browser.

## What have you tested?

`npx tsc --noEmit` passes. Solo play was checked in the browser on desktop and a phone-sized layout: movement, jumps, bells, the latch lock, the cage, the wallet balance, and the October locks. A full automated browser suite against a fresh clone has not been re-run for this submission.

## Known limitations

Rare-coin spends and clothes are stored in localStorage for the connected address. They are not on-chain transfers, and they do not follow the wallet to another browser. Coins you carry on a walk are not added to the wallet balance. Clearing a fog is also stored on this device. This preview opens every fog, including the moon, at no cost. Multiplayer needs `npm run dev` for the signaling route. The public Pages build is solo play.

## Credits

Original silhouette art, levels, and music. The Friend sprite, halo, and wallet read come from FriendSDK v0.1.2. The fog, dead trees, and the antler creature are original drawings in the spirit of monochrome side-scrollers, not copied from a game.
