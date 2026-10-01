# Rare Friends Island Stack

**Builder / contact:** [888bitlab](https://github.com/888bitlab)  
**Category:** Character Spotlight

## What is it?

Rare Friends Island Stack is a short physics arcade game where players use their selected Rare Friend to ride a crate and drop generated Friends onto a floating island, trying to keep as many as possible balanced for 30 seconds.

## How it uses Rare Friends

The selected Generations Friend appears as the crate rider, and the game uses FriendSDK's official Rare Friends artwork renderer to create randomized characters for each drop. The dropped variants are generated visuals, not minted NFTs; the selected Friend remains the player's verified identity in the experience.

## Source code

[Source repository](https://github.com/888bitlab/stacknslide/tree/submission/stack-n-slide)  
Built with **FriendSDK v0.1.2**.

To run locally with Node.js 22 or later:

```sh
git clone https://github.com/888bitlab/stacknslide.git
cd stacknslide
git checkout submission/stack-n-slide
npm ci
npm run dev:game -- games/island-stack
```

Open the local URL printed by the command (normally `http://localhost:4173`). For phone testing on the same Wi-Fi, run:

```sh
npm run dev:game -- games/island-stack --host 0.0.0.0 --port 4173
```

## Playable demo

Public playable demo: [Rare Friends Island Stack](https://rarefriendsislandstack.vercel.app/)

A player needs a browser wallet that holds an eligible hardwired Rare Friends Generations NFT (generation 1 or higher) on Robinhood Chain mainnet (chain ID 4663). Wallet connection and Friend selection are required even for the preview.

## How to play

Press **Start Game**, then click or tap anywhere on the playfield to drop Friends. Move the pointer or touch position to aim. On desktop, **Space** also drops a Friend. Keep the stack on the island until the 30-second timer ends; the score is the number still on the island.

The selected Friend rides the crate and jumps before a character drops. Characters rotate in the air, collide, and can slide or fall over the island's edge. The camera zooms out as the stack grows. Sound can be toggled, and reduced-motion preferences are respected.

## Costs, rewards, and leaderboard

There are no RF costs, transfers, transactions, paid outcomes, or actual prizes in this prototype. The leaderboard is stored locally in the browser, not shared across players. Its top-three rows display 25 RF, 10 RF, and 5 RF prize labels, but the game does not award or transfer those amounts. The generated drop visuals are not minted NFTs and do not imply ownership.

## Checks and known limitations

- `npm run build` — passed.
- `npm run typecheck` — passed.
- `node scripts/dev-game.mjs check games/island-stack` — passed.
- `node scripts/dev-game.mjs test games/island-stack --width 360` — could not run because the Playwright Chromium browser binary is not installed in this environment.
- The game is deployed on Vercel. The public URL was checked without sign-in and serves the latest game bundle.
- Scores are local to the browser and reset with local storage. The leaderboard is not a global competition.

## Credits

Rare Friends visuals use the FriendSDK v0.1.2 renderer. No third-party art assets are included.
