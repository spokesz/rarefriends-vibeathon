# NEMO FRNS FARM

**Project name**
NEMO FRNS FARM

**Builder / contact**
[@mutantonchain](https://x.com/mutantonchain)

**Category**
Economy Potential (also built for Token Activity and Character Spotlight)

**What did you build?**
An online, endless, risk-to-earn pixel island life sim. Your Rare Friend washes ashore. You keep it fed and rested, farm, fish, mine, dive and raid, and grow the island region by region. You can also send it on voyages of up to 12 hours: to its own family island for relics, or to Robinhood Reef for simulated stock-token shares like NVDA. Every level-up and upgrade is a gamble that spends RF, and 70% of all RF spent pays back to the top 10 players in a weekly Season Prize Pool. Everyone shares one world, and solo play works fully with simulated rivals.

**How does it use Rare Friends?**
You play as your own verified Generations NFT, rendered from its canonical on-chain sprite as the hero and never recolored. Its family (9 families) sets a unique play-style trait and the destination of its Homeland Voyage, and it earns a new hat and title every 10 levels. $RAREFRIENDS is the premium token: it is paired with the in-game $SHELL in a constant-product pool, and every RF sink splits 70% Season Pool, 25% creator and 5% burned.

**Source code**
[GitHub repository](https://github.com/shukla1243/nemo-frns-farm/tree/ee7e922dd9eb42bc59aa65d4a93cc11b1498abdd) · Uses FriendSDK v0.1.2 modules (wallet session, owned-Friend discovery, `readGenerationEligibility`, canonical sprites, sound kit) in a standalone Vite + React + TypeScript app. The SDK sandbox is not used, so the game can keep real saves and reach Nostr relays and WebRTC peers for multiplayer.

**Playable demo / how to run**
Public preview: **https://shukla1243.github.io/nemo-frns-farm/** (desktop and phone)

Connect a browser wallet on Robinhood mainnet (4663) holding a hardwired Generations NFT (generation 1 or higher). On phones, open the link inside your wallet app's browser. Connecting never requests a transaction; optional cloud save asks for one free signature. A clearly labelled **guest demo** with sample Friends is available for judges without a wallet (guest progress stays on the device and never appears on leaderboards).

Run locally with Node.js 22+:

```sh
git clone https://github.com/shukla1243/nemo-frns-farm.git
cd nemo-frns-farm
npm ci
npm run dev
```

**How do you play?**
Tap or click to walk (WASD / arrows on desktop), press **E** or the orange button near a building, and open the map to fast travel. Everyone spawns into one shared island world. The orange **Play** button lists every game and place with a Go button, and the story note shows your next goal: 15 chapters in Act I, 12 in Act II, and an Act III that never ends. Survive: hunger drains (tap the hunger bar to eat), energy powers every action, and you sleep at home. Earn by chopping, quarrying, farming, fishing, playing Crab Dash (a skill arcade with no stake), quests and daily gifts from 8 islanders. Risk it all in the Abyss Dive (crash), Tide Mines (minesweeper), double-or-nothing flips, raids on real players, the shared Kraken world boss and the Tide Wheel. Send your Friend on timed voyages (15 min, 1 h, 6 h, 12 h) with low odds and big upside. Grow by ascending (odds-based level-ups), forging gear +1 to +10, building from a Tent to a Sea Castle, unlocking 7 regions, and rebirthing at level 30 for permanent bonuses. Milestones, daily streaks and a free weekly Season Journey pay out for everyone, not just the top 10. A gold arrow and a Go button always point to the next story goal, and a Welcome back report lists everything ready after a break.

**Costs and rewards**
Everything is simulated. You start with 20 RF and 120 SHELL.
- **Ascension:** `0.50 + 0.40 × level` RF plus SHELL and materials; success `max(30%, 98% − 2.5% × level)`, +6% pity per failure. A failure never lowers your level.
- **Forge +1…+10:** 100/95/88/78/66/55/44/33/22/12% success, +3% pity per failure. Failures never downgrade.
- **Abyss Dive:** crash `(1 − 4%) / U`, RTP 96% (2% floor with gear).
- **Tide Mines:** multiplier `0.97 × Π(25−i)/(25−traps−i)`, RTP 97%.
- **Double or nothing:** 48% to double.
- **Tide Wheel:** 1 RF per spin or free every 8 h. Odds 33% 40 SHELL, 21% 90 SHELL, 18% materials, 7% Charm, 10% 1 RF, 6% pearls, 4% 3 RF, 1% 25 RF jackpot. Expected RF back 0.47 per spin.
- **Raids:** win chance from power vs defense (8 to 92%); steal 10 to 22% of the exposed vault.
- **Kraken:** 30 RF pool split by damage share every 20 minutes.
- **Voyages:** Homeland 0.5 RF (10% relic, 5% RF cache), Reef Run 2 RF (30% stock-token shares, 2% a full NVDA share), Trench 4 RF (14% hoard of 8 to 24 RF, 8% lost at sea). Outcomes are rolled at departure, and RF voyages are net RF-negative even at max bonus (tested).
- **Stock tokens:** simulated, deterministic hourly price, 2% sell fee, game collectibles only.
- **Crab Dash:** 6 energy per round, 3 SHELL per point, never RF.
- **Season Journey:** 10 free tiers per week, mostly SHELL and items, 3 RF in total.
- **Tide Pool swaps:** 3% fee.
- **Sinks:** ascension, forge, homes, land, farm plots, charms, scrolls, voyages, rebirth, paid spins, lost RF stakes and swap fees all split 70% Season Pool (top 10 split 30/20/12/8/6/5/5/5/5/4%), 25% creator, 5% burned.

Kept items have no expiry. [Full odds, costs and tokenomics](https://github.com/shukla1243/nemo-frns-farm/blob/main/docs/TOKENOMICS.md) · [Lore and guide](https://github.com/shukla1243/nemo-frns-farm/blob/main/docs/LORE.md).

**What have you tested?**
- TypeScript strict typecheck and production build pass.
- 76 unit tests pass. They cover engine rules, the RTP of every chance game, AMM invariants, the 70/25/5 sink split, season rollover and claims, islander gifts, the endless story, milestones, rebirth, the daily streak, voyages (fixed outcomes, recall, odds, net RF-negative EV, stock sales), Crab Dash, the Season Journey, the story guide, the no-food safety net, save codes, map reachability for every station, and Monte Carlo economy bots. The bots are net RF sinks: grinders spend about 114 to 151 RF against about 20 to 27 RF won in 4 h.
- Playwright checks pass on desktop (1280×800) and phone (390×844). They cover the guest flow, story, fast travel, chop plus autosave, all panels fitting the screen (Play hub, notifications, settings, guide), farm, swap, wheel, fishing and NPC gifts, with zero page errors. `knip` reports no dead code.
- The wallet/eligibility gate uses the FriendSDK functions directly. A full real-wallet playthrough with a Gen 1+ Friend is still to be done by a holder.

**Known limitations**
The economy, seasons and multiplayer are simulated and client-authoritative. Profiles, raids and boss damage are signed Nostr events, but no server validates them, so real value would need on-chain settlement first (roadmap in the README). Public Nostr relays or WebRTC can be unreachable on some networks; the game then continues solo with simulated rivals. WalletConnect is not supported: use an injected or in-app wallet browser. No live token spending, trading or wearable NFTs are included.

**Credits**
All code and pixel art are original to this project (procedurally generated in `src/art/`). Fonts: Jersey 15 and Nunito (SIL OFL). FriendSDK (Apache-2.0) by Rare Friends for wallet, identity, canonical Friend sprites and sounds. Music: original generative Web Audio. Libraries: React, Vite, anime.js, nostr-tools, Trystero. [Notices](https://github.com/shukla1243/nemo-frns-farm/blob/main/NOTICE.md).
