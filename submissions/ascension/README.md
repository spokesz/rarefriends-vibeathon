# Rare Friends: Ascension

Your Friend works an orbital station, and every component it fabricates forces one irreversible choice: cash it out, ascend with it, or wear it.

**Category:** Economy Potential · **SDK:** FriendSDK v0.1.2

**Builder:** Deez (GitHub: [@phillipppppp](https://github.com/phillipppppp)) · **Contact:** X [@deeznuts_ron](https://x.com/deeznuts_ron) · Telegram [@deeznuts_ron](https://t.me/deeznuts_ron)

[**Playable preview**](https://phillipppppp.github.io/rarefriends-ascension/) · [Source code](https://github.com/phillipppppp/rarefriends-ascension) · [Full documentation](https://github.com/phillipppppp/rarefriends-ascension#readme)

The SDK's reference game is a pure chance loop: buy, roll, redeem, repeat. The player never makes a decision. Ascension keeps that loop and adds the one decision the SDK genuinely allows — rewards sit in inventory at fixed value and redeeming is optional, so **what you do with a component matters more than what you rolled.**

## Run it

Node.js 22+ and a browser wallet holding a hardwired Generations NFT (generation ≥ 1) on Robinhood mainnet (4663). Windows works natively; WSL2 is not required.

```sh
git clone https://github.com/spokesz/friendsdk.git
cd friendsdk && npm ci
# copy game/ from the source repo into friendsdk/games/ascension/
npm run dev:game -- games/ascension
```

Or just open the [playable preview](https://phillipppppp.github.io/rarefriends-ascension/) — no setup needed.

## Play

| | Keyboard | Touch |
|---|---|---|
| Move | WASD or arrow keys | Tap the ground |
| Enter a station | Press **E** when near | Tap the station |
| Close a panel | **Esc**, one layer at a time | The **X** on the panel |
| How to Play | **?** in the HUD | **?** in the HUD |

A **How to Play** card opens on load, before anything else: four lines covering the loop and the redeem / commit / keep choice, naming taps on a phone and keys on a desktop. It closes with **Got it**, the **X** or **Escape**, and the **?** in the HUD reopens it. An on-screen objective always names the next useful action.

Stations have no floating label over the world: the SDK prompt is sized in CSS pixels while the world canvas scales down, so at phone width an enabled prompt made about a third of the play area untappable, and tapping is the only way to walk on a phone. Proximity is detected from the live Friend position and the action lives in the HUD instead. Verified at 390px and 960px.

| Station | What it does |
|---|---|
| **Fabricator** | Buy a Cell for 1 RF |
| **Assembler** | Burn a Cell, fabricate a component |
| **The Core** | Commit components to ascend your Friend |
| **Outfitter** | Buy wearables with salvage |

Every fabricated component goes to exactly one of three places — **redeem** it for RF, **commit** it to the Core for ascension charge, or keep it as **salvage** for wearables. You cannot do two with the same component, so rank, wealth and appearance compete for the same scarce resource.

**Reaching Ascendant takes roughly 45 RF of fabrication.** To see the endgame in a short session, use **Settings → Show me Ascendant**. It is labelled SHOWCASE in the HUD because it is granted rather than earned, and **Clear showcase** reverses it.

## Rules and rewards

**All balances, purchases and rewards are simulated.** Start with 20 RF. One Cell costs 1 RF and produces one component.

| Component | Chance | Redemption value |
|---|---:|---:|
| Slag | 15% | 0 RF |
| Plating | 25% | 0.20 RF |
| Coil | 25% | 0.50 RF |
| Servo | 20% | 1.125 RF |
| Optic | 10% | 2.50 RF |
| Reactor | 5% | 5 RF |

Expected reward **0.90 RF per Cell — a 10.00% house edge**, matching both shipped SDK examples. The top prize is deliberately 5 RF rather than 10: every purchase reserves the maximum prize as backing, so halving it halves the stake lock and roughly doubles what a funded game can sell.

**Three sinks, two of them chosen by the player:** the house edge, committing (redemption value permanently forgone), and salvage spent on wearables. The token leaves circulation because someone wanted something, not because a fee took it.

**Rank cannot simply be bought.** Charge alone would be purchasable, so every rank past the first also gates on rare components (3 Optic and 2 Reactor for Ascendant — 10% and 5% drops, unbuyable at any price), a minimum number of commits, diminishing yield per rank, anti-dump commit fatigue, and a 20 RF lifetime cap per Friend. A simulation over 400 runs per profile shows a whale with 1000 RF spends about 50 and then stops: twenty times the money buys no additional rank, only the same single Ascendant Friend. Going further requires owning more NFTs.

The selected NFT is the character, not a portrait: its token id seeds a chassis line, a five-tier aura builds as it ranks up, and wearables are drawn onto the sprite itself.

## Checks, credits and limitations

**Fourteen suites, all passing:** typecheck, `friendsdk check`, `friendsdk test`, save-code units, and seven end-to-end suites driven through the real sandboxed runtime — the full loop, forced miss and jackpot outcomes, click-spam race safety, showcase mode, the objective, a randomised invariant fuzz test — plus keyboard, contrast, control, tap, Escape and How to Play audits. UI suites run at both 390px and 960px.

**Escape** closes only the topmost layer and does nothing when nothing is open; it leaves the SDK's own purchase confirmation alone, since that dialog belongs to the host, and every panel keeps its own close control so touch is never left without a way out. All are in [`tools/`](https://github.com/phillipppppp/rarefriends-ascension/tree/main/tools) and runnable. Automated checks use the SDK fixture identity, so the game has additionally been played end to end with a real browser wallet and a hardwired Generations NFT on Robinhood mainnet (4663): the Friend is discovered and selected, the ownership gate passes, and buying, fabricating and committing all work.

Known limitations, in full: held components do not survive a reload, since the SDK's preview ledger is in memory — rank and wearables do, via a checksummed save code bound to the token id, which is tamper-evident but not tamper-proof. Ascendant is out of reach in a single demo session by design, hence the showcase. **The game does not load inside MetaMask's in-app mobile browser**; the SDK renders games in `<iframe sandbox="allow-scripts">` and the bridge handshake does not complete there, though it works in both Chromium and WebKit at desktop and phone viewports, so it is that app's webview rather than the engine, and it affects every FriendSDK game equally. Desktop with a browser-extension wallet works.

**The burn is simulated.** The SDK exposes no burn action, so committing is implemented as permanently forgoing redemption, tracked in game state; on-chain this is intended as a real burn and is documented for Rare Friends review. Ascension rank and wearables are local and are not written to chain. Wallet connection, NFT ownership verification and Friend selection are handled entirely by the SDK runtime and are not reimplemented in game code. The 20 RF starting balance is the SDK host's demo allowance, not an economic assumption. World scenery, character sprites and the sound kit are the SDK's; game design, economy, world layout, component art, wearables and the ascension system are original to this submission. No live economy, trading or creator fees are included, and Token Activity metrics are not claimed. Production publication would need separate Rare Friends review.
