# Rare Friends: Search Party

**One-sentence pitch:** Search Party turns your owned Rare Friend into a low-attention companion that searches the crypto internet while you are away and returns with artifacts, Rugged Relics and clues to a shared community mystery.

- **Builder:** T.J. Chrusch
- **Contact:** [@tjc345](https://x.com/tjc345)
- **Categories:** Character Spotlight; Economy Potential
- **SDK:** FriendSDK v0.1.2
- **Source repository:** https://github.com/tjc345/rare-friends-search-party
- **Playable preview:** https://rare-friends-search-party.chruschtj.chatgpt.site

## Run locally

```sh
git clone https://github.com/spokesz/friendsdk.git
git clone https://github.com/tjc345/rare-friends-search-party.git
cp -R rare-friends-search-party/games/afterglow friendsdk/games/afterglow
cd friendsdk
npm ci
npm run dev:game -- games/afterglow
```

Open the printed local host URL. Connect an EIP-1193 wallet on Robinhood mainnet holding a hardwired Generations NFT, generation 1 or higher.

## How to play

1. Connect a wallet and choose an owned Rare Friend.
2. Choose The Mempool, Bridge City or the NFT Graveyard.
3. Pick an expedition length and an optional preparation.
4. Spend one simulated Search Permit; optionally add a simulated 0.25 RF one-trip boost.
5. Let the Friend search, then return to reveal its field bag.
6. Build that Friend's collection and journal while adding Signal to the staged community mystery.

The preview compresses intended 30-minute, four-hour and ten-hour expeditions into 25, 50 and 75 seconds. Mouse and touch are supported, and FriendSDK provides wallet selection, mute and reduced-motion controls.

## Rules, probabilities and rewards

Artifact odds range from 55%/70% for Gen 1 short-or-medium/long expeditions to 15%/30% for Gen 6+. A Lucky Charm adds five percentage points, capped at 80%. Failed artifact rolls return humorous Rugged Relics, which do not advance the collection.

Each expedition costs one simulated RF permit. A simulated one-trip boost costs 0.25 RF. Every completed return awards 0.40 simulated RF; artifact rewards range from 0.10 to 4 simulated RF. Collection milestones award 1, 3 and 8 simulated RF, with a simulated Decoder Key for completing the collection. Twenty percent of permit spending is shown as a staged community-jackpot contribution.

Each Friend owns its own collection. Duplicate artifacts produce 70% less Signal. Sprite families have one destination specialty that grants 15% more Signal, making the actual selected Friend mechanically relevant without making rare traits automatically stronger.

## Checks

```sh
npm test
npm run typecheck
npm run check:games
node scripts/dev-game.mjs check games/afterglow
```

The project was also manually exercised on desktop and mobile wallet browsers. Automated Playwright browser checks require a local Chromium installation.

## Credits and limitations

- Friend selection, ownership gating, canonical Friend artwork, controls and host runtime use FriendSDK v0.1.2.
- Game code and original interface art were created for this Vibeathon entry.
- Purchases, rewards, balances, jackpot, Decoder Keys, leaderboard and community mystery are clearly simulated MVP systems.
- Preview progress is scoped to the selected Friend and saved locally in that browser. Cross-device persistence is planned but is not represented as complete in this MVP.
- Genesis support is represented in the balance model but the Vibeathon ownership gate accepts generation 1 or higher.
- No live token approval, transfer, contract call or real-money transaction occurs.
