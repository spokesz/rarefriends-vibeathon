# Oracle Fortune Reader — submission

Walk your Rare Friend to a violet oracle shrine, buy a fortune card, and keep or redeem the reading it deals you.

**Builder:** [lucymoran.eth](https://github.com/FOGcometh) (GitHub: [FOGcometh](https://github.com/FOGcometh)) · **Category:** Character Spotlight · **SDK:** FriendSDK v0.1.2

**Play it:** https://fogcometh.github.io/oracle-fortune-reader/ — needs a browser wallet holding a hardwired Rare Friends Generations NFT (generation ≥ 1) on Robinhood mainnet (4663). [Source code](https://github.com/FOGcometh/oracle-fortune-reader) · [Game rules](https://github.com/FOGcometh/oracle-fortune-reader/blob/main/games/oracle-fortune-reader/game.json) · [The deck](https://github.com/FOGcometh/oracle-fortune-reader/blob/main/games/oracle-fortune-reader/deck.ts)

## Run it

Use Node.js 22+ plus a browser wallet holding a Generations NFT (generation ≥ 1) on Robinhood mainnet (4663). This game ships as a game directory inside a FriendSDK checkout, so clone both and drop it in.

```sh
git clone https://github.com/spokesz/friendsdk.git
cd friendsdk && npm ci
git clone https://github.com/FOGcometh/oracle-fortune-reader.git /tmp/ofr
cp -r /tmp/ofr/games/oracle-fortune-reader games/
npx friendsdk dev games/oracle-fortune-reader
```

Open the printed URL (normally `http://localhost:4173`), connect a wallet, and select your Friend. The SDK verifies ownership before play. No RF funding or transaction signature is needed for this simulated preview. A hosted HTTPS preview is at the link above.

## Play

Walk with **WASD** or the **arrow keys**, or tap/click to move. Move to the **Oracle shrine** and activate its prompt, or press **E** beside it, then choose **Enter the shrine** to open a reading. **Esc** closes it; **Tab** reaches the controls from the keyboard. The reading offers **Keep this reading**, **Redeem the omen** and **Draw another**. Settings hold mute and a reduced-motion toggle; the HUD carries a sound button.

Everything stays inside the SDK frame: the 960 × 640 reference frame on desktop, and a 3:4 portrait frame under 700px wide so the shrine fills a phone screen instead of a third of it. The runtime's own frame size is themed through the game's `host.css`.

## Rules and rewards

**All balances, purchases and rewards are simulated.** The preview starts at 20 RF and 100 RF of simulated prize backing. One **Fortune Card** costs **1 RF** and produces exactly one reading.

| Reading | Chance | Redemption value |
|---|---:|---:|
| Whisper | 50% | 0.25 RF |
| Glimmer | 25% | 0.75 RF |
| Echo | 15% | 1 RF |
| Prophecy | 7% | 2 RF |
| Oracle's Eye | 3% | 10 RF |

Expected reward: **0.9025 RF per reading** (a 9.75% edge, matching the SDK's own fishing example). Each purchased card reserves the maximum 10 RF prize; kept readings retain their RF backing with no redemption expiry, and new purchases stop when backing is insufficient. Preview progress resets when the runtime session ends.

The displayed tier, chance and value always come from the settled client result — never from browser randomness. The reading's text is drawn from a deck of **72 hand-authored fortunes** (15 Whisper, 14 Glimmer, 15 Echo, 14 Prophecy, 14 Oracle's Eye) in a plain data file (`deck.ts`), selected deterministically from the settled outcome and the Friend's own traits, so extending the deck is a copy-and-paste edit. Nobody re-rolls a reading to match a tier, and no two are alike until the deck has been walked several times over.

## Checks, credits and limitations

Run against FriendSDK v0.1.2 (checkout `762d6f5`):

- `npx friendsdk build games/oracle-fortune-reader` — exit 0 (785,181-byte static build)
- `npx friendsdk check games/oracle-fortune-reader` — `valid; expected reward 902500000000000000; maximum 10000000000000000000 RF base units`
- `npx friendsdk test games/oracle-fortune-reader` — PASS at 960px, 390px and 360px
- `node --test games/oracle-fortune-reader/test/interaction.test.mjs` — 1 pass, 0 fail: it walks to the shrine, buys a card, plays it, settles it, and asserts the displayed tier matches the settled result and that the balance moves by exactly the tier's value

**Known limitations**

- The browser checks use the SDK's mocked wallet and RPC. The builder has played readings on a real wallet in a phone wallet browser against the public preview; anything beyond that is still an outstanding real-RPC playthrough, and no live transaction is claimed here.
- The phone portrait frame is a deliberate deviation from the 960 × 640 reference, chosen so a phone screen is filled rather than quarter-filled. Desktop keeps the 3:2 reference frame.
- There is no persistence: the sandbox has no `localStorage` and the bridge exposes no save API, so progress resets when the runtime session ends. Readings are not minted or stored anywhere.
- The runtime's own menus (Friend wallet, transaction confirmations) are left in the SDK's own styling on purpose — that UI has to stay unmistakable. Only the game's layer and the page behind the frame are themed.

**Credits:** original Rare Friends scenery, canonical character sprites and the SDK sound kit are used as provided by FriendSDK. The world renders in the SDK's monochrome mode; the shrine's violet palette, the 72 fortunes, and all game code are original to this submission. No third-party assets.

No trading, wearable NFTs, creator fees or live economy is included, and Token Activity metrics are not claimed. Production publication needs separate Rare Friends review.