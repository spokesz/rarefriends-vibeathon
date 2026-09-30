# The Docks

**Builder:** JuneauCrypto · X/Twitter [@cr4201](https://x.com/cr4201) · GitHub [@JuneauCrypto](https://github.com/JuneauCrypto) | **Category:** Economy Potential | **SDK:** FriendSDK v0.1.2

Game of Thrones meets World of Warcraft with real RF at stake. Every activated Rare Friend is a floating island drawn from its own on-chain artwork. Holders join their Friends into bigger islands, found flags (nations) with RF, and grow their population to unlock levels, colour, walls and perks. They trade what their islands grow and mine in flag markets, and go to war over loot vaults.

**▶ Play the preview:** https://juneaucrypto.github.io/friendsdk/

[Source code](https://github.com/JuneauCrypto/friendsdk/tree/9163044f84240cd10f8895a9504f3b571bcdad9c/games/the-docks) · [Game README (full rules)](https://github.com/JuneauCrypto/friendsdk/blob/9163044f84240cd10f8895a9504f3b571bcdad9c/games/the-docks/README.md) · [Contracts](https://github.com/JuneauCrypto/friendsdk/tree/9163044f84240cd10f8895a9504f3b571bcdad9c/contracts/src/docks)

## The idea

- **Friends are population.** Every activated Friend is an island with a population of 1.
  - Friends join together to form larger islands, and one island can hold as many Friends as its holder wants.
  - Growing population is the core loop: it unlocks levels, perks, rewards and access to items.
  - Every Friend added and every island built feeds more RF into the ecosystem.
- **A flag is a nation.** Holders who want to grow together plant a flag and fund it with RF.
  - A funded flag becomes a permanent community with its own RF/ETH liquidity, treasury, market, loot vault, ships and generated flag Friend.
  - Its level rises with its population: 100 Friends, then 1,000, 10,000, 100,000, then one more level every 100,000.
  - Each level brings more colour, bigger walls and defense for every island in it: wooden palisade → stone walls → medieval citadel → sci-fi fortress.
- **Two islands per holder per flag: a market island and a war island.**
  - The market (peace) island grows and mines goods and runs its stall in the flag's market.
  - The war island boards ships, defends the flag and forms its border.
  - Each can hold any number of Friends.
- **Founders are the OGs.** The holders who fund a flag's founding are its royalty.
  - Up to 1,000 of the flag's Friends carry an OG mark, shared by what each founder put in.
  - Founders' votes count extra, and they get a build allowance from their funding.
  - Coming next: OG-only items and perks, and an OG council to talk with other flags about peace treaties, mergers, trade deals and access to items.
- **Markets are only on flags, and everything sells for RF.**
  - Market islands grow and mine goods (Farm → Grain, Fishery → Fish, Workshop → Tools, Loom → Cloth, Kiln → Pottery).
  - Their holders sell those goods, and their own items, at their own price.
  - Anyone can dock at a flag's harbor to explore and buy.
  - Every sale pays the flag a 5% tax: half to its treasury, half to its flag Friend, which levels up and boosts the flag's output.
  - The marketplace is where creation pays. Next come Rare Friends marketplace items with real utility in the Docks: music a holder can play on their own island, and unique farmed or crafted items with a use for other players.
- **Solo play is welcome.** A holder with no flag keeps a black-and-white island.
  - They can dock, explore, chat and buy at any flag's market.
  - To sell, level up or raid, they join or found a flag.
- **The goal:** more flags, more population and thriving markets. The flag price curve (below) keeps flags affordable until there are about 2,000 of them. After that, joining an existing flag becomes the way in.

## Run it

**Hosted:** open https://juneaucrypto.github.io/friendsdk/ in a browser with a wallet on **Robinhood mainnet (chain 4663)** that holds an **activated** Rare Friends Generations NFT (generation ≥ 1). On a phone, use a wallet app's built-in browser. The SDK checks ownership fresh before play. The preview needs no RF, no funding and no transaction signature: every balance and outcome is simulated.

**Local** (Node.js 22+):

```sh
git clone https://github.com/JuneauCrypto/friendsdk.git
cd friendsdk
git checkout 9163044f84240cd10f8895a9504f3b571bcdad9c
npm ci && npm run build
npm run dev:game -- games/the-docks        # http://localhost:4173
```

Connect your wallet, then **Choose your captain**: the picker lists your activated Friends with artwork, highest Rare Friends reward rate first, and remembers your pick for that wallet.

## Play

- **Move:** WASD / arrow keys, or click/tap where to walk.
  - Drag to pan. Zoom with ＋/－, the wheel, pinch or the +/- keys.
  - ⤢ shows every island; ⌖ goes back to you.
  - Your Friend always has a **YOU ▼** marker.
- **Your island:** every activated Friend in your wallet joins one floating island.
  - ✥ **Arrange** moves Friends around; **⛓ Save** puts the layout on chain (simulated).
  - Split Friends across several islands, name them, and pick a captain and a mayor.
- **⚓ Docks:** tap any island to **Dock** beside it, **⬆/⬇** on the deck above or below, **Bridge**, **Chat** or open its **Market**.
  - Each flag card shows its population, level, how many Friends it needs for the next level, and whether founding is open.
  - Each card also has **⚓ Dock at harbor**, **🧺 Market** and **👁 Look**.
- **🚩 Flags:** plant a flag, fund it, then bring in your market and war islands.
  - Build items, vote, and harvest the liquidity's fees.
  - A ladder shows every level's look, and you can preview each one.
- **🧺 Market:** collect what your market island grows, list it, buy at any flag harbor you dock at.
- **⚔️ War:** send ships on tours to raid similar-sized flags' loot vaults.
- **A living world:** six simulated flags, 50 wandering islands and about 12,000 simulated residents trade and raid on their own.
  - The flags are Cashcat Cove, The Orange Citadel, Ultrasound Bay, Solstice Atoll, Shielded Reef and Ripple Shoals.
  - Residents borrow real activated Friends' on-chain artwork and are labelled as simulated.
- **Settings:** reduced motion is available. Everything stays inside the SDK's game container.

## Rules, costs and rewards

**All balances, purchases and outcomes are simulated. Every player starts with 50,000 simulated RF.** Nothing is burned. Fees go into permanent RF/ETH pools: a flag's own pool, or the shared Docks pool. Pool trading fees buy RF: half goes back into the pool, half is shared as allowances. Platform fee: 0% to start, capped at 5%.

| Action | Cost (RF) | Where it goes |
|---|---:|---|
| Found a flag | Bonding curve (below): 10,000 for the first flag | Half permanent RF/ETH liquidity, half the founders' build allowances; 10% of it seeds the loot vault; refunded if not fully funded in 30 days |
| Bring your first island into a flag you founded | Free | – |
| Enroll an island in a flag | 10,000 (a flag setting its members can vote to change) | Half liquidity, half the payer's allowance |
| Save a moved Friend | Gen 1: 100 · Gen 2: 50 · Gen 3: 20 · Gen 4: 10 · Gen 5: 5 · Gen 6: 1 | The flag's pool, or the Docks pool |
| Dock (beside, above or below) or build a bridge | 2 (docking fee) | The Docks fund (rewards reserve) |
| Items | Lantern 1k · Market stall 10k · Fountain 25k · Watchtower 50k · Farm, Fishery, Workshop, Loom, Kiln · war items | The flag's pool |
| Market sale | 5% tax | Half the flag's treasury, half its flag Friend |
| Launch a token from your island | 1,000 | The flag's pool, or the Docks pool |

**Flag price (bonding curve, built for 2,000 flags):**
- The first flag costs **10,000 RF**. Each flag after it costs 0.19% more than the one before.
- Flag #500 costs about 26,000 RF, #1,000 about 67,000 RF, and #2,000 about **450,000 RF** (≈ $500 at today's RF price of about $0.0011).
- After flag #2,000 the price **doubles every 100 flags**, so joining an existing flag becomes the way in.
- Anyone can add RF to a rising flag, and everyone who does becomes a founder.
- On chain: `DocksVillages.flagPrice(n)`, `flagBase`, `SOFT_CAP`.

**Population levels:**
- 100 Friends → Lv 1, 1,000 → Lv 2, 10,000 → Lv 3, 100,000 → Lv 4, then +1 level every 100,000.
- Each level gives every island in the flag +4% defense and a richer look.
- Inside a flag, an island shines a level brighter (★) when it reaches City rank by reward weight, and again with 2+ items built.

**War (gentle to start, a little harsher as flags grow):**
- Only flags go to war, and only against flags of a similar size.
- New flags get a 7-day shield.
- Each duel is best of 3 rounds. In each round the attacker wins with chance **A ÷ (A + D)**: attack vs defense strength from level, Friend count and items, with +10% home advantage for the defender in the siege round.
- The winner takes a share of the loser's **loot vault**: **2% at the smallest tier, then 2.5%, 3%, 3.5% and 4%**. That share is scaled by the share of duels won, plus a 1% bounty from the Docks rewards reserve.
- Half the loot goes to the fighting islands (claimable to each Friend's own wallet), half into the winner's vault.
- Only a flag's loot vault can be lost, never a member's wallet or allowance.
- Every number is a setting shown in-game under ⚔️ War → War rules.

**Chance game:** the CLI's `game.json` carries the SDK's required chance-game definition. The Docks doesn't sell it or use it in play. For reference:
- Treat Bag costs 1 RF.
- Clover Charm 60% → 0.5 RF, Moon Charm 30% → 1 RF, Star Charm 10% → 3 RF.
- Expected return 0.9 RF, maximum 3 RF.

**Contracts (designed and tested, not deployed):**
- `DocksIslands`: islands, arrange fees, captain, mayor and names, docking with levels, bridges.
- `DocksVillages`: flags and the bonding curve, founder marks, enrollment, votes, market and war stances, population levels, OG marks.
- `DocksVillageTreasury`: liquidity, harvest, allowances, loot vaults, the Docks rewards reserve.
- `DocksItems`, `DocksLaunchpad`, `DocksToken`, `DocksUniV3Liquidity`, `DocksFounderMarks`.
- Existing Rare Friends contracts are used through interfaces only.

## Checks, credits and limitations

Checks run on this version:
- `npm test`: 116 passed, 0 failed.
- `npm run typecheck`: passed.
- `npm run check:games`: all 4 games valid, including `games/the-docks`.
- `npm run check:browser`: 16 checks passed on desktop and mobile widths.
- The Docks browser tests (`node games/the-docks/browser-test.mjs desktop | phone | phone --many=10000`): passed. They cover the picker, captain, arranging and saving, docking and bridges, chat, flags and the bonding curve, war, markets, levels and stairs, and a 10,000-Friend wallet.
- `forge test`: 57 DocksTest (including the bonding curve and levels) + 16 other tests passed, plus a mainnet fork test.
- Browser tests use mocked wallets and RPC. The builder has also played the hosted preview with a real wallet on Robinhood mainnet.

**Assets:** every land and Friend is the holder's own fully on-chain Rare Friends artwork (read from `tokenURI`), plus the SDK's canonical character sprites. Walls, gardens, banners, flag Friends and the UI are original, drawn in code. No external assets.

**Limitations:**
- Everything economic is simulated, and preview progress resets on reload. The SDK sandbox has no save API, so a shared world needs a world service.
- Other players are simulated until players share one world.
- Not built yet: OG diplomacy, level-gated items, Rare Friends marketplace items, island music and custom colours or skins.
- To build an island from a whole wallet, the game reads the wallet's owned Friends with the SDK's owner-filtered, read-only method (no collection scan). The production path is for the host to pass that list in.
- Small SDK additions live in the fork, all display-only or read-only:
  - a ranked, remembered, activated-only picker driven by `game.json`'s `selection` field;
  - owner-log reads split into block windows the public RPC accepts.
- The contracts are unaudited and not deployed.
- Production publication requires separate Rare Friends review.
