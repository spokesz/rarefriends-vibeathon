**Project name**
Rarefriend Outlaw

**Builder / contact**
Alley Cat · [@alleycat-dev](https://github.com/alleycat-dev)

**Category**
Economy Potential

**What did you build?**
A Western bounty-hunter game: your Rare Friend buys a Bounty Hunter licence with RF, rides out across a 9 × 9 open country to hunt twelve crypto-scam outlaws (from the Rugpuller to The Liquidator), and hacks each one's hardware wallet in a twelve-level puzzle game for OP, keepsakes, program cards and seed words, while the licence's RF payout comes from the SDK's chance game.

**How does it use Rare Friends?**
You play as your own Generations NFT, drawn from its original character artwork: it walks and rides Trojan Horses through the country, wears the keepsakes it wins, and its trophies and title carry over between hunts. Connect your wallet and choose your Friend to enter the game. The economy is built around RF: the licence is the game's one SDK consumable, and everything earned in play (OP, keepsakes, seed words, trophies) is designed as a layered in-game economy paired with RF, simulated for this preview.

**Source code**
[GitHub repository](https://github.com/alleycat-dev/friendsdk/tree/75e913d129c2c3df93c03a72aaa63fd688784479/games/rarefriend-outlaw) · FriendSDK v0.1.4 (the game is `games/rarefriend-outlaw/` in a fork of FriendSDK; the SDK itself is unchanged)

**Playable demo / how to run**
**Preview:** https://alleycat-dev.github.io/friendsdk/

You'll need a browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet. No RF funding or transaction signature is needed: the preview only asks to connect. MetaMask may flag the brand-new preview address as possibly malicious; it is on none of the public blocklists we checked, and the preview build contains no transfer, approval or signing code, so only approve the connection.

To run it locally with Node.js 22+:

```sh
git clone https://github.com/alleycat-dev/friendsdk.git
cd friendsdk
git checkout 75e913d129c2c3df93c03a72aaa63fd688784479
npm ci
npm run dev:game -- games/rarefriend-outlaw
```

Open the printed URL.

**How do you play?**
Buy a licence in the licence office to start a run: a Laser Gun and some OP. Walk with WASD, arrow keys or tap, or click a spot on the minimap; Space fires the gun or swings what you hold, Q switches it, R dismounts, I opens the inventory, M the map (touch screens get small Use, Switch and Dismount buttons, and tap and hold sells or discards a program). The friendly locals' arrows and the wanted sign by the Centralised Exchange point you to the current outlaw. Shoot them down, impound their hardware wallet and crack it on a puzzle board: flip tiles from the USB port to the Secure Chip, beat its defenders, avoid attackers and the Virus, and use programs, before the trace fills. Every outlaw adds a twist (Rug Pull, Pig Butchering, Exit Scam, Front-Running, Sandwich Attack, Margin Call and more). A run lasts until The Liquidator's wallet is settled (a failed hack never ends it), and you can retire any time. Settle your licence at the Data Center: the seed words you recovered go into the Seed Phrase Lock for OP, a head start, trophies and titles (all twelve open the Cold Wallet), and a Wheel of Fortune spins to reveal the licence's RF payout. Spaghetti-Western sound effects, a voice for every animal and four music tracks (walking, riding, an outlaw near, hacking) are all synthesized in code; Settings has Sound on and Music on switches and volume sliders. The in-game **Game Rules** and the hacking game's **?** page explain everything.

**Costs and rewards**
Everything is simulated. You start with 20 RF; the Bounty Hunter licence costs 20 RF (100 RF is planned for a live version, with every reward multiplied by five) and pays out once, when the run ends: Empty 0 (50%), Dust 10 RF (30%), Coins 20 RF (13%), Stack 60 RF (5%), Cache 200 RF (1.5%), Vault 1,000 RF (0.45%), Jackpot 2,000 RF (0.05%), 17.1 RF on average (85.5%). One licence is one run and always pays out exactly once; kept rewards have no redemption expiry. OP, reloads, horses, keepsakes, program cards, The Vault, seed words, trophies and the Cold Wallet are in-game only and pay no RF.

**Economy potential:** the current SDK bridge offers a single consumable at one price, so the licence is the only thing sold for RF. With a modified or extended SDK that supports more items and prices, the game is ready to sell many more assets and cosmetics for RF: Trojan Horses (including the Shiny Golden one), laser reloads, the keepsake cosmetics (hats, masks, capes, off-hand items and pets), program cards and gas vouchers, and extra hunts or licence tiers. Cosmetics and upgrades without an RF redemption promise need no prize reserve, and keepsakes are already designed to be minted into the Friend's wallet. [Full rules, odds and item costs](https://github.com/alleycat-dev/friendsdk/blob/75e913d129c2c3df93c03a72aaa63fd688784479/games/rarefriend-outlaw/README.md#economy-and-inventory-simulated) · [keepsake drop odds](https://github.com/alleycat-dev/friendsdk/blob/75e913d129c2c3df93c03a72aaa63fd688784479/games/rarefriend-outlaw/KEEPSAKES.md).

**What have you tested?**
On FriendSDK v0.1.4: SDK tests (116 pass, 2 optional contract tests skipped), SDK typecheck, game validation for every game, all 16 browser checks, the game's own typecheck and its automated browser fixture pass, and the preview build validates. The hosted preview loads without errors up to the wallet gate. Browser checks use test wallets and simulated RPC responses. A real-wallet playthrough of the hosted preview passes: the owner's wallet on Robinhood mainnet connects, the SDK's ownership check loads the owned Friend, and a licence bought with simulated RF carried several hunts and wallet hacks. The ending (The Liquidator and settling the licence) was played on an earlier build, not on this final commit. The latest updates (the settlement show, new hacking-game sounds and music, a rebalanced OP economy, walking by clicking the minimap, a starter horse and clearer guides) passed the same automated checks and were playtested in the local preview, including the ending; they have not yet been replayed with a real wallet.

**Known limitations**
Progress resets when the page reloads (an unused licence, or one waiting to reveal its payout, is recovered). Minting keepsakes to the Friend's wallet is a selection screen only. The licence costs 20 RF rather than the planned 100 RF so it fits the SDK preview wallet. For a live version, the SDK bridge's single consumable at one price means OP, reloads, horses and loot stay simulated, and a run would need saving outside game memory. No live token spending, trading, wearable NFTs or creator fees are included.

**Credits**
Game by Alley Cat (lead developer), built with Claude Code (Anthropic). All game art is drawn in code for this game; the world terrain, props and the canonical Friend artwork come from FriendSDK. No third-party assets.
