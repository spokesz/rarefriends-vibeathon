# Wallet A Desk

**Builder:** [Ramakrishna Bachu / @ramankrishna](https://github.com/ramankrishna) · **Category:** Economy Potential · **SDK:** FriendSDK v0.1.2

Your Rare Friend sits a simulated paper desk. A desk chip costs 1 RF, stamps a fill, and can be redeemed. The Friend on the desk is the selected Generations NFT, drawn from its original artwork.

## Source

[ramankrishna/wallet-a-desk](https://github.com/ramankrishna/wallet-a-desk)

FriendSDK v0.1.2. Node.js 22 or newer.

```sh
git clone https://github.com/ramankrishna/wallet-a-desk.git
cd wallet-a-desk
npm install
npm run dev
```

Open the printed URL. Connect a browser wallet on Robinhood mainnet (chain 4663) that holds a hardwired Generations NFT, generation 1 or higher. The SDK checks ownership before play. No RF funding and no signature are required.

## Playable preview

<https://ramankrishna.github.io/wallet-a-desk/>

Same wallet and network. Purchases and rewards are simulated. A computer uses the 960×640 frame. A narrow screen uses a taller frame so the desk still fits.

## How to play

The selected Friend is seated at the desk. Buy one desk chip and confirm it on the frame. Pick a name, then long or short. That spends the chip and stamps the fill. Close the ticket when you want. Book PnL stays in the session. Open Prints to redeem a stamp.

Keys, when the desk is focused: 1–6 or the arrow keys select a name, L long, S short, C close, B chip, P prints, Esc closes Prints. Sound starts off. Reduced motion is available under Prints.

## Costs and rewards

All balances, purchases, and rewards are simulated. One chip costs 1 RF (`1000000000000000000` base units). Ticket size is $200 at 3×. Book PnL is the price move times $200. It is not a transfer.

| Print | Chance | Redeem | Fill |
|---|---:|---:|---|
| Flat tape | 50% | 0.5 RF | slips 0.40% against you |
| Clean fill | 35% | 1 RF | at the mark |
| Rare print | 15% | 2 RF | slips 0.25% for you |

Expected reward is 0.9 RF. The top prize is 2 RF. A new chip needs free backing for that prize, and the prize stays reserved until the print is redeemed. An interrupted stamp finishes on the next long or short and does not spend a second chip. Reloading clears the preview.

The tape is generated in the desk. The game frame cannot call an exchange, so the marks are not live prices and no order is sent.

## Checks

`npx friendsdk check ./game` passed against FriendSDK v0.1.2. Expected reward `900000000000000000`. Maximum prize `2000000000000000000`.

Headless browser checks at 1100×800 and 390×844 passed the full loop: refuse a print with no chip, buy a chip, print a long, close it, and redeem. They also checked that the fixture Friend's canonical pixels are drawn. Those checks use the SDK test wallet and mocked reads.

The public preview URL returns the built desk. A playthrough with a real wallet is still outstanding.

## Known limitations

Progress resets when the preview session ends. There is no save. No trading key, live order, contract, or real RF transfer is included. Token Activity is not claimed, because the RF is simulated. Official Rare Friends publication needs a separate review.

## Credits

Canonical Generations artwork is read at runtime from the pinned registry and drawn without recoloring, cropping, or mirroring. Sounds are the FriendSDK sound kit. Desk layout and color are original. See [NOTICE.md](https://github.com/ramankrishna/wallet-a-desk/blob/main/NOTICE.md).
