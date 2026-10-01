# Rare Potty

## Project

- **Builder:** Barry Toren ([@FlobioBroker](https://github.com/FlobioBroker))
- **Primary category:** Character Spotlight
- **Also relevant:** Token Activity, Economy Potential
- **One-sentence concept:** Every Friend has to go—send your selected Friend into a filthy stall, flush, and reveal a ridiculous collectible outcome with a chance at simulated RF rewards.
- **Source repository:** https://github.com/FlobioBroker/rare-potty
- **Playable public preview:** https://rare-potty.bbtntwrk.chatgpt.site
- **FriendSDK version:** v0.1.2

## How to play

1. Tap or click **ENTER**.
2. Connect a wallet.
3. Choose an eligible Friend NFT.
4. Buy a **Potty Pass for 2 RF** (simulated—no on-chain transaction).
5. Choose one of three stalls.
6. Watch the Friend enter and reveal an outcome.
7. Tap **FLUSH AGAIN** to replay, or open **BAG** to view discoveries.

The **SOUND** and **MUSIC** controls can independently mute effects and the looping theme song.

## Rules and economy

Each run costs a simulated **2 RF** Potty Pass. The current prototype uses one shared outcome table for all three stall choices:

| Outcome | Probability | Simulated RF reward |
|---|---:|---:|
| Suspicious Smell | 36% | 0 RF |
| Plunger Hat | 24% | 0 RF |
| Toilet Paper Mummy | 17% | 0 RF |
| Tiny Toilet Companion | 11% | 0 RF |
| Golden Turd | 7% | 1 RF |
| Mutant Friend | 4% | 2 RF |
| Portal to the Sewerverse | 1% | 5 RF |

All costs and rewards are clearly labeled as a prototype simulation. No real token transfer occurs.

## FriendSDK usage

Rare Potty uses FriendSDK for wallet connection, eligible Friend selection, the Friend-based game flow, frame UI, audio hooks, and the game manifest/runtime contract.

## Checks performed

- `npx friendsdk check games/rare-potty` passes.
- Wallet connection and Friend selection were manually exercised during development.
- The full interactive loop was tested and the door-closing sequence was corrected to use the supported FriendSDK action sound.
- The public preview is deployed and accessible without an account.

## Known issues / prototype limits

- RF spending and rewards are simulated rather than on-chain.
- The three stalls currently share the same probability table.
- Session discoveries reset when the game is reloaded.
- An eligible Rare Friends NFT is required for the full wallet/Friend flow.
- Automated Playwright smoke testing was unavailable in the build environment; FriendSDK validation and manual testing were used instead.

## Credits

- Built by Barry Toren.
- Friend characters and wallet/Friend flow are provided through FriendSDK.
- Theme music supplied by the builder.
- Background artwork created for this project.
