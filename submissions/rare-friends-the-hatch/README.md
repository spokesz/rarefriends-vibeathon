# Rare Friends: The Hatch

**Builder:** Jamie Cristian A. Mejia (JC) / GitHub: @potatolover-69  
**Categories:** Character Spotlight · Token Activity · Economy Potential  
**FriendSDK:** v0.1.2

## One sentence

**Rare Friends: The Hatch** is a psychological social-deduction survival-horror game where your selected Rare Friend must secure a haunted Garden, survive a hidden Mimic, repair unpredictable sabotage, and use a simulated $RAREFRIENDS utility economy to make it to dawn.

## Links

- **Source repository:** https://github.com/potatolover-69/rare-friends-the-hatch
- **Playable preview:** https://rare-friends-the-hatch.jamiecrypto0000.workers.dev/
- **Rare Friend used by the builder:** Generations Friend #334137
- **Network:** Robinhood mainnet (chain ID 4663)

## Rare Friends integration

The game uses **FriendSDK v0.1.2** for wallet/Friend selection and preserves the selected Friend's canonical character artwork. The selected Friend becomes the playable Keeper inside a large scrolling Garden world. The builder's Friend #334137 inspired the game's Mask, Garden and Hatch presentation.

The game targets all three Vibeathon categories:

- **Character Spotlight:** the player's selected Generations NFT is the main playable character and remains visible throughout the experience.
- **Token Activity:** the MVP includes a clearly simulated RF utility shop for optional survival consumables.
- **Economy Potential:** flashlights, batteries, UV scans, flares and wards create repeatable utility sinks around the survival loop. Rewards and spending are simulated for the MVP; no real tokens are transferred or burned.

## How to play

Connect a wallet that holds a qualifying Rare Friends Generations NFT (generation 1+) on Robinhood mainnet, select a Friend, and start the night.

Move with **WASD / arrow keys** or touch controls. Use **E** to interact with stations, **F** to toggle the flashlight, **R** to report a body, **M** for the map and **G** for the simulated RF shop.

Your main objective is to secure all **6 Garden stations before the 06:00 round clock expires**. Each station has an interactive puzzle. One of five AI Keepers is secretly the Mimic. It can kill isolated Keepers and sabotage stations. Power failures can recur without advance warning, making the flashlight useful throughout the round.

When a body is found, report it to begin a meeting. Compare Keeper statements, route/timing information, sabotage logs and your own observations, then vote for the suspected Mimic. Exposing the Mimic stops its attacks, but completing all six stations is sufficient to survive the night.

## Simulated RF economy

All RF purchases/rewards are **MVP simulations only**.

| Item | Simulated cost | Units | Rule |
| --- | ---: | ---: | --- |
| Field Flashlight | 0.10 RF | 1 | Reusable light body with one full charge |
| Battery Pack | 0.20 RF | 2 | Single-use full flashlight recharge |
| UV Trace Scanner | 0.20 RF | 2 | Single-use meeting scan |
| Emergency Flare | 0.30 RF | 3 | Single-use emergency light |
| Containment Ward | 0.20 RF | 2 | Single-use containment seal |

A successful run displays a simulated reward of approximately **0.10–0.12 RF**. The design intentionally allows utility spending to exceed a single-run reward, creating potential recurring token utility without making purchases mandatory to win.

FriendSDK's configured MVP consumable is **Ward Charge**, priced at 0.10 RF-equivalent SDK units. It has a deterministic simulated Ward Ash outcome. No live real-money/token transaction is claimed.

## Horror / gameplay features

The Garden contains six distinct task areas, randomized puzzle targets, AI Keeper routes, body reporting, testimony and voting, recurring sabotage, blackouts, a battery-limited flashlight, streetlight flicker, audio cues, map warnings, reduced-motion support, keyboard/touch controls, settings and multiple horror presentation effects.

The practice lobby currently uses AI Keepers rather than networked multiplayer. Mimic behavior, meetings and the economy are part of the playable MVP.

## Setup and run

Requirements: Node.js 22+.

```bash
git clone https://github.com/potatolover-69/rare-friends-the-hatch.git
cd rare-friends-the-hatch
npm install
npm run build
npm run check
npm run dev
```

The FriendSDK preview is built from the `game/` directory into `dist/`.

## Checks

The project has a GitHub Actions **Verify game** workflow that installs dependencies, builds the FriendSDK preview and runs FriendSDK validation. Recent gameplay commits have passed this verification workflow.

The game is designed for FriendSDK's **960 × 640** viewport with a larger scrolling Canvas world and includes keyboard/touch input, mute/settings controls and reduced-motion support.

## Known issues / limitations

- This is an MVP practice lobby with AI Keepers; it does not provide real-time multiplayer.
- RF purchases, burns and rewards are simulated and clearly presented as MVP economy mechanics.
- A qualifying Generations NFT and supported Robinhood mainnet wallet are required by the FriendSDK ownership gate.
- The public Cloudflare preview can temporarily lag the latest source commit while a hosting build is queued; the source repository contains the latest game revision.
- Browser autoplay restrictions may require the player's first interaction before music/SFX begin.

## Third-party audio credits

Third-party audio credits and license notes are documented in the source repository's `AUDIO_LICENSES.md`. The main music is **Ominous Horror Game Background — JorisVermeer**, used under the Pixabay Content License. Additional sound effects and their source/credit information are listed in that file.

## Notes for judges

The core interaction is fully playable as a short survival-horror/social-deduction loop: select your Rare Friend, enter the Garden, solve station puzzles, react to sabotage and blackouts, investigate the Mimic, use optional simulated RF utilities, and survive by securing all six stations before dawn.
