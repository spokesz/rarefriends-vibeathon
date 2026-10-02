## Project name
Flappy Friends

## Builder / contact
Builder: Loki Martinez
Contact: via X: https://x.com/0xmorty_dev
Category: Character Spotlight 

## One-sentence summary
Flappy Friends is a mobile-first 8-bit arcade game where the selected Rare Friends Generations NFT becomes the player character, with a simulated $RAREFRIENDS reward loop layered on top of the classic flap-through-the-pipes gameplay.

## Source code and setup
Source repository: https://github.com/0xJinx-16/flappyfriends.git

This project uses FriendSDK v0.1.3 and runs inside the SDK runtime sandbox. The game component is located in `games/flappy-friends` and includes the game logic, HTML/CSS styling, local economy simulation, and README.

### Local run instructions
From the FriendSDK repo root:

```sh
npm ci
npm run dev:game -- games/flappy-friends
```

Optional validation commands:

```sh
npm run build
npm run check:games
node --test tests/flappy-friends-economy.test.mjs
```

### Runtime requirements
- Wallet connection required by the SDK runtime
- Robinhood mainnet (chain 4663)
- A connected wallet holding a hardwired Rare Friends Generations NFT (generation 1 or higher)
- This prototype is a demo economy and does not submit live token transactions or claim real $RAREFRIENDS

## Playable preview / demo
Public preview URL, after enabling GitHub Pages and a successful workflow run:
- https://0xjinx-16.github.io/flappyfriends/

GitHub Actions builds and deploys the preview from `.github/workflows/pages.yml`.

Local preview URL:
- http://localhost:4173

Wallet and network requirements:
- Open the game in the SDK runtime with a browser wallet connected to Robinhood mainnet
- The wallet must own a valid Rare Friends Generations NFT selected through the SDK flow

## How to use it

### Controls
- Tap the playfield on Android or click on desktop to flap
- Press Space or Arrow Up to flap
- Use Pause / Resume when needed
- Use the in-game overlay to pay the demo entry burn and begin a run

### Game rules
- Fly through gaps between green pipes
- Score 1 point per pipe pair cleared
- Colliding with a pipe, ceiling, or ground ends the run
- The selected Rare Friends NFT remains the player character throughout the match
- A higher score increases the simulated RF reward, but the reward is capped per run and per day

### Demo economy rules
This is intentionally a simulated economy. It does not represent an actual token transfer or real wallet balance.

- Entry burn: 100 RF
- Max reward per run: 250 RF
- Daily reward cap: 1000 RF
- Reward curve: diminishing returns with a hard cap
- Claim flow: pending reward then claim in-game
- Local mode only: no real contract, no real token burn, no real RF claim

## Checks and known issues

### Checks run
- `npm run build` — passed
- `npm run check:games` — passed
- `node --test tests/flappy-friends-economy.test.mjs` — passed

### Known limitations
- This is a demo economy and is not connected to a live $RAREFRIENDS contract or token transfer flow
- The wallet gate and eligibility flow remain the SDK runtime responsibility, not custom game code
- Real blockchain integration would require a verified token contract, wallet signing flow, and server/contract enforcement for daily caps and reward claims

### Asset credits
- Rare Friends Generations canonical sprite frames are loaded through the FriendSDK sprite reader
- Local art, canvas rendering, and frame tilts are implemented in-game and are presentation-only modifications of the SDK-provided artwork
- No third-party copyrighted Flappy Bird art or non-licensed assets are used

## Notes
This submission is intentionally designed as a FriendSDK-compatible arcade prototype that keeps the wallet identity and selected NFT flow in the trusted runtime while keeping the actual economy in a controlled local simulation layer until a real $RAREFRIENDS contract and production integration are available.
