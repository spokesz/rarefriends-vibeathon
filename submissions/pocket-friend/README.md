# Pocket Friend

Hatch your wallet-selected Rare Friend, care for it, and help it win three short battles in a safe, replayable virtual-pet session.

**Builder:** [@enryu8191](https://github.com/enryu8191) · **Category:** Character Spotlight · **SDK:** FriendSDK v0.1.4

- **Game name:** Pocket Friend
- **Public playable preview:** https://enryu8191.github.io/friendsdk/
- **Source repository and branch:** [enryu8191/friendsdk `codex/pocket-friend`](https://github.com/enryu8191/friendsdk/tree/codex/pocket-friend/games/pocket-friend) at [`51cd515`](https://github.com/enryu8191/friendsdk/tree/51cd51508058fa25d2a0af4662f698483dbb901d/games/pocket-friend)
- **Wallet and network:** A browser wallet on Robinhood mainnet (chain 4663) that owns a hardwired Rare Friends Generations NFT, generation 1 or higher. FriendSDK verifies fresh eligibility before play.
- **Session-only progress:** Care, the egg draw, and fight progress reset on reload or Friend change. FriendSDK provides no save bridge.
- **Simulated, non-transactional egg and battle mechanics:** The free cosmetic egg draw and the three PvE battles cost no RF, award no RF, and send no wallet transaction.

## Run it

Open the [public preview](https://enryu8191.github.io/friendsdk/). Connect a browser wallet on Robinhood mainnet and select an eligible Friend. The SDK ownership gate stays in the hosted build. No RF funding or transaction signature is required.

To run from source with Node.js 22+:

```sh
git clone https://github.com/enryu8191/friendsdk.git
cd friendsdk
git checkout codex/pocket-friend
npm ci
npm run build
npm run dev:game -- games/pocket-friend
```

Open the printed URL, normally `http://localhost:4173`. For a phone on the same LAN, run `npm run dev:game -- games/pocket-friend --host 0.0.0.0 --port 4173`.

## Play

Connect and select an eligible Friend in the SDK host. Draw one free cosmetic egg — Dawn 60%, Moss 30%, or Stardust 10% — then hatch the selected verified Friend. The shell is cosmetic and does not change which Friend you selected.

Care with **Feed**, **Play**, **Wash**, and **Nap**. Click or tap the actions; desktop keys **1–4** also work. Every six seconds of active play, each need decreases by 2. Feed adds 24 Full and costs 4 Clean. Play adds 24 Happy and costs 9 Rested and 5 Clean. Wash adds 24 Clean and costs 4 Rested. Nap adds 27 Rested and costs 7 Full and 4 Happy. Each action earns 5 bond, plus 4 when it serves the lowest need, plus 2 when continuing a varied, timely streak. Actions have a 650 ms cooldown.

All four needs must reach 50 and bond must reach 25 before a fight. Each automatic battle has three clashes; win at least two to advance. Win three fights to finish the run, which can be replayed with a new egg draw. A loss only lowers needs. Care and retry the same opponent. The pet never dies and there is no revive mechanic.

Friend clash power is `3 + floor(average needs / 20) + floor(bond / 25) + random(0..2)`. Opponent clash power is `5 + opponent number + random(0..2)`, for opponents 1, 2, and 3. Ties award neither side. A win adds 10 bond and costs 12 Rested. A loss costs 15 Rested and 10 Happy.

The SDK pauses play while its menu is open. Sound starts muted, and the battle presentation respects reduced motion. On a small screen, scroll inside the game to reach the care and fight controls. Full rules are in the [game README](https://github.com/enryu8191/friendsdk/blob/codex/pocket-friend/games/pocket-friend/README.md).

## Economy and assets

Eggs, care, and battles cost no RF and award no RF. Egg and clash randomness are simulated session gameplay. There is no paid chance action, consumable, redemption, or wallet transaction. `game.json` is an unused schema placeholder required by FriendSDK v0.1.4. It is never surfaced to players, and the game does not call `buy`, `play`, `settle`, or `redeem`.

The selected Friend's artwork comes from FriendSDK's canonical sprite reader. The room illustration was generated for this project. Care icons, eggs, and opponents are original editable drawings. Asset sources and the generation prompt are in [ASSETS.md](https://github.com/enryu8191/friendsdk/blob/codex/pocket-friend/games/pocket-friend/ASSETS.md). FriendSDK's [NOTICE.md](https://github.com/enryu8191/friendsdk/blob/codex/pocket-friend/NOTICE.md) covers its supplied artwork.

## Checks and limitations

From the FriendSDK checkout, run `node scripts/dev-game.mjs check games/pocket-friend`, `node scripts/dev-game.mjs build games/pocket-friend`, `node --test games/pocket-friend/rules.test.mjs`, and `node games/pocket-friend/smoke.mjs` after installing Playwright Chromium. Static output is `games/pocket-friend/.friendsdk/` and must be hosted intact over HTTPS. That output is what the public preview serves.

Completed automated checks, recorded in [PLAYTEST.md](https://github.com/enryu8191/friendsdk/blob/codex/pocket-friend/games/pocket-friend/PLAYTEST.md):

- SDK validation, static build, and compilation on FriendSDK v0.1.4
- Seven rules tests for egg odds, care recovery, readiness, power milestones, battle results, and safe loss
- Headless browser smoke at 360px and 960px, using mock wallet and artwork fixtures
- A strict typecheck of the game sources
- Targeted SDK regression checks for owned-Friend discovery and preview/live bundle separation

Browser checks use fixtures. They do not replace a real wallet on Robinhood mainnet. A physical phone playtest with an eligible wallet has not been completed. Session progress is not saved. The broader SDK suite has four Windows portability failures that are unrelated to this game; those are documented in the playtest notes rather than treated as a green full-suite run.
