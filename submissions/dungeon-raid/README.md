# Dungeon Raid

**Project name**
Dungeon Raid

**Builder / contact**
Fresh · [@crystalrootsllc](https://github.com/crystalrootsllc)

**Category**
Character Spotlight

**What did you build?**
A pixel-art dungeon raid where **your Generations Friend** (original FriendSDK art) fights Shade Moth with Attack / Guard / Rare Beam. Timed Guards charge Rare Beam. Clear Normal (2 bars) or Max (4 bars, optional simulated Shield Bar).

**How does it use Rare Friends?**
You play as your own Generations NFT with its original character artwork. FriendSDK handles wallet connect, owned Friend selection and eligibility (Robinhood mainnet 4663, generation ≥ 1).

**Source code**
[https://github.com/crystalrootsllc/dungeon-raid](https://github.com/crystalrootsllc/dungeon-raid) · FriendSDK **v0.1.2** (includes `patches/owned-friends.ts`)

**Playable demo / how to run**
- **GitHub Pages (primary):** https://crystalrootsllc.github.io/dungeon-raid-preview/
- Tunnel mirror: https://forty-wed-truly-cancelled.trycloudflare.com

Wallet: Robinhood **4663** + hardwired Generations NFT **gen ≥ 1**. Economy simulated.


**Judges without a wallet / Friend load issues**
Use `friendsdk test` mock wallet, or a wallet in-app browser on 4663. Stock SDK discovery can fail on the public RPC without the included owned-friends patch (chunked owner-filtered logs).

**How do you play?**
OPEN → Attack. INCOMING → Guard when the ring turns lime. 2 timed guards unlock Rare Beam (5×, thick lime beam). Keys A/G/R or 1/2/3.

**Costs and rewards**
Simulated. Optional Max Shield Bar = 5 RF → 1 Moth Scale (1 RF). Net 4 RF.

**What have you tested?**
friendsdk check, test @960/@390, playthrough bots, phone layout audits.

**Known limitations**
- **Leaderboard is LOCAL / session-only.** FriendSDK's opaque sandbox blocks `localStorage`, so scores are kept in memory for this preview session only and clear on reload. They are never uploaded. A signed shared top-100 is planned post-submit (not in this MVP).
- Economy is simulated only.
- Owned-friends patch needed for stock SDK + public Robinhood RPC.

**Credits**
FriendSDK v0.1.2 runtime/sprites/sounds. Boss/dungeon/combat original. No emoji.

**Pitch**
Play as your Rare Friend. Timed Guard charges Rare Beam. Clear Normal or Max.
