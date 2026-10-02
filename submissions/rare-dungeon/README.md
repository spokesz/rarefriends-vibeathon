# Rare Dungeon

**Project name**
Rare Dungeon

**Builder / contact**
@0xCephal · https://x.com/0xCephal

**Category**
Economy Potential

**What did you build?**
A game designed to create FOMO, burn and lock liquidity in the weekly pool.

A Friend — your character — enters a dungeon and must survive 3 floors. Each floor has enemies, fog, pit traps, and other hazards — all shaped by the perks the dungeon owner chose at creation. Before entering, the raider picks perks for the Friend. The dungeon owner picks perks for the dungeon itself. Both sides have 6 perks × 3 ranks. The same run, two opposite loadouts.

Raider pays entry and bets the Friend survives all 3 floors. Win → collect the bank. Lose → entry stays in the dungeon, dungeon level rises. Dungeon Owner paid to create. They bet raiders keep dying. Each failed raid grows the bank. Each win earns tickets toward the weekly pool jackpot.

**How does it use Rare Friends / $RAREFRIENDS?**
A dungeon-staking game meant to grow $RAREFRIENDS holders, increase burn, and pull attention to the game and token through FOMO (hold the dungeon vs claim early; weekly pool).

**Source code**
https://github.com/dmdemas/rare-dungeon · Vite 6 + React 19 + TypeScript. No FriendSDK.

**Playable demo**
https://dmdemas.github.io/rare-dungeon/

**How to run locally**
```sh
git clone https://github.com/dmdemas/rare-dungeon.git
cd rare-dungeon
npm i
npm run dev
```

**How to play**
Choose PLAY to raid a dungeon or CREATE DUNGEON to set one up and earn from other raiders. Both modes offer Simple and Hard tiers.

As a **raider**: pay entry, pick perks each floor, survive all 3 to collect 95% of the bank. As a **dungeon owner**: pay to create, choose a layout and 3 perks — every raider who dies adds their entry to your bank. You decide when to claim.

**Costs and rewards** *(all simulated — no real tokens)*

| | Simple | Hard |
|---|---|---|
| Create | $2 | $30 |
| Entry | $1 | $15 |
| Clear rate | ~33% | ~11% |
| Raider × on clear | ~2.9× | ~5.8× avg / ~11× if held to win 8–10 |
| Owner × | ~1.5× (suggested close) | 1.5× @ win 5 · 2.7× @ win 6 · 4.4× @ win 8 · 9× @ win 15 · 30× @ win 25 |
| Weekly tickets | — | Minted from win 7 on; 25% of weekly fees split pro-rata at week end |
| Claim tax (Hard) | — | 95% @ win 0 → 0% @ win 8+ |

**What have you tested?**
TypeScript build passes. Economy simulations (1k and 10k runs) pass all golden-standard targets from `docs/economy-research/07-final-numbers.md`.

**Known limitations**
Wallet is simulated — no live $RAREFRIENDS, no on-chain settlement. "Simulate Raids" button in My Dungeons is demo-only and will not exist in production.

**Credits**
Font generated with AI assistance. No third-party music or artwork — all game design, visuals and code are original.
