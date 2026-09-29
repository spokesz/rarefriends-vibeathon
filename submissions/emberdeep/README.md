# Emberdeep

A pixel dungeon crawler where your lantern runs on burned $RAREFRIENDS, and everything you carry home from the deep is shared out of a reward pool by how much gold you brought back.

**Builder:** Lazaniaaa · https://github.com/Lazaniaaa · **Category:** Economy Potential · **Stack:** TypeScript, React 19, Vite, Canvas (no FriendSDK) · **Built with AI assistance** (Claude, via Claude Code)

[Play the live preview](https://64-177-50-196.sslip.io) · [Source code](https://github.com/Lazaniaaa/emberdeep-vibeathon)

## How it uses Rare Friends and $RAREFRIENDS

- **$RF is the fuel.** Every RF spent (entry key, lantern oil, potions, weapons, armor, Delver mints, weekly passes) is split the same way: **25% burned, 8% into the weekly Friend lot, 67% into the round's reward pool.** No new token and no emissions: rewards only come from what players already spent.
- **The weekly Friend lot.** The 8% buys floor Generations NFTs (simulated ask: 500 RF each). The lot opens when it can buy two and caps at five; one Friend is burned and the rest are drawn among players holding tickets found in the deep.
- **A pool shared by gold, not a fixed rate.** Gold is found only by playing and only counts if you carry it out alive. When a round closes, you receive the same percentage of the pool as your percentage of all gold banked in the round. There is no "1 gold = N RF" anywhere, so the pool cannot be drained.
- **Your Rare Friend as the character.** Connect a wallet (read-only). If it holds a hardwired Generations NFT (generation 1+) on Robinhood Chain (4663), you get the **Friend's Blessing** (+20% gold, +1 light radius) and can descend **as your Friend**, drawn with its original on-chain artwork read live from the Generations sprite registry, with a perk from its family (nine families, nine perks). Without an NFT, every mechanic still works.
- **Delvers.** Simulated character NFTs with a fixed supply: 999 Common, 111 Rare, 69 Epic, 11 Legendary.

## Run it

**Live:** open the preview link. No wallet is needed to play.

**Locally** (Node.js 22+):

```sh
git clone https://github.com/Lazaniaaa/emberdeep-vibeathon.git
cd emberdeep-vibeathon
npm ci
npm run dev        # http://localhost:5741
```

**Wallet (optional).** A browser wallet holding a hardwired Generations NFT (generation 1+) on Robinhood mainnet (4663). Connecting only reads ownership and sprites: no signature and no transaction is ever requested.

## How to play

- **Camp.** The lobby is a full-screen camp. Walk with WASD/arrows or tap the ground (your Friend walks there); press **E**/Enter, or tap a building, to open it: Dungeon Gate (PLAY), Ember Altar (mint Delvers), Armory (weapons, armor, potions), Friend Board (weekly lot, tickets, passes), Vault (the reward round), Welcome Board (how to play), Hall of Delvers (your records). Other delvers in camp are **simulated ambience, not players**.
- **Descent.** Spend an entry key and buy lantern oil at the Dungeon Gate. Each step burns light; less light means a smaller circle of vision. Collect gold and crystals, fight dimlings (walk into them), take stairs for richer floors, then walk back to the green rift to extract. If your light dies first, everything you carried is lost.
- **Floor 7** is guarded by **Cerberus**: a 2×2, three-headed hound with 150 HP. It seals the stairs and leaves a hoard chest when it falls.
- **Controls.** WASD/arrows to move, Space to wait, E/Enter to use stairs or the rift, keys 1-7 for potions. On touch: on-screen D-pad or tap. Mute and reduced-motion toggles are in the top bar.
- **Not an SDK game**, so the 960 × 640 container does not apply. The game is full-screen and responsive.

## Costs, probabilities and rewards

**Everything economic is simulated and labelled.** You start with 2,000 RF and a button adds 1,000 more.

| Item | Cost |
| --- | --- |
| Entry key (one per descent, 3 to start) | 50 RF |
| Lantern oil (80 light per flask, up to 5) | 20 RF |
| Night Vision / Oil Vial / Flare / Ward Charm | 30 / 15 / 25 / 25 RF (or 12 / 6 / 10 / 10 crystals) |
| Rage Potion (+80% damage for 5 blows) / Regeneration (+1 light for 5 turns) | 40 / 10 RF (or 16 / 4 crystals) |
| Healing Draught (+60 light) | **not sold**: drops in chests, vaults and Cerberus's hoard only |
| Rusty Dagger / Iron Sword / Emberblade | 60 RF / 150 RF + 20 crystals / 400 RF + 60 crystals |
| Leather Vest / Chain Mail / Emberplate (dimlings drain 15 / 30 / 45% less) | 80 + 10 / 220 + 30 / 520 + 70 (RF + crystals) |
| Delver: Common / Rare / Epic / Legendary | 100 / 250 / 600 / 1,500 RF |
| Weekly pass: Ember / Deep | 500 / 1,000 RF |

| Chance | Value |
| --- | --- |
| Raffle ticket per gold pile, crystal, chest, vault or kill | 3% (Ember Pass 4.5%, Deep Pass 6.5%); kept only if you extract |
| Sealed Vault (floor 3+) holds a Soul Sigil (a free Delver) | 30%; rarity 62% Common, 27% Rare, 9% Epic, 2% Legendary |
| Cerberus Hoard holds a Soul Sigil | 40% (plus a guaranteed Healing Draught and Rage Potion) |
| Chest holds a potion | 25% |

**Expected reward.** A round pays out exactly the 67% that went into its pool, so the crowd's *average* return is 67% of spend; yours depends on your share of the gold. In our simulations (bots that rarely die, so an upper bound) an unperked delver gets back about 50% of what it spends and the strongest build about 170%, funded by the rest. Real players will differ. The other players in each round are a **simulated crowd** whose gold-per-RF (1.4) is an assumption.

**Token Activity counters** ("You burned", "World burn") are simulated; the world counter starts from a simulated seed of 1,284,310 RF.

## Checks, credits and known issues

- **Checks run:** `npm test` (86 tests: economy and round settlement, fixed Delver supply, Cerberus 2×2 movement/combat/loot, potions, save recovery and multi-tab safety, wallet request ordering, camp and art validation), `npm run typecheck`, `npm run lint` (3 known Fast Refresh warnings in shadcn/ui files), `npm run build`. The deployed production build was played end to end in a desktop browser (camp → descent → extraction → report), the lobby and a descent were checked at phone size on a local build, and an independent code review was done and its findings fixed.
- **Not done:** the Playwright script `npm run smoke` is included but has not been run against this build; there has been no real-wallet playthrough of the latest build.
- **Known limitations:** game and economy state live in the browser and can be tampered with; a live version would need server-side or on-chain verification of each run before payouts. No live RF spending, real NFT purchases, on-chain payouts or automatic weekly draw (all deliberately simulated). Most players will not reach Cerberus on floor 7 without buying extra oil. On the floor 7 arena, one tile of shaded floor along the edges is treated as wall. Progress is stored per browser.
- **Credits:** see [NOTICE.md](https://github.com/Lazaniaaa/emberdeep-vibeathon/blob/main/NOTICE.md). Wallet reading adapts helpers from [FriendSDK](https://github.com/spokesz/friendsdk) (Apache-2.0). Rare Friends artwork belongs to Rare Friends. Production publication would need separate Rare Friends review.
