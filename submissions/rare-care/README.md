# Rare Care

Your Generations NFT lives in a family-colored Tamagotchi. The shell, the voice, and the care rules all come from that Friend.

**Builder / contact:** [Jasmin2108](https://github.com/Jasmin2108)

**Category:** Character Spotlight
**SDK:** FriendSDK v0.1.2

**What did you build?**
Your Generations NFT lives in a family-colored Tamagotchi: the shell, the voice, and the care rules all come from that Friend. You feed, play and rest it with simulated $RAREFRIENDS. A happy Friend idles better, and its wallet jar drips. Skeleton hoards. Mask hides its needs. Colossus barely feels a snack.

**How does it use Rare Friends?**
The SDK runtime connects the wallet and verifies a hardwired Generations NFT (generation ≥ 1). The official on-chain 16×16 sprite is the character. Shell color comes from family (or token id). Care spends the SDK Care Snack consumable. A protocol desk reads on-chain generation and uses official hardwire / promote / upgrade tables for a labeled preview of bag, claimable RF + WETH, and token buys.

**Source code**
https://github.com/Jasmin2108/rare-care

**Playable demo / how to run**
https://Jasmin2108.github.io/rare-care-preview/

No-wallet family gallery (shell, voice, trait for all 9 families):
https://Jasmin2108.github.io/rare-care-preview/families.html

Players still need a hardwired Generations NFT on Robinhood mainnet (4663). Economy stays simulated.

## How do you play?

- The opening card names this Friend's family, shell, and trait. It is not a random color.
- Tap the bowl / toy / bed, the A B C buttons, or keys `1/F`, `2/P`, `3/R`. A Mask hides its need bars until you tap the shell.
- Hunger, Mood and Energy decay while idle. All three ≥ 70% starts **Collecting**. Any need < 20% makes the Friend sad, dims the screen and pauses collecting.
- `H` Matt's Hats (2 RF, local cosmetic). `C` Shell Paint (3 RF, session lock). `G` or **Earn** opens the protocol desk.
- Settings: mute and reduced motion.

Family trait (care rates, not just color):

| Family | Trait | What it changes |
| --- | --- | --- |
| Skeleton | Hoard | Jar drips 1.7×. Play barely raises mood. |
| Mask | Veil | Need bars stay hidden until the shell is tapped. |
| Family | Home | Every care lands warmer. Needs fall slower. |
| Cellular | Specimen | Feed is the strong action. |
| Asymmetry | Split | Play swings mood hardest. |
| Hoverer | Drift | Energy falls slowly. Rest is the right care. |
| Colossus | Stone | Hunger falls slowly, but a snack is a crumb. |
| Sparkling | Shine | A happy jar drips faster. |
| Hollow | Void | Energy drains. Rest is the only real fill. |

## Costs and rewards

**All preview balances, snacks, cosmetics, bag swaps and claims are simulated.**

Care Snack is 1 RF via `buy` + `play` + `settle`. Expected prize **0.3625 RF**. Maximum prize **1.2 RF**. Care is a net sink.

Hats (2 RF) and shell paint (3 RF) are local cosmetics and do not change on-chain art. Protocol desk reads on-chain generation and uses the official hardwire / promote / upgrade tables as a labeled preview.

## Checks and known issues

- `friendsdk check games/rare-care` passed (valid definition, expected reward 0.3625 RF, max 1.2 RF).
- Automated Playwright / real-wallet browser suite was not run in this checkout.
- SDK iframe has no `localStorage`; needs, hat, paint, bag and claimable persist in memory for the session.
- Token Activity is not claimed. No live RF is spent or burned by the preview.
- Artwork: official Friend sprites via FriendSDK `createFriendReader`. Room and shell are original CSS/canvas. Sounds: FriendSDK sound kit.

Official Rare Friends production publication needs a separate review.
