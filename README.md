# Friend Arena

- **Project name:** Friend Arena
- **Builder / contact:** [@JojoCE1177](https://x.com/JojoCE1177) · [Vladdtest/friends-arena](https://github.com/Vladdtest/friends-arena)
- **Category:** Token Activity
- **SDK:** FriendSDK v0.1

## What did you build?

A 1v1 garden arena where your Rare Friend buys a ticket, fights a same-generation rival over several hits, and every ticket is a simulated $RAREFRIENDS spend that the UI splits into burn + active-weight rewards.

## How does it use Rare Friends?

You play as your own hardwired Generations NFT. The SDK verifies the wallet and Friend. The original walking sprite is the fighter; the rival is the same canonical art, mirrored, matched by generation and nearby tier/weight.

## Source

https://github.com/Vladdtest/friends-arena · FriendSDK v0.1

## Playable demo / how to run

No hosted demo. Node.js 22+:

```sh
git clone https://github.com/spokesz/friendsdk.git
cd friendsdk
git clone https://github.com/Vladdtest/friends-arena.git games/friend-arena
npm ci
npm run dev:game -- games/friend-arena


Requires a browser wallet on Robinhood mainnet (4663) holding a hardwired Generations NFT, generation 1 or higher. Purchases stay simulated.
How do you play?
WASD / arrows / tap to walk. Buy a ticket at the booth. Start a fight at the pit. Watch the 1v1, then redeem a prize from the locker. Settings include mute and reduced motion.
Costs and rewards
Everything is simulated and labelled.

Ticket: 1 RF
Sweep 10% / 2.0 RF, Victory 25% / 1.8 RF, Narrow Win 15% / 1.6 RF, Defeat 50% / 0 RF
Expected prize: 0.89 RF
Story pool: 2 RF (player + simulated rival) → 1 RF burn + 1 RF to active-weight rewards
Paid randomness is the table above. Weight only chooses a same-gen rival and the hit script.

Known limitations
Preview ledgers reset on reload. No live burns. Production publication needs a separate Rare Friends review.
Credits
FriendSDK runtime, garden world, menus, chance-game ledger, sounds and canonical Generations sprites.
