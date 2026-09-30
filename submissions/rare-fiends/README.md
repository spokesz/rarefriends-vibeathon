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
- The game lives in `estate/`. The design, which is the source of truth, is `estate/DESIGN.md`.

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

## How to use it

Build a base with your Friends, gather wood and crystals, put up buildings and defences, then attack other
bases, duel, and trade.

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

- **31 checks**, listed with what each does not cover by `node estate/checkall.js --list`.
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

Yes. Built with Claude Code and a set of role agents, one file per role in `.claude/agents/`.
