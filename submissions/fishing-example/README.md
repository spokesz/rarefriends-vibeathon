# Rare Friends Fishing — example submission

Walk your Rare Friend to the lake, buy bait, catch fish, and keep or sell your collection.

**Builder:** [Rare Friends / @spokesz](https://github.com/spokesz) · **Category:** Character Spotlight · **SDK:** FriendSDK v0.1 (0.1.0)

This is the team's reference submission, adapted from the SDK fishing example. It demonstrates the submission format and is not a claim of a new competition entry. [Source code](https://github.com/spokesz/fishing-example-submission/tree/35ed172baa5a9f53b9e35bfbb7c094ff05af39e2) · [Game rules](https://github.com/spokesz/fishing-example-submission/blob/35ed172baa5a9f53b9e35bfbb7c094ff05af39e2/game/game.json)

## Run it

Use Node.js 22+ on Linux or Ubuntu/WSL2, plus a browser wallet holding a hardwired Rare Friends Generations NFT (generation ≥ 1) on Robinhood mainnet (4663).

```sh
git clone https://github.com/spokesz/fishing-example-submission.git
cd fishing-example-submission
git checkout 35ed172baa5a9f53b9e35bfbb7c094ff05af39e2
npm ci
npm run dev
```

Open the printed URL (normally `http://localhost:4173`), connect your wallet and select your Friend. The SDK verifies ownership before play. No RF funding or transaction signature is needed for this simulated preview. No hosted demo is provided yet.

## Play

Move with WASD, arrow keys or click/tap. Visit **Bait & tackle**, buy bait and confirm the preview action. Choose **Go fishing**, cast, confirm and reel in. Keep your catch or sell it from **Your catches**. Settings include mute and reduced motion. Everything stays inside the SDK's 960 × 640 container.

## Rules and rewards

**All balances, purchases and rewards are simulated.** Start with 20 RF and 100 RF of simulated prize backing. One bait costs 1 RF and produces one result. Reeling does not change the odds.

| Catch | Chance | Redemption value |
|---|---:|---:|
| Old Boot | 15% | 0 RF |
| Sardine | 30% | 0.25 RF |
| Sunfish | 22% | 0.50 RF |
| Bream | 14% | 0.75 RF |
| Rainbow Trout | 9% | 1.50 RF |
| Catfish | 5% | 2.50 RF |
| Sturgeon | 3% | 5 RF |
| Legend | 2% | 10 RF |

Expected reward: **0.90 RF per cast**. Each purchased bait reserves the maximum 10 RF prize; kept fish retain backing and have no redemption expiry. New purchases stop when backing is insufficient. Preview progress resets when the runtime session ends.

## Checks, credits and limitations

Run `npm test`, `npm run typecheck`, `npm run check:games` and `npm run build`. For desktop/mobile browser checks, run `npx playwright install chromium` then `npm run check:browser`. All checks passed: 8 economy tests, typecheck, game validation, build, and desktop/mobile browser checks. Browser tests use mocked wallets/RPC; a real-wallet playthrough is still outstanding.

The game uses the original Rare Friends scenery, canonical character sprites, sound kit and fishing artwork. See [source provenance and notices](https://github.com/spokesz/fishing-example-submission/blob/35ed172baa5a9f53b9e35bfbb7c094ff05af39e2/NOTICE.md). No trading, wearable NFTs, creator fees or live economy is included. Token Activity metrics are not claimed. Production publication needs separate Rare Friends review.
