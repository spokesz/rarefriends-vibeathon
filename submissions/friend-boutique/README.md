**Project name**
Friend Boutique

**Builder / contact**
zemagma · @0xjohnb

**Category**
Economy Potential

**What did you build?**
A dress-up gacha game: walk your Rare Friend to a Boutique counter, buy Gift Boxes with RF, open them at a Vanity mirror to reveal one of 8 accessories, then keep, wear (shown on your Friend's real canonical portrait as a corner badge), or redeem each one for its fixed RF value at a walkable Closet.

**How does it use Rare Friends?**
You play as your own Generations NFT, using its original character artwork. The reveal and closet screens render your actual Friend — via the SDK's own sprite reader, unmodified — not a placeholder.

**Source code**
[GitHub repository](https://github.com/zemagma/friend-boutique) · FriendSDK v0.1.2

**Playable demo / how to run**
Hosted preview: https://friend-boutique.vercel.app

To run locally, with Node.js 22+ installed:
```
git clone https://github.com/zemagma/friend-boutique.git
cd friend-boutique
npm ci
npm run dev:game -- games/friend-boutique
```
Open the printed URL. You'll need a browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet. No RF funding or transaction signature is needed for the preview.

**How do you play?**
Move with WASD, arrow keys, or click/tap. Buy Gift Boxes (1 RF each, quantity 1–99) at the **Boutique counter**. Open one at the **Vanity mirror** to reveal an accessory. From the **Closet** (also walkable, plus a HUD shortcut), wear an accessory for display or redeem it back to RF.

**Costs and rewards**
Everything is simulated. Each Gift Box costs 1 RF. Outcomes range from an Empty Box (0 RF, 15% chance) to a Golden Crown (10 RF, 2% chance), with an average return of 0.90 RF per box — the same proven odds/value shape as the SDK's reference fishing example, retargeted to a dress-up theme. Kept accessories have no redemption expiry. [Full odds table](https://github.com/zemagma/friend-boutique/blob/main/games/friend-boutique/README.md).

**What have you tested?**
Build, typecheck, and game/economy validation (`check:games`) all pass. The SDK's own browser check suite passes for the reference examples on this setup; the CLI's per-game headless test (`friendsdk test`) currently hits an unrelated Node 23 vs. Playwright compatibility bug in the SDK's CLI wrapper (reproduces identically on the unmodified `examples/starter`, confirmed not specific to this game). Extensively playtested manually, including the hosted Vercel build, across buy/open/wear/redeem/closet flows.

**Known limitations**
No wearable-NFT API exists in FriendSDK v0.1, so "wearing" an accessory is local UI state shown as a corner badge next to the real Friend portrait, not an on-chain trait or a change to the Friend's actual sprite. No live token spending, trading, or creator fees are included; progress resets when the preview session ends.

**Credits**
Built with FriendSDK's starter example, world presets, sprite reader and sound kit. All accessory icons and the world's Boutique counter/Vanity mirror/Closet layout are original for this submission, using the SDK's fixed prop-shape catalog.
DRAFT
Output

**Project name**
Friend Boutique

**Builder / contact**
zemagma · @0xjohnb

**Category**
Economy Potential

**What did you build?**
A dress-up gacha game: walk your Rare Friend to a Boutique counter, buy Gift Boxes with RF, open them at a Vanity mirror to reveal one of 8 accessories, then keep, wear (shown on your Friend's real canonical portrait as a corner badge), or redeem each one for its fixed RF value at a walkable Closet.

**How does it use Rare Friends?**
You play as your own Generations NFT, using its original character artwork. The reveal and closet screens render your actual Friend — via the SDK's own sprite reader, unmodified — not a placeholder.

**Source code**
[GitHub repository](https://github.com/zemagma/friend-boutique) · FriendSDK v0.1.2

**Playable demo / how to run**
Hosted preview: https://friend-boutique.vercel.app

To run locally, with Node.js 22+ installed:
```
git clone https://github.com/zemagma/friend-boutique.git
cd friend-boutique
npm ci
npm run dev:game -- games/friend-boutique
```
Open the printed URL. You'll need a browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet. No RF funding or transaction signature is needed for the preview.

**How do you play?**
Move with WASD, arrow keys, or click/tap. Buy Gift Boxes (1 RF each, quantity 1–99) at the **Boutique counter**. Open one at the **Vanity mirror** to reveal an accessory. From the **Closet** (also walkable, plus a HUD shortcut), wear an accessory for display or redeem it back to RF.

**Costs and rewards**
Everything is simulated. Each Gift Box costs 1 RF. Outcomes range from an Empty Box (0 RF, 15% chance) to a Golden Crown (10 RF, 2% chance), with an average return of 0.90 RF per box — the same proven odds/value shape as the SDK's reference fishing example, retargeted to a dress-up theme. Kept accessories have no redemption expiry. [Full odds table](https://github.com/zemagma/friend-boutique/blob/main/games/friend-boutique/README.md).

**What have you tested?**
Build, typecheck, and game/economy validation (`check:games`) all pass. The SDK's own browser check suite passes for the reference examples on this setup; the CLI's per-game headless test (`friendsdk test`) currently hits an unrelated Node 23 vs. Playwright compatibility bug in the SDK's CLI wrapper (reproduces identically on the unmodified `examples/starter`, confirmed not specific to this game). Extensively playtested manually, including the hosted Vercel build, across buy/open/wear/redeem/closet flows.

**Known limitations**
No wearable-NFT API exists in FriendSDK v0.1, so "wearing" an accessory is local UI state shown as a corner badge next to the real Friend portrait, not an on-chain trait or a change to the Friend's actual sprite. No live token spending, trading, or creator fees are included; progress resets when the preview session ends.

**Credits**
Built with FriendSDK's starter example, world presets, sprite reader and sound kit. All accessory icons and the world's Boutique counter/Vanity mirror/Closet layout are original for this submission, using the SDK's fixed prop-shape catalog.
