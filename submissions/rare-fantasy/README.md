# Rare Fantasy

Rare Fantasy is a simplified old-school Final Fantasy-style JRPG. Walk your owned Rare Friend across a larger Crystal Steps mesa with **Mica**, talk to **Champ**, optionally take a sword, bow, or staff, buy a torch, and fight mesa fauna when a shadow ambush appears.

**Builder:** [Champ / @champlification](https://github.com/champlification) · **Category:** Character Spotlight · **SDK:** FriendSDK v0.1.2

You play as your own Generations NFT. The Friend’s official walking sprite is the hero. Mica, Champ, and the mesa foes are original art, not other Friends. All RF in this preview is simulated. [Source code](https://github.com/champlification/rare-fantasy/tree/de92c89b3f2130cc5043b0c1e61974c903b72091) · [Playable preview](https://rare-fantasy.vercel.app/) · [Game rules](https://github.com/champlification/rare-fantasy/blob/de92c89b3f2130cc5043b0c1e61974c903b72091/game/game.json)

## Run it

Public preview: [https://rare-fantasy.vercel.app/](https://rare-fantasy.vercel.app/). Open it in a browser wallet, or a browser with a wallet extension, holding a hardwired Rare Friends Generations NFT (generation ≥ 1) on Robinhood mainnet (chain 4663). The SDK verifies ownership before play. No RF funding or transaction signature is needed. Purchases and rewards stay simulated.

To run the same gated preview locally, use Node.js 22+ on Linux or Ubuntu/WSL2:

```sh
git clone https://github.com/champlification/rare-fantasy.git
cd rare-fantasy
git checkout de92c89b3f2130cc5043b0c1e61974c903b72091
npm ci
npm run dev:gated
```

Open the printed URL (normally `http://127.0.0.1:4173`), connect your wallet, and select your Friend.

`npm run dev` is a local playtest fixture (Friend #7730). It is not the ownership gate and not the hosted preview.

## Play

A how-to-play guide opens when the visit starts. Move with WASD, arrow keys, or tap a destination. Press **E** or tap when in reach of **Champ**. Tap his sign from farther away to walk to the stall. Buy an optional weapon (100 RF, sell back 90 RF, one slot) and torches (25 RF) at his shop. **Sleep** there fills HP to 100 and AP to 24 and spends no RF. Walk the mesa with at least one torch while your bars can still beat a foe. A shadow may appear. **Battle** spends one torch and enters the clash. **Run** spends nothing. You do not see the named foe until you choose Battle. Attack until the enemy is defeated or you are out of HP or AP, then **Finish**. Open **Bestiary** from the HUD to see the mesa foes. Unseen rows stay dark silhouettes labeled ????. After the first clash with that foe, the card shows its name and what it is soft to (Sword, Bow, or Staff). The roster is Glass mite, Dust grub, Pebble tick, Quartz hare, Salt fox, Silt stoat, Shard sentinel, Geode golem, Prism warden, Ridge wyrm, Halo serpent, and Spire coil. Everything stays inside the SDK’s 960 × 640 container.

## Rules and rewards

**All balances, purchases, and rewards are simulated.** Preview start: **500 RF** and **2500 RF** prize stake. One torch costs **25 RF** and reserves the maximum **250 RF** prize. Kept trophies retain backing and have no redemption expiry. `canBuy` can refuse a purchase the reserve cannot back.

| Action | AP | Friend damage | Foe strike |
|---|---:|---:|---|
| Normal Attack | 2 | 10, or 20 on a match | full strike |
| Big Attack | 5 | 20, or 40 on a match | full strike |
| Block | 2 | 0 | half strike, rounded down |
| Flee | 0 | fight ends, no trophy | no strike |

| Band | HP | Strike | Weight |
|---|---:|---:|---:|
| Common (mite, grub, tick) | 40 | 12 | 4500 |
| Uncommon (hare, fox, stoat) | 70 | 18 | 2500 |
| Rare (sentinel, golem, warden) | 90 | 28 | 1500 |
| Legendary (wyrm, serpent, coil) | 140 | 36 | 1500 |

Rested (100 HP, 24 AP) and the best legal list: a match pays on 85% of torches, a mismatch or empty hands on 70%. An even weakness mix is 75% for every weapon. The win table’s expected sell value is 30 RF, so the ceiling is **22.5 RF per torch** (90% of the 25 RF price) for every weapon. Unarmed is **21 RF**. Commons and uncommons fall to empty hands. Rares fall only with a match. Legendaries do not fall. The 10 RF weapon buy/sell gap is a separate shop tax.

| Weapon | Shop line | Buy | Sell-back |
|---|---|---:|---:|
| Sword | Soft to slash | 100 RF | 90 RF |
| Bow | Soft to pierce | 100 RF | 90 RF |
| Staff | Soft to arcane | 100 RF | 90 RF |

| Drop | Sell |
|---|---:|
| Broken stick | 0 RF (keep-only junk; a fight does not mint it) |
| Potion | 6.25 RF |
| Quartz chip | 12.5 RF |
| Ether | 18.75 RF |
| Mythril | 37.5 RF |
| Phoenix down | 62.5 RF |
| Ribbon | 125 RF |
| Crystal | 250 RF |

Foe HP 0 mints the trophy rolled with that torch. Flee or Friend HP 0 mints nothing. Rewind does not reroll the foe or the trophy. An open fight resumes on the next shadow and does not spend a second torch. Preview progress resets when the session ends.

## Checks, credits and limitations

From the source repo: `npm test` (34 tests in `tests/rare-fantasy.test.mjs`), `npm run typecheck`, `npm run check:games`, and `npm run build` all passed on this submission commit. `check:browser` is the SDK fishing/starter suite and was not run as a Rare Fantasy playthrough. The public preview was loaded and shows the wallet gate (“No browser wallet found” in a browser without a wallet). A real-wallet playthrough of the hosted build is still outstanding from this environment.

**Credits:** FriendSDK world preset Crystal Steps, canonical Friend sprites, SDK UI and sound kit. Original: **Mica**, **Champ** (gold whale) and the lilac trail stall, mesa bestiary (Glass mite, Dust grub, Pebble tick, Quartz hare, Salt fox, Silt stoat, Shard sentinel, Geode golem, Prism warden, Ridge wyrm, Halo serpent, Spire coil), weapons art, loot bitmaps, shadow ambush art, copy, battle chrome, and the party preview dialect.

**Known limits:** simulated preview only; bag, weapon, RF, HP, AP, and bestiary reset when the session ends; no `localStorage`; no live RF; no Token Activity claim. Potion, Ether, and Phoenix Down do not heal. Sleep is the refill. The in-game HUD is the party ledger (500 RF). The host wallet pill still shows the stock 20 RF preview session because weapon buy/sell cannot cross the iframe bridge without patching FriendSDK `src/`. The weapon overlay is drawn in Status and the clash; the mesa walk sprite does not wear it. Production publication needs separate Rare Friends review.
