# The Rare Agency

- **Builder:** arithmos
- **Contact:** [@arithmos0x on X](https://x.com/arithmos0x) · `arithmosxtg` on Telegram
- **Category:** Character Spotlight, also entered for Economy Potential
- **Playable preview:** https://rareagency.rwplay.net
- **Source:** https://github.com/Arithmos111/rarefriends_spyvsspy
- **Stack:** TypeScript, React 19 and FriendSDK v0.1.2, with an authoritative WebSocket relay served from the game's own origin.

Up to four Rare Friends raid one embassy for four pieces of hidden intelligence, booby-trapping the furniture and doorways behind them and racing to escape through the courtyard gate — each spy drawn from its own Generations NFT's canonical artwork, each kitted out from a $RAREFRIENDS gadget crate.

**All RF is simulated. The preview needs no RF funding, signature or transaction — only a wallet that holds a hardwired Generations NFT.**

![Two Rare Friends face each other in the Ambassador's Study: an isometric embassy room with filing cabinets, a desk and wall portraits, a combat log down the left, the mission track and health bar across the top, and the search, trap and strike controls on the right.](https://raw.githubusercontent.com/Arithmos111/rarefriends_spyvsspy/38da0014fe4539e830af322e83359ec0372c4d75/docs/preview.png)

## Rare Friends integration

Your Friend is the spy, drawn from its own canonical on-chain sprites through the SDK's sprite reader at 5× integer scale in an 80 × 80 box, never rotated, stretched, smoothed, recoloured or regenerated. Every rival you walk in on is somebody else's Friend drawn the same way, so a room full of agents is a room full of real Generations NFTs. Colossus Friends use the SDK's horizontal fallback.

The gate is the SDK's verified Generations check exactly as shipped: a browser wallet holding a hardwired Generations NFT, generation 1 or higher, on **Robinhood mainnet, chain 4663**. Holding a Genesis NFT also carries an extra letter bomb into every match and badges the agent GENESIS, read from the Genesis contract over the same RPC. [Full rules and integration details](https://github.com/Arithmos111/rarefriends_spyvsspy/blob/38da0014fe4539e830af322e83359ec0372c4d75/games/rare-agency/README.md)

Matches are decided by an authoritative relay rather than by any player's browser. The sandbox permits `connect-src 'self'`, so that relay is a WebSocket on the SDK's own static server at the same origin, and the child document's Content-Security-Policy is untouched. One TypeScript simulation runs on both sides, and snapshots are scoped to the room you stand in, so a modified client cannot see items, traps or agents elsewhere. [Relay and hosting notes](https://github.com/Arithmos111/rarefriends_spyvsspy/blob/38da0014fe4539e830af322e83359ec0372c4d75/docs/DEPLOY.md)

## Run locally

With Node.js 22.18+ on Linux or Ubuntu/WSL2, and the same wallet as above:

```sh
git clone https://github.com/Arithmos111/rarefriends_spyvsspy.git
cd rarefriends_spyvsspy
git checkout 38da0014fe4539e830af322e83359ec0372c4d75
npm run setup
npm run dev
```

`npm run setup` fetches, builds and installs FriendSDK v0.1.2 at pinned commit `762d6f58a73ace723f7f82dc1a61bfa036c21edc`; the SDK is UNLICENSED, so it is fetched rather than vendored. Open the printed URL, connect your wallet and pick your Friend. `npm run dev` also prints a LAN URL, so a second device can join the same match. `Dockerfile`, `docker-compose.yml` and `Caddyfile` deploy the same build behind automatic TLS — how the preview above is hosted.

## How to play

- **Move** with WASD, the arrow keys, the on-screen stick, or by tapping a destination. **E** searches, picks up and escapes through the gate, whichever is in reach; **Space** strikes the way you are facing; **Q** opens the trap menu for whatever you are standing at, and **1**–**3** set a trap directly.
- **Nine rooms in a 3×3 block, and you see only the room you stand in**, so rivals are invisible until you walk in on them. Searching and traps are private the same way: a drawer a rival turned out still looks untouched to you, and only a trap detector reveals somebody else's rigging.
- **Four items** — documents, passport, bearer bonds, disguise kit — sit in four different rooms, always in that room's marked cache, so knowing a room is worth searching tells you where to run. A search takes 0.9s, or 0.55s with a lockpick.
- **Trap any untrapped furniture, or rig a doorway** — one opening shared by two rooms, so it fires on anyone crossing either way. Bombs and springs kill, a bucket freezes for 3 seconds, and your own traps are live against you.
- **Agents have 5 health.** A strike takes 1, or 2 with the stiletto — exactly one per match, a random drop that badges its carrier. Medkits restore 3, vests add 1 to the maximum, and dying drops everything you carry.
- **Carry all four items to the courtyard gate to win**, or hold the most intelligence when the 5-minute clock expires. Career standings, kept per Friend and persisted to disk, pay one point for playing and two more for winning.

Two ways in need no lobby and no second player: a **Training run** through every control in nine steps, and a **Demo match** against one to three computer agents — a real five-minute match, escape sequence and recap included, that never touches the standings. Difficulty changes how fast the opposition reacts and how much it remembers, never how hard it hits; it sees only the room it stands in and walks into your traps.

Everything stays inside the SDK's 960 × 640 container, with a custom isometric renderer within it since the embassy is nine rooms rather than one screen, and plays on keyboard and touch alike. Settings (≡) hold mute, music and reduced motion, and audio ships on; a connection dot tracks the relay, and artwork that fails to load says so with a retry.

## Simulated costs, probabilities and rewards

All balances, purchases and rewards are simulated by the SDK's preview client and labelled as such in the interface. No contract is deployed and no transaction is sent. RF uses 18-decimal bigint base units.

One **Gadget Crate** costs **1 RF** and opens into exactly one gadget kit:

| Kit | Chance | Redeems for | Contents |
|---|---:|---:|---|
| Standard Issue Kit | 60% | 0.5 RF | 2 bombs, 2 springs, 1 bucket |
| Demolition Kit | 25% | 1 RF | 4 bombs, 2 springs, 1 bucket |
| Counter-Intel Kit | 12% | 2 RF | 2 bombs, 2 springs, 2 buckets, detector |
| Ghost Kit | 2.5% | 3 RF | 3 bombs, 2 springs, 2 buckets, detector, lockpick |
| Director's Kit | 0.5% | 8 RF | 4 bombs, 3 springs, 3 buckets, detector, lockpick, disarm tool |

Weights total exactly **10,000 basis points** and the expected reward is **0.905 RF per crate**. Every crate reserves the maximum **8 RF** prize while it is unopened, kept kits retain their backing with no expiry, and purchases stop when free backing runs short rather than writing a cheque the reserve cannot cover.

**Consumable rules.** Opening a crate consumes it and draws one kit. Kits themselves are permanent: equipping one is free and unlimited, and playing never consumes one. Redeeming pays its fixed RF value and removes it, so every kit is a standing choice between loadout and cash — that tension is the intended economy rather than a grind. A free **Field Issue** kit (2 bombs, 1 spring) is never bought, drawn or consumed, so owning no kit never blocks play. Preview progress resets with the runtime session. [Validated game definition](https://github.com/Arithmos111/rarefriends_spyvsspy/blob/38da0014fe4539e830af322e83359ec0372c4d75/games/rare-agency/game.json)

## Checks and known limitations

`npm run check` runs typecheck, **102 simulation tests**, game validation and two browser checks, and **all of it passes**. The tests cover map generation, searching, traps, combat, power-ups, escaping, the clock, scoring, the fog of war, and step-for-step agreement between the client's prediction and the server; they also play whole matches out against the computer agents. Validation reports `games/rare-agency: valid`, 10,000 bps, 0.905 RF expected, 8 RF maximum. The browser check drives two real browsers through the SDK ownership gate, asserts the container bounds at desktop and phone widths, buys and opens a crate, walks the training run, and plays both a demo match and a live match in a shared lobby; a second check proves the reverse-proxy topology the preview runs behind.

Browser checks use the SDK's own identity fixture for mocked wallets and RPC. **A real-wallet playthrough has been done against the hosted preview**, which is how the wrong-network problem reported to the SDK team was found — since fixed upstream in v0.1.2.

**The relay cannot prove a player controls the Friend they claim.** It confirms the token exists and reads its owner over RPC, but the sandbox exposes no signer, so a determined client could claim someone else's Friend; career standings inherit that gap. An RPC outage blocks the SDK's picker for new players, though anyone already in a match keeps playing. Audio and motion preferences reset on reload, because the sandbox's opaque origin makes `localStorage` throw. A restart ends matches in progress, since match state lives in memory. [Full list](https://github.com/Arithmos111/rarefriends_spyvsspy/blob/38da0014fe4539e830af322e83359ec0372c4d75/games/rare-agency/README.md#known-issues-and-capability-gaps)

**What a live version would need, none of it ours to build.** Crate purchases and kit redemptions settled on-chain against deployed contracts — the odds, the reserve and the consumable rules are already the game's validated definition, so they transfer as they stand. A signature the sandbox does not expose, so the relay can prove who holds a Friend. And storage the sandboxed frame can reach, for settings that survive a reload. No trading, wearable NFTs, creator fees or live economy is included, and **Token Activity metrics are not claimed** — every RF figure above is simulated. Production publication needs separate Rare Friends review.

## Credits and licensing

**There are no third-party image, font or audio assets.** All embassy artwork is drawn procedurally on a canvas and all audio is synthesised at runtime with Web Audio; the SDK's own sound kit covers economy actions. Rare Friend sprites are the canonical on-chain artwork, read through the SDK and never altered.

FriendSDK is UNLICENSED, so it is fetched and built from its pinned commit by `npm run setup` rather than vendored into this repository. Everything else in the repository is the builder's own work and is offered for judging and for Rare Friends' review.
