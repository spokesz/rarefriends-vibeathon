![Rare Friends Pass: your Friend, in your wallet](https://raw.githubusercontent.com/Halldon-Inc/rare-friends-pass/master/docs/media/home.png)

# Rare Friends Pass

**Your Friend, in your wallet.**

Every activated Rare Friend gets an Apple Wallet and Google Wallet pass with its own on-chain art on the front and its live rewards on the card. You claim and withdraw from the pass, and you only visit the website once.

- **Live:** https://rare-friends-pass.vercel.app
- **See a pass without a wallet:** https://rare-friends-pass.vercel.app/f/genesis-292 (or enter any Genesis or Generations id on the home page)
- **Phones:** built for them. The pass lives in Apple Wallet or Google Wallet, and every page works at 390 px.

**Project**
Rare Friends Pass: Apple and Google Wallet passes for activated Genesis and Generations Friends, built on ERC-8426 (Wallet Pass Extension).

**Builder / contact**
Hunt &middot; GitHub [@huntclubhero](https://github.com/huntclubhero) &middot; wallet `huntclubhero.eth`

**Category**
Economy Potential

**One sentence**
Sign once and each activated Friend becomes a live wallet pass showing its art, claimable RF and WETH, pending rewards and backpack balances, with Claim and Withdraw buttons on the pass itself.

**Source**
[github.com/Halldon-Inc/rare-friends-pass](https://github.com/Halldon-Inc/rare-friends-pass) (Next.js 15, TypeScript, viem, passkit-generator, Google Wallet REST API).

```sh
git clone https://github.com/Halldon-Inc/rare-friends-pass && cd rare-friends-pass
npm install
cp .env.example .env.local   # Apple pass certificate, Google Wallet service account, secrets
npm run dev
```

**Wallet and network**
Previewing a pass needs nothing. Getting passes needs a wallet holding at least one **activated** Genesis or Generations Friend on Robinhood mainnet (chain 4663). Sign-in is one ERC-4361 message: free, no transaction, no approval.

| Genesis pass | Generations pass (the Friend's world) |
| --- | --- |
| ![Genesis pass](https://raw.githubusercontent.com/Halldon-Inc/rare-friends-pass/master/docs/media/pass-genesis.png) | ![Generations pass](https://raw.githubusercontent.com/Halldon-Inc/rare-friends-pass/master/docs/media/pass-generations.png) |

## How to use it

1. Open the site in a browser with your wallet (or in your wallet app's browser) and tap **Get my passes**. Sign the one message. It names every activated Friend you hold.
2. Tap **Add to Apple Wallet** or **Add to Google Wallet** on each Friend. On a computer, scan the QR code with your phone to open the same list there with no second signature.
3. The pass front shows **Claimable RF**, **Claimable WETH**, **Pending RF**, **Backpack RF** and **Backpack WETH**. The pass updates itself by push when the numbers move (a cron checks every 10 minutes and pushes on a change of about 2% or any balance change).
4. Flip the pass. **Claim** moves earned rewards into the Friend's backpack (its own ERC-6551 wallet) with **no signature**. **Withdraw** moves the backpack to your wallet with one wallet confirm per asset.

**RF costs:** none. The site charges nothing and burns nothing. Claim gas is paid by a relayer (see known issues). Withdraw costs normal Robinhood Chain gas.

## Why it is Economy Potential

Rewards that sit unseen on a website get claimed late or never. A wallet pass puts a Friend's earnings on the lock screen and one tap away, every day, without opening a dapp. More claims and withdrawals mean more RF moving through holders' hands, and every sale or swap of that RF pays the 5% hook fee back into Friend rewards.

It also brings a new standard to an existing collection. ERC-8426 lets an NFT resolve to its own wallet pass. Rare Friends predates it, so this site acts as the resolver. Every token has a manifest URI in the standard's gated configuration:

```
GET https://rare-friends-pass.vercel.app/wallet-pass/eip155/4663/<Genesis or Generations contract>/<tokenId>
```

Without proof it answers `401 proof_required`. With an ERC-4361 challenge signed by the current owner, it returns `{ formats: { apple, google }, updatedAt }`. Pass links are bound to the Friend's current owner and checked against a fresh `ownerOf` read each time, so selling a Friend kills every link the previous owner held.

The standard now has an open-source SDK (MIT), published on npm under `@erc8426`: contracts, a pass server, Apple and Google Wallet delivery, a client, React components and a conformance suite, at https://github.com/huntclubhero/erc8426-sdk. This site was built before the SDK and runs its own resolver on the same protocol. For Rare Friends it is the short path to native support: a future contract or registry that adds `passURI` can be checked with `npx @erc8426/conformance`, and any wallet or marketplace can offer Add to Wallet for a Friend with `@erc8426/client`.

**Design notes for the Rare Friends team:**
- Adding `passURI(tokenId)` to a future contract (or a registry) that points at this manifest would let any wallet app find a Friend's pass.
- The Friend wallet has no delegation hook. Adding one, in the style of Tokenbound V3's `setPermissions`, would let an owner approve a withdraw-to-owner-only executor, which would make Withdraw one tap as well.

## Checks and known issues

- **Verified on chain before building (2026-09-30):** `ActivationManager.claimBatch` is permissionless. A simulation from an unrelated address succeeds, and rewards can only go to the Friend's own wallet, so a relayer can claim for you safely. The Friend wallet (implementation `0xed038886c002b285eb0f74971e967b02f6af8ea5`) exposes only owner-only `execute`, `isValidSignature`, `owner` and `token`. That is why Withdraw needs the owner's confirm.
- **Production checks passed:** signed `.pkpass` issued for a Genesis and a Generations Friend; Google Wallet accepted the generic class and objects (images load); Apple web service register, list, refetch and unregister work, and a wrong token gets 401; the ERC-8426 manifest refuses unauthenticated calls with 401; the cron is authenticated and tracks installed passes; no horizontal overflow and no console errors at 390 px and 1440 px.
- **Claim relayer is not funded yet.** Until it is, tapping Claim returns the exact `claimBatch` call and the page sends it from any wallet you connect (a few cents of gas, rewards still land only in the Friend's backpack). Once funded, Claim needs no wallet at all.
- **Withdraw is one confirm per asset** (RF, WETH, ETH), because the Friend wallet has no batch call.
- On iPhone, a wallet app's built-in browser may not open Apple Wallet passes. The pass list shows an **Open in Safari** link, or you can scan the QR code from a computer.
- Pending uses rarefriends.com's own formula (this Friend's share of what is left in the week's reward streams) from their public `/api/protocol/snapshot`. USD figures are hidden whenever that route returns no prices.
- Passes are signed with the same Apple Pass Type ID certificate and Google Wallet issuer that power WALLETCHI.
- This is a community build, not an official Rare Friends product. It never holds keys: the relayer key pays gas and nothing else.
