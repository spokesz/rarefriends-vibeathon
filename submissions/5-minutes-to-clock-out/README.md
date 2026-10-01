# 5 Minutes to Clock Out

**Builder:** Myndd Nadine  
**X:** [@MynddNFT](https://x.com/MynddNFT)  
**Category:** Character Spotlight  
**SDK:** FriendSDK v0.1.2  
**Network:** Robinhood Chain Mainnet

## Project Overview

5 Minutes to Clock Out is a five-minute office escape game where players connect their wallet, choose their own Rare Friend, and navigate a chaotic workplace while avoiding NPCs and trying to clock out before time runs out.

The game features 99 levels, stealth-based gameplay, and dynamic Rare Friends character integration.

## Rare Friends Integration

Players connect their wallet and discover eligible Rare Friends they own.

They can select a Friend to use as their playable character, with the game's character sprite dynamically loaded from FriendSDK.

The game uses FriendSDK for wallet integration, ownership discovery, eligibility verification, and character sprites.

## Playable Demo

**[Play 5 Minutes to Clock Out](https://mynddnadine.github.io/5-minutes-to-clock-out/)**

Requirements:
- A compatible wallet holding an eligible Rare Friends NFT.
- Robinhood Chain Mainnet.
- A modern desktop or mobile browser.

Tested on desktop and iPad using Rabby Wallet.

## Source Code

**[GitHub Repository](https://github.com/mynddnadine/5-minutes-to-clock-out)**

Built with FriendSDK v0.1.2, React, TypeScript, and HTML5 Canvas.

Development build commands from a FriendSDK checkout containing `games/clock-out/`:

```bash
npm ci
npm run build
node scripts/dev-game.mjs build games/clock-out --outdir games/clock-out/.friendsdk/production
```

The linked repository currently hosts the deployed preview files. The editable game source and full setup instructions still need to be added to meet the source submission requirement.

## How to Play

1. Open the playable demo.
2. Connect your wallet.
3. Select an eligible Rare Friend.
4. Play using your selected Friend's sprite.
5. Navigate the office while avoiding NPCs.
6. Reach the exit before the five-minute timer runs out.

The game contains 99 levels with progressively challenging office escape scenarios.

## Economy and Rewards

This submission uses FriendSDK's simulated preview economy. No real $RAREFRIENDS spending, token rewards, or live game transactions are claimed.

Game-specific probability, reward, and consumable parameters have not yet been verified against the game configuration.

## Checks and Known Issues

**Completed:**
- TypeScript typecheck and production build.
- Successful deployment to GitHub Pages.
- Desktop gameplay with multiple selectable Rare Friends.
- iPad gameplay and Friend discovery using Rabby Wallet.

**Not yet verified:**
- Full automated SDK test suite.
- Game validation and browser test suite.

**Known limitations:**
- Friend ownership discovery depends on RPC availability.
- Initial Friend discovery may take longer due to block-range batching.
- Mobile browsers may cache older versions of the game.
- Official Rare Friends production publication requires separate review.

## Credits

Game design and implementation by Myndd Nadine.

Rare Friends character sprites and integration provided through FriendSDK.

Any additional third-party assets require attribution where applicable.
