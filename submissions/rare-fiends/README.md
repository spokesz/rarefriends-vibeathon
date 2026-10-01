# Rare Fiends

## Project name, builder name/contact and category

| | |
| --- | --- |
| Project | Rare Fiends |
| Builder | Intelstrata, Metanode Labs |
| Contact | @intelstrata on X (x.com/intelstrata) |
| Category | Character Spotlight, Token Activity and Economy Potential |

## One sentence

Rare Fiends is an on-chain strategy game on Robinhood Chain (4663) where players build bases with their Rare Friends, fight, duel and trade in `$RAREFRIENDS`.

## Source repository

- Repository: `https://github.com/metanodelabs/rare-fiends`.
- The game lives in `estate/`, the contracts in `estate/contracts/`, the toolkit record in `TOOLKIT.md`, and this submission in `submissions/`.

**Stack.** Rare Fiends is **not built inside FriendSDK**. It uses FriendSDK **v0.1.2** (pinned, see
`TOOLKIT.md`) for two things only: the Friend sprite renderer (`frames()`) and the tree prop. The SDK is
read from its web address at that version, not copied into the repository. Everything else is ours:

| Part | What it is |
| --- | --- |
| Pages | Plain HTML and JavaScript in `estate/` |
| Contracts | Solidity 0.8.36 in `estate/contracts/` |
| Local server | Python, `estate/serve.py` |
| Chain reads | `ethers` |

**Run it from a fresh clone.** The local site is served from `site/`, a folder of links into `estate/`.
`site/` is not in the repository, so a fresh clone must make it first. `estate/serve.py` also serves
`site/`, so it does not avoid this step.

```
mkdir site
for f in estate/*; do ln -s "../$f" site/; done
ln -s ../estate/index.html site/base.html
cd site && python3 -m http.server 8765
```

Then open `http://localhost:8765/base.html`. (`python3 estate/serve.py` from the repository root works the
same way once `site/` exists, and sends no-cache headers.) These steps were written from how the working
copy is laid out; they have not been run on a fresh clone.

Checks: `node estate/checkall.js`. The contracts: `cd estate/contracts && npm i && npm run check`.

## Playable preview or demo

- `https://rarefiends.com` - the landing page and FAQ are live.
- **The playable game is not yet published (M23) and a playable preview link will follow.**

**Wallet and network.**

- Network: Robinhood Chain, chain id 4663.
- At launch, play is limited to whitelisted Robinhood Chain addresses; the whitelist is enforced on chain. Ask the builder to be added.
- `estate/bridge.html` and `estate/deployer.html` connect a wallet. No other page does today.
- A playable Friend is a hardwired Rare Friends Generations NFT, generation 1 or higher
  (`hardwired = generation >= 1`).
- **Honest note:** the ownership gate on the base page itself is **not yet enforced**. It is planned
  (M23 item 13). Today the base plays without a wallet.

## How to play

**Getting in.**

- You need a wallet on Robinhood Chain (chain id 4663).
- Your Friend is a hardwired Rare Friends Generations NFT: generation 1 or higher.
- **At launch, only whitelisted addresses can play. Ask the builder to be added.**
- To play locally today, make `site/` and start the server with the commands under *Source repository*,
  then open `http://localhost:8765/base.html`. Add `?fresh=1` for an empty plot.

**Your base, and what each tap does.**

| To do this | Do this |
| --- | --- |
| Move a Friend | Tap the Friend to select it, then tap open ground. Drag sideways to turn the camera. |
| Chop wood | With a Friend selected, tap a standing tree. It chops that tree and the rest of the grove. |
| Cut crystals by hand | With a Friend selected, tap a crystal seam. If it is ripe it pays out and starts to regrow. |
| Build | Press **BUILD**, pick a structure, then tap open ground you own. On an empty plot the **keep** comes first. |
| What you can build | Keep, hut, silo, tower, wall, cell, generator and collection depot. A generator needs running water. Some cost wood as well as crystals. |
| Raise a level | In build mode, tap the building, then **RAISE**. Nothing rises above the keep's level, except a cell. |
| Harvesters | In build mode, tap the depot, then **BUILD HARVESTER**. It costs crystals, and the depot has one bay per level. |
| Man a tower, wall or cell | Select a Friend, then tap the tower, the wall or the cell. Tap again to bring them down. |
| Knock a building down | In build mode, tap it, then **KNOCK DOWN**. Half of everything ever spent on it comes back. |

- **Your keep.** You can knock down your own keep. If you do, or if an opponent destroys it, you keep
  using every building you have, but you cannot upgrade anything. You can build the keep again for
  75 wood and 75 crystals. It comes back at level 1, on free ground of your own. Until it is finished,
  you cannot upgrade or place anything. After that, nothing can rise above the keep's level, so raise
  the keep first. Your first keep is free. With no keep and nowhere to store crystals, you can still
  gather up to 75 crystals, enough to rebuild.
  **This is the rule. The local build does not do it yet.** Today it still refuses to knock down a keep
  while other buildings stand.
- You start with **240.00 crystals** and no wood. Crystals count to two decimal places.
- The silo caps how many crystals you can hold. A knock-down whose refund would overflow the silo is
  refused, and the button says how much room it needs.

**A game.**

- **Where you start.** You start at a random spot on your own plot, the ground the map sets aside for
  you. Or you can choose to start anywhere on the map that nobody has taken yet. Ground goes to whoever
  takes it first, so you can never start where another player already is. Then you place your keep.
  **This is the rule. The local build does not do it yet.**
- A game runs **seven days** to start. The deployer can change that.
- Joining stays open **24 hours**, then there is an hour before the start. At least two players.
- The pot is real `$RF`. A cut of **5%** comes off it at launch; the cut is set per game, between 5% and
  10%, and frozen once the first player has paid.
- At the end, ranked places share the rest: **first 50%, second 30%, and the last 20% split equally**
  between the places after that. The deployer sets how many places pay, **at most 10**.
- **Fights.** Attack another base. In V1 our server resolves each fight and commits its hash on chain.
  Winning takes nothing from the loser by itself. A building you destroy is just destroyed: it
  weakens the defence and gives you nothing. A Friend beaten in an attack is out until the next game.
- You can send as many Friends as you own, and a fight holds every wall the defender has. A destroyed
  silo spills the crystals the base can no longer hold onto the ground around it, and anyone can mine
  them there. **This is the rule. The local build does not do it yet.**
- **Capture.** Capturing a building is the only way to take another player's resources. A building
  you capture is yours for good. You can sell it, or build next to it to push into that base. The
  risk is yours: the owner can fight you while you take it, and if you are killed, it stays theirs.
  That fight does not harm the base.
  **This is the rule. The local build does not do it yet.**
- **Duels and the four challenge games** - rock paper scissors, blackjack, Texas hold'em (with betting
  in crystals) and Friend or Fiend (played at a terminal). You stake crystals, never `$RF`. On chain the
  rolls come from Pyth Entropy; the local page rolls random bytes in its place.

**What is true today.** The game is playable locally. A public preview follows. Fights are decided by
our server in V1. No contract is on chain yet.

**The economy, labelled.**

| Thing | Real or in-game |
| --- | --- |
| `$RAREFRIENDS` (`$RF`) | Real token on chain 4663. **It is not simulated.** |
| Crystals | The in-game unit, counted to two decimal places |
| Fights | Resolved on our server in V1; a hash of each fight is committed on chain |
| Duels and challenge games | Rolled from Pyth Entropy via `RareChance` (contract) and `chance.js` (page) |

**V1 is to test gaming dynamics; V2 will move on-chain.**

**Nothing is live-deployed yet.** The contracts are written and tested, but they are not on chain.

**Costs, rules and odds.**

| What | Where, or the figure |
| --- | --- |
| Building and unit costs | `estate/costs.html` |
| Attack and defence rules | `estate/attack_defense.html` |
| The economy | `estate/economy.html` |
| Duel odds (`duel.js`, `TERMS`) | A counter wins 70%; the same pick is 50%; house fee 0 |
| Marketplace fee | 1.5%, with a ceiling of 10% |
| Cut on the pot at launch | 5% |

**Assets.** Friend sprites and the tree come from FriendSDK v0.1.2, used under its `NOTICE.md` terms. The
Doopie conversions come from the collection's own metadata. Everything else is drawn in this repository.
See `TOOLKIT.md` for the source of each.

## Checks and known issues

- **42 checks** - 41 in `estate/` plus the contracts' parity check, counted off the disk 2026-10-01 - listed with what each does not cover by `node estate/checkall.js --list`.
- **Red:** `livecheck` fails on the studio harvester. It is a known, older failure.
- A green check means what it asserts is true. Most browser checks do not yet watch for failed requests
  or console errors (`estate/pagewatch.js` covers three).

**Known risks involving wallets or funds.**

| Risk | Detail |
| --- | --- |
| Fights are server-side in V1 | Our server decides each fight; only its hash goes on chain |
| Contracts are not deployed | Nothing described above is on chain yet |
| Some contracts cannot be changed | `RareMarket` and `ShadowFriends` are permanent once deployed |
| Ownership gate | Not enforced on the base page yet (see above) |
| Launch is whitelisted | A closed test before opening to everyone. |

## AI-assisted

Yes. Built with Claude Code and a set of role agents, one file per role (kept in the private archive, not in this repository).
