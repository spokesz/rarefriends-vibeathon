# Rare Rush

**Small Friend. Big Rush.**

Rare Rush is a four-direction runner starring Rare Friends. Jump straight into Free Play with no wallet, bring your own Friend to Arcade, watch Autopilot, or run your own agent. Wallet-connected players can share replays and compare best runs. Its Arcade MVP has a simulated economy designed around a future $RAREFRIENDS pair; a separate Testnet demonstrates verified play-to-mint.

- **Builder:** XIBOT · [X](https://x.com/xavieriturralde) · [Telegram](https://t.me/xibot0x) · [Email](mailto:xiturralde@gmail.com).
- **Category:** Economy Potential; also relevant to Character Spotlight.
- **Source:** [github.com/xibot/rare-rush](https://github.com/xibot/rare-rush).
- **Stack:** TypeScript, React, SVG, Web Audio and FriendSDK v0.1.2. Testnet adds Solidity contracts and a server-side replay verifier. Generations Arcade uses SDK wallet connection with Rare Rush's paged Friend picker; Genesis, Agent Play and community pages use separate hosts and interfaces.
- **Entry:** [PR #22](https://github.com/spokesz/rarefriends-vibeathon/pull/22), originally submitted September 20, 2026; updated September 29, 2026. Organizer review remains pending.

## Start here

| Demo | What to try | Requirements |
| --- | --- | --- |
| [Free Play](https://rarerush.app/free-play/) | Pick one of 12 sample Friends and take the controls in Easy, Normal or Degen. Full direction twists, soundtrack and effects. | No wallet, NFT or sign-in. Keyboard and touch controls; unlimited runs with browser-local best scores. |
| [Play Arcade](https://rarerush.app/arcade/) | Choose Genesis or Generations and play Easy, Normal or Degen. | Browser wallet holding an eligible real Rare Friend on Robinhood mainnet, chain 4663. No game transaction or real RF spending. |
| [Agent Play](https://rarerush.app/agent-play/) | Choose AUTOPILOT → PREVIEW for an interactive no-wallet demo; switch to AGENTIC for the skill and CLI instructions. | Preview needs no wallet. Arcade and Testnet retain their respective ownership requirements. |
| [Runs Feed](https://rarerush.app/runs-feed/) | Watch animated previews and open full saved replays. | No wallet needed to watch. |
| [Leaderboard](https://rarerush.app/leaderboard/) | Compare each Friend's best loaded run and select WATCH. | No wallet needed to watch. |
| [Try Testnet](https://testnet.rarerush.app/) | Get a test kit, play, verify a surviving run and claim tRARERUSH. | Robinhood Testnet, chain 46630; test ETH for gas, a test NFT, and tRF for Generations entry. All are valueless test assets. |

[Gameplay video](https://rarerush.app/media/rare-rush-directions.mp4) · [Pitch](https://rarerush.app/pitch/) · [Game guide](https://rarerush.app/docs/) · [Agent skill](https://rarerush.app/agent-skill/SKILL.md)

For a first try, open [Free Play](https://rarerush.app/free-play/), choose a sample Friend and difficulty, and start a run. The picker shows front-facing artwork for six Genesis and six Generations Friends. These are cosmetic choices: every sample follows the same gameplay rules. Free Play works in an ordinary desktop or phone browser.

The [landing page](https://rarerush.app/) also shows a wallet-free gameplay preview. To play with your own Friend, the SDK entry at [Generations Arcade](https://rarerush.app/play/) requires an owned hardwired Generations NFT, generation 1 or higher. Genesis holders use the separate [Genesis Arcade](https://rarerush.app/genesis/) ownership gate. On phones, use a supported wallet's built-in browser for wallet play.

## What's new since the original entry

- **Free Play for everyone:** human-controlled runs with 12 sample Friends, all three difficulties, the full soundtrack and direction twists. No wallet or sign-in; personal bests stay in the browser. A “Play with your Rare Friend” option introduces wallet-connected play.
- **The rare twist:** every run begins sideways. Ceiling intakes pull the Friend into a spinning climb, breaks in the floor lead to free fall, and an exit can occasionally send the run left. These connect into one continuous course.
- **Human, Autopilot and Agentic play:** browser Autopilot handles legal controls; the provider-neutral `rarerush` skill and headless CLI support agents with compatible wallet integrations and their own schedules.
- **Saved runs:** Human, Autopilot and Agentic Arcade/Testnet runs can be published to the public feed with a wallet-signed message. The server reconstructs results from recorded inputs rather than accepting submitted scores. Cards show varied animated excerpts; full replays open with playback controls.
- **Best of the Rush:** a dedicated Leaderboard presents each Friend's best run among the records currently loaded, with thumbnails and watchable replays.
- **Play-to-mint Testnet:** onchain entries, three starts per test NFT per UTC day, replay verification, wallet claims and publicly source-verified contracts. Arcade remains the simulated Vibeathon MVP.
- **Original 8-bit audio:** EASY’s Garden Bounce is bright and bouncy, NORMAL’s Circuit Chase is melodic, and DEGEN’s Breakbeat Rush brings syncopated drums and bass. Three separately composed scores and sixteen synthesized game effects play in Free Play, Arcade, Testnet and browser Autopilot.

## How to play

Choose a Friend and difficulty. Collect coins, dodge hazards and try to survive the timer. Space / ↑ / W jumps; press again to double jump. Hold ↓ / S to slide. On horizontal tracks, hold the arrow in the direction of travel to accelerate or the opposite arrow to slow down; in vertical shafts, ← / → steer sideways. Touch controls follow the same rules. P / Escape pauses. The game supports reduced motion. **MUSIC** and **SFX** default to ON, start after player interaction, and can be muted independently. Saved choices are remembered in the browser; pausing or backgrounding the game silences audio.

| Difficulty | Duration | Token-reward multiplier |
| --- | --- | --- |
| Easy | 120 seconds | 0.75× |
| Normal | 90 seconds | 1× |
| Degen | 60 seconds | 2× |

All three experiences use these run times. The token multipliers apply only to wallet-connected Arcade and Testnet; Free Play has no token rewards. Coins grow the Friend; hits shrink it and cost a heart. Flying bonus coins earn 10× the ordinary coin reward in wallet play, before supply limits. Shields absorb a hit, magnets attract coins, and collection chains boost the score. In wallet play, Genesis adds a 100× token-reward multiplier; token multipliers do not multiply the arcade score. These are skill-based runs with seeded courses and legal inputs, not fixed-probability reward draws.

The **COINS** counter shows physical pickups before reward multipliers. Calculated rewards appear separately as **demo $RARERUSH** in Arcade and **tRARERUSH** on Testnet; Free Play has no token reward.

To play and hear the soundtrack without a wallet, start a [Free Play](https://rarerush.app/free-play/) run. For an automated demonstration, open [Agent Play](https://rarerush.app/agent-play/) and choose AUTOPILOT → PREVIEW. The linked gameplay video, landing preview, saved replays and headless agent jobs remain silent.

## Costs, rewards and saving

**Free Play:** unlimited runs with no entry fees, tokens or wallet requests. Best scores are saved separately for each difficulty in this browser when storage is available; otherwise they last for the current session. Sample artwork grants no NFT ownership. Free Play does not publish replays to Runs Feed or the Leaderboard.

**Arcade MVP:** Genesis entry is free. Each Generations run uses 1 demo RF from a local simulated balance; that fee enters the demo prize pool. Ordinary launch coin rewards are 7.5 / 10 / 20 demo tokens in Easy / Normal / Degen, before Genesis and flying-bonus multipliers. The base rate halves every 10,000 simulated pickups. A shared 200,000-token session cap clips rewards; reload or identity changes reset the local economy. No real RF is spent, no real rewards are minted and there are no prize payouts. See the [Arcade economy](https://github.com/xibot/rare-rush/blob/main/docs/ECONOMY.md). The SDK's `game.json` reference reward is compatibility metadata, not a called chance-game payout.

**Optional Testnet:** Genesis entry is free; Generations costs 110 tRF, split into 100 for the prize pool and 10 for treasury, plus test ETH gas. Each confirmed start consumes one of three daily attempts for that NFT across modes and play types, including a loss or abandoned run; entry fees are not refunded. Survive the timer with a heart remaining, request verification, then confirm the claim. The deployed test token has a provisional 1.024-billion cap and 10% launch / 90% gameplay allocation; these are not final mainnet tokenomics. The [Testnet guide](https://github.com/xibot/rare-rush/blob/main/infra/testnet/README.md) documents reward rules, timing, admin powers and signer trust. The [deployment record](https://github.com/xibot/rare-rush/blob/main/docs/TESTNET-V2.md#blockscout-source-verification) links all five source-verified contracts. Source verification is not a security audit.

**SAVE RUN:** optional publication of wallet-connected Arcade or Testnet runs uses a wallet message signature, with no gas or transaction. The public replay includes the wallet address and selected Friend. Publishing is separate from Testnet claiming and is not proof of a successful claim. Free Play and Preview runs are not published. Hearts are private browser-local favorites, not shared votes or onchain likes. See [community behavior and storage](https://github.com/xibot/rare-rush/blob/main/docs/COMMUNITY.md).

## Run locally or try an agent job

Use **Node.js 22.18+ within the 22.x release line**, with npm:

```sh
git clone https://github.com/xibot/rare-rush.git
cd rare-rush
npm ci
npm run dev
```

Open http://localhost:4173/free-play/ to play without credentials, or http://localhost:4173 for the landing and previews. No secrets are needed to build or use Free Play. `npm run build` produces `dist/`. Public replay APIs need separately configured server storage; `npm run dev` alone does not reproduce the hosted backend. For a local library, use `node agent-play/serve.mjs` and open http://127.0.0.1:4220/.

Local wallet-connected Arcade and browser Autopilot also need the server-side private RPC configuration described in the [README setup](https://github.com/xibot/rare-rush#run-locally). Wallets provide account permissions and requested signatures or transactions; the app's read requests use its configured RPC services.

For a reproducible no-wallet agent demo, run from the same checkout:

```sh
node agent-play/cli.mjs run --job agent-play/examples/preview-job.json
```

Example output excerpt from the September 26 check:

```json
{
  "jobId": "preview-first-run",
  "status": "completed",
  "metrics": {
    "verified": true,
    "outcome": "survived",
    "score": 9289,
    "coins": 160,
    "hearts": 3,
    "distance": 2669,
    "phasesVisited": ["side", "up", "down"]
  }
}
```

The full result includes the saved replay location. Retrying the same job ID returns its existing result. Here, `verified` means a locally checked replay, not NFT ownership or an onchain reward. Install the complete [rarerush skill folder](https://github.com/xibot/rare-rush/tree/main/agent-play/skills/rarerush), including its references, for Arcade/Testnet jobs and optional authorized publication. Wallet integration and scheduling are configured in the agent's own environment; installing the skill does not create either. See the [agent guide](https://github.com/xibot/rare-rush/blob/main/agent-play/README.md).

## Checks and current limits

**Free Play release — September 29, 2026:** [source d9c2d6f](https://github.com/xibot/rare-rush/commit/d9c2d6f) adds the final six Genesis and six Generations sample picker. Release browser checks passed at 1440, 640, 390 and 360 pixels, covering front-facing artwork, both collections entering manual gameplay without wallet access, touch/keyboard controls, retry and persistent local bests. All five Free Play storage tests passed again during this documentation refresh. These checks use bundled sample artwork and require no wallet transactions. See `npm run test:free-play` and `npm run test:free-play:browser`.

**Audio release — September 28, 2026:** the final soundtrack and default-ON controls are published in Arcade and Testnet, with source at [af6e7ad](https://github.com/xibot/rare-rush/commit/af6e7ad2dd86b9b00e2e77a3f9432c04e3a80376). Checks used Node.js 22.22.0 and local Chrome; no public wallet transactions were sent.

| Audio release check | Result |
| --- | --- |
| `npm run test:audio` | 10 tests passed for the final scores, effects, scheduler and game-state isolation |
| `npm run test:audio:browser` | Passed: waveform rendering, default ON after interaction, independent mute persistence, pause/background/unmount and silent feed previews |
| `npm run typecheck` and `npm run build` | Passed |
| `npm --prefix testnet-app run build` | Passed; approved V2 engine fingerprint unchanged |

The soundtrack observes gameplay without changing physics, reward rules, replay inputs or deployed contracts. These checks cover the audio release; the broader September 26 results below are retained as historical evidence.

**Earlier gameplay validation — September 26, 2026:** source [e4b56e2](https://github.com/xibot/rare-rush/commit/e4b56e28e99bcd754e26025dbe6a937d02428960), using Node.js 22.22.0.

| September 26 check | Result |
| --- | --- |
| TypeScript: `npm run typecheck:rush` | Passed |
| Gameplay/economy/identity: `npm run test:rush` | 110 tests passed |
| Replay API/Testnet proxy: `npm run test:community:api` | 22 tests passed |
| Human and agent replay publication: `npm run test:community:save` | 27 tests passed |
| Agent jobs, CLI, headless Testnet, wallet provider, runner and replay previews | 43 tests passed |
| FriendSDK validation: `npm run check` | Passed |
| Production build: `npm run build` | Passed |
| No-wallet CLI demo above | Completed; deterministic result saved |
| Public demos, documentation, skill, video and replay API | HTTP 200; Testnet status reported `ready` |

**202 automated tests passed on September 26, with no failures or skipped tests.** RPC, wallet and storage checks use local fixtures/mocks. HTTP status checks confirm availability, not a complete live wallet playthrough. No wallet transactions were sent for that validation refresh.

Checks that import shared Testnet artifacts need local compilation first:

```sh
npm ci --prefix infra/testnet
npm --prefix infra/testnet run compile
npm --prefix testnet-app run prepare:shared
npm run typecheck:rush
npm run test:rush
npm run test:community:api
npm run test:community:save
node --test agent-play/jobs.test.ts agent-play/cli.test.ts agent-play/headless-testnet.test.ts agent-play/wallet-provider.test.ts agent-play/runner.test.ts agent-play/replay-preview.test.ts agent-play/preview-plan.test.ts
npm run check
npm run build
```

These compile/generate local artifacts; they do not deploy contracts or send transactions. Historical browser and local-EVM checks are recorded in the [validation log](https://github.com/xibot/rare-rush/blob/main/docs/VALIDATION.md), [Agent Play guide](https://github.com/xibot/rare-rush/blob/main/agent-play/README.md#validation) and [Testnet release record](https://github.com/xibot/rare-rush/blob/main/docs/TESTNET-V2.md#release-validation). The September 28 audio browser checks are listed separately above. The builder reports manually playing and claiming rewards on the public Testnet.

Current limits:

- Testnet uses a trusted online signing verifier and retains administrator powers. Replay validation checks legal results; it does not establish human play or prevent every form of offline route optimization. HUMAN RUN / AUTOPILOT RUN / AGENT RUN labels describe the submitted mode, not an attestation of who controlled it.
- The Leaderboard compares currently loaded saved records, not every run ever played. Saving is optional and browser hearts are private.
- Named agent frameworks are integration possibilities, not tested turnkey wallet connectors. Current automated Testnet jobs require a compatible externally owned ECDSA account; smart-account support is not implemented. Automated checks use mocks rather than real framework wallets. Arcade address-only reads do not prove control of the observed wallet.
- Mainnet RARERUSH issuance, production liquidity pools, the token sale and automatic prize distribution remain future work. RPC/verifier availability and wallet compatibility can affect Testnet play. Local pauses do not extend onchain claim deadlines.

## Credits

Game design, development and interface: **XIBOT**, building on the Rare Friends ecosystem. Rare Friends character artwork, world compositions, vector props and pixel-bear token artwork are credited under the applicable [FriendSDK notices](https://github.com/spokesz/friendsdk/blob/main/NOTICE.md). The unmodified v0.1.2 SDK archive is bundled and pinned to upstream commit `762d6f58a73ace723f7f82dc1a61bfa036c21edc`. Original character artwork is preserved; Genesis presentation combines the holder's portrait with a cosmetic Generations body. Rare Rush’s three original soundtracks and sixteen game effects are synthesized with Web Audio from its own scores and sound engine. Font licenses and asset provenance are included in the repository.
