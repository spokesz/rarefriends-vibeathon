# Capsule Friends

**Project name**
Capsule Friends

**Builder / contact**
KingLuna413 · [@KingLuna413](https://github.com/KingLuna413) · syahrulkhamni500@gmail.com

**Category**
Token Activity

**What did you build?**
A walkable Rare Friends gacha yard: buy RF keys, crank one of four capsule machines with rising luck, and reveal collectible Capsule Friends across five rarity tiers.

**How does it use Rare Friends?**
You play as your own hardwired Generations NFT. Its original character artwork is rendered by the SDK world renderer while you walk a paper-and-ink yard between a key shop, four machines, a capsule vault and an album. The SDK runtime verifies wallet ownership and eligibility before play.

**Source code**
[GitHub repository](https://github.com/KingLuna413/friendsdk) · FriendSDK **v0.1.2**. The game lives in `games/capsule-friends/`.

```sh
git clone https://github.com/KingLuna413/friendsdk
cd friendsdk
npm ci
npm run build
npm run dev:game -- games/capsule-friends
# checks: node scripts/dev-game.mjs check games/capsule-friends
```

**Playable preview / demo**
https://kingluna413.github.io/friendsdk/capsule-friends/

Requires a browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired Generations NFT (generation ≥ 1). No RF funding, private key or transaction signature is needed for the preview.

**How do you play?**
Walk with WASD / arrow keys or tap a destination. Station chips turn green when your Friend is close; press `E` or tap the chip.

- **Key shop** — buy keys, **1 RF** each (quantity 1–99).
- **Machines** — `×1 / ×2 / ×4 / ×8` spend that many keys per crank and draw that many Capsule Friends at once. The rarest draw leads the reveal; every draw is kept in the album. Machine `×8` unlocks at vault level 1.
- **Capsule vault** — lists epic and legendary friends with a short session incubation countdown (cosmetic). Each rare-or-better discovery raises the vault level.
- **Capsule album** — keep friends for their fixed RF value, or redeem any time; no expiry.

**Costs, odds and rewards (RF)**
- Key price: **1 RF**. One key reserves **10 RF** of backing (the highest prize).
- 20 outcomes in five tiers; weights total 10,000 basis points:

| Tier | Chance | Redemption |
| --- | --: | --: |
| common | 54% (6 friends × 9%) | 0.5 RF |
| uncommon | 28.5% (5 × 5.7%) | 0.6 RF |
| rare | 12% (4 × 3%) | 1.5 RF |
| epic | 4.5% (3 × 1.5%) | 4 RF |
| legendary | 1% (2 × 0.5%) | 10 RF |

- Expected return **0.901 RF per key (≈ 90.1%)**; the remaining ≈ 9.9% is the community pool edge. Every machine tier shares the same per-key expectation — higher tiers give more draws (more chances) in a single crank.
- Consumable rule: each bought key reserves its maximum prize; kept friends retain their RF backing with no redemption expiry.
- **All balances, keys, pulls and redemptions are simulated** and session-local; reloading resets progress.

**Token activity** The Capsule vault shows a session ledger: keys bought, **RF spent**, RF redeemed, **net RF (spent − redeemed)**, pulls and best pull, plus **Spend badges** (Spender I–IV at 5 / 10 / 15 / 20 RF). The HUD also shows the running RF spent, so total RF moved through the economy is always visible.

**What have you tested?**
- `friendsdk check` (expected reward `901000000000000000`, maximum `10 RF`), `npm run check:games`, `npm run typecheck` and the game TypeScript check all pass.
- Automated browser flow with a mock wallet/RPC: walk to the shop, buy keys, Machine ×1 and ×4 pulls, reveal, album and vault — on desktop (960×640) and phone (360px) frames.
- A real-wallet playthrough is still outstanding; please verify with a funded eligible wallet.

**Known limitations**
- FriendSDK v0.1.2's supplied chance game has **one** consumable and **one** weighted outcome table, with no persistence, upgrade or extra-currency APIs. This entry therefore expresses "luck" as **draws per crank** rather than separate odds tables, uses a single key type, and treats vault incubation as a cosmetic session timer. Separate key types, per-machine odds, persistent timers and on-chain vault upgrades are documented future integration.
- Simulated preview only: no live contracts, transactions, trading or creator fees.
- Phones should use portrait; landscape may need scrolling.

**Credits**
Built with FriendSDK v0.1.2. Uses the SDK's world renderer, world preset, canonical Friend sprites, sound kit, UI components and artwork under [NOTICE.md](https://github.com/spokesz/friendsdk/blob/main/NOTICE.md). Capsule Friends artwork is procedurally generated in the game repository.
