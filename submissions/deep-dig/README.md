# RF Deep Dig

- **Builder:** chimph
- **Contact:** [@intocryptoast on X](https://x.com/intocryptoast)
- **Category:** Economy Potential
- **Playable preview:** https://chimph.github.io/rf-deep-dig/
- **Source:** https://github.com/chimph/rf-deep-dig
- **Stack:** React 19, TypeScript and FriendSDK v0.1.4, with documented local runtime extensions.

Walk your owned Rare Friend through a resonance minefield, collect simulated RF, and decide whether to bank your haul or risk a deeper level.

**All RF is simulated. The preview requires no RF funding, signatures or transactions.**

![Deep Dig gameplay with a Rare Friend, an orb, flagged tiles and simulated RF rewards](https://raw.githubusercontent.com/chimph/rf-deep-dig/fe6bc2cd9a3c54f5e1dc6171b55817127fd6b585/games/deep-dig/gameplay.png)

## Rare Friends integration

Connect an injected browser wallet holding a hardwired Rare Friends Generations NFT, generation 1 or higher, on Robinhood mainnet (chain 4663). The official SDK runtime connects the wallet, discovers owned Friends, checks fresh ownership/eligibility and resolves the canonical NFT wallet. The selected Friend's canonical artwork appears on the board.

The included runtime adds a paged artwork gallery, a Settings shortcut to choose a Friend, cached selected artwork reuse and remembered sound. These are local extensions, not claimed upstream v0.1.4 features. The sandbox and ownership gate remain intact. The v0.1.4 update adds owner-filtered history pagination for the public RPC and removes unused transaction and signing code from the simulated preview bundles. [SDK integration](https://github.com/chimph/rf-deep-dig/blob/main/SDK.md)

## Run locally

With Node.js 22+ and npm:

```sh
git clone https://github.com/chimph/rf-deep-dig.git
cd rf-deep-dig
npm ci
npm run dev:deep-dig:submission
```

Open http://localhost:4175 in a wallet-enabled browser. Connect, select a Friend, choose a simulated stake and enter the mine. If needed, Settings can top up the simulated balance for testing. WalletConnect and native wallet deep links are not supplied by the SDK.

## How to play

- Choose a first tile, then walk with WASD/arrows or touch. Portrait uses a direction pad and centre flag button.
- Clues count nearby resonance sources: an orb or a mine. Press F then a direction, right-click or long-press to flag a guess. Opening a flagged adjacent tile requires confirmation.
- Walk onto ground finds and orbs to collect them. Revealing ground alone does not collect its RF.
- Reveal all ordinary ground and recover an orb to descend without another entry fee. Extract at any time to bank collected RF. A mine ends the expedition and loses its unbanked haul.
- Each expedition has up to three depths. After nine minutes idle, a warning appears; at ten minutes, only the entry is refunded and the haul is discarded.

The desktop game uses the SDK's 960 × 640 reference layout; portrait content scrolls within the frame. Sound has a remembered mute control and effects respect the system reduced-motion setting.

## Simulated costs, probabilities and rewards

A Friend starts with **20 simulated RF**; the session's simulated pool starts with **1,000,000 RF**. Entry choices are **1, 2, 5, 10, 20, 50, 80 or 100 RF**, paid once for up to three depths. Choices above the wallet or pool-backed admission limit are disabled. There are no purchased packs or persistent consumables: one entry starts one expedition, and descent costs zero.

Each 80-tile level has five orbs, five mines and 70 ordinary cells, with twelve ground finds. The first tile and its neighbours are safe, and ordinary ground is connected. Source geometry is chosen independently of the shuffled five/five outcome split. The intended source odds start at 5/10 orb and 5/10 mine; after collecting `k` orbs without hitting a mine, the remaining odds are `(5-k)/(10-k)` orb and `5/(10-k)` mine. Draws are without replacement. Clues do not distinguish mines from orbs, and solving without guesses is not guaranteed. Browser randomness is for the simulation, not a production fairness mechanism.

All rewards below are multiplied by the entry stake:

| Depth | Ground finds (four of each) | Ground total | Each orb | Maximum level reward |
|---|---|---:|---:|---:|
| 1 | 0.01 / 0.02 / 0.03 RF | 0.24 RF | 1.00 RF | 5.24 RF |
| 2 | 0.02 / 0.04 / 0.06 RF | 0.48 RF | 1.36 RF | 7.28 RF |
| 3 | 0.03 / 0.06 / 0.09 RF | 0.72 RF | 2.16 RF | 11.52 RF |

The maximum across all depths is **24.04 × stake gross**. That amount is reserved at entry. Extraction pays only collected rewards; unused backing returns to the pool. A mine or abandonment returns the unbanked haul and unused backing to the pool. The idle refund is entry-only and occurs once. Banked simulated balances are not lost on a mine. All amounts use bigint RF base units (18 decimals).

The SDK's fixed outcome metadata is compatibility data, not a model of a complete expedition. Deep Dig uses its own pooled simulation rather than stock buy/play/settle/redeem. [Full rules and integration details](https://github.com/chimph/rf-deep-dig/blob/main/games/deep-dig/SUBMISSION.md)

## Checks and known limitations

All 90 retained unit tests, typechecks, game validation, wallet and paged-picker browser checks, offline save/migration tests, idle-refund checks, style parity and the production build passed. [CI results](https://github.com/chimph/rf-deep-dig/actions/runs/36633519727)

The deployed files matched the tested Pages artifact. Preview-bundle regression checks verify that transaction, approval and signing capabilities are excluded from both generated JavaScript bundles. Desktop and portrait mobile checks verified the unmodified missing-wallet gate; isolated mock-wallet/RPC contexts exercised canonical artwork, entry, extraction, sound persistence and network cancellation. **A complete manual eligible-wallet playthrough on the new URL has not been formally recorded.** These automated tests are not presented as that manual verification. [Verification details](https://github.com/chimph/rf-deep-dig/blob/main/games/deep-dig/SUBMISSION-CHECKS.md)

Progress and the pool are session-local and reset on refresh or wallet/network/Friend changes. There is no shared production pool, durable online save, hidden-board server, anti-cheat guarantee or real-value settlement. The separate offline build retains browser saves but is not the submitted wallet-gated preview. No real player funds are held or paid.

For a future approved live release, I intend to seed the pool with 1,000,000 RF and retain discretion to withdraw uncommitted house funds. Player balances, unpaid winnings/refunds and active-expedition backing must be protected from owner withdrawals; wind-down must preserve outstanding claims. These safeguards are requirements, not implemented real-fund guarantees. No seed has been deposited and no developer/revenue-share percentage is fixed.

The [live-release plan](https://github.com/chimph/rf-deep-dig/blob/main/games/deep-dig/LIVE-RELEASE.md) covers the proposed board service/database, randomness with hidden-board secrecy, authenticated sessions, shared accounting, settlement and decisions requiring agreement with Rare Friends.

## Credits and licensing

FriendSDK v0.1.4 supplies the runtime, wallet integration and canonical Generations artwork. The game uses Silkscreen under the SIL Open Font License. Board vectors and effects are original project assets; procedural sound uses SDK samples and original orb, mine and ground-find synthesis. [Asset notices](https://github.com/chimph/rf-deep-dig/blob/main/NOTICE.md) · [Font licence](https://github.com/chimph/rf-deep-dig/blob/main/games/deep-dig/fonts/Silkscreen-OFL.txt)

[Project licensing](https://github.com/chimph/rf-deep-dig/blob/main/LICENSE) permits inspection, private testing and judging of covered Deep Dig material. FriendSDK and third-party assets retain their own terms. A commercial launch of material covered by the evaluation terms requires separate permission.
