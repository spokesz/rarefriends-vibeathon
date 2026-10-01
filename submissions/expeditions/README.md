# Rare Friends: Expeditions

![Night camp: a Friend wearing the Scarab Brooch trophy over the gold keepsake glow of a kept Legendary find](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/trophy.png)

🕹️ **Play: https://dedq3e.github.io/rare-friends-expeditions/**

**Economy in numbers: a 1 RF pass pays back 0.90 RF on average (10% edge, 10 RF top prize reserved per pass) · 50% of every Outfitter RF is burned · 1,000 players, base case: 1,000 RF burned a day, 30,000 RF in 30 days, 50,400 RF held in kept finds · the bank never goes below zero in any of the six 30-day runs, including a selling rush, nobody selling and 10× the players (simulated model).**

🎬 **Gameplay video with sound (59 s):** the camp and the Expedition board, the Whispering Forest, the Crystal Cave and the Sunken Ruins, each run ending at its chest; recorded with the SDK's mock wallet (`tests/demo.mjs`, [MP4 file](https://dedq3e.github.io/rare-friends-expeditions/demo.mp4)).

https://github.com/user-attachments/assets/95c689d1-fd6c-438c-8f66-f6f8ad552ca0

**Project name**
Rare Friends: Expeditions

**Builder / contact**
[DEDQ3E](https://github.com/DEDQ3E) · Discord `dedq3e3` · Telegram [@DEDQ3E](https://t.me/DEDQ3E)

**Category**
Economy Potential

**One sentence**
Your own Generations Friend goes on 1 RF expeditions through three mini-games and brings back finds you either sell for RF or keep for an XP bonus, while an Outfitter burns half of every RF it takes (all simulated in this preview).

## What did you build?

A night camp from which your Rare Friend sets out on short expeditions, each paid for with a 1 RF Expedition Pass and each ending at a chest with one find to keep or sell. Three places, three different mini-games: the **Whispering Forest** (a side-scrolling runner with weather and time of day), the **Crystal Cave** (a lantern-lit descent on a rope through four zones) and the **Sunken Ruins** (a top-down trap gauntlet against a 75-second hourglass). Around them: a Merchant that buys finds at fixed prices, an Outfitter that sells gear and trails as an RF sink, a collection with a hero card, an Economy panel, Friend perks, emotes, a limited Harvest Season and procedural music. Everything lives inside the SDK's 960 × 640 container, and on phones the panels switch to a compact layout.

## How does it use Rare Friends?

The selected, ownership-verified Friend is the hero of every expedition. Its canonical Generations frames are read through the SDK and drawn in the canonical look (black mask, white one-pixel halo), with its own shape and walk animation, and it is redrawn after rain, darkness and light overlays so nothing tints it. A 13-piece **wardrobe** (hats, a scarf, tops, capes, boots) is fitted to each Friend's own silhouette, frame by frame: hats sit on its real head and ears, horns and antennae poke through them, tops follow its own torso pixels, the cape follows its back and flutters while it moves, boots cover its own feet. Its outline, halo and shape are never changed, and one tap takes everything off to show its original artwork (FriendSDK v0.1.4 allows costumes). Its **family** picks one of nine perks and its **generation** (one read-only `generation(tokenId)` call on the Generations contract) sets the strength, from rank V for Generation 1 to rank I for Generation 5, so different Friends play differently. Kept finds from Rare up also give the Friend a **trophy** worn on its chest (see "Hold or redeem"), drawn only on inner pixels of its own silhouette, never on its outline or halo. The SDK runtime handles the wallet, Friend selection and the ownership gate; the game adds no wallet code.

## How RF is spent, and the economy

**Two independent RF loops**, both shown in the game's Economy panel:

| Loop | Player pays | Player gets back | Where the rest goes |
|---|---|---|---|
| Expedition Pass (SDK chance game, repeatable) | 1 RF per pass | one find, worth 0.90 RF on average at the Merchant | 10% edge stays in the game bank; every pass reserves the 10 RF top prize, so the bank can always pay |
| Outfitter (pure sink) | 2–8 RF per item, 80 RF for the full catalog | nothing: never refunded, no effect on odds | 50% burned, 50% to Friend rewards (proposed split) |
| Outfitter supplies: Trail Rations (repeatable) | 0.2 RF per expedition, optional | +1 heart for one expedition, never better odds | 50% burned, 50% to Friend rewards (proposed) |

**Hold or redeem.** A find is a *productive keepsake*: while the Friend keeps it, it adds XP to every expedition, and selling it at the Merchant pays its fixed RF and gives the bonus up. Common +1%, Uncommon +2%, Rare +4.5%, Epic +8%, Legendary +17%, Mythic +36%, up to +50% in total. Rarer finds give more bonus per RF they hold back (2.5% per RF for a Common, 3.6% per RF for a Mythic), so the biggest prizes are the ones most worth keeping and **their RF stays in the game as backing** instead of returning to circulation. The bonus depends on rarity only, because the SDK inventory (and, live, the ERC-1155 balances) counts finds by rarity tier: a Rare from the forest, the cave or the ruins gives the same bonus. It changes XP only, never odds, prices or finds. **XP is what unlocks RF spending:** levels open prestige wardrobe pieces sold only from that level (Star Cloak, 6 RF, at Lv 4; Golden Crown, 8 RF, at Lv 6), so holding finds, and playing well, turn into demand for RF. **Keepsake glow:** the rarest kept find, from Rare up, also lights a glow under the Friend in the camp and on every expedition (Rare blue, Epic purple, Legendary gold, Mythic rainbow), shown on the hero card. Selling the last find of that rarity dims the glow to the next one or puts it out, and the chest's sell button and the Merchant say so before you sell, so keeping a prize has a visible value beyond its RF. The glow is drawn under the Friend and never changes its artwork.

![Keepsake glow: none, Rare, Epic, Legendary, Mythic](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/keepsake-glow.png)

**Trophies: a find you can wear.** Every rarity from Rare up comes with a trophy the Friend wears on its chest: Rare the **Feather Pin** (blue), Epic the **Amber Amulet** (purple), Legendary the **Scarab Brooch** (gold), Mythic the **Heart Pendant** (rainbow). A trophy cannot be bought or sold for RF. It is worn while the Friend keeps at least one find of its rarity, read from the same SDK inventory counts as the bonus and the glow, and selling the last one takes it off. The chest says "Keep it to wear the Scarab Brooch", the Merchant's sell button says "Selling removes your Scarab Brooch", and the hero card shows the trophy that is worn. With several held, the rarest is worn; any held one can be picked in the Outfitter's wardrobe, and "Take everything off" shows the original artwork. A trophy is at most six pixels, drawn only on the Friend's inner pixels, so its outline and halo never change (`npm run wardrobe` checks this on ten bodies, front and side). It is cosmetic: the XP bonus and the glow stay exactly as they are. So a kept prize is RF you can redeem, XP you earn and something your Friend wears, and the last two go when you sell.

**Built on the Ethergoo hold-or-redeem pattern — what Expeditions adds.** The pass loop follows the pattern of Ethergoo, the organizers' example submission ([spokesz/rarefriends-vibeathon#4](https://github.com/spokesz/rarefriends-vibeathon/pull/4)): a 1 RF chance item turns into a collectible with a fixed, fully backed RF redemption value, productive while held (there a goo production bonus, here an XP bonus), with more bonus per RF for rarer items. Expeditions builds on that base:

| Added in Expeditions | What it does | Why it matters for RF |
|---|---|---|
| Skill runs | Every pass is a real run in one of three mini-games (forest runner, cave descent, ruins gauntlet); skill earns XP, never better odds | Play value in every pass, while the contract alone decides the find |
| Trophies | Rare to Mythic finds are worn on the Friend's chest while kept; never sold | A visible reason to hold, and a reason to pay above the floor (see "Trading finds") |
| XP → items from a level | Keepsakes speed up XP; the Star Cloak (6 RF) opens at Lv 4, the Golden Crown (8 RF) at Lv 6 | Holding and playing well turn into demand for RF |
| Outfitter 50 / 50 | Gear, clothes, trails and Trail Rations; never refunded, never change odds; 50% burned, 50% to Friend rewards (proposal) | A pure sink: with half the edge, 7–10% of all RF spent in the game is burned |
| Seasons | Harvest Season items sold only until Nov 30; a new limited item every season (roadmap) | Recurring, time-limited demand |
| Floor price when trading | The Merchant's fixed price is a hard floor for traded finds; 5% fee, 2.5% burned (roadmap) | Finds cannot trade below their backing; trading burns RF too |

**Per pass:** expected return 0.90 RF, standard deviation 1.34 RF, 23% chance of getting 1 RF or more back.

**Sessions** (exact distribution over every possible outcome from `game.json`, every find sold, no sampling; reproduce with `npm run sessions`):

| Passes | Mean back | 10th pct | Median | 90th pct | 99th pct | Sessions ending ahead |
|---:|---:|---:|---:|---:|---:|---:|
| 10 (10 RF) | 9.00 RF | 4.60 RF | 8.00 RF | 14.95 RF | 22.40 RF | 31% |
| 30 (30 RF) | 27.00 RF | 18.45 RF | 26.05 RF | 36.85 RF | 47.75 RF | 30% |

Most sessions lose a little, about three in ten end ahead, and big finds are rare but real. The edge is small enough to keep players coming back and large enough to fund the bank.

**1,000 players a day.** An expected-value model with the exact odds from `game.json` and no sampling, under three sets of stated assumptions: 5 / 10 / 20 passes per player, the share of each rarity kept (rarer finds kept more often), days held, Outfitter spending and how often a Trail Ration is packed (`scripts/economy-model.mjs`, reproduce with `npm run model`):

| RF per day, 1,000 players | Conservative | Base | Optimistic |
|---|---:|---:|---:|
| Passes bought and played | 5,000 RF | 10,000 RF | 20,000 RF |
| Finds paid out at the Merchant (steady state) | 4,500 RF | 9,000 RF | 18,000 RF |
| New RF held in kept finds | 1,088 RF | 3,600 RF | 9,000 RF |
| Game edge (10%) | 500 RF | 1,000 RF | 2,000 RF |
| Outfitter and Trail Rations | 300 RF | 1,000 RF | 2,600 RF |
| **Burned** (50% of the Outfitter + 50% of the edge) | **400 RF** | **1,000 RF** | **2,300 RF** |
| Backing held for kept finds (steady state) | 7,613 RF | 50,400 RF | 270,000 RF |
| Stake reserved (10 RF per unplayed pass + kept finds) | 17,613 RF | 60,400 RF | 280,000 RF |
| Roadmap: trade-fee burn (5% of held finds traded a day, 2.5% fee burned) | 10 RF | 63 RF | 338 RF |

The bank stays solvent by construction: the SDK contract refuses a pass unless the stake can reserve the 10 RF top prize, and kept finds stay backed until redeemed. On average the passes pay for that backing (0.90 RF of every 1 RF), so the builder's own capital mainly covers the reserve for unplayed passes (about 10,000 RF for 1,000 players). The 10% edge is the bank's surplus; we propose burning half of it, which with the Outfitter's 50% burn burns 7–10% of all RF spent in the game each day.

**30 days, day by day.** The same three scenarios run for 30 days against the game bank with the SDK contract's rules: a pass is sold only while the free stake covers the 10 RF top prize, it reserves that prize until it is played, a kept find stays booked as a liability until it is sold, and free stake = stake − reserved passes − kept finds. The bank starts with 10,000 RF from the builder (one top prize per player of the 1,000-player base). Three stress tests run on the Base scenario: everyone sells every kept find on day 30, nobody ever sells, and 10× the players with the same 10,000 RF (`scripts/economy-model.mjs`, reproduce with `npm run model`; `npm run economy` checks every row):

| 30 days (10,000 RF funding) | Passes played | Passes refused | **Burned** | RF held in kept finds (day 30) | Lowest free stake | Free stake, day 30 | Bank never below zero |
|---|---:|---:|---:|---:|---:|---:|:---:|
| Conservative | 150,000 | 0 | **12,000 RF** | 7,613 RF | 1,000 RF | 17,500 RF | yes |
| Base | 300,000 | 0 | **30,000 RF** | 50,400 RF | 1,000 RF | 25,000 RF | yes |
| Optimistic | 600,000 | 0 | **69,000 RF** | 270,000 RF | 1,000 RF | 40,000 RF | yes |
| Stress: everyone sells every kept find on day 30 | 300,000 | 0 | **30,000 RF** | 0 RF | 1,000 RF | 25,000 RF | yes |
| Stress: nobody ever sells a find | 300,000 | 0 | **30,000 RF** | 270,000 RF | 1,000 RF | 25,000 RF | yes |
| Stress: 10× the players, same 10,000 RF funding | 812,190 | 2,187,810 (73%) | **81,219 RF** | 193,432 RF | 1 RF | 50,610 RF | yes |

*Assumptions about players (stated, not measured):* each scenario's passes are played the same day one at a time, so at the day's busiest moment every playing player holds one unplayed pass (that moment gives the lowest free stake); finds are kept in the scenario's share per rarity and a kept find is sold exactly its scenario's days later (7 / 14 / 30), every other find the day it is found; Outfitter and Trail Ration spending as in the daily model; half of the Outfitter and half of the edge burned (proposals). In the three scenarios and the first two stress tests, the lowest free stake is the morning of day 1, when 1,000 players each hold a reserved pass: 10,000 RF − 1,000 × 9 RF. After that the other half of the edge stays in the bank, so it grows every day. A selling rush does not move the free stake at all, because every kept find was backed from the moment it was found; if nobody sells, the RF held in finds simply grows (270,000 RF, all backed). With 10× the players and the same funding, the contract sells only the passes it can back: 73% of the demand is turned away in the first month and the bank never overcommits, while the edge grows its capacity every day. Serving 10,000 players from day one needs about 90,000 RF of free stake: 9 RF per playing player (the 10 RF reserve less the 1 RF the pass pays in).

**Trading finds (roadmap, not in this MVP).** Finds are ERC-1155 rewards in the Friend's wallet, so they can be listed against $RAREFRIENDS. The Merchant price is a hard floor: anyone can redeem a find for its fixed RF at any time, backed by the stake, so a find bought below the floor can be redeemed at a profit and the price cannot stay under it. Above the floor a find is worth its RF plus what holding it gives an active player: its keepsake bonus (a Mythic: 10 RF and the largest bonus, +36% XP, toward the Lv 6 Golden Crown) and its trophy. The trophy is the part of that premium RF cannot buy anywhere else: a Legendary find is the only way to wear the Scarab Brooch, and a Mythic the only way to wear the Heart Pendant, so a player who wants one pays above the floor, while the floor itself stays backed by the stake. Proposed trade fee 5%: 2.5% burned, 2.5% to the game bank and Friend rewards (last row of the table).

**Why players keep spending RF:** harder places behind gear (Cave Lantern 5 RF, Ruins Map 8 RF, with ×1.5 and ×2 XP), gear, clothes and trails that change the run and the look but never the odds, prestige clothes unlocked by level, Trail Rations for any expedition, a Harvest Season trail sold only until Nov 30, keepsakes worth holding, trophies worn only while a Rare or better find is kept, a 13-piece wardrobe fitted to your own Friend, and a Twig Torch crafted from 10 junk finds, so even a 0 RF chest moves progress.

## What would be on-chain?

Nothing in this build; no transaction is ever sent. Going live needs no new contract for the pass loop, only a deployment of the SDK's `ChanceGame` with this `game.json` (its RF price and outcome table are immutable):

- `buy` pays RF from the Friend's canonical NFT wallet and mints Expedition Passes into it (non-transferable consumables). Each purchase reserves the 10 RF top prize from the game's stake.
- `play` burns a pass and commits the play when the Friend sets out.
- A sponsor pays the Dice fee, the oracle records one random word, and anyone can `settle`: the find is minted as a permanent ERC-1155 reward into the canonical NFT wallet.
- `redeem` burns a find for its fixed RF, back into the same NFT wallet, with no expiry. Reserves for unused passes, pending plays and kept finds cannot be withdrawn by the developer.

RF, passes, finds, backing and every outcome would be on-chain. The keepsake bonus and the trophies become a read of the Friend wallet's find balances, so they are verifiable from chain state. XP, levels, gear and the runs stay off-chain. The Outfitter's 50% burn / 50% rewards split needs a custom RF integration, and saved progress needs storage that FriendSDK v0.1.4 does not supply.

## How does it use randomness?

Only the find is a paid random outcome. In the preview it comes from the SDK's simulated ledger; live, it is the SDK's Dice commit-and-reveal flow: the pass is burned and the play committed before any randomness exists, one request per play, no reroll, and a slow delivery resumes the same play ("Resume expedition") without another pass. The browser never chooses the find, and the chest is delivered even if the Friend runs out of hearts: the SDK rule is one pass, one result. Obstacles, creatures, weather and pickups are browser-random gameplay with no RF value; skill, weather and perks change the run and XP, never the find.

## Source code

[GitHub repository](https://github.com/DEDQ3E/rare-friends-expeditions) · reviewed build: commit [`9f48eb9`](https://github.com/DEDQ3E/rare-friends-expeditions/tree/9f48eb94a82a1fb3b8e8695551443bf8a57b7115) · FriendSDK v0.1.4 · React 19 · TypeScript · [Game rules](https://github.com/DEDQ3E/rare-friends-expeditions/blob/main/games/expeditions/README.md) · [Economy (`game.json`)](https://github.com/DEDQ3E/rare-friends-expeditions/blob/main/games/expeditions/game.json)

## Playable demo / how to run

**Play: https://dedq3e.github.io/rare-friends-expeditions/** (GitHub Pages, built with `friendsdk build`). You need a browser wallet holding a hardwired Rare Friends Generations NFT (generation 1 or higher) on Robinhood mainnet (chain 4663). No RF funding or transaction signature is needed. On a phone, open the link in your wallet app's built-in browser (for example MetaMask → Browser) and hold the phone sideways: regular mobile browsers have no wallet extension.

To run locally with Node.js 22+ on Linux, Windows with WSL2 (both supported by FriendSDK) or native Windows (verified on Windows 11 with Node.js 24):

```sh
git clone https://github.com/DEDQ3E/rare-friends-expeditions.git
cd rare-friends-expeditions
git checkout 9f48eb94a82a1fb3b8e8695551443bf8a57b7115
npm ci
npm run dev        # http://localhost:4173
```

Step-by-step notes for each platform: [Run locally](https://github.com/DEDQ3E/rare-friends-expeditions#run-locally).

## How do you play?

A three-page **start guide** opens when the game loads (how the camp and the pass work, the three places and their controls, what to buy first) and can be reopened any time with the **?** button or from Settings.

1. **Camp:** walk with W A S D or the arrows (on touch, the on-screen pad) and press **E** at a place, or tap its label. At the **Expeditions** board buy passes, pick a place and press **Set out!** The find is committed at this moment.
2. **Whispering Forest (~23 s):** jump with W / Space / ↑ or a tap (Spring Boots add a double jump), move with A / D, drop with S. Collect sparks; roots, rocks, slimes, hedgehogs, bees and bats cost a heart. Each expedition rolls its own time of day and rain, shown as a forecast on the board; rain pays a little more XP (×1.1 / ×1.2 / ×1.3).
3. **Crystal Cave (Cave Lantern, 5 RF):** the Friend is lowered on a rope: steer with A / D, hold W / Space / tap to slow down, S to dive. Four zones: ledges and spiders, drafts, bats and falling rocks with a warning, narrow gates and swinging slabs, then everything at once. Crystals give XP ×1.5.
4. **Sunken Ruins (Ruins Map, 8 RF):** top-down, tile by tile to the altar before the sand runs out: spike plates in waves, dart traps, rolling boulders, crumbling floor over pits and fire vents, in three ever harder halls. Relic shards give XP ×2.
5. **Chest:** the find is revealed. **Keep it** for its keepsake bonus (from Rare up also its trophy: "Keep it to wear the Scarab Brooch"), or **sell** it.
6. **Merchant:** buys finds at fixed prices with no expiry and shows each find's keepsake bonus; a sell button that would take a trophy away says so ("Selling removes your Scarab Brooch").
7. **Outfitter:** Spring Boots (double jump, 3 RF), Trail Backpack (+1 heart, 4 RF), Cave Lantern (5 RF), Ruins Map (8 RF), Spark Trail (4 RF), the Harvest Season Falling Leaves trail (5 RF, until Nov 30), Trail Rations (0.2 RF: +1 heart for one expedition) and the wardrobe: Explorer Hat 3, Wizard Hat 5, Miner Helmet 4, Flower Crown 3, Bobble Beanie 3, Pumpkin Hat 5 (Harvest Season), Golden Crown 8 (from Lv 6), Knit Scarf 2, Cozy Sweater 3, Ranger Vest 3, Red Cape 4, Star Cloak 6 (from Lv 4), Rain Boots 2 RF, each previewed on your own Friend before you buy, one piece per slot; below them the four trophies (not for sale), worn while a find of their rarity is kept. The workbench turns 10 junk finds into a Twig Torch that glows at night.
8. **Collection:** a hero card (portrait, family, generation, perk, level, keepsake bonus, glow, worn trophy, best find) and the finds of all three places. **Economy panel:** tap the RF balance to see where every RF goes.

Pickups give 1 XP each plus a bonus for reaching the chest (doubled without a hit), multiplied by the place, the Friend's perk and its keepsakes. XP raises the level and title over ten levels up to 2,500 XP, from Novice to Legend. Settings: sound (on by default, starts with the first click or key), music, volume and reduce motion; the game honors the runtime's `paused` state. Keyboard and touch are both supported.

## Costs and rewards

**Everything is simulated.** You start with 20 RF; each pass costs 1 RF and gives exactly one find. All three places share one table; the place only changes how a find looks.

| Find (forest) | Rarity | Chance | Merchant pays | Keepsake bonus |
|---|---|---:|---:|---:|
| Dry Twig | Junk | 20% | 0 RF | — |
| Acorn | Common | 35% | 0.4 RF | +1% XP |
| Porcini | Uncommon | 22% | 0.75 RF | +2% XP |
| Owl Feather | Rare | 13% | 1.5 RF | +4.5% XP |
| Amber Beetle | Epic | 6% | 2.5 RF | +8% XP |
| Golden Scarab | Legendary | 3% | 5 RF | +17% XP |
| Heart of the Forest | Mythic | 1% | 10 RF | +36% XP |

Expected reward **0.90 RF per pass** (10% game edge, the same expected reward as the SDK fishing example). Each purchased pass reserves the 10 RF top prize; kept finds retain backing and have no redemption expiry. **Outfitter purchases are never refunded**: 50% is burned and 50% goes to Friend rewards (proposed split, simulated on top of the SDK ledger because FriendSDK v0.1.4 has no upgrade API).

**RF prices are placeholders.** The amounts in this preview (a 1 RF pass, 0.4–10 RF finds, 0.2–8 RF Outfitter items) only show the proportions. To price the game higher, multiply every RF amount by the same factor: the pass price and every find reward in `game.json`, the Outfitter and Trail Ration prices and the 20 RF starting balance. The odds, the 90% expected return, the 10% edge, the 23% chance to get the pass price or more back, the keepsake bonuses, the glow and the trophies stay exactly the same, and every RF figure in the tables above (sessions, the 1,000-player model, the 30-day model with the builder's funding) scales by that factor; only the "bonus per RF held" figures divide by it. `npm run economy` checks the odds, the expected return and the session statistics at five times the prices. Nothing in the Outfitter changes RF odds.

## What have you tested?

All pass: `npm run typecheck`; `npm run check` (game validation: expected reward 0.9 RF, maximum 10 RF); `npm test` (SDK browser fixture at 960 px); `npm run economy` (exact odds across all 10,000 rolls, expected return, reserve, the keepsake curve, the trophy rules, the 1,000-player model, the 30-day model and its stress tests (the bank never below zero on any day of any run, RF flows that add up, burn and backing that match the daily model), the 80 RF catalog, and every published odds, session and model table checked against `game.json`, `npm run sessions` and `npm run model`); `npm run wardrobe` (every clothing piece on eight body types and on the SDK's recorded Friends #7730 and #3412, front and side: visible, close to the Friend, hats never cover it; every trophy on the same bodies, bare and over a sweater: visible, at most six pixels and only on the Friend's inner pixels, never its outline, halo or anything around it; the keepsake glow shows only from Rare up and never changes a Friend pixel); `npm run playthrough` (a Playwright playthrough of the whole loop: the start guide, camp walking, buying passes, the forest run, a Rare chest ("Keep it to wear the Feather Pin"), the pin worn on the hero card and in the wardrobe, selling it at the Merchant ("Selling removes your Feather Pin") and the pin gone, Outfitter with a level-locked piece and Trail Rations, collection, economy panel, the Crystal Cave with a packed ration and the Sunken Ruins); `npm run compliance` (the SDK container stays at most 960 × 640 at 3:2 on five screen sizes, the sandbox is `allow-scripts`, the toolbar is not cut off, and the published bundle has no transaction, signing, approval or contract-write calls); and `npm run mobile` (the start guide and every camp panel at 390 × 844, 844 × 390 and 740 × 360; sideways, a run in each place checks the chest and that the run banner hides after 5 s so it never covers the HUD). A fresh clone installs with `npm ci` and passes typecheck and game validation; its `friendsdk build` matches the published `docs/`, except that the SDK bundler alternates one React interop flag between runs (`__toESM(…, 1)`), which does not change behavior. Browser tests use the SDK's mock wallet and simulated RPC; for the Rare chest, the playthrough fixes one roll of the SDK's simulated ledger in the test page.

Every published build, including the reviewed one, is played by hand with a real wallet on Robinhood mainnet holding a Generations NFT, on a computer and on a phone in a wallet browser (wallet connection, Friend selection, ownership gate and the full expedition loop in all three places). The demo video (`npm run demo`) is recorded with the SDK's mock wallet.

## Known limitations

The SDK sandbox has no storage, so XP, level and Outfitter items reset when the session ends. Trophies are read from the SDK inventory, so they always match the finds held; they are an off-chain cosmetic, not NFTs. The Outfitter burn / rewards split needs a custom RF integration before live use. Which cave and ruins finds you hold is remembered per session, because the SDK inventory counts rarity tiers. Live mode has never run against a deployed contract. No funds are at risk in the preview: it never asks for a transaction, a signature or an RF approval; the wallet is only used to connect, switch to Robinhood mainnet and prove ownership. Built with FriendSDK v0.1.4, the published preview bundle contains no wallet transaction, signing, approval or contract-write calls at all (`npm run compliance` checks `docs/`). No live token spending, trading, wearable NFTs (the wardrobe is an off-chain cosmetic) or creator fees are included.

**Roadmap (not in this MVP):** passes on the SDK's live `ChanceGame`; finds traded against $RAREFRIENDS above the Merchant floor with a 5% fee (see "Trading finds"); a new limited Outfitter item and themed finds every season; persistent XP, levels and gear once the SDK offers storage.

## Credits

All camp, forest, cave, ruins, find, chest, clothing and UI artwork is drawn in code for this project; music, ambience and effects are synthesized with Web Audio. The game ships no image, font or audio files and no third-party assets. The Friend uses the canonical Rare Friends Generations sprites and the SDK sound kit under the [FriendSDK NOTICE](https://github.com/spokesz/friendsdk/blob/main/NOTICE.md).

| | | |
|---|---|---|
| ![Expedition board with odds and prices](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/board.png) | ![Economy panel](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/economy.png) | ![Expedition board on a phone](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/phone-board.png) |
| ![Whispering Forest](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/forest.png) | ![Crystal Cave](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/cave.png) | ![Sunken Ruins](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/ruins.png) |
| ![Wardrobe: every piece previewed on your own Friend](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/wardrobe.png) | ![Night camp](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/camp.png) | ![A Friend in a wizard hat, scarf and cape](https://raw.githubusercontent.com/DEDQ3E/rare-friends-expeditions/main/media/camp-dressed.png) |
