# Friendstune

**Category:** Character Spotlight

**What it is:** Connect your wallet, pick a Rare Friend you own, and hear it.
Every tune is generated live from that Friend's real on-chain data, not a
recording and not random: the same Friend always produces the same tune, and
a different Friend produces a genuinely different one.

**Stack:** Custom (not built on FriendSDK's GameHost). The on-chain Friend
discovery mechanism (owner-filtered Transfer log queries, reconciled against
a live balanceOf, then re-verified per token) is directly informed by
FriendSDK's own `readOwnedFriends`, credited here under its Apache-2.0
license. No SDK UI, wallet handling, and the trait-to-music engine are our own.

**Live demo:** https://friendstune.vercel.app

**Wallet and network:** Robinhood Chain mainnet (4663). You need to own at
least one Genesis or Generations Friend to hear its tune; ownership is
verified live on-chain, not cached, and nothing is signed or spent.

**How it works:**
1. Connect a wallet holding a Genesis or Generations Friend.
2. Pick one from your auto-listed Friends, or enter a token ID directly.
3. Watch the scan reveal its real traits: collection, generation, family (when
   the contract exposes it), activation tier, and state.
4. Each trait maps to a musical parameter: family shapes the instrument
   voice, generation shapes how many layers play, activation tier shapes
   tempo, and state shapes major/minor mode. The token ID itself seeds the
   melody.
5. Play it, download it as a WAV, or export a shareable visual tune card.

**Known issues:** The richer trait reads (family, activation tier, state)
depend on whichever functions a given contract actually exposes; when one
isn't available, the engine falls back to a deterministic hash of the
Friend's collection and token ID instead, so it never breaks, just uses
less of that Friend's specific data.

**Credits:** Rare Friends on-chain artwork. FriendSDK (Apache-2.0) for the
Friend-discovery approach referenced above.
