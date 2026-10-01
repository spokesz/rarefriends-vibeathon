# Friend Smash

A falling-block smasher where every piece is one of **your** Rare Friends, and every ranked run burns $RAREFRIENDS.

**Builder:** [@Doodlifts](https://github.com/Doodlifts) · **Category:** Token Activity · **Stack:** Next.js + Postgres, FriendSDK v0.1.2 modules (`wallet`, `owned`, `identity`, `sprites`)

[Play](https://friend-smash.vercel.app) · [Source](https://github.com/Doodlifts/friend-smash/tree/3ae8e16fd671170758dee4960396ed9914341e47) · [Economy rules](https://github.com/Doodlifts/friend-smash/blob/3ae8e16fd671170758dee4960396ed9914341e47/lib/rf/economy-rules.ts)

## Try it

Open https://friend-smash.vercel.app, tap **Pick your Friend** and paste an address that holds a hardwired Generations NFT (gen ≥ 1) on Robinhood mainnet (4663). **Read-only test:** nothing to connect or sign. Guests can play unranked.

Run locally (Node 22):

```sh
git clone https://github.com/Doodlifts/friend-smash.git && cd friend-smash
npm ci && cp .env.example .env.local   # set SCORE_SIGNING_SECRET
npm run dev
```

## Play

Keyboard: ← → move, ↑ spin, ↓ soft-drop, space smash, C hold. Touch: drag, tap a side, flick down.

- **Your Friends are the pieces**: the on-chain sprites of the Friends in that wallet.
- **Weight**: heavier Friends (earlier generation, higher activation tier) fall slower.
- **Power-ups unlock** by the real RF held in the Friend's own wallet (read-only).

## Costs and rewards (all simulated)

| | RF | Goes to |
|---|---:|---|
| Ranked run | 50 | 40 → daily pool · **10 burned** |
| Daily pool | pot | Top 10 scores, top-heavy; empty pools roll over |
| Power-ups | 40–120 | **100% burned** · unlock at 1k / 10k / 50k / 100k real RF held |
| Versus wager | 50 / 100 / 250 | Winner takes pot · **5% burned** |
| Starter / daily | 1,000 / 100 | Demo faucet (stands in for buying RF) |

No chance-based payouts: every run is replayed server-side, and ranked runs ban power-ups. Double-entry ledger, so burned RF is exact. `lib/rf/settlement.ts` maps each move to its on-chain call for a live version.

## Checks and limitations

Passing: typecheck, lint, 89 unit tests (incl. economy + settlement), 72 database integration checks on embedded Postgres, production build on Vercel, live smoke tests (sign-in, pool, power-up gate). Browser-checked on desktop and phone viewports.

- Read-only mode proves an address *holds* a Friend, not that you control it — read-only accounts are separate and marked 👁. Wallet sign-in (SIWE, no transactions) exists behind a flag.
- Runs outside FriendSDK's sandbox frame: it can't submit scores to a server. Proposed: a `submitResult` bridge action.
- No live token movement, contracts, trading or wearables.

Credits: Rare Friends Generations sprites via FriendSDK ([notice](https://github.com/spokesz/friendsdk/blob/main/NOTICE.md)); Silkscreen and Sometype Mono (OFL); original music and engine.
