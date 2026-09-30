# Friend Dojo

- **Builder/contact:** Kayfabe_eth · https://x.com/kayfabe_eth · theyellowdemon666@gmail.com
- **Categories:** Character Spotlight; Token Activity
- **Source:** https://github.com/TheYellowDemon/frienddojo
- **Playable preview:** https://frienddojo.vercel.app
- **Stack:** FriendSDK v0.1.2

## What it is

Friend Dojo turns a selected Rare Friends Generations NFT into a trainable dojo fighter. Spend a capped daily Awake budget (T) on Intelligence, Strength, Agility, and Power, then enter an eight-rival arena ladder. The selected Friend remains the main character and its canonical Rare Friends artwork is used through FriendSDK.

## How to play

Connect a wallet that owns a Generations NFT (generation 1 or higher) on Robinhood mainnet (chain 4663), select the Friend, and open the game. The preview also includes a wallet-free demo mode for exploring the training and combat loop.

- Start with 100 T, capped at 100.
- Standard recovery is 5 T every 15 minutes; simulated RF supporter recovery is 5 T every 10 minutes.
- Train in batches of 1 or 5. Combat-stat reps cost 10 T; Intelligence study costs 10 T below 1,000, 20 T below 2,500, and 30 T below the 3,750 final cap.
- Intelligence improves combat training and XP. Every level above level 1 adds 2% to all training gains.
- Arena fights cost 10 T. Rivals range from level 1 Rookie to level 25 Dojo Legend; higher-level wins award more XP. Health starts at 90 HP and gains 2 HP per level. Strength affects defense and damage, not health.
- The separate Preview Clock tab advances simulated time by 15 minutes or 24 hours for testing. The Roadmap tab previews future asynchronous Friend-vs-Friend duels, replays, and optional RF wager rules.

## Simulated RF activity

This MVP never requests or moves real RF. It starts with 10,000 mock RF and offers clearly labeled previews:

- 620 mock RF for a one-day supporter pass (targeting about $1).
- 3,100 mock RF for a 30-day supporter pass (targeting about $5).
- A proposed refundable 10,000 RF character deposit to deter spam creation; character creation and deletion are not implemented.

These are tunable proposals, not live token economics. No RF payouts, real staking, burning, or developer-wallet routing are enabled. Future live contracts would require reviewed contracts, verified receipts, pricing safeguards, and supported persistence.

## Checks and known limits

Strict TypeScript, SDK validation, engine tests, frame bundling, and desktop/mobile browser interaction checks passed. The preview preserves the SDK ownership gate, wallet/Friend selection, canonical artwork, sandbox, touch/keyboard controls, reduced-motion option, and loading/error handling.

Progress, mock RF, memberships, and records are session-only and reset on reload or Friend change. Rivals are computer simulations, not other players. Durable saves, real RF integration, and competitive PvP remain future work. The SDK's required chance-game definition is retained as an unused compatibility definition; the game UI does not buy, play, or redeem it.

Third-party Rare Friends artwork is supplied through FriendSDK. SDK source is Apache-2.0; the source repository includes the applicable license and notice files.
