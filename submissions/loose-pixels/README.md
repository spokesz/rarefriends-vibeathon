# Loose Pixels

![Loose Pixels — live gameplay](https://raw.githubusercontent.com/floflo777/pixel-life/main/docs/media/loose-pixels.gif)

**Builder:** [@floflo777](https://github.com/floflo777) · **Categories:** Character Spotlight · Token Activity · Economy Potential

**Your Rare Friend's own 16×16 on-chain pixels are its health.** Every hit knocks a pixel off; grab it back or it becomes a scar. Scars heal over time, or $RAREFRIENDS regrows them. All of it happens inside **The Sky**, a Club Penguin-like island where Friends meet and play.

### ▶ Play: https://loose-pixels.florent-g.workers.dev
- **No wallet needed:** "Play now" lends you a real Friend in about 1 second.
- **Your own Friend:** a Robinhood Chain wallet with a Generations NFT (gen ≥ 1). FriendSDK checks ownership, then your scars, Bits and home isle are saved.

Source: https://github.com/floflo777/pixel-life · Tag [`submission`](https://github.com/floflo777/pixel-life/tree/submission) marks the state at the deadline.

## The Sky: 5 venues on one island
| Venue | In one line |
|---|---|
| **Loose Pixels** (flagship) | Drag back, release, fling your Friend into the Munchies. Bites knock real pixels off, and you have 2 s to sweep them back. Old Gulp the cloud-whale eats part of the island. |
| **Bump Sumo** | Your Friend vs 3 Friends on a shrinking ring. The fewer pixels you have left, the farther you fly. |
| **Pixel Putt** | 9-hole mini-golf where your Friend is the ball. |
| **Handheld Arcade** | Loose Pixels on a 1-bit 128×128 screen, with the same runs and leaderboard. |
| **Seed Pack Booth** | A stock FriendSDK chance game. The rare prize is a **Gold Pixel**. |

You can also walk around, emote, visit other Friends' home isles, and mend strangers. Stamps and Fling Belts show your progress.

## Where the RF goes (simulated in this MVP)
| Action | Price | Split |
|---|---|---|
| Regrow your Friend | 0.5 RF / pixel | 50% burned · 50% to all active Friends (`ActivationManager.fund`) |
| Mend another Friend | 1 RF / pixel | 50% burned · 50% **into that Friend's own ERC-6551 wallet** |
| Seed Pack | 5 RF | Published odds, EV 4.48 RF (89.6%). Gold Pixel: wear it (+25% free regrowth, visible gold) or redeem it |
| Gold Pixel market | 5% fee | 2% burned · 2% to the Friend that grew it · 1% creator |

- **Bits** are the soft currency. You earn them by playing, and they buy decor and hats. They never convert to RF.
- No RF is minted, and no RF moves from a loser to a winner.
- **Live-ready:** `PixelLifeSink` and `GoldPixelMarket` (Foundry) use `RF.burn`, `ActivationManager.fund` and Friend wallets. Tested on a local mainnet fork, not deployed.

## How it's built
- **Game:** TypeScript + three.js. Each Friend is its on-chain sprite rendered as voxels. The deterministic sim is shared by the browser and the server, which replays every run.
- **FriendSDK v0.1.4:** wallet, ownership gate, sprites and the Seed Pack venue (`friendsdk check` / `test` pass). One small documented patch keeps Seed Pack results across reloads.
- **Backend:** Node, Fastify, WebSockets and PostgreSQL, served through a Cloudflare Worker.

## Checks
| Check | Result |
|---|---|
| Unit and integration tests (`npm run check`) | 1,094 pass |
| Server tests on real PostgreSQL | pass |
| Sim determinism: 240 recorded runs replayed in Chromium, WebKit and Firefox | identical hashes |
| Contracts (`forge test`) | 22 pass |
| FriendSDK check and test, 360 and 960 px | pass |
| Live deploy smoke: page, API, WebSocket, origin lockdown | pass |

**Known limits:**
- Mainnet RF is not wired, by design (all RF is labelled SIMULATED).
- Hub signs can be cropped at small widths.
- Guest mode runs outside the SDK runtime; we'll switch it off if the organizers prefer.

**Credits:** Rare Friends artwork via FriendSDK (Apache-2.0) · Kenney 1-Bit Pack (CC0) · Silkscreen font (OFL).
