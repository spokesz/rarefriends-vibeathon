# Farfield

- **Builder/contact:** [b00ste](https://github.com/b00ste)
- **Category:** Character Spotlight / multiplayer strategy
- **Source:** [b00ste/farfield](https://github.com/b00ste/farfield)
- **Website:** [farfield.fun](https://farfield.fun)
- **X:** [@farfielddotfun](https://x.com/farfielddotfun)
- **Playable demo:** [Launch Farfield](https://farfield.fun/?submission=1)

Your Rare Friend leads a tetromino space station: build paths, assign workers, fight rival commanders and contest four shared monoliths.

## Play

Connect a wallet holding an eligible **hardwired Generations Friend, generation 1 or later**, on **Robinhood mainnet (chain 4663)**. FriendSDK verifies ownership and supplies the selected Friend's canonical artwork and animations. The Friend is your playable commander, with movement, work, construction, combat, healing, Shield and EMP abilities. Commander selection is optional before play; the full-screen collection lets you inspect and change Friends.

- **Online PvP → Find free match:** free automatic one-versus-one matchmaking. The second player starts the match; invite another tester if the queue is empty.
- **Friends & AI:** up to four commanders total, any mix of humans and Easy/Normal/Hard AI. Enter the sector, share the room code from Menu → Match & invitations, and begin once everyone joins. Each commander builds a separate station on one shared battlefield.
- **Win:** hold all four shared monoliths uncontested for 60 seconds, or be the last surviving core. Friends must walk there on completed paths; rival Friends/guards can contest ownership. Enemy bases remain hidden until explored.

The linked submission mode renders the game at **960×640 logical pixels**, scales uniformly and letterboxes to fit. The normal demo URL also offers a responsive full-window layout for phones and large monitors. Both use the same simulation. No installation is required.

## Controls

| Action | Keyboard / pointer / touch |
| --- | --- |
| Build | B or Build icon → block 1–7 / I,O,T,L,J,S,Z → building 1–8 → click/tap a connected tile |
| Adjust blueprint | R rotates; Backspace returns to blocks; Escape clears; touch buttons provide equivalents |
| Workers | W or worker icon; recruit, then +/− assign to jobs |
| Friend | Click/tap a room to work, completed flooring to move, or a visible enemy to attack; arrows also move |
| Abilities | Q Shield, E EMP; icon buttons on touch |
| Combat mode | Single-figure/group icons toggle Friend/free workers between Peaceful and Aggressive; assigned building staff stay at work |
| Camera | Drag to pan, wheel/pinch or +/− to zoom; center button returns to base |
| Settings | Menu: sound, reduced motion, dock location, instructions, invitations and forfeit |

Buildings cost alloy, workers cost alloy and food, and abilities spend energy. Unfinished cancellation refunds 100%; completed dismantling removes its tiles and refunds 75%. Your units walk clear automatically before removal, and a connected route to your core must remain. Enemy-destroyed buildings leave walkable wreckage and refund nothing.

All playable matches are free. Alloy, food and energy are in-game simulation resources.

## Implementation and running locally

FriendSDK **v0.1.2**, RainbowKit/wagmi, React 19, TypeScript, Canvas 2D, and a server-authoritative Node simulation. Unmodified FriendSDK package provenance and third-party notices are included. The SDK iframe sandbox and identity bridge remain intact; a bounded host relay handles multiplayer and read-only canonical sprite requests. The backend filters fog of war and validates costs, construction, paths, combat and results.

Node 22.18+ (24 recommended):

```sh
npm ci
npm run dev
```

Open `http://localhost:4173/?submission=1`. This needs a Node backend; static hosting alone is insufficient. `npm test`, `npm run typecheck`, `npm run check` and `npm run build` provide the core checks. The repository documents browser tests and runtime settings.

## Validation and known limitations

See the source repository's `docs/LIVE-PLAYTEST.md` for live four-session evidence and `docs/VALIDATION.md` for the broader regression history. Browser tests emulate wallets and canonical NFT RPC responses while using the real game server; they do not impersonate real assets in the deployed app. Physical iOS/Android wallet handoff and gameplay remain unverified.

The original live browser runs exercised four-player construction, shared capture, contesting, combat and an agreed winner. A subsequent seven-minute run reached 237 buildings / 256 workers but exposed development-proxy HTTP 429 responses on sync polling; earlier error summaries did not fully count those responses. The client now receives persistent authenticated server events. The replacement seven-minute streaming run passed with 230 buildings / 256 workers / 486 commands and zero game, page or HTTP errors. Container build/restart recovery also passed in hosted CI. See `docs/PLAYTEST-2026-09-21.md`; larger public capacity remains unverified.

Early access: heuristic AI and human balance need more playtesting. The preview now enables private practice-room snapshots and same-tab seat recovery after wallet/Friend revalidation. Crashes can lose changes since the last successful checkpoint, normally about five seconds. Closing the tab or switching devices does not preserve a practice seat. Online absence beyond 60 seconds can forfeit even while opponents are backgrounded. The public beta runs on dedicated AWS resources with a single authoritative server; automatic failover is not yet available.

## Credits

FriendSDK, canonical Rare Friends art and sound kit: [spokesz/friendsdk](https://github.com/spokesz/friendsdk), with notices preserved. Farfield's station graphics, monoliths, UI and gameplay code are original. rymdkapsel is genre inspiration; no assets or code were copied. Fonts are system monospace and Georgia. RainbowKit and dependencies retain their package licenses.
