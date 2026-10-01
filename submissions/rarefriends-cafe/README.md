# RareFriends Cafe

**▶ Play:** https://m4s4t0-v01d.github.io/rarefriends-cafe/ · **Preview page:** https://m4s4t0-v01d.github.io/rarefriends-cafe/preview/ · **Source:** https://github.com/M4S4T0-V01D/rarefriends-cafe

*Your Rare Friend opens a shop on a quiet greyscale street. Your other Friends staff it, and every day ends with a picture worth posting.*

![RareFriends Cafe: a decorated long diner on a greyscale street, with Rare Friends walking in](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/decor.png)

| | |
| --- | --- |
| **Project** | RareFriends Cafe |
| **Builder** | M4S4T0 · GitHub [@M4S4T0-V01D](https://github.com/M4S4T0-V01D) |
| **Category** | Character Spotlight (also entering Economy Potential and Token Activity) |
| **Source repository** | https://github.com/M4S4T0-V01D/rarefriends-cafe |
| **Playable preview** | https://m4s4t0-v01d.github.io/rarefriends-cafe/ (GitHub Pages, deployed by CI from `main`) |
| **Preview page** | https://m4s4t0-v01d.github.io/rarefriends-cafe/preview/ (screenshots, features, capsule odds, play button, and a record button that plays the game's Street Bossa) |
| **Stack** | FriendSDK **v0.1.4** (SDK `GameHost` + CLI game build), React 19, Canvas 2D, WebAudio, TypeScript |

**One sentence:** A greyscale 2.5D isometric shop sim where your owned Rare Friend is the manager. Your other owned
Friends are staff, tiered by their on-chain generation, and Rare Friends walking down the street become your customers.
Rare Capsules spend (simulated) $RAREFRIENDS on recipes, RF-exclusive décor, boosts and sceneries.

## Screenshots

| The world outside, zoomed out | The view turned a quarter | Four buildings |
| --- | --- | --- |
| ![World](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/world.png) | ![Turned view](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/turned.png) | ![Buildings](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/buildings.png) |
| **Build: tables, rugs, décor, turn** | **Upgrades** | **Your manager's skills** |
| ![Build](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/build.png) | ![Upgrades](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/upgrades.png) | ![Manager](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/manager.png) |
| **RF boosts and sceneries** | **Staff: tiers, levels, attribute points** | **Dark mode** |
| ![Boosts](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/boosts.png) | ![Staff](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/staff.png) | ![Dark mode](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/dark.png) |
| **Choose your shop** | **Rare Capsule Machine** | **RF-exclusive collection** |
| ![Shop picker](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/shop-picker.png) | ![Capsule machine](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/capsule-machine.png) | ![Collection](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/collection.png) |

**End-of-day card, ready to post on X:**

![Day card](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-cafe/main/docs/day-card.png)

## Wallet and network requirements

A browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired Rare Friends Generations NFT (generation ≥ 1).
FriendSDK's `GameHost` handles wallet connection, Friend selection and the fresh ownership check. Phones need a wallet with
an in-app browser (for example MetaMask Mobile). **All RF balances, purchases and rewards are simulated**: no contracts,
signatures or transactions.

## Setup and run

```sh
git clone https://github.com/M4S4T0-V01D/rarefriends-cafe.git
cd rarefriends-cafe
npm ci
npm run dev        # http://localhost:4173   (npm run dev:lan to play from a phone on the same network)
npm run build      # static site → games/rarefriends-cafe/.friendsdk/
```

Node.js 22+. FriendSDK v0.1.4 is vendored from the official v0.1.4 release archive (SHA-256 checked); its preview build carries no transaction-capable code.

## How to play

- **Choose your shop:** coffee & sweets café, seafood restaurant, pastry shop, burger diner or Asian noodle house. Each has its own 12-dish menu (seven, two capsule specials, three late-game signatures), dish art and kitchen station.
- **Serve:** Friends walk a long street lined with neighbouring shops, and some come in, alone or in parties at tables for two or four. Tap a guest (or press their table number) to take the whole table's order. When the counter bell rings, tap the counter; your manager delivers. WASD walks, E acts nearby.
- **Look around:** drag to pan, scroll or pinch to zoom, and turn the whole view a quarter at a time (⟲ ⟳, [ ], right-drag). Pause with ⏸ / Esc.
- **Every day is different:** three daily challenges pay Beans and XP, and random events drop in: a food critic, a celebrity Friend, a tour bus, rain, a lunch rush or a kitchen hiccup.
- **Pick a building:** corner café, long diner (10 × 14), townhouse with its kitchen on the back wall, or a café with a front parlour far from the pass. Change it between days.
- **Earn Beans** (an in-shop currency, not RF) through tips over **five-minute days**. Spend them on dishes, kitchen station levels, **twelve upgrade tracks**, staff slots, furniture, designs, sceneries and **ten expansions** (up to 20 × 20). Purchases ask first. The café has 15 levels, and every level gives your **manager a skill point** (quick feet, steady hands, snappy service, charm, calm presence, leadership).
- **Staff:** 1 slot to start, up to 10 (each expansion adds one). Fill slots with **your own Friends** or guest applicants. **Waiters** serve, **chefs** cook in the kitchen room, and **promoters** work the sidewalk to bring passers-by in.
- **Worker tier by generation:** Gen 1 Legendary ×1.30 … Gen 6 Rookie ×1.05; guests ×1.00. Workers earn XP and level up (1–10, +4% each); each level earns a point for **speed, stamina or skill**. Chefs carry each dish from the stove to the pass.
- **Break room:** workers tire as they work (tired at 70, exhausted at 100). Tap a *zzz* worker (or press T) to send them to the break room for 15–30 s, depending on fatigue.
- **Build (B):** place, move, turn and sell 40 kinds of furniture and décor (tables for one, two and four up to a grand piano, koi pond and mini carousel), each **turning four ways**, and move the capsule machine. Pick from 12 wallpapers, 12 floors, 8 sceneries for the world outside, the building and the music. Placements that would block guests or staff are refused.
- **Manager perk by family:** Skeleton cooks faster · Mask +10% tips · Family faster staff · Cellular carries 3 · Asymmetry 12% double pay · Hoverer moves 30% faster · Colossus +25% patience · Sparkling +0.5★ · Hollow +15% walk-ins.
- **Audio:** sixteen procedural tracks (swing, bossa, jazz waltz and lo-fi) playing eleven composed melodies, plus effects (coffee-ready chime, door bell, Friends' happy chirps and tired sighs). Mute with ♪; settings in Settings and Build → Music. Reduce motion is available.
- **Progress saves per wallet address** (on this device). Each day's **report card** can be posted to X, tagged @RareFriendsNFT #RareFriends #RareFriendsCafe.

### Rare Capsule Machine: RF costs, odds and rules (simulated)

| Tier | Chance | RF value | Kept recipe bonus | RF-exclusive collectibles |
| --- | --- | --- | --- | --- |
| House Secret | 60% (6,000 bps) | 0.5 RF | +3% tips per recipe (max 5) | Lucky Cat, Gumball Machine, Paper Crane Stand |
| Silver Recipe | 28% (2,800 bps) | 1 RF | your shop's silver special | Chrome Jukebox (unlocks a track), Silver Fountain |
| Moonlight Recipe | 10% (1,000 bps) | 2 RF | moonlight special, +10% patience | Moon Telescope (unlocks a track), Star Lamp |
| Golden Recipe | 2% (200 bps) | 5 RF | Genesis VIP guests pay 3× | Golden Friend Statue of your manager |

- **Price** 1 RF (`1000000000000000000` base units); buy ×1 or ×5. **Expected RF value** 0.88 RF per capsule.
- **Consumable:** one capsule opens into exactly one recipe; single settlement, no reroll.
- **Backing:** each purchased or pending capsule reserves 5 RF; kept recipes keep their fixed RF backing, with no expiry. Redeeming removes that recipe's bonus.
- **Collectibles:** every capsule also grants an uncollected exclusive of its tier, or Beans for duplicates (40/80/160/400). Collectibles carry no RF value and are saved with your shop.
- **RF boosts and RF sceneries, paid with capsules:** the v0.1.4 bridge has no generic "spend RF on an upgrade" action, so these are paid with capsules bought with RF. They still open and settle through the SDK (keep or redeem their recipes) but give the boost or scenery instead of a collectible. Boosts: Tireless crew (2 capsules, 3 days), Perfect service (2, 1 day), Street festival (3, 2 days), Golden hour (3, 2 days). Sceneries, kept for good: Seaside and Snowy village (3), Cherry blossom lane (4), Night market (5).

Capsules use the SDK chance-game client (`buy` / `play` / `settle` / `redeem`) with runtime confirmations. **Economy design:**
Beans are earn-only; RF is a boost, not a paywall; holding more (and better-generation) Friends pays off as stronger staff.
Proposed future RF integrations, which need APIs beyond SDK v0.1.4: cloud saves, RF-priced premium décor with burn,
live Dice-RNG capsules, visiting other holders' shops with RF tips, and staff revenue share.

### SDK integration notes

The runtime page is the SDK's `GameHost`, unchanged in behaviour. `host/runtime.tsx` adds three things. First, a
read-only `readOwnedFriends` roster with generations (account-filtered, `eth_accounts` only). Second, per-wallet
`localStorage` saves, because the sandbox has no storage. Third, day-card sharing (share sheet, or clipboard plus a
prefilled X post), because the sandbox can't open tabs or copy. The sandboxed game receives the roster and save over
`postMessage` from its parent window, and uses them only when the roster contains the manager the runtime just
verified. There are no signatures or extra prompts.

### Credits

Scenery, rooms, street, furniture, RF exclusives, dish icons, procedural guest Friends, and all music and sound effects are
original code. The manager and owned staff use their canonical Generations sprites. Regulars #7730 and #3412 use canonical
sample frames from FriendSDK v0.1.4. UI cues use the FriendSDK sound kit. Rare Friends artwork is used under the FriendSDK
NOTICE. Gameplay inspired by café management games such as *Moe Girl Cafe 2*; no assets from them are used.

## Checks and known issues

| Check | Result |
| --- | --- |
| `npm run typecheck` (tsc strict, game + host) | Pass |
| `npm test`: 46 engine tests (plan/routing in all four buildings at every size, street, corner and neighbourhood walkers, service, group tables ordering together, day cycle, placement and four-way rotation, the Turn tool, moving the capsule machine, chefs carrying dishes, expansions and staff slots, building switches, upgrades, manager skills, RF boosts, sceneries, daily challenges, random events, late-game content, generation tiers, worker XP and attribute points, roles, fatigue/breaks, saves + migration, collectibles, melodies, music unlocks, X post text, economy) | Pass |
| `npm run check` (`friendsdk check`) | Pass: expected reward 0.88 RF, max 5 RF |
| Browser, SDK CLI host, 960 px: shop pick, keyboard service, build with purchase confirmations (pointer + keyboard), floor + music tabs, staff, capsules ×5 → open all → collection → place, an RF boost paid with capsules, turning the view, pause and resume, sound toggle | Pass |
| Browser, 360 px touch: a touch start leaves music and sound running at an audible level; service and build bar | Pass |
| Browser, custom host, two-Friend mock wallet: #3412 as chef with canonical art, full day → day card → Post to X (prefilled + picture copied), save and reload → restored | Pass |
| Browser, preview page: the record button plays Street Bossa audibly on click (desktop) and tap (phone), and stops | Pass |
| All of the above in GitHub Actions before each Pages deploy | Pass |
| Real-wallet playtest on Robinhood mainnet: owned Friends as staff with generation tiers and levels, close and reload to resume, day card (the one above is from this play) | Pass: played extensively by the builder |

Known limitations: saves are per device and browser, keyed by wallet address, and client-side. Capsule balances and kept
recipes reset on reload (SDK session ledger); collectibles persist. Guest Friends are procedural art in the Rare Friends
style. The owned-staff roster depends on the RPC returning the wallet's transfer history. Audio starts on the first tap; on iPhones before iOS 17, silent mode may keep it quiet.
Wallet support is the SDK's (injected / EIP-6963). There is no wallet or fund risk: nothing is signed or sent.
