# Rare Friends Vibeathon — FriendForge Gacha

## One-line pitch

**FriendForge** turns your Rare Friend into the protagonist of a futuristic capsule lab where every summon reveals a new rarity and expands a personal session collection.

## What is implemented

- FriendSDK v0.1.2 integration boundary via the standard CLI game component.
- SDK-provided Friend identity / wallet / eligibility flow.
- Simulated capsule purchase and weighted summon flow.
- Animated reveal state with reduced-motion support.
- Five rarity tiers with explicit odds.
- Session collection UI.
- Simulated RF redemption for positive-value outcomes.
- Responsive phone layout.
- No second wallet flow, private keys, custom signer or custom contracts.

## Economy

All prototype economy actions are simulated.

| Outcome | Weight | Simulated value |
|---|---:|---:|
| Common Friend | 55.00% | 0.10 RF |
| Uncommon Friend | 28.00% | 0.50 RF |
| Rare Friend | 12.00% | 1.00 RF |
| Epic Friend | 4.50% | 2.00 RF |
| Mythic Friend | 0.50% | 5.00 RF |

Capsule price: **1 RF simulated**.

## Future direction

A production version could attach cosmetic or collection utility to Rare Friends while keeping all persistent, RF-backed redemption mechanics inside the reviewed Rare Friends contract/runtime path. This prototype intentionally stops at the simulated SDK flow.

## Public preview


