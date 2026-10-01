# Rareton

Walk your Rare Friend around a cosy pixel village and the Whispering Woods beyond it. Chat with villagers, grow rare flowers from RF seed packets and make 16 × 16 pixel-art gifts, stamped in RF, for any other Rare Friend by number. Days turn to firefly-lit nights, rain showers pass through, and an original 8-bit waltz plays along.

**Builder:** [@gmmillar82](https://github.com/gmmillar82) · Telegram @bombadil888 · **Category:** Character Spotlight (also relevant to Economy Potential) · **SDK:** FriendSDK v0.1.4

Your own Generations NFT is the main character. Its canonical on-chain sprite walks the village, and every gift you address shows the recipient Friend's sprite, read live from the public artwork registry. [Source code](https://github.com/gmmillar82/rareton/tree/1d07ce898c71f487c8d7e3b642bf7bb05c561bb6) · [Game rules](https://github.com/gmmillar82/rareton/blob/1d07ce898c71f487c8d7e3b642bf7bb05c561bb6/games/rareton/README.md)

## Play

**Live preview:** https://gmmillar82.github.io/rareton/

You need a browser wallet on **Robinhood mainnet (4663)** holding a hardwired Rare Friends Generations NFT (generation ≥ 1). The SDK runtime connects the wallet and verifies ownership with a read-only check. There are no signatures, transactions or RF funding. **On mobile**, open the game inside MetaMask's in-app browser ([MetaMask link](https://metamask.app.link/dapp/gmmillar82.github.io/rareton/)); regular mobile browsers have no wallet.

**Controls:** WASD / arrow keys, or tap/click where to go. Press **E**, or tap a building, flower or villager (your Friend walks over), to interact. **Satchel** shows your items, simulated RF balance and sent gifts. **Settings** has sound effects and music (both off by default), reduced motion, and day/night and weather toggles.

**Rules:**
- Pick daisies, tulips, bluebells, poppies and sunflowers in the east meadow, by the pond and near cottages. Each regrows 25 seconds after picking. Starbells (night only) grow in the woods.
- Bramble's Bakery gives free honey buns (you can carry up to 3). The wishing well gives one daisy.
- Five villagers chat, and three of them give you gifts. At dusk they go home; at night you knock on their doors (E or tap) and chat through the door, with different night-time lines. The post office stays open.
- A village day lasts four minutes. At night the lamps glow, windows light up and fireflies come out. You can turn the cycle off in Settings.
- **Whispering Woods** lie west of the village, past the signpost: a winding path, mushrooms, Fern's hut and a glade of standing stones. **Starbells** grow in the stone circle and can only be picked at night, when they glow.
- **Village life:** ducks on the pond (asleep at night), butterflies over the meadow, birds that flutter off when you walk up, and a ginger cat napping on a doorstep. You can pet her. Rain showers pass every few minutes and leave puddles, and bunting is strung from the square's lamps to the well.
- **Music:** an original 8-bit soundtrack composed for Rareton and synthesised live with Web Audio (no recordings or third-party music). A wistful 3/4 waltz by day crossfades into a music-box lullaby at night.
- At the **Seed stall**, buy a seed packet (1 RF), then open the **community garden**. The screen fades into a detailed garden vista: perspective fields running to the mountains, a windmill village, a 3D planter, and your Friend and Sparkle in straw hats. Plant a packet and they water it, a bud grows (sometimes the cat dashes past), then press **Bloom!** to open it. The flower is already decided by the SDK when you plant; the button only chooses when it's revealed. Rare blooms get golden rays, and a moonflower turns the sky to starlit twilight. It blooms into one of six garden-only flowers with fixed RF values. Keep them for bouquets or sell them back at the stall.
- At the **Post Office**, make a bouquet (1–3 flowers), a letter (6 messages) or a honey bun parcel. Type any Friend number, preview their sprite and your gift art, then press **Stamp & send**. Each gift needs a 0.1 RF stamp. Garden flowers in a bouquet carry their RF value to the recipient.

Each gift is a 16 × 16 one-bit bitmap in the same format as Friend walking sprites, packed into a single uint256 "gift code". Letters carry a stamp derived from the recipient's number, so each is unique to its recipient.

## Costs and rewards

**Everything is simulated.** The SDK preview ledger gives each Friend 20 simulated RF. Nothing is minted or sent on-chain, and there are no transactions, signatures or real fees. The in-game "SIMULATED · RF" stamp, the stall and post office notices and each gift card label this.

**Seed packets** use the SDK chance-game client (buy → plant → bloom → sell), with runtime confirmations for each action. One packet costs 1 RF and grows exactly one flower:

| Garden flower | Chance | Sell value |
|---|---:|---:|
| Clover | 40% | 0.25 RF |
| Rose | 25% | 0.75 RF |
| Lily | 20% | 1 RF |
| Orchid | 10% | 1.5 RF |
| Golden sunflower | 4.5% | 4 RF |
| Moonflower | 0.5% | 20 RF |

- Expected value is 0.9175 RF per packet.
- Each packet reserves the 20 RF maximum prize, and kept flowers stay backed with no expiry.
- Meadow flowers, honey buns and letters are free and have no RF value.

**Postage stamps:** each gift costs 0.1 RF. Half (0.05 RF) is burned and half goes to a village post fund. The notice board shows RF burned this visit. Stamps are tracked locally on top of the SDK ledger (the bridge has no burn API), so the runtime's Friend wallet panel doesn't include them; the in-game balance does.

**On-chain path (for review with the Rare Friends team):**
- A stamp contract would burn RF, which drives Token Activity.
- Gifts are already on-chain-shaped: a uint256 bitmap plus from/to Friend IDs. They could mint as small NFTs to the recipient Friend's canonical wallet, carrying any RF-backed garden flowers, so gifting moves real value between Friends (Economy Potential).
- Seed packets map directly onto the existing chance-game contract.

## Run from source

Node.js 22+ on Linux or Ubuntu/WSL2:

```sh
git clone https://github.com/gmmillar82/rareton.git
cd rareton
git checkout 1d07ce898c71f487c8d7e3b642bf7bb05c561bb6
npm ci
npm run dev
```

Open `http://localhost:4173`. The FriendSDK v0.1.4 release archive is included in the repo. `npm run build:pages` produces the hosted build.

## Checks

All pass:
- TypeScript typecheck (`npx tsc -p .`)
- `friendsdk check` game validation and `friendsdk build`
- `friendsdk test` automated browser smoke checks at 960 px and 360 px
- A scripted walkthrough at 960 px and 360 px (`node scripts/smoke.mjs`): switch the music on and off, walk to the post office, address a letter (with a live artwork lookup), stamp and send it, walk to the seed stall, buy a packet, open the garden vista, plant it, press Bloom!, check the bloom and satchel, then walk west into the Whispering Woods
- A night-time check: knock on Bramble's door and chat through it

The automated checks use the SDK's mock wallet and RPC. A real-wallet playthrough on the hosted preview passed on desktop (MetaMask extension) and mobile (MetaMask in-app browser). It covered gifting, stamps, buying and planting seed packets (including the garden vista), day/night, the woods, weather, music and knocking on doors at night.

`npm run build:pages && node scripts/check-pages-build.mjs` plays the exact files deployed to GitHub Pages with the mock wallet. Pages asset links carry a `?v=<commit>` version so browsers never mix cached files from different deploys. Before this fix, a stale cached runtime could block seed purchases after an update.

**FriendSDK v0.1.4:** Rareton is built with v0.1.4. Its preview bundle contains no live-transaction code: no RF transfers, approvals, signing or contract writes. That is the fix for MetaMask's "drainer" classification of vibeathon preview hosts. It also includes v0.1.3's Friend-discovery fix for the public RPC's 10,000,000-block `eth_getLogs` limit. Verified with the live RPC and a real wallet on the redeployed build. MetaMask's hostname classification may still show a warning until MetaMask rescans the domain.

## Known limitations

- Progress resets on reload, because the SDK sandbox has no storage.
- Recipient Friend numbers aren't verified: any number shows its registry artwork, even if not minted.
- Mobile requires a wallet's in-app browser.
- Stamp spending isn't shown in the runtime's Friend wallet panel (see above).
- No live minting, trading, wearable NFTs or creator fees.

## Credits

Friend sprites are canonical Rare Friends artwork, used under the FriendSDK NOTICE. Player and recipient sprites are read live. The villagers use Friends #21, #77, #3, #150 and #88, baked in from the public registry, with invented names and dialogue. Sound effects come from the FriendSDK sound kit. The music is original, composed for Rareton and synthesised in code. The village, woods, garden vista, animals, flowers and gift art are original pixel art drawn in code.
