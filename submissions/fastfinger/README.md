**Project name**
FastFinger

**Builder / contact**
Orshengnudor - [@0xmaniach](https://x.com/0xmaniach)

**Category**
Token Activity

**What did you build?**
A real-time multiplayer reaction game. Players stake $RAREFRIENDS into a match, react to targets for 60 seconds, and the highest score takes the pot, or in elimination mode, the top three split it. Every match permanently burns RF.

**How does it use Rare Friends?**
Every match is staked and paid out entirely in $RAREFRIENDS. A winner holding a hardwired Rare Friends Generations NFT (generation 1 or higher) receives a boosted payout, 92 percent of the pot instead of 90 percent. This is not built on FriendSDK; the real-money escrow and reaction-game mechanic needed a custom stack, which the rules explicitly allow for projects needing capabilities the SDK does not provide.

**Source code**
GitHub repository: https://github.com/Orshengnudor/fastfinger. Custom stack (React, Vite, Foundry/Solidity, Supabase), not FriendSDK.

**Playable demo / how to run**
Live and playable now: https://fastfinger.xyz. Practice mode needs no wallet at all. A real match needs a wallet holding $RAREFRIENDS and a small amount of Robinhood ETH for gas, on Robinhood Chain mainnet (chain ID 4663). No hardwired NFT is required just to try it.

**How do you play?**
Pick a tier (10 to 1,000 RF entry), create or join a match, and react to targets appearing on screen for 60 seconds. Normal targets score 1x, Fast targets 2x, Bonus targets 3x, Trap targets cost points if clicked. Quick hits earn Perfect, Good, or OK timing bonuses, and every 5-hit streak adds a combo multiplier. Highest score wins the pot (standard mode, 2 to 10 players), or the top 3 split it 60/25/15 (elimination mode, 5 to 10 players, a preliminary round narrows the field to a final head-to-head).

**Costs and rewards**
Nothing here is simulated. Every stake and every payout is real $RAREFRIENDS moved by two independently verified smart contracts on Robinhood Chain mainnet. Standard mode: winner takes 90 percent of the pot, 92 percent with a hardwired Friend; the remaining 10 percent (8 percent) currently burns in full. Elimination mode: top 3 split 90 percent of the pot, 60/25/15; the remaining 10 percent burns. Every match, regardless of outcome, permanently removes RF from circulation. Full worked tables for every tier: https://github.com/Orshengnudor/fastfinger#the-math-worked-through. Contracts: https://robinhoodchain.blockscout.com/address/0x290f7a0213523173e1FA8305FaCC06B10DE60094 and https://robinhoodchain.blockscout.com/address/0x9E9f0F208055cC59A1768bB03CFA633837159BB4.

**What have you tested?**
44 out of 44 Foundry tests pass across both contracts, including a 512-run fuzz test each. Both contracts have processed real stakes, real on-chain winner declarations, and real claims on mainnet, not only local test runs. Full frontend build passes clean.

**Known limitations**
No anti-bot protection yet on client-reported scores; contract payouts are unaffected either way, since only real match participants can ever be paid. No Genesis NFT tier yet. Elimination mode has no Friend bonus yet, a deliberate choice explained directly in that contract's own code comments. Full details: https://github.com/Orshengnudor/fastfinger#known-limitations-stated-plainly.

**Credits**
Smart contracts use OpenZeppelin's Ownable2Step, ReentrancyGuard, and SafeERC20. $RAREFRIENDS and Generations are Rare Friends' own contracts, referenced read-only, never modified.
