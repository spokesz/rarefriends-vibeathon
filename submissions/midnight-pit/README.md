# Midnight Pit

## Project name

Midnight Pit

## Builder / contact

Steven Reynolds · [X @Sharpbigred](https://x.com/Sharpbigred) · [stevereynolds2006-ship-it](https://github.com/stevereynolds2006-ship-it)

## Category

Economy Potential

## What did you build?

A night-market chance game. Your Rare Friend stands the pit. You spend 1 simulated $RAREFRIENDS to deploy a seal, a weighted roll lands one of six asset types, and you sell that asset back to a fixed RF book or keep it on the Friend.

## How does it use Rare Friends?

The selected Generations NFT is the pit boss. Its canonical pixels are shown, and the simulated ledger, inventory, and redemptions belong to that Friend. $RAREFRIENDS is the only market quote: every asset has a book price, a chance in basis points, and a redemption with no expiry.

## Source code

[github.com/stevereynolds2006-ship-it/midnight-pit](https://github.com/stevereynolds2006-ship-it/midnight-pit/tree/9b752ef3547c482c30096377cb1eed6f965449f1) · FriendSDK v0.1.4

Node.js 22+. A browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet (chain 4663).

```bash
git clone https://github.com/stevereynolds2006-ship-it/midnight-pit.git
cd midnight-pit
npm ci
npm run dev
```

Open the printed URL (normally `http://127.0.0.1:4173`). Connect your wallet and select your Friend. No RF funding is required. There is no deployment file, so the economy stays simulated.

`npm run check` validates the odds table.

## Playable demo

[https://stevereynolds2006-ship-it.github.io/midnight-pit/](https://stevereynolds2006-ship-it.github.io/midnight-pit/)

Open that link in MetaMask's browser. The pit fills the screen. Balances, items, and outcomes are simulated. Nothing is signed beyond connecting the wallet and choosing a Friend you own.

## How do you play?

1. Read the market. Six asset types are already quoted in RF.
2. Press **Deploy seal** or the D key. It costs 1 RF and reserves up to 10 RF until the roll settles.
3. The crack is only a reveal. The outcome was already committed.
4. **Sell to market** to redeem the book value, or **Keep on Friend**. Kept assets do not expire.
5. Open **Desk** to mute, reduce motion, or turn off shake.

Touch and keyboard both work. Sell from the quote row after you have kept an asset. In MetaMask's browser the pit fills the screen, and the market scrolls inside it.

## Costs and rewards

**All balances, purchases, and rewards are simulated.** One seal costs 1 RF. Weights total 10,000 basis points. Expected redemption is 0.893 RF, so the pit keeps about 0.107 RF per seal if you always sell.

| Asset | Chance | Book |
| --- | ---: | ---: |
| Ash Chip | 42% | 0.15 RF |
| Alley Rumor | 25% | 0.40 RF |
| Brass Marker | 18% | 1.00 RF |
| Velvet Badge | 10% | 2.50 RF |
| Oracle Lens | 4% | 5.00 RF |
| Genesis Spark | 1% | 10.00 RF |

A purchase reserves the 10 RF maximum until that seal settles. Kept rewards stay reserved until you sell them. New seals pause when free backing cannot cover the next maximum prize.

## What have you tested?

`npx friendsdk check ./games/midnight-pit` passed on FriendSDK v0.1.4: expected reward 0.893 RF, maximum prize 10 RF. `npx friendsdk build` produced the static preview. On a 390 × 844 phone screen the host frame fills the viewport, and the Pages URL loads the wallet gate. A real-wallet playthrough is still outstanding. Desktop and mobile smoke of the earlier development desk covered deploy, reveal, and sell on the simulated book. Those checks are not in this SDK package.

## Known limitations

The preview ledger resets when the runtime session ends. Wallet connect discovers an owned Friend. It does not spend live RF or request Dice. There is no secondary order book, creator fee, or cosmetic slot beyond keeping the asset on the Friend. The signed-in session leaderboard from the development desk is not part of this SDK host. Official mainnet publication still needs a reviewed deployment.

## Credits

Chance rules, the preview ledger, sound cues, and Generations pixel decoding are FriendSDK v0.1.4. Asset glyphs are original drawings for this game. See [NOTICE.md](https://github.com/stevereynolds2006-ship-it/midnight-pit/blob/9b752ef3547c482c30096377cb1eed6f965449f1/NOTICE.md).
