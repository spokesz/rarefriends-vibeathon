# Friendshunt

Your owned Generations NFT is the player. You walk that Friend through 30 worlds, spend RF on the jobs, and bank xRF. xRF is a coupon that cuts 40% off the next official tier upgrade. It never turns back into RF.

**Builder:** [@Orshengnudor](https://github.com/Orshengnudor) · **Category:** Economy Potential · **SDK:** FriendSDK v0.1.0

The owned Generations NFT is the only character on screen. Its canonical artwork is preserved. That is the Character Spotlight use. The reason to keep playing is the RF ladder below, which is the Economy Potential use. One submission.

**Source:** https://github.com/Orshengnudor/friendsdk/tree/main/games/hunt
**Play:** https://friendshunt.vercel.app

## What it is

A 30-world hunt. Each world is a different job: tag stations in order, hide, survive a chase, ram a boss, or finish an NPC task. Clearing the world spends 1 RF and pays xRF. xRF is not a token and cannot be sold or redeemed. When the bank covers the list price of the next tier upgrade, that upgrade costs 60% of the official RF price and the xRF is destroyed. Promotion to the next generation is always the full official price.

Preview mode simulates balances, burns, and payouts. No mainnet transaction is required to try the demo. A later contract on Robinhood Chain (4663) would burn the skip fee and send real upgrade payments through the Rare Friends 50% burn / 50% rewards split.

## How to run

Node.js 22+.

    git clone https://github.com/Orshengnudor/friendsdk.git
    cd friendsdk
    npm ci
    npm run dev:game -- games/hunt

Open the printed URL. Local preview is the SDK preview and does not send a transaction. Live play needs a wallet on Robinhood Chain (chain 4663) that owns a hardwired Generations Friend.

## How to play

WASD or the touch pad moves the Friend. E, or walking onto a station, uses it. Settings holds the theme switch and the how-to. Buy Charms appears only on worlds that need a charm, and you type the RF amount (1 to 50). One RF buys one charm.

Chase and hide worlds draw a life bar over the Friend. Contact drains it for 5 seconds. An empty bar costs 5 growth and the bar refills. Three empty bars cost 15 growth and drop you one world. A failed timer costs 5 growth. Growth earned in the session stays until you quit. Going back a world does not delete it.

## Rules

| Rule | Value |
|---|---|
| Clear a world | 1 RF |
| xRF earned | 5 × world number. World 1 pays 5. World 30 pays 150. |
| xRF for RF | Never |
| Coupon applies to | Tier upgrades only (0→1, 1→2, 2→3, 3→4) |
| Coupon | Flat 40% off, and only when xRF ≥ the list price P |
| xRF consumed | P, then gone |
| RF paid on that upgrade | 0.60 × P |
| Partial bank | No discount. 40% or nothing. |
| Promote (gen → gen−1) | Official RF, no coupon. Tier resets to 0. Leftover xRF stays. |
| Skip forward | 1,000 RF burned per world jumped |
| Skip backward | Free |
| Advance by playing | Free, once Growth crosses the next line |

Protocol prices are the Generations ladder at https://rarefriends.com/docs/generations. Hunt does not change a list price. A real upgrade or promote still splits 50% burn / 50% rewards. xRF is not part of that split because it is not RF.

## Why 40%

Filling a coupon at the world-1 rate costs P / 5 RF, then the upgrade costs 0.60 P. Total out is 0.80 P. The player keeps 20% versus paying P on rarefriends.com.

| Discount | Hunts to fill P = 100 | Pay | Total | Saved |
|---|---|---|---|---|
| 20% | 20 | 80 | 100 | 0 |
| 30% | 20 | 70 | 90 | 10% |
| 40% | 20 | 60 | 80 | 20% |

Higher worlds pay more than 5 xRF, so the coupon fills faster than this table. The table is the slow case.

## Ladder

Hardwire, paid in full, no coupon:

| Generation | Hardwire RF |
|---|---|
| 6 | 1 |
| 5 | 10 |
| 4 | 100 |
| 3 | 1,000 |
| 2 | 10,000 |
| 1 | 100,000 |

Tier upgrades. These are the only prices the coupon can cut.

| Gen | 0→1 | 1→2 | 2→3 | 3→4 | All 4 |
|---|---|---|---|---|---|
| 6 | 0.5 | 0.75 | 1.125 | 1.6875 | 4.0625 |
| 5 | 5 | 7.5 | 11.25 | 16.875 | 40.625 |
| 4 | 50 | 75 | 112.5 | 168.75 | 406.25 |
| 3 | 500 | 750 | 1,125 | 1,687.5 | 4,062.5 |
| 2 | 5,000 | 7,500 | 11,250 | 16,875 | 40,625 |
| 1 | 50,000 | 75,000 | 112,500 | 168,750 | 406,250 |

Promotion, always full RF:

| Jump | Pay RF |
|---|---|
| 6 → 5 | 9 |
| 5 → 4 | 90 |
| 4 → 3 | 900 |
| 3 → 2 | 9,000 |
| 2 → 1 | 90,000 |

Promotion from 6 to 1 with no upgrades is 100,000 RF. The full path (hardwire Gen 6, every tier, every promotion, through Gen 1 tier 4) is 551,388.4375 RF before any coupon.

## Coupon, slow case (5 xRF per hunt)

xRF needed = P. Hunts = ceil(P / 5). Pay = 0.60 P. Total = hunts + pay. Saved = P − total.

| Gen | Step | List P | Hunts | Pay 0.60 P | Total out | Saved |
|---|---|---|---|---|---|---|
| 6 | 0→1 | 0.5 | 1 | 0.3 | 1.3 | −0.8 |
| 5 | 0→1 | 5 | 1 | 3 | 4 | 1 |
| 4 | 0→1 | 50 | 10 | 30 | 40 | 10 |
| 4 | 3→4 | 168.75 | 34 | 101.25 | 135.25 | 33.5 |
| 3 | 0→1 | 500 | 100 | 300 | 400 | 100 |
| 2 | 0→1 | 5,000 | 1,000 | 3,000 | 4,000 | 1,000 |
| 1 | 0→1 | 50,000 | 10,000 | 30,000 | 40,000 | 10,000 |
| 1 | 3→4 | 168,750 | 33,750 | 101,250 | 135,000 | 33,750 |

Gen 6 upgrades cost less than one hunt, so the coupon is not why you play them. Gen 4 is the first step where a session pays for itself. Gen 3 and above is why you come back.

Worked Gen 4, tier 0 → 1, at the slow rate:

- List price 50 RF.
- 10 hunts cost 10 RF and bank 50 xRF.
- Upgrade pays 30 RF and deletes the 50 xRF.
- Pocket 40 RF instead of 50. Saved 10 RF, which is 20%.
- The 10 hunt RF and the 30 upgrade RF each follow the protocol split: half burned, half to active Friends.

Promote after that:

- Gen 4 tier 1 → Gen 3 costs 900 RF. No coupon, even with xRF in the bank.
- You arrive at Gen 3 tier 0. The xRF bank is unchanged.
- The next upgrade lists at 500 RF. Fill 500 xRF, then pay 300 RF.

## Skip

Staying and finishing the job can advance you for 0 RF. Jumping ahead burns RF.

cost = (target − current) × 1,000 RF, all burned. Nothing goes to rewards.

| From → to | Worlds | Burn RF |
|---|---|---|
| 1 → 2 | 1 | 1,000 |
| 1 → 8 | 7 | 7,000 |
| 1 → 30 | 29 | 29,000 |
| 11 → 14 | 3 | 3,000 |
| 20 → 30 | 10 | 10,000 |

Walking back is free. A skip does not grant the Growth you would have earned.

## Hunt redeem odds

After a clear, the catch can also return RF. These chances are in games/hunt/game.json. They are separate from xRF.

| Catch | Chance | RF |
|---|---|---|
| Nothing | 10% | 0 |
| Field Mouse | 15% | 0.5 |
| Wild Hare | 15% | 1 |
| Timber Wolf | 8% | 1.5 |
| River Pike | 30% | 2 |
| Stone Boar | 20% | 4 |
| Ancient Wyrm | 2% | 8 |

## Who gains

| Action | Player | Supply | Active Friends |
|---|---|---|---|
| Clear a world | −1 RF, +5×world xRF | 50% of that RF burned | 50% of that RF |
| Upgrade with coupon | −0.60 P RF, −P xRF | 50% of the 0.60 P burned | 50% of the 0.60 P |
| Promote | −full list RF | 50% burned | 50% |
| Skip | −1,000 × worlds RF | 100% burned | none |

xRF cannot be sold. That is what keeps the coupon from becoming a second currency.

## Checks and limits

From the source repo: `npx friendsdk check games/hunt`.

Played on the public preview: charm debit, the Friend staying put after a signed action, and the chase life bar. The economy in this build is simulated. xRF cannot be withdrawn as RF. The skip burn and the 40% upgrade discount are not executed on the official Generations contract yet. Preview balances are not mainnet balances.

Friend artwork and the game frame are from FriendSDK / Rare Friends. No other third-party assets.
