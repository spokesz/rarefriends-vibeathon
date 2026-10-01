# Museum of Almost Nothing

## Builder

GitHub: [@la0311](https://github.com/la0311) · Discord: `@lacamon`

## Category

Token Activity

## One sentence

Museum of Almost Nothing is a Rare Friends curation game where players repeatedly spend and recycle simulated RF to hunt the three-object pattern required by a randomly selected Secret Exhibition.

## Playable preview

[Play Museum of Almost Nothing](https://la0311.github.io/rarefriends-museum-of-almost-nothing/). The FriendSDK runtime requires a browser wallet holding an eligible Rare Friends Generations NFT (generation 1 or higher) on Robinhood mainnet, chain 4663. Connect and select your Friend to enter the game.

## Source

[Public source, assets, setup, and run instructions](https://github.com/la0311/rarefriends-museum-of-almost-nothing). From the repository root, use Node.js 22+ and npm: `npm ci`, then `npm run dev`. Validate with `npm run typecheck`, `npm run check`, `npm run build`, `node tests/museum-rules.mjs`, and `npm run test:game` (Playwright Chromium shell required for the browser test).

## FriendSDK

FriendSDK **v0.1.4**, pinned to upstream commit [`ca3bf183b809ecf22d87c63d88ce03969a3f8da2`](https://github.com/spokesz/friendsdk/commit/ca3bf183b809ecf22d87c63d88ce03969a3f8da2). The SDK handles the wallet and Friend gate, canonical Friend artwork, permits, simulated RF, outcomes, and aggregate inventory. This game does not modify SDK core.

## Why Token Activity

The Secret Exhibition gives repeated expeditions a purpose. Each permit costs simulated RF; random outcomes make collecting uncertain. Players Keep a find to advance the target or Redeem one copy for a fixed simulated RF amount that may help finance another expedition. The closing tableau reports local session permits purchased, expeditions settled, objects redeemed, simulated RF spent, simulated RF redeemed, and net simulated RF spent.

**The current Vibeathon preview uses FriendSDK's simulated economy. It does not burn or spend live RF on-chain.** These counters are local session metrics, not blockchain history, persistent scores, or a leaderboard.

## Game rules

A fresh session randomly selects **THE ECHO** (two matching objects and one different object, with the different one Presented last) or **THE VARIETY** (three different object types, Presented in any order). Buy a permit, send an expedition, and decide whether to Keep the revealed object or Redeem one copy. Arrange three owned objects on the plinths, prepare the Final Exhibition, direct the Friend to each plinth, and explicitly Present. A failed tour can be retried for free. Arrival alone does not Present an object.

## Economics

One expedition permit costs **6 simulated RF**. A new SDK session starts with 20 simulated RF.

| Outcome | Probability | Fixed redemption per copy |
| --- | ---: | ---: |
| Unremarkable Pebble | 40% | 2 simulated RF |
| Very Short Twig | 35% | 2 simulated RF |
| Unbent Paperclip | 15% | 3 simulated RF |
| Unattached Button | 10% | 4 simulated RF |

Weighted expected redemption is **2.35 simulated RF**. Tour success never changes probabilities, redemption values, or the RF ledger.

## Controls

Desktop: Tab / Shift+Tab to focus, Enter or Space to activate. Touch: tap the same visible controls. Select a Collection item and numbered plinth, then Place, Replace, or Remove. During the Final Exhibition, direct the Friend to an occupied plinth and press Present. The game is silent, honors reduced motion, and pauses with the runtime.

## Token Activity summary

The final tableau lists permits purchased, expeditions settled, objects redeemed, simulated RF spent, simulated RF redeemed, and net simulated RF spent. The same session shows running activity near the target. A reload does not preserve these local counters.

## Checks

- Typecheck, FriendSDK game validation, production build, and focused rules tests: **PASS**.
- Focused browser tests for both targets at 960px desktop and 360px touch: **PASS**. They cover Keep, Redeem, activity counts, final tour, unchanged tour economy, duplicate request protection, pause, and frame fit.
- Final public wallet, eligible Friend, Secret Exhibition, and one simulated permit/expedition smoke: **PASS — owner verified**.

## Known issues

- Full runtime reload resets the session and may select another target. Child-only reload keeps the SDK ledger but loses local target, arrangement, tour, and activity counters.
- Random draws and finite simulated RF can leave a particular session unable to complete its selected target. Completion is not guaranteed.
- Activity metrics are local and simulated; there is no backend, global leaderboard, or live token burn.

## Assets and credits

Canonical Friend artwork: Rare Friends via FriendSDK's sprite API; see the SDK's `NOTICE.md`. FriendSDK: Rare Friends. The museum interface and object silhouettes are project-authored CSS. No additional third-party art is used.

