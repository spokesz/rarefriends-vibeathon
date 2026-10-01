# RF64

## Project name

RF64

## Builder / contact

FILTER8  
X: @0xfilter8

## Category

Economy Potential

## What did you build?

RF64 turns the original 8×8 Rare Friends Genesis artwork into a two-button risk-and-reward arcade game where every pixel matters.

Each game contains 8 rounds, with a different Genesis Friend used as the board for each round.

Press A to start the runner and A again to brake.

Land on a lit pixel and the pixel disappears while the current round reward increases exponentially:

**1 → 2 → 4 → 8 → 16 → ...**

After every successful hit, the player has a decision:

- Run again and risk the current pot
- Press B to BANK and secure the score

Land on a dark pixel before banking and the round scores 0.

After 8 rounds, all banked scores are combined into the final RF64 score.

## How does it use Rare Friends?

RF64 uses FriendSDK v0.1.2 for wallet connection, eligible Generations Friend discovery, Friend selection and player identity.

The selected Generations Friend acts as the player's identity when entering RF64.

The game itself uses the original Rare Friends Genesis artwork as gameplay.

Every Genesis Friend is an 8×8 image containing exactly 64 possible pixel positions. RF64 uses those pixels directly as the game board, so the actual artwork determines where the winning and losing positions are.

The game contains the complete set of 1,024 Genesis Friends.

## Source code

https://github.com/FILTER8/friendsdk/tree/rf64-vibeathon/games/rf64

Genesis art export:

https://github.com/FILTER8/friendsdk/blob/rf64-vibeathon/scripts/export-genesis-art.mjs

## Playable preview

https://filter8.github.io/friendsdk/

### Requirements

- Browser wallet
- Robinhood mainnet
- Eligible hardwired Rare Friends Generations NFT

## How do you play?

### A / Space

- Start RF64
- Enter a round
- Start the runner
- Brake the runner

### B

- BANK the current round score

The game also has on-screen A and B buttons for touch controls.

## Rules

Each game contains 8 rounds.

A Genesis Friend becomes the 8×8 board for each round.

The cursor continuously travels across all 64 positions.

A successful stop on a lit pixel removes that pixel for the remainder of the round and increases the pot exponentially.

The player can then BANK or attempt another run.

BANK secures the current pot.

Stopping on a dark pixel causes a BUST and the current round scores 0.

Previously banked rounds remain safe.

If the final lit pixel is cleared, the round is automatically banked.

After round 8, all banked round scores are added together.

## Costs and rewards

The current Vibeathon build uses no real token payments or rewards.

RF64 is designed around a future arcade economy using $RAREFRIENDS for ranked runs.

The risk/reward gameplay and scoring system are already implemented, while token spending and rewards remain simulated for the Vibeathon MVP.

A future version can connect verified final scores to an on-chain leaderboard and the Rare Friends gameplay economy.

## Physical RF64

RF64 was deliberately designed as a very small game:

- 8×8 display
- A button
- B button

The same game can therefore become a standalone physical RF64 device using an ESP32 and an 8×8 display.

All 1,024 Genesis boards can be stored directly in the device firmware, allowing the core game to run without an API, wallet or internet connection.

## Tested

- FriendSDK v0.1.2 build
- Wallet connection
- Robinhood mainnet flow
- eligible Generations Friend discovery
- Friend selection
- FriendSDK game-session handshake
- complete 8-round RF64 game
- keyboard controls
- touch/on-screen controls
- braking
- lit-pixel removal
- exponential pot progression
- BANK
- BUST
- final score calculation
- result screen
- PNG result export
- Play Again
- public GitHub Pages build

Build commands:

```bash
npm run build
npx friendsdk build games/rf64
