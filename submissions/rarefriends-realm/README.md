# RareFriends Realm

**▶ Play:** https://m4s4t0-v01d.github.io/rarefriends-realm/ · **🎬 Trailer (1 min):** https://m4s4t0-v01d.github.io/rarefriends-realm/preview/#trailer · **Preview page:** https://m4s4t0-v01d.github.io/rarefriends-realm/preview/ · **Skill guides:** https://m4s4t0-v01d.github.io/rarefriends-realm/preview/guides.html · **Source:** https://github.com/M4S4T0-V01D/rarefriends-realm

*An old-school online adventure starring the Rare Friend you own: nineteen skills, twelve quests, a large 2.5D world under
real light and shadow, shared with everyone playing, and a Hollow King to end.*

![Dusk over Friendhollow: long shadows across the square, a knight in gold Dawnplate, villagers in hats and capes, lamps coming on](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-light-dusk.png)

| | |
| --- | --- |
| **Project** | RareFriends Realm |
| **Builder** | M4S4T0 · GitHub [@M4S4T0-V01D](https://github.com/M4S4T0-V01D) |
| **Category** | Character Spotlight (also entering Economy Potential and Token Activity) |
| **Source repository** | https://github.com/M4S4T0-V01D/rarefriends-realm |
| **Playable preview** | https://m4s4t0-v01d.github.io/rarefriends-realm/ (GitHub Pages, deployed by CI from `main` after every check passes) |
| **Trailer and preview page** | https://m4s4t0-v01d.github.io/rarefriends-realm/preview/ (a trailer recorded from the game with its new lighting, what's new, looping clips, screenshots, casket odds, and a jukebox of all 21 music tracks) |
| **Stack** | FriendSDK **v0.1.4** (SDK `GameHost` + CLI game build), React 19, Canvas 2D, WebAudio, TypeScript; Trystero (WebRTC over Nostr relays) in the host page for multiplayer |

**One sentence:** A tick-based, old-school browser MMO where your verified Rare Friend is the hero, drawn from its
canonical on-chain sprite with its family's perk and dressed in the gear you wear. You train nineteen skills and finish twelve
quests on a 350 × 200 tile island lit by a real sun, lamps and fire, playing alongside everyone else online: chatting, trading,
dueling and bringing down a world boss together. Simulated $RAREFRIENDS buys Rare Caskets (kept-or-redeemed relics and wardrobe pieces), bundles and
mounts.

## New: real lighting and the Faith update

The Realm is lit for real. The sun crosses the sky and everything casts a shadow that follows it (buildings, walls, trees,
rocks, characters, mounts), long and golden at dusk, short at noon, faint under the moon. Lamps, torches, fires, forges and
spells light the ground and whatever stands near them, with walls and trees blocking their light and one bounce of it off
the ground; ambient occlusion shades alleys and forest floors, lava glows, dungeons are truly dark, and the haze follows the
land. It's all Canvas 2D: a light field built each frame in world space, projected onto the ground, with every object tinted
by the light at its own feet and cut to its exact outline, so light lands on things instead of glowing over them.

**The Faith update:** Prayer is now Faith, and the Order of the Dawn keeps Dawnhold east of Highcairn: five new quests
(The Dawn Vigil, Light in the Greyhorn, The Pilgrim's Road, The Restless Crypt, Dawn Against the Hollow), seven faith
weapons that train Faith a little with every hit and hurt the undead harder, bone offerings at altars, and Dawnplate, gold
armour with white trim. Armour now shows on your Friend (breastplates, greaves, helms closed all round), Threadneedle
Tailors sells capes in ten colours and seven patterns and new hats, amulets hang round your neck, the townsfolk wear their
own hats and capes, and health bars only show in a fight.

| Dusk falls on Friendhollow | The Order of the Dawn at Dawnhold | A knight in Dawnplate |
| --- | --- | --- |
| ![The sun sets over Friendhollow: shadows stretch and swing, the light warms, then night falls and the lamps take over](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-dusk.gif) | ![Orbiting Dawnhold, the Order of the Dawn's chapterhouse, with knights in gold and white](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-dawnhold.gif) | ![A Friend in gold Dawnplate walking through Friendhollow at evening](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-knight.gif) |
| **A day in Whisperwood** | **Campfires at night** | **The Dawnhold chapel** |
| ![Tree shadows sweeping round from morning to evening](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-forest-light.gif) | ![Two campfires lighting the forest at night, with fireflies](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-night-fire.gif) | ![Torchlight inside the Dawnhold chapel at night](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-chapel.gif) |
| **A moonlit unicorn at dawn** | **Wyrmreach's lava at dusk** | **Night in the square** |
| ![Riding the moonlit unicorn through Friendhollow at dawn](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-unicorn-dawn.gif) | ![Lava lighting the rocks of Wyrmreach as dusk falls](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-lava.gif) | ![Friendhollow at night, lamp pools and a campfire lighting the cobbles](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-light-night.png) |
| **Dawnplate** | **Townsfolk in hats and capes** | **The crypt by firelight** |
| ![A Friend in gold Dawnplate with the Cape of the Dawn](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-dawnplate.png) | ![Villagers in wizard hats, feathered caps and capes](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-townsfolk.png) | ![The Murkmire crypt lit only by fires](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-crypt-lit.png) |

## The Realm in motion

| Play together | Ride horses and unicorns | The Ashen Colossus, with a crowd |
| --- | --- | --- |
| ![Two players meeting by the fountain and chatting](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-together.gif) | ![Riding a unicorn through Friendhollow](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-ride.gif) | ![Fighting the Ashen Colossus world boss](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-boss.gif) |
| **Slaying dragons** | **Magic that lights the night** | **Level-up fireworks** |
| ![Shooting ash drakes in Wyrmreach](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-dragon.gif) | ![Casting fire spells at night](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-magic.gif) | ![Fireworks over Friendhollow at night](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-fireworks.gif) |
| **Storms everyone shares** | **Day turns to night** | **19 skills to 99** |
| ![Rain and lightning over Friendhollow](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-storm.gif) | ![Nightfall over the town, lamps lighting up](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-nightfall.gif) | ![Chopping trees in Whisperwood](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-woodcutting.gif) |
| **A hand-built pixel Realm** | **The skillcape emote** | **The full one-minute trailer** |
| ![Orbiting Friendhollow Castle](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-castle.gif) | ![A Friend performing the skillcape emote](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/gifs/realm-emote.gif) | [▶ Watch the trailer](https://m4s4t0-v01d.github.io/rarefriends-realm/preview/#trailer) (with its soundtrack) |

## Screenshots

| Riding a unicorn | The Ashen Colossus (world boss) | A duel in the Sparring Ring |
| --- | --- | --- |
| ![Riding a unicorn through Friendhollow](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-unicorn.png) | ![The Ashen Colossus in Wyrmreach](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-boss.png) | ![Two players dueling in the Sparring Ring](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-duel.png) |
| **Fernwick, the woodcutters' village** | **Crossbows (one-handed, so a shield fits)** | **A war bow and Hazel's quiver** |
| ![Fernwick: timber houses along a street, a willow pond, chopping blocks and a log pile](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-fernwick.png) | ![A Friend with a rarite crossbow and a moonsilver shield](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-crossbow.png) | ![A Friend from behind with Hazel's quiver on its back and a yew war bow](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-quiver.png) |
| **Forged gear (levels 50–90)** | **The stables, beside the Rare Market** | **Hollow Farms** |
| ![A Friend in ashenheart armour with an ember plume, shield and sabre](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-forged.png) | ![The Friendhollow stables and paddock](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-stables.png) | ![The windmill, farmhouse, coop and cow pen](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-farm.png) |
| **A thunderstorm everyone shares** | **Level-up fireworks at night** | **Gear painted on your Friend** |
| ![Lightning over Friendhollow](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-storm.png) | ![Fireworks over the square at night](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-fireworks.png) | ![A Friend in a helm with a sabre, shield and cape](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-gear-knight.png) |
| **The Realm Daily** | **32 achievements** | **The Hollow King** |
| ![The daily streak and challenges](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-daily.png) | ![The achievements tab](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/new-achievements.png) | ![The Hollow King in his throne room](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/region-throne.png) |
| **First steps (a guided start)** | **Trading with another player** | **Skill guides and a recipe book** |
| ![The First steps card and gold arrow](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/first-steps.png) | ![The trade screen with another player](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/trade.png) | ![The Woodcutting guide, level by level](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/skill-guide.png) |

**Adventurer card, ready to post on X** (your Friend exactly as in the Realm, riding its mount):

![Adventurer card](https://raw.githubusercontent.com/M4S4T0-V01D/rarefriends-realm/main/docs/adventurer-card.png)

## Wallet and network requirements

A browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired Rare Friends Generations NFT (generation ≥ 1).
FriendSDK's `GameHost` handles wallet connection, Friend selection and the fresh ownership check. Phones need a wallet with
an in-app browser (for example MetaMask Mobile); play in landscape. **All RF balances, purchases and rewards are simulated**:
no contracts, signatures or transactions. Multiplayer uses public Nostr relays to introduce players (peer to peer, no
server); it can be switched off in Settings.

## Setup and run

```sh
git clone https://github.com/M4S4T0-V01D/rarefriends-realm.git
cd rarefriends-realm
npm ci
npm run dev        # http://localhost:4173   (npm run dev:lan to play from a phone on the same network)
npm run build      # static site → games/rarefriends-realm/.friendsdk/
npm run check      # FriendSDK game validation
npm test           # engine tests;  npm run test:browser for the browser checks
```

Node.js 22+. FriendSDK v0.1.4 is vendored from the official v0.1.4 release archive (SHA-256 checked); the preview build carries no transaction-capable code.

## How to play

### Your first minutes

A new Friend gets **First steps**, a guided start: chop a tree, light a fire, catch and cook a fish, stroke the horses
at the stables, climb the castle to meet King Hollis, and open the Realm Daily. A card in the corner explains each step,
a gold arrow (and a star on the minimap) shows where to go, each step completes itself from what you do, and the last pays
500 coins and a Lamp of insight. It can be skipped at any time.

### Controls

- **Mouse:** left-click does the first option (shown top-left). Right-click, or long-press on touch, lists every option (*Chop down*, *Attack Grumblin (level-5)*, *Talk-to*, *Pickpocket*, *Examine*…) in the world and in every interface: bank, shops, spellbook, prayers, equipment, production, compass and minimap.
- **Keyboard:** WASD walks. ← → turn and ↑ ↓ tilt the camera (or drag with the scroll wheel held); the compass turns north to the top. R toggles run, H mounts or dismounts, M opens the world map, Enter chats, F1–F9 switch tabs, and Space and 1–5 drive dialogue. Scroll zooms; the minimap walks you anywhere.
- **The tick:** everything runs on a 0.6 s game tick. You walk one tile a tick, two when running, two or three on a mount.
- **Accessibility:** mute, music and effects volumes, reduced motion (honoured throughout), and Graphics: High (the default) or Low, kept in the browser.

### Skills, combat and quests

- **19 skills on the old-school XP curve** (at a Realm rate of ×3, eased in: about half speed at level 1, the full rate from level 30): Attack, Strength, Defence, Ranged, Hitpoints, Magic, Faith, Sigilcraft, Woodcutting, Fletching, Fishing, Cooking, Firemaking, Mining, Smithing, Crafting, Thieving, Agility, Slayer. Gathering rolls, burn chances, accuracy and max hits follow the classic formulas. Click any skill for what it unlocks at every level; a recipe book lists every recipe.
- **Combat:** four melee styles, Ranged (bows by wood, the best arrows in your pack, three styles; war bows that draw slower and hit harder; crossbows in six metal tiers that fire bolts and leave a hand free for a shield), prayers, and a 26-spell book paid in sigils (Darts, Lances and Bursts in four elements, curses, Rootsnare, Gilded Touch, Forgeheart, enchantments and six teleports). Monsters retaliate, some attack on sight, all drop loot, and rare drops stand in a beam of light. Death is safe: you keep your items.
- **Slayer:** Warden Thistle gives kill tasks and points for rewards; some creatures can only be wounded at Slayer 10, 30 and 50.
- **Dragons:** Wyrmreach's ash drakes, cinder drakes and Old Cinder (level 148). A third of their attacks are dragonfire, which only King Hollis's Wyrmward shield turns aside.
- **Twelve quests (19 quest points):** A Friend's Feast, Grumblin Trouble, The Cold Forge, Hollow Whispers, Hazel's Quiver (its reward, worn on your back, calls four in five arrows and bolts home), The Lost Glimmer, The Hollow King (level 92 boss), and five for the Order of the Dawn: The Dawn Vigil, Light in the Greyhorn, The Pilgrim's Road, The Restless Crypt and Dawn Against the Hollow.
- **Faith and the Order of the Dawn:** bury bones, or offer them on an altar for twice the XP (three times in the Dawnhold chapel); faith weapons (four melee, three staffs) need Faith to wield, give a little Faith XP with every hit and hurt the undead (skeletons, shades, the Hollow) harder; the Order's quests award the Cape of the Dawn and Dawnplate (Defence 70, Faith 60).
- **Dress your Friend:** helms, breastplates, greaves and shields are drawn on your Friend (helms closed all round), capes come in ten colours and seven patterns from Threadneedle Tailors on Market Street along with wizard hats, feathered caps and traveller's hats, and amulets hang round the neck.
- **Two-handed weapons and new creatures:** greatswords, battleaxes and war hammers in every metal (slower, harder hitting, no shield), from the anvil or Heft & Haft; forest spiders, wild boars, sand scorpions, highland goats and stone golems, each with a drop only it gives, plus Grumblin spears and Mossy staffs.
- **Highcairn and the Greyhorn Highlands:** the island swells east into walkable snowy mountains with a ragged new coast, around Highcairn, a stone town with a bank, stores, an inn, a forge, a shrine and a Rare Market trader, and the Greyhorn mine above it.
- **Sheep, wool and string:** shear the sheep (they look shorn until the wool grows back), spin the wool into string at a spinning wheel (Crafting 1), and string bows (cut unstrung from logs) and gems into amulets.
- **The sigil stone box:** carry it and mined sigil stones go in (up to 120), an altar presses them all, and at the bank a right-click fills it (or the inkcoal satchel) straight from your bank.
- **Ruins and a taller Wizards' Tower:** crumbling old houses, broken round towers and ancient walls across nine regions (mossy, sun-bleached or snow-capped by where they stand), and the Wizards' Tower now rises under an eight-sided spire.
- **Bank tabs, a coal satchel and a Grumblin head:** drag bank items to rearrange them or file them into up to nine tabs; the inkcoal satchel (worn on your back) holds 120 inkcoal, fills as you mine and feeds the furnace; Grumblins very rarely drop a wearable Grumblin head. New Friends fish at the Millpond by the windmill, and spells fly as pixel sprites (a little torch flame for fire, a teardrop, a whirl, a boulder, a smoky curse).
- **Forged gear, levels 50–90:** six metals above rarite (Frostsilver 50, Gloomsteel 60, Wyrmscale 70, Hollowsteel 75, Cindersteel 80, Ashenheart 90), smelted from materials the strongest creatures drop (Frost yetis, gloom hounds, drakes, the Hollow King, Old Cinder, the Ashen Colossus) and smithed at Smithing 86–99 into full sets of weapons, armour, axes, pickaxes, staffs, crossbows, arrows and bolts, each glowing in its metal's light. Finished pieces also drop, and Frostpeak sells frostsilver.
- **Crossbows and war bows:** crossbow limbs are smithed at the anvil (two bars) and fitted with Crafting to a stock carved from logs: pewter on a plain stock, blackiron and ashsteel on oak, moonsilver on willow, glimmer on maple, rarite on yew. Bolts come from the anvil (twelve a bar) and are feathered with Fletching. War bows take two logs of any wood; the plain one needs Ranged 5, and only Hazel in Fernwick sells them.
- **Mastery capes:** reach 99 and the Keeper of Capes sells that skill's cape; master two skills and they come trimmed.

### Playing together

- **Everyone online shares the Realm.** You see other players' Friends in their wardrobes, gear and mounts, chat in public (bubbles over their heads) or whisper (`@1234 hello`), and right-click a player to *Follow*, *Trade with*, *Add-friend*, *Message*, *Wave*, *Ignore* or *Examine*. A friends list shows who's online and where; friends nearby add +5% XP.
- **Fight together:** the same monster has the same id in every game, so both players' hits count and each sees the other's health bar.
- **The world boss:** the Ashen Colossus (level 210) rises in Wyrmreach every two hours (on the even UTC hours) for twenty minutes, for everyone at once. Its HP is shared, and everyone who wounds it gets the loot, whoever lands the last blow.
- **Trade** items old-school style (an offer screen, then a confirm screen; the swap happens only when both games agree), and pick up what other players drop.
- **Duel** in the Sparring Ring east of Market Street: step inside and right-click another player to *Fight*. Duels are safe (the loser is back at full health and nothing is lost), each game checks both players stand in the ring and caps every hit, and wins and losses are counted.
- **Emotes (15)** that others see. When a friend near you emotes, your Friend joins in. Level-ups set off fireworks everyone nearby sees.
- **Referral codes** (`RF-<Friend #>`): both players get 250 coins and +15% XP for an hour of play, and your first referral earns the Friendship cape and its emote (up to five referral rewards a day).
- **Hiscores** in the Friends tab rank you against every player you've met.

### The world

- **17 regions and 2 dungeons,** each with its own music: Friendhollow, with a hanging sign outside every shop and bank and banners of your own Friend around the square, its three-storey castle (spiral stairs up to King Hollis's hall and the battlements), Market Street, the stables and the Sparring Ring; Hollow Farms with its windmill and farmhouse; the Wizards' Tower; Wyrmreach; Whisperwood and Fernwick, its woodcutters' village (Hazel's War Bows, a timber yard, a bank and a willow pond); the Ashen Hills; Emberforge; Frostpeak; Glass Lake; the Pale Dunes and the Oasis; the Murkmire; the Mossy Ruins; the Pale Coast; the Murkmire Crypt and the Hollow Depths.
- **Pixel art in the Rare Friends style:** trees, rocks, buildings, ground, items and creatures in chunky pixels with an ink edge. Every fish is its own species, chicken is a drumstick and beef a steak (browned with grill marks when cooked), and each ore shows its own metal's veins. Roofs lift as you walk in, and walls in front of you drop to a cutaway. Helms, hats, shields and weapons are painted into your Friend's own pixels and move with it, and every swing, chop, cast and hammer blow animates right there in the sprite.
- **A living world, really lit:** walkable rolling hills; a 24-minute day under a sun that crosses the sky, with shadows from everything that follow it and nights lit by lamps, torches and fires that cast shadows of their own; villagers in their own hats and capes; weather from the real clock that every player shares (rain, thunderstorms with lightning, dawn fog); birds, butterflies, leaves, snow, fireflies; footprints in snow and sand; hoofbeats when you ride.
- **Sound everywhere:** 21 procedural tracks in an old-school MIDI style, a voice for every creature, footsteps by ground, weather and ambience.

### Daily play and collecting

- **The Realm Daily** (the 🔥 button by the minimap): a login streak on a seven-day cycle (500 coins, 5 cakes, 1,000 coins, 10 inksharks, 2,000 coins, 400 sigils, then a Lamp of insight and 5,000 coins; +25% coins per full week kept), three daily challenges the same for everyone with a chest for all three, the world boss's timer, and an update log that opens after each update.
- **32 achievements**, **six skilling pets** (found by chance while training, fighting dragons or the Colossus), a 12-piece RF wardrobe, mastery capes, and your other owned Friends as followers (+1–5% XP by generation).
- **Family perks:** Skeleton, Mask, Family, Cellular, Asymmetry, Hoverer, Colossus, Sparkling and Hollow each give your Friend its own edge.

### Settings and saves

Progress saves automatically for your wallet and Friend on this device, and **Save and log out** (the ⏻ button by the minimap, or Settings) saves at once and returns to the title screen with a confirmation. A **save code** (Settings) keeps the whole
adventure in one line of text you can restore on any browser. **Graphics** can be High (the default) or Low; settings are kept in the browser (see Checks).

Full rules, levels, monsters and controls: [games/rarefriends-realm/README.md](https://github.com/M4S4T0-V01D/rarefriends-realm/blob/main/games/rarefriends-realm/README.md).

## RF costs, odds and rules (simulated)

RF buys one thing in the SDK's economy, the **Rare Casket** (1 RF each). Bundles and mounts are casket purchases that add
guaranteed goods, so every RF spend goes through the SDK chance-game client (`buy` / `play` / `settle` / `redeem`) with the
runtime's confirmations.

### Rare Caskets

| Relic | Chance | RF value | Kept bonus | RF-exclusive wardrobe |
| --- | --- | --- | --- | --- |
| Plain Relic | 60% (6,000 bps) | 0.5 RF | +2% XP in every skill per relic (max 5) | Rose cape, Sage scarf, Paper crown, Butter bow |
| Silver Relic | 28% (2,800 bps) | 1 RF | +10% coins from drops and pickpockets per relic (max 3) | Silver halo, Moonblue cape, Lantern familiar |
| Moonlit Relic | 10% (1,000 bps) | 2 RF | Gather 10% faster per relic (max 3) | Moon wisps, Starlit hood, Ink wings |
| Golden Relic | 2% (200 bps) | 5 RF | +10% XP and a golden aura while kept | Golden aura, Rarite crown |

- **Price** 1 RF (`1000000000000000000` base units); buy ×1 or ×5. **Expected RF value** 0.88 RF per casket; top prize 5 RF.
- **Consumable:** one casket opens into exactly one relic; single settlement, no reroll.
- **Backing:** each purchased or pending casket reserves 5 RF; kept relics keep their fixed RF backing, with no expiry. Redeeming removes that relic's bonus.
- **Wardrobe:** every casket also grants an uncollected piece of its tier, or coins for duplicates (250/600/1,500/5,000). Wardrobe pieces carry no RF value.

### The Rare Market (traders in seven places, each by a casket chest)

| Bundle | RF (caskets) | Adds |
| --- | --- | --- |
| Traveller's satchel | 1 | Two of every Realm teleport tablet |
| Hero's hamper | 1 | 10 inksharks and 5 cakes |
| Lamp of insight | 2 | XP in a skill of your choice (100 × your level) |
| Slayer's contract | 2 | 40 Slayer points |
| Archer's quiver | 2 | A maple bow and 300 moonsilver arrows |
| Sigil sack | 1 | 300 each of five sigils and 30 hollow sigils |
| Fletcher's crate | 1 | 600 arrow shafts, 600 feathers and 300 ashsteel arrowheads |
| Dragonslayer's kit | 3 | A Wyrmward shield, a drakehide vest, 20 inksharks and 200 rarite arrows |
| Tailor's pick | 3 | The wardrobe piece of your choice (up to Moonlit tier) |

### The Friendhollow stables

Every mount gallops without using run energy (horses two tiles a tick, unicorns three), is seen by other players, and has
a gift. The RF price buys that many Rare Caskets, and the mount comes with them.

| Mount | RF (caskets) | Gift |
| --- | --- | --- |
| Chestnut horse | 2 | None |
| Piebald pony | 2 | Heals 1 HP every 12 s |
| Bay horse | 3 | Gather 5% faster |
| Dapple grey | 3 | +10% coins from drops and pickpockets |
| Palomino | 4 | +5% XP |
| Black warhorse | 4 | +8 Defence |
| Unicorn | 6 | +10% XP, heals 1 HP every 6 s |
| Moonlit unicorn | 8 | +10% XP, gather 10% faster, lights the dark |

**Economy design:** coins are earn-only and never convert to RF, so the game is complete without spending. RF is a boost
and a collection (relics, wardrobe, mounts), not a paywall, and holding more (and better-generation) Friends pays off as
followers. Proposed future RF integrations, which need APIs beyond SDK v0.1.4: cloud saves, a holder-to-holder trading
post, RF-priced cosmetics with burn, live Dice-RNG caskets, and on-chain world-boss leaderboards.

## SDK integration notes

The game plays on a fixed **960 × 640 stage** inside the SDK's own `GameHost` frame at its default 3:2 viewport, scaled to fit
the page. The world is far larger and scrolls under a camera, and every menu, panel and HUD element stays inside the stage.
`host/runtime.tsx` adds four things to the SDK's runtime page, each for something the sandbox can't do:

1. A read-only `readOwnedFriends` roster with generations (account-filtered, `eth_accounts` only).
2. `localStorage` saves keyed by wallet and Friend.
3. Adventurer-card sharing (share sheet, or clipboard plus a prefilled X post).
4. Multiplayer (`host/net.ts`): direct WebRTC links through Trystero (introduced over public Nostr relays), plus a fallback
   for networks that block direct links. Every message also travels as a signed, ephemeral Nostr event through public
   relays, so players can always reach each other, and each message counts once whichever path it took. Only Friend IDs
   are shared, never wallet addresses. Everything received is validated field by field, rate-limited, and stripped of links, and the
   sandboxed game itself never touches the network.

The game receives the roster, save and peers over `postMessage`, uses the roster only when it contains the Friend the
runtime just verified, and validates every field of a save on load. There are no signatures or extra prompts.

## Credits

The world, creatures, townsfolk Friends, mounts, pets, item art, music and sound effects are original procedural code. Your
Friend and your followers use their canonical Generations sprites; Old Glimmer (#7730) and Brother Ossic (#3412) use the
canonical sample frames from FriendSDK v0.1.4. Rare Friends artwork is used under the FriendSDK NOTICE. Gameplay is
inspired by classic browser RPGs such as *Old School RuneScape*; the Realm's places, metals, gems, sigils, spells, prayers
and items have their own names, and no assets or code from it are used.

**Special thanks** to **LUCKY CHAD || D.Y.O.O.R || ( BuildAnything ARC )** ([@WHOSAYLUCK](https://x.com/WHOSAYLUCK) on X) for ideas, dev help,
multiplayer testing, and being awesome.

## Checks and known issues

| Check | Result |
| --- | --- |
| `npm run typecheck` (tsc strict: game, host, preview page) | Pass |
| `npm test`: 66 engine tests, and a check that the preview build (`runtime.js`, `game.js`) carries no transaction-capable code (FriendSDK v0.1.4 preview builds). The engine tests cover: the XP curve and formulas; woodcutting, firemaking and cooking; fishing; mining, smelting and smithing; thieving; an agility lap; Fletching; Sigilcraft; combat, loot, aggression and safe death; magic and its utility spells; prayer; Ranged, Slayer and dragonfire; crossbows, bolts and war bows (parts, fitting, ammo, speed and punch); Hazel's Quiver end to end, and shots returning to the quiver; the forged tiers (materials, smelting, smithing, levels); bank tabs and rearranging; the inkcoal satchel and the sigil stone box; sheep, spinning and stringing; beginner fishing and cooking; ruins placement; mastery capes; A Friend's Feast and Grumblin Trouble end to end; the castle stairs; pathfinding and menus; shops, selling and buy-back, the bank; saves (round trip, tampering, old ids); caskets, bundles, mounts; trading (including crossed requests and a lost message); shared fights and the world boss's shared loot; duels; pets; achievements and hiscores; the daily streak, challenges and chest; the update log; referrals and their daily cap; first steps; Faith (offerings, faith weapons, the undead bonus) and all five Order of the Dawn quests end to end; world determinism and on-foot reachability of every station, NPC, ladder and boss | Pass |
| `npm run check` (`friendsdk check`) | Pass: valid; expected reward 0.88 RF, max 5 RF |
| Browser, SDK runtime with a two-Friend mock wallet: title screen; a real mouse click chops a tree and First steps moves on; right-click menus and dialogue; WASD; chat; camera turn, tilt and compass; a level-up; smelting; a shop; A Friend's Feast; combat; bank; world map; 5 caskets through the runtime's confirmations; a Rare Market bundle; adventurer card → Post to X; the Realm Daily (claim, challenges, update log); a performance check (see below); the castle's spiral stairs by real clicks; nightfall; a 14-region tour; save restored after reload | Pass |
| Browser, two players in two tabs (and, over the real public relays, with direct links blocked): seeing each other walk, right-click menu, friends list, party bonus, public chat, whispers (links stripped), emotes and emote sync, a shared drop, a full trade by clicks, a duel in the ring, a shared fight, a referral, going offline | Pass |
| Browser, phone in landscape (844 × 390, touch): tap to walk | Pass |
| Browser, preview page: trailer at the top (muted, then with sound), main theme and jukebox play audibly on desktop and phone; skill guides and recipe book | Pass |
| All of the above in GitHub Actions before each Pages deploy | Pass |
| Real play on Robinhood mainnet with a real wallet, including multiplayer with a second player | Pass (played by the builder with a friend) |

**Performance.** Settings → Graphics offers High (the default, with the full lighting and shadows) and Low; they never change
by themselves. Low turns off pixel textures, cast shadows, ambient life, fog and footprints, leaves a clear day unlit, lightens
the rain, shortens the view and draws at 1×; High draws at up to 1.5× on high-DPI screens. The browser check measures frame
cost at three busy scenes on every run, in GitHub Actions, headless and without a GPU (software rendering): Friendhollow
49 ms on High / 10 ms on Low, dense forest 74 / 10 ms, a stormy night 37 / 10 ms. A GPU draws High far faster.

**Known limitations:**
- Saves are client-side, per device and browser, keyed by wallet and Friend; save codes carry them to another browser.
- Casket balances and kept relics reset on reload (the SDK's session ledger); wardrobe pieces, mounts and everything else persist.
- Multiplayer is peer to peer: each game runs its own world, and shared things (fights, the world boss, trades, duels, drops) are agreed between games. Everything received is validated, but a modified client could misreport its own progress. On networks that block direct links, messages go through public relays (a little slower, and readable by anyone watching the room, like any public chat); private messages use a direct link whenever there is one.
- Audio starts on the first tap; on iPhones before iOS 17, silent mode may keep it quiet.
- Wallet support is the SDK's (injected / EIP-6963). There is no wallet or fund risk: nothing is signed or sent.
