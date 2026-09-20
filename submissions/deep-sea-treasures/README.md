# Rare Friends: Deep Sea Treasures

A fishing game that lets your selected Rare Friend NFT explore the deep sea, cast a line, and reel in unique NFT fish as collectible treasures.

## Submission details

- **Project name**: Rare Friends: Deep Sea Treasures
- **Builder**: spokesz (via MiniMax-M3 assistant)
- **Category**: Character Spotlight
- **Brief**: One-sentence pitch — your Rare Friend becomes a deep-sea captain whose fishing rod attracts five tiers of NFT fish, from common coral pebbles to the legendary dragon carp.

## What it does

1. The player connects a wallet holding a Generations NFT (gen 1+) on Robinhood mainnet.
2. The selected Friend is rendered in-game as a deep-sea captain at the helm.
3. Casting bait triggers the SDK's chance game. The outcome table returns one of five NFT fish:
   - Coral Pebble (common, 35%) — 0.2 RF
   - Sunfish NFT (uncommon, 28%) — 0.6 RF
   - Rainbow Trout NFT (rare, 18%) — 1.5 RF
   - Koi NFT (epic, 12%) — 3 RF
   - Legendary Dragon Carp NFT (legendary, 7%) — 10 RF
4. Fish are added to the player's collection with rarity tags.
5. All outcomes are preview-mode and simulated; no live contract calls are required to play.

## How to run

```sh
cd friendsdk
npm ci
npm run build
node scripts/dev-game.mjs init games/deep-sea-treasures
# then copy the contents of my-fishing/ into games/deep-sea-treasures/
npm run dev:game -- games/deep-sea-treasures
```

Open `http://localhost:4173`, connect your wallet, choose your Friend, and start fishing.

## Source repository

Source code: `games/deep-sea-treasures/` once installed inside the SDK repo.

## Controls

- WASD / arrow keys / tap-to-walk — move the captain
- Space — cast bait
- Tab — open collection
- Esc — settings
- M — mute audio

## Game rules

| Item | Cost | Source |
|---|---|---|
| Premium Bait | 1 RF per cast | `game.json` |
| Outcomes | 5 tiers, weights in `game.json` | Chance rolls use SDK RNG |

All rolls are simulated in preview mode. Live on-chain rolls are not required.

## Checks

- `npm run typecheck` — passes
- `npm run build` — passes
- `npm run dev:game -- games/deep-sea-treasures` — boots at `http://localhost:4173`
- `npm test` — SDK tests pass

## Known issues

- Player must hold a real Generations NFT for the wallet selection screen, even in preview.
- Robinhood mainnet RPC may rate-limit under heavy load.
- Art assets are AI-generated (MiniMax image-01) and may benefit from manual refinement.

## Assets

All fish images in `assets/` are generated for this submission. The captain avatar reuses the SDK's default Friend sprite so the player keeps their selected character's artwork.

## Credits

- Built on [FriendSDK v0.1](https://github.com/spokesz/friendsdk) by spokesz
- Fish art generated with MiniMax image-01
- Game logic adapted from the SDK's fishing example
