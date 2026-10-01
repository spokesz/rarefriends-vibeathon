# Rare Friend Theater

**Builder:** [@Englipt](https://github.com/Englipt)  
**Category:** Character Spotlight

Your verified Generations NFT stars in a seven-act interactive story. Its on-chain sprite family gives it a stage role and color, and its original sprite appears in every scene and in a shareable comic.

## Source and playable preview

- Source: https://github.com/Englipt/friendsdk/tree/main/games/rare-friend-theater
- Preview: https://englipt.github.io/friendsdk/
- SDK: FriendSDK v0.1.3

Connect a browser wallet on Robinhood mainnet (chain 4663) holding a hardwired Generations NFT, generation 1 or higher. Select the Friend you want to star in the story. The SDK verifies ownership before play. No RF funding or transaction signature is needed for the preview.

## Play

First, sweep a spotlight across the stage to find the lost star. Aim with mouse or touch and tap the star; keyboard players can use arrows and Enter, and a direct reveal button is available. In act three, play three glowing notes in order by tapping the stage, using Enter or Space, or pressing the accessible next-note button. In act four, fold three paper steps using the same pointer/keyboard controls or the direct button. Two new acts bring the audience and a paper wish into the story before the finale. Choose one of three actions in each of the seven acts. Your choices accumulate in a visible story trail, appear on the finished seven-panel comic, and give the finale a distinct title and illustration. Paint the set Moonbeam, Sugarplum, or Mossy; the chosen colors appear in every scene. Open the comic and use the browser's image menu to save it. Spend simulated RF on a moon lantern, brass key, or star confetti, or sponsor glowing house lights that appear throughout the show and in the comic. A reduced-motion control is provided.

## Economy

The preview begins with 8 simulated RF. Each prop costs 2 simulated RF. House lights cost 1, 3, or 5 simulated RF per click, limited by the remaining preview balance. Props and lights have no chance outcomes, payouts, resale value, RF redemption promise, or consumable rules. All balances, props, and lights reset when the session reloads. No real donation or real RF spend occurs. A live version would need reviewed contract actions to spend RF from the Friend's canonical wallet, direct real support to an approved recipient, and persist ownership/support; FriendSDK v0.1.3 does not provide these actions. The SDK's required chance-game definition is unused by the theater.

## Checks and limitations

SDK build, game validation, game typecheck, and automated desktop and mobile browser tests pass. The browser tests run against the SDK's fixture wallet and simulated RPC responses, including its fresh ownership checks. A real-wallet playthrough remains to be done. The comic is rendered as a PNG image inside the game because the sandbox blocks initiated downloads; players save it with their browser's image menu. The on-chain sprite requires the Robinhood mainnet RPC to be available.

All stage art is drawn by this project, including the velvet curtains, gold proscenium, footlights, scenery, and comic panels. Friend sprite art is provided by FriendSDK; no other third-party assets are used.
