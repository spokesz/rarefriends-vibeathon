# FriendForge Gacha

A mobile-friendly gacha / capsule-opening experience for the Rare Friends Vibeathon, built for FriendSDK v0.1.2.

## Concept

Your selected Rare Friend becomes the identity of a futuristic capsule lab. Open simulated capsules to reveal one of five Friend rarities, then inspect your session collection and redeem simulated RF value where applicable.

The game deliberately keeps the economy simulated for the prototype, while using FriendSDK for wallet connection, eligible Friend selection, ownership verification, the game session, inventory and fixed chance-game actions.

## Controls

- Desktop: tap/click buttons; no keyboard movement required.
- Phone: all primary actions are tap-sized and responsive.
- SDK wallet/Friend controls remain in the trusted runtime.

## Exact prototype rules

- SDK: FriendSDK v0.1.2
- Consumable: Capsule
- Price: 1 RF (simulated)
- One capsule reveals exactly one weighted outcome.
- Common Friend: 55.00% — simulated value 0.10 RF
- Uncommon Friend: 28.00% — simulated value 0.50 RF
- Rare Friend: 12.00% — simulated value 1.00 RF
- Epic Friend: 4.50% — simulated value 2.00 RF
- Mythic Friend: 0.50% — simulated value 5.00 RF
- Outcomes total 100%.
- Rewards/balances are simulated in preview and reset when the runtime session reloads.
- No private key, signer or custom contract is used by the game.

## Run from the FriendSDK checkout

Node.js 22+ is required.

```bash
npm ci
npm run build
npm run dev:game --
```

Then open the displayed local URL, normally `http://localhost:4173`.

For phone testing on the same Wi-Fi network:

```bash
npm run dev:game -- --host 0.0.0.0 --port 4173
```

Open `http://YOUR-COMPUTER-LAN-IP:4173` on the phone. The phone browser must have access to the wallet/runtime requirements described by FriendSDK.

## Validation

```bash
npx friendsdk check .
npx friendsdk test . --screenshot ./artifacts/gacha.png --width 360
```

## Preview build

```bash
npx friendsdk build .
```

The generated static preview is in `.friendsdk/` and can be published on GitHub Pages for the Vibeathon submission.

## Submission notes

- Include a public playable preview URL in the submission README/PR.
- Include this source, assets and run instructions.
- State the SDK version and exact economy rules above.
- Label the economy as simulated.
- Explain any future RF-backed/on-chain version separately; this prototype does not deploy contracts.

## Playable preview

https://mellow-caramel-02eadf.netlify.app
