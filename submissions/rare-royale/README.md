![A live round: Friends fight inside the storm circle while the crowd sponsors them](https://raw.githubusercontent.com/DEDQ3E/rare-royale/main/media/battle.png)

🕹️ **Play:** https://dedq3e.github.io/rare-royale/

🎬 **Demo with sound (60 s):** the real SDK runtime with Sparkling Friend #66666 read live from mainnet, only the wallet mocked (`tests/video-pr.mjs`). It starts in the lobby 11 seconds before the drop and enters on camera, then plays an ordinary round: Pry on the landing crate, a shield, a shout, Smoke out of a fight, the furnace lit, the late game and the results.

https://github.com/user-attachments/assets/efc1df7e-7ddb-437a-ba83-eb6c9fe2e077

🔥 **About 1,500 RF burned a day per 1,000 players**, if each plays one 10-minute session a day (2.3 rounds) as a careful player (entry, one shield, a medkit when hurt), with no crowd counted. If everyone only enters: 230 RF a day; as a tactician who pays for every Smoke, Pry and Boost call the round offers: about 4,300 RF; buying every item and every call that helps: about 8,100 RF. Simulated.

✅ **Tested with a real wallet:** the whole current preview (FriendSDK v0.1.4) was played on Robinhood mainnet with a real wallet and a real Generations Friend: connecting, the ownership gate, the lobby, entering, sponsoring, the paid calls (Smoke, Pry, Boost), shouts, the Locker, the challenges, results, the replay, the hall of fame and the next round. The v0.1.4 preview build carries no transaction code, and RF itself stays simulated.

💰 **The RF prices are examples.** A 1 RF entry, a 1 RF shield and the rest are sample prices. If the live game needs higher prices, multiply every price by the same number (×5, ×10…): the splits, the burn share and every chance in this document stay the same, and only the RF amounts scale.

**What changes your chance of a top-10 place** (average 20%; the same simulated rounds with one thing changed):

| Choice | Top 10 |
|---|---:|
| Drop: the quietest place / the tactic's choice / the busiest place | 26% / 20% / 14% |
| Tactic: Hide / Loot / Fight | 27% / 18% / 16% |
| A shield (1 RF), bought mid-battle | 28% → 34% |
| A medkit (1 RF), bought below half HP | 7% → 11% |
| A second life (2 RF), bought when knocked down | 0% → 5% |
| A Smoke call (1 RF), whenever an enemy is spotted | 23% → 37% |
| A Pry call (1 RF), whenever a crate is near | 19% → 24% |

A smart drop takes RF from other entrants, never from the burn: the quietest place about breaks even (1.00 RF per entry), the busiest returns 0.59 RF. The three tactics return within 5% of each other.

**Project name**
Rare Royale

**Builder / contact**
[DEDQ3E](https://github.com/DEDQ3E) · Discord `dedq3e3` · Telegram [@DEDQ3E](https://t.me/DEDQ3E)

**Category**
Token Activity

**One sentence**
A battle royale where your Generations Friend fights 49 real Rare Friends while anyone watching spends RF to sponsor any Friend: entries fund a top-10 prize ladder and knockout bounties, and every sponsor, paid call, shout and cosmetic payment burns 50% and sends 50% to active Friend rewards (all RF is simulated in this preview).

**What did you build?**
Rounds of about four and a half minutes: a one-minute lobby (pick a drop and a tactic, see your odds, enter for 1 RF, practise free or just watch), an airship drop, about three minutes of battle on an island with tiered loot, cover and six shifting storm circles, then results and a replay of the final 20 seconds. Up to four quick decisions per round, each with two free options and a paid third for 1 RF: Smoke (vanish from a fight), Pry (a crate gives loot one tier better) or Boost (out of the storm 70% faster, no HP cost). Anyone can sponsor any Friend with a shield, a medkit or a second life until 25 are left; each lands in a capsule with the sponsor's name, and a furnace fills with every RF burned and is lit once a round passes 30 RF burned (embers over the arena, a banner, its own roar). Also: a Fighters tab to follow anyone, paid shouts, Locker auras and titles (looks only), eleven challenges (two for spending: burn 5 RF in a session, escape with Smoke), a hall of fame that counts lit furnaces, its own synthesized sound and a phone layout.

**How does it use Rare Friends?**
Your ownership-verified Friend fights as itself, drawn from its canonical sprite, with Might, Speed and Wits from its family, generation and sprite seed, and a signature ability for each of the nine families. The other 49 are real Generations Friends from a roster of 300 (public reads only). The hall of fame reads the RF token's live `totalSupply`. The SDK handles the wallet, Friend selection and the ownership gate.

**How RF is spent and burned**
Five ways to spend: the entry, sponsoring any Friend, paid calls (Smoke, Pry, Boost), shouts and Locker cosmetics. **Up to 4 moments per round where burning is your tactical call.** Every payment except the entry burns 50% and funds 50% active Friend rewards (the protocol's 50/50 rule). Both tables are reproduced by `npm run balance` ([BALANCE.md](https://github.com/DEDQ3E/rare-royale/blob/a58880205f7123d885e14eb3fe0fc1b9fe9a336c/BALANCE.md)).

**One real player, with no crowd at all** (3,000 simulated rounds per profile; a 10-minute session is about 2.3 rounds):

| Player | Spent per round | Burned per round | Share burned |
|---|---:|---:|---:|
| Entry only | 1.00 RF | 0.10 RF | 10% |
| Careful: entry, a shield, a medkit when hurt | 2.13 RF | 0.66 RF | 31% |
| Tactician: entry and every paid call (Smoke, Pry, Boost; 3.5 a round) | 4.54 RF | 1.87 RF | 41% |
| All-in: every item and every paid call whenever it helps | 7.77 RF | 3.49 RF | 45% |

**A whole round of 50 entrants**, by how much the other entrants and viewers sponsor (simulated; the game plays the last column):

| Sponsoring and shouts per entrant per round | 0 | 0.33 RF | 0.74 RF |
|---|---:|---:|---:|
| Spent per round | 50 RF | 66.5 RF | 87.1 RF |
| Burned per round | 5.6 RF (11%) | 13.9 RF (21%) | **24.2 RF (28%)** |

- **The crowd model is modest:** less than one shield per entrant per round. Every second while sponsoring is open, a downed Friend gets a second life with 6% chance, a random Friend a shield with 12%, a hurt one a medkit with 9%, and a fan buys a shout with 2%. Most of that spending would be entrants protecting their own Friend, which lifts its top-10 chance (table above). Pure spectators get status, not money: their name on the capsule, under the replay of the final as a Kingmaker, and in the hall of fame as a round's top sponsor.
- **Why the entry burns only 10%:** each extra 10% of entry burn would take 0.1 RF off the average return (0.79 RF now, 0.69 RF at 20%). A game that keeps the entry gets played once; here the burn grows with every round played.
- **The burn is on screen:** besides the furnace and the capsules, the results split the round's burn by source (entries, other entrants and viewers, you, the storm), plus what your own payments burned this round and this session.

**What would be on-chain?**
Nothing in this build: no contract or transaction code, as the SDK asks for prototypes. The on-chain phase with the Rare Friends team would add a round contract where:
- every payment comes from the Friend's canonical NFT wallet;
- the entry is held until settlement, which burns its share through the RF token's `burn()`, funds rewards and pays out exactly the pool; every other payment is split at once;
- sponsoring and paid calls are paid from a balance topped up before the round, so the 5-second window of a second life or a quick decision needs no wallet prompt;
- rounds run on one shared clock for all holders, one every 5 minutes, with wild Friends in empty seats. One ladder place per five paid entries keeps the odds at any player count; only the prizes scale.

Live play would also need the reward-funding path from the Rare Friends team, matchmaking, and saves (the SDK has no save API).

**How does it use randomness?**
The battle is deterministic from a round seed, so anyone can replay a round and check it. In the preview the seed is the round number, so everyone in the same minute gets the same island, line-up and base battle. Live, the seed stays unknown until the final: it mixes a Dice result drawn when entries close with a game secret whose hash is published before entries open and which is revealed after the final. A Dice result alone is public on-chain, so a bot could simulate the rest of a battle mid-round and buy only the items that flip the result; with the secret nobody can, nobody can pick the seed, and every round can still be checked afterwards.

**Source code**
[GitHub repository](https://github.com/DEDQ3E/rare-royale/tree/a58880205f7123d885e14eb3fe0fc1b9fe9a336c) ([full rules and tables](https://github.com/DEDQ3E/rare-royale/blob/a58880205f7123d885e14eb3fe0fc1b9fe9a336c/README.md)) · FriendSDK v0.1.4 · React, TypeScript, Canvas 2D, Web Audio.

**Playable demo / how to run**
**Play: https://dedq3e.github.io/rare-royale/** (GitHub Pages, built with `friendsdk build`). You'll need a browser wallet on Robinhood mainnet (chain 4663) holding a hardwired Generations NFT (generation 1 or higher). No RF funding, signature or transaction is needed. To run it locally with Node.js 22+:

```sh
git clone https://github.com/DEDQ3E/rare-royale.git
cd rare-royale
git checkout a58880205f7123d885e14eb3fe0fc1b9fe9a336c
npm ci
npm run dev
```

**How do you play?**
Lobby: tap the map to pick a drop; **1–3** Fight, Hide or Loot, **E** enter for 1 RF, **P** practise, **L** Locker. Battle: **S** shield, **M** medkit, **R** second life (within 5 s of a knockdown), **T** your Friend or the one on camera, **1 / 2** quick decisions, **3** the paid call (1 RF), **Y** shouts, **F** Fighters tab. Results: **V** replay the final. **H** hall of fame, **Esc** close. Everything also has a button for touch.

**Costs and rewards**
Everything is simulated; you start with 20 RF. The prices are examples that scale together (see the top).
- **Entry, 1 RF:**
  - where it goes: 0.6 RF to the ladder, a 0.2 RF starting bounty on your head, 0.1 RF burned, 0.1 RF to rewards;
  - ladder with 50 paid entries: places 1–10 pay 8, 5, 4, 3, 2.5, then 1.5 RF each;
  - bounties: a knockout pays half the victim's bounty and adds the other half to your own head, the biggest head (once worth 0.4 RF or more) is marked WANTED, and the winner keeps its own;
  - a round with fewer than 5 paid entries refunds every entry; practice is free.
- **Paid calls:** Smoke, Pry or Boost, 1 RF each, only when a quick decision is open (up to 4 a round).
- **Sponsoring:** a shield (soaks the next 30 damage) or a medkit (+45 HP) costs 1 RF. A second life (within 5 s of a knockdown, back with 50% HP) costs 2, then 4, then 8 RF, at most 3 per Friend per round. Sponsoring closes at 25 standing.
- **Looks:** a shout costs 1 RF; auras Ember and Frost 2 RF, Starfall 5 RF; titles Underdog 1, Showrunner 3, High Roller 5 RF (each once per session; challenge titles are free).
- **Nothing is kept or redeemed:** sponsor items, paid calls, shouts and looks act at once or within the same round (Pry on the next crate), so there are no consumables, backing or redemption rules.
- **Odds per 1 RF entry** (6,000 simulated rounds):
  - any RF back 45.5%, 1 RF or more 20.1%, win 2.0%, average return 0.79 RF;
  - no purchase pays for itself in RF (a shield returns 0.29 RF per 1 RF, a paid call 0.16–0.20 RF); the dock shows each item's return and top-10 lift, and a paid call's button shows its own on hover.

**What have you tested?**
All pass, including from a fresh clone with `npm ci` (the build reproduces the published preview): typecheck; 13 engine tests (map, stats, replay, sponsoring, decisions, paid calls: 1 RF split 50/50, recorded as events, the round replays identically, economy, settlement, ledger, rounds, challenges); `friendsdk check` and `friendsdk test` at 960 and 390 px; `npm run balance` (four fairness targets over 6,000 rounds, plus the burn tables above); an automated browser run through every screen at 960 × 808 and 390 × 844, including a paid call, on into a second round (the SDK's test RPC refuses the hall's live RF supply read, so that one tile shows "unavailable" there); a one-minute recording from the real runtime with a Friend read live from mainnet. Played through on Robinhood mainnet with a real wallet and Friend (see the top).

**Known limitations**
- The economy, the other entrants and the viewers are simulated; balances reset on reload (no save API).
- Rounds are shared by time, not by a server: your sponsoring and decisions change only your own view.
- The hall's supply read uses the public Robinhood RPC and shows "unavailable" if it fails.
- Sound was checked by measurement and by ear in a desktop browser, not yet on a physical phone.
- No risk to wallets or funds: the preview never asks for a signature, approval or transaction (the FriendSDK v0.1.4 preview build contains no such code), and live mode has never run against a deployed contract.

**Credits**
Friends are drawn from their canonical on-chain sprites through FriendSDK. All other art and every sound are generated in code, with no samples or image files. Fonts: Bebas Neue and Silkscreen (SIL Open Font License 1.1). Built with Claude Code.
