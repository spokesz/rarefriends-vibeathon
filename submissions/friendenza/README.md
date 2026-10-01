# Friendenza

## Builder / contact

[@qrimeCapital](https://x.com/qrimeCapital) ·
[@crispylines](https://github.com/crispylines)

## Category

Economy Potential

## What did you build?

Friendenza turns an owned Rare Friends Genesis NFT into deterministic grayscale
pixel-flow art that its holder can preview and claim as a one-per-Friend NFT.

The generator combines the source token ID, metadata traits, and artwork tonal
profile into a versioned seed. Friendenza V4 uses parallel ribbons, waves,
curls, single and double vortices, radial fans, weaves, and meanders while
keeping every composition pixel-aligned and limited to eight grayscale tones.

## Where does the deterministic generation come from?

Friendenza does not use fresh randomness when someone clicks generate. It
sorts and canonicalizes the source metadata, including every trait name and
value, then hashes that data together with the Robinhood chain ID, Genesis
contract address, source token ID, and generator version. That produces the
token's canonical seed.

The generator separately hashes the sorted trait pairs and mixes that trait
digest into its seeded random stream. Traits therefore help select and shape
the composition family, direction, spacing, curvature, density, and other
parameters. The source artwork is also sampled into an eight-bin grayscale
histogram with mean and contrast values, so its tonal character influences the
result.

Because every random choice comes from those fixed inputs, the same Rare Friend
and generator version always produce the same SVG. A different token, trait
value, source image, or generator version changes the result. The canonical
seed, source metadata digest, and final SVG digest are recorded in the claimed
NFT metadata for verification.

## How does it use Rare Friends?

The connected wallet must currently own a Rare Friends Genesis NFT on Robinhood
mainnet. The selected Genesis token is the source and permanent identity of the
generated Friendenza. Ownership is checked when loading the Friend and checked
again by the claim contract during minting.

Friendenza is a custom Genesis art tool, so it does not use FriendSDK. FriendSDK
v0.1.2 targets hardwired Generations identities and its game runtime is not the
right ownership or interface model for this project.

## Source code and stack

- Source: [github.com/crispylines/friendenza](https://github.com/crispylines/friendenza)
- Stack: Next.js 16, React 19, TypeScript, wagmi/viem, Foundry, Sharp, and
  Pinata/IPFS
- Network: Robinhood mainnet, chain ID `4663`

The source repository includes setup instructions, contract tests, application
tests, browser journeys, guarded deployment tooling, and the production
runbook.

## Playable demo / requirements

Open [friendenza.com](https://friendenza.com) in a desktop or mobile browser
with an injected wallet such as MetaMask. The wallet must hold at least one
Rare Friends Genesis NFT on Robinhood mainnet.

Browsing owned Friends and generating previews are free and require no token
approval. Claiming is a real mainnet transaction and requires a small amount of
Robinhood ETH for network gas.

## How do you use it?

1. Connect the wallet that owns a Rare Friends Genesis NFT.
2. Select one of the wallet's Genesis tokens.
3. Choose **Generate Friendenza** and watch the source tones map into a
   deterministic composition.
4. Review the generated artwork before proceeding.
5. Choose **Claim Friendenza**, sign the free authentication message, and then
   confirm the separate mint transaction in the wallet.
6. View the claimed NFT through the explorer or a compatible marketplace.

Generating again from the same source data and generator version produces the
same artwork. Each Genesis token can claim only one Friendenza in the current
contract.

## Current costs and proposed economy

**This MVP does not spend or burn $RAREFRIENDS.** There is no mint price,
reward, random outcome, royalty, NFT approval, or RF approval. The holder pays
only Robinhood network gas for the final claim.

For a future live-economy version, the proposed claim cost is **100
$RAREFRIENDS burned per Friendenza**. Burning makes each claimed artwork a
permanent token sink tied to an existing Rare Friends holder action instead of
creating a payment stream for the builder. That model would require a new,
separately reviewed contract and an explicit RF approval/burn flow; it is not
active in this MVP.

## Contract and provenance

- Friendenza contract:
  [`0x5f025248a3e941B335B84E1e301bB05CAC145358`](https://robinhoodchain.blockscout.com/address/0x5f025248a3e941B335B84E1e301bB05CAC145358)
- Rare Friends Genesis source:
  [`0x116EaA62241751E0c98dA43d458600c6C17cD361`](https://robinhoodchain.blockscout.com/address/0x116EaA62241751E0c98dA43d458600c6C17cD361)
- Real-holder acceptance claim:
  [Friendenza #250 transaction](https://robinhoodchain.blockscout.com/tx/0xc95d0d5105fb29cbcd5ba2e1c74cf6c5b6a4c34c11b09d9e7ee415ec04584433)

The contract rechecks Genesis ownership and verifies a short-lived EIP-712
authorization binding the recipient, source token, metadata digest, IPFS URI,
and deadline. Claimed metadata records the source contract and token,
generator version, deterministic seed, source metadata digest, and SVG digest.
The acceptance claim's independently calculated metadata and SVG hashes match
their on-chain and IPFS records.

## What have you tested?

The production acceptance journey passed with a real Genesis holder: wallet
discovery, source-art resolution, V4 preview generation, claim authorization,
mainnet mint, ownership, duplicate-claim state, IPFS retrieval, digest
verification, and marketplace indexing.

Automated checks passed:

```sh
npm ci
npm test
npm run test:mainnet-tooling
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm audit
forge test --root contracts
```

Coverage includes deterministic and diverse generation, grayscale and pixel
constraints, metadata fallbacks, ownership verification, already-claimed
protection, wallet challenge integrity, authorization and IPFS binding,
responsive desktop/mobile journeys, duplicate claims, transferred-source
ownership, expired and invalid signatures, front-running, signer rotation,
and reentrancy. The latest application suite passes 34 tests; contract and
mainnet-tooling suites also pass, and `npm audit` reports zero vulnerabilities.

## Known limitations and risks

- WalletConnect and native deep links are not included; an injected browser
  wallet is required.
- Genesis discovery relies on Robinhood Blockscout. Source artwork uses guarded
  on-chain and public cached-media fallbacks because the collection's mutable
  renderer can differ from previously indexed artwork.
- Metadata and generated SVGs are pinned through Pinata/IPFS, so initial
  gateway retrieval depends on public IPFS infrastructure.
- Claims are real and irreversible. Users must verify Robinhood mainnet and
  review the final wallet transaction.
- The proposed 100 RF burn is a future economy design, not an active feature or
  cost in this submission.

## Credits

Rare Friends Genesis NFTs provide the holder-owned source identity, traits, and
artwork input. OpenSea's public cached media is used only as a guarded source
fallback when the collection's current renderer differs from its indexed art.
Pinata provides IPFS pinning. All Friendenza compositions and application code
are contained in the linked source repository.

Friendenza is an authorized Rare Friends community project, not the official
Rare Friends website.
