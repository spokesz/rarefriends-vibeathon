# Friend Studio

Turn your Rare Friend into a one-of-a-kind PFP: mix traits, unlock rarer ones, or commission a 1/1.

**Builder / contact:** [@uphoricdesign](https://github.com/uphoricdesign) | https://x.com/u_phoric · **Category:** Character Spotlight · **SDK:** FriendSDK v0.1.2

Friend Studio makes your verified Generations NFT the main character of a pixel PFP studio: its original on-chain art
stays untouched while you layer 104 traits around and over it, every trait unlock burns 100% of its $RAREFRIENDS, and
1/1 artist commissions pay 70% to the artist and burn 30% (all simulated for this MVP).

[Source code](https://github.com/uphoricdesign/friend-studio) · [Playable preview](https://uphoricdesign.github.io/friend-studio/) · [Rules](https://github.com/uphoricdesign/friend-studio/blob/main/game/README.md)

![Friend Studio](https://github.com/uphoricdesign/friend-studio/raw/main/docs/studio.png)

## Run it

Use a browser wallet on **Robinhood mainnet (4663)** holding a hardwired Rare Friends Generations NFT (generation ≥ 1).
Open the [playable preview](https://uphoricdesign.github.io/friend-studio/), choose **Connect wallet**, then select your Friend; the SDK verifies ownership
before the Studio loads. On a phone, open the preview inside your wallet app's browser (the SDK supports injected
wallets). No RF, signature or transaction is needed.

To run locally with Node.js 22.18+:

```sh
git clone https://github.com/uphoricdesign/friend-studio.git
cd friend-studio
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`.

## Play

1. **Pick:** see your Friend's original on-chain artwork, family, generation, activation tier and perks.
2. **Mix:** tap traits in Backgrounds, Headwear, Accessories, Effects and Family to preview them on your Friend
   (unowned traits show a PREVIEW stamp). **Unlock** buys one; **Unlock look** buys every previewed trait at once.
   Randomize, Undo, Reset and Save are one tap. Keys: `R` `Z` `S` `E`, `1`–`5`.
3. **Export or commission:** export a real PNG (512/1024) or a looping GIF for animated looks, then long-press or
   right-click to save it. Or commission a 1/1 from U_phoric (@u_phoric on X): brief → escrow review → tracker →
   confirm delivery.

Everything stays inside the SDK's 960 × 640 frame, with touch, keyboard, mute, reduced motion, loading and error states.

## Rules and economy (all simulated and labelled)

| Tier | Price | RF at $0.0018 | Supply | RF flow |
| --- | --- | --- | --- | --- |
| Free | $0 | 0 | — | 6 backgrounds, 3 accessories; exports carry a small corner mark |
| Common | $1 | 555.56 | Unlimited | 100% burned |
| Rare | $10 | 5,555.56 | 500 each (#N/500) | 100% burned |
| Legendary (animated) | $100 | 55,555.56 | 25 each | 100% burned |
| 1/1 commission | $10,000 | 5,555,555.56 | One per artist, ever | Escrow → 70% artist, 30% burned on confirmed delivery; full refund if undelivered in 30 days (demo: 30 s) |

- Owned traits stay with the Friend that unlocked them, reusable in any combination.
- Perks: 2 family-exclusive traits for every family; Gen 1 gets a free gold background; activation tiers 1–4 unlock
  extra free background colours; rare families (Hoverer, Colossus, Sparkling, Hollow) claim one Legendary free.
- The demo wallet starts with 6,000,000 simulated RF. The app never creates RF. There are no random outcomes.
- The runtime requires a `game.json` chance-game definition; Friend Studio includes a one-line reference definition
  and never calls the chance-game buy/play/settle/redeem actions.

## Future features

- **Your look, on the NFT itself.** If the Rare Friends developers think it's a good idea, the custom art and trait
  mixes made in Friend Studio could be added to each NFT's official metadata, for example as an optional PFP and a
  list of equipped traits shown alongside the original on-chain artwork, which is never replaced. It would also add a
  new layer of rarity to the collection: Rare and Legendary traits are capped at 500 and 25 editions and each artist
  makes only one 1/1, so a Friend's look would carry that scarcity into its metadata, visible wherever the NFT is shown.
  This is a proposal for the team and isn't part of this MVP.
- **Real RF flows on chain:** a trait contract that burns RF on unlock and enforces edition caps and serials, with
  ownership bound to the Friend's token-bound wallet; an escrow contract for 1/1 commissions (deposit, delivery,
  player confirmation, 70/30 release, refund after the deadline).
- **Persistent saved looks** and owned traits, which the current SDK sandbox can't store.
- **More artists** and seasonal trait drops, and traits usable as wearables in other Rare Friends games.

## Checks, credits and limitations

`npm test` (20 unit tests: economy, escrow, perks, GIF encoder, art preservation, animation loops), `npm run typecheck`,
`npm run check:games` and `npm run build` pass. `npm run check:browser` passes on desktop and a 390 px phone: the real
SDK runtime and sandbox with a mocked wallet and mocked RPC (recorded public mainnet data), covering the ownership gate,
unlock + burn, runtime pause, PNG export, the free Legendary, the full 1/1 escrow, identity/network changes, and no game
for unowned, generation-0, owner-changed or RPC-error cases. The SDK's generic `npx friendsdk test` fails by design
because its fixture doesn't answer Friend Studio's extra public reads (`tokenURI`, registry `portrait`). GitHub Actions reruns the unit tests, typecheck, SDK validation and build on every push before deploying the preview. The browser checks use a mocked wallet, and the builder also tested it with a real wallet and an owned Friend on Robinhood mainnet: it works.

Credits: FriendSDK v0.1.2 and canonical Rare Friends Generations artwork; Pixelify Sans (SIL OFL 1.1). Traits, UI and
the GIF encoder are original. Limitations: state is per session (the sandbox has no storage); script downloads are
blocked in the sandbox, so exports are saved by long-press/right-click; the portrait-phone frame is small (landscape
is roomier); U_phoric's real samples replace the labelled placeholder art when supplied. No trading, wearable NFTs,
creator-fee contracts or live transactions are included; the README lists the contracts a production version needs.
Production publication needs separate Rare Friends review.
