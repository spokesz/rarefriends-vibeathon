# Submission: Rare Friends Unpaid Intern

Project name: Rare Friends Unpaid Intern

Builder / contact: kanissell, https://github.com/kanissell

Category: Economy Potential

One sentence: Give a Rare Friends Generations character a terrible job, spend simulated $RAREFRIENDS on an application, and get a pay slip that makes the token sink feel like a joke worth replaying.

Source repository: https://github.com/kanissell/rarefriends-unpaid-intern

Working demo: https://kanissell.github.io/rarefriends-unpaid-intern/

Stack: plain HTML, CSS and JavaScript. FriendSDK is not used because this is a public economy prototype without a wallet gate.

How to use: Open the demo, enter a Generations NFT token ID or use Friend #4753, and press Apply on one of three jobs. The result updates the simulated balance and prints a pay slip. Press New shift to reset.

Wallet and network: None are required for the preview. The NFT link points to the Generations collection on Robinhood Chain. Ownership is not verified.

Costs and odds: Each job application costs 2 simulated RF. The outcomes are 55% rejected and 0 RF paid, 30% paid in exposure and 1 RF paid, 12% actual pay and 3 RF paid, and 3% accidental CEO and 8 RF paid. Expected payout is 0.9 RF. Expected net spend is 1.1 RF per application. A fresh shift starts with 20 RF. Nothing is redeemable. There are no consumables.

Checks: `npm test` passed 6 tests for odds, boundary values, balance changes, error paths, and Friend IDs. `node --check` passed for both JavaScript files. The automated browser check passed on desktop and mobile for play, local storage, validation, reset, and layout width.

Known limits: No wallet, NFT art, ownership check, live RF spending, contract, payout reserve, or persistence across browsers. The prototype is a local simulation and is not an official Rare Friends product.

Credits: Original CSS character and code by kanissell and Codex. Rare Friends names and Generations token IDs are used as fan-game context. Fonts load from Google Fonts with system fallbacks.
