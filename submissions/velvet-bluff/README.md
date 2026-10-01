# Velvet Bluff

**Builder/contact:** CousinGreg — [GitHub](https://github.com/cousin-greg)

**Category:** Economy Potential

**Play:** [Velvet Bluff](https://cousin-greg.github.io/velvet-bluff/)

**Source code and assets:** [cousin-greg/velvet-bluff](https://github.com/cousin-greg/velvet-bluff)

Velvet Bluff is a Skull-inspired bluffing game where your original Rare Friend joins a table of flowers, skulls and fixed simulated $RAREFRIENDS stakes, with a separate local human-and-escrow prototype exploring future token-funded tables.

## Playable preview and SDK

The public preview is a complete **one-human-versus-2–5-computer-Friends game**. It uses unmodified **FriendSDK 0.1.2**, `GameHost`, the owned-Friend picker and a fresh eligibility check before opening a custom renderer through `GameSession` in the SDK's opaque sandbox. Your selected Friend's canonical artwork is preserved.

Use a browser wallet that owns an eligible **Generations NFT, generation 1 or higher, on Robinhood mainnet (chain ID 4663)**. The SDK may ask you to connect or switch networks. Ownership is required even for this preview. Gameplay needs no RF funding, token approval or transaction signature: all public-game stakes, balances and rewards are simulated.

## How to play

Every Friend begins with three flowers and one skull. Everyone places a disc face down; then take turns adding a disc or bidding how many flowers you can reveal without finding a skull. Once bidding starts, raise or pass. The highest bidder reveals their own topmost discs first, then chooses other Friends' topmost discs. Stop when the bid is met. Completing a flower-only bid earns one point; a skull fails the challenge and privately costs one disc. Win two challenges, or be the last Friend with discs. The optional Skull “Last Chance” variant is omitted.

Click/tap the visible disc, bid and reveal controls. Keyboard play uses Tab/Shift+Tab and Enter/Space. The guide supports arrow keys, Home/End and Escape; phone layouts have a **Hand & actions** drawer. Pause, computer pace and reduced-motion controls are available. There is no audio. The in-game guide and [full rules](https://github.com/cousin-greg/velvet-bluff/blob/main/docs/GAMEPLAY.md) explain the details.

## Costs, outcomes and economy potential

- Practice starts with **100 simulated RF**. Choose a fixed stake of **0, 5, 10 or 25 RF per seat for the whole match**. Raising a disc-count bid never moves tokens; losing a round adds no charge.
- The winner receives the entire pot, including their own stake, with **no rake**. Three seats at 10 RF produce a 30 RF pot: winner net +20 RF, other players −10 RF each. Leaving unfinished practice returns the simulated stake. Reloading or changing Friend resets the session; an insufficient practice balance can reset to keep play available.
- There is no fixed win-probability table: choices and hidden discs determine outcomes. If you hit another Friend's skull, one disc is randomly removed from your entire surviving collection, with equal **1/N** probability for each of its N discs. Hitting your own skull lets you choose the loss. Discs are match pieces, not purchased consumables. There are no redeemable rewards, paid items or promised RF earnings. The SDK's required reference chance-game definition is unused; its example outcome is not this game's odds.
- Source also includes **3–6-human, same-machine tables** with generated fixture identities and actual escrow deposits, payouts and refunds in **valueless local-chain test RF, chain 31337**. These are unavailable on the public Pages preview. The referee sees hidden discs, enforces rules and names the winner; commitments bind accepted placements, but the contract **does not prove the winner or an honest referee**.
- The proposed economy is remote owned-Friend tables funded from canonical Friend wallets, with fixed match stakes and on-chain settlement. Remote access, production wallet authentication for those rooms, a reviewed result-verification/trust model and real-funds activation remain future work. No live RF activity is claimed.

## Setup and run

Node **22.12 or newer** is required; the SDK archive is included in the repository.

```sh
git clone https://github.com/cousin-greg/velvet-bluff.git
cd velvet-bluff
npm ci
npm run dev
```

Open the URL printed by Vite. The normal route uses the same wallet/owned-Friend gate as the public preview. `npm run build` creates `dist`; `npm run preview` serves that build. The source uses JavaScript/JSX, React and Vite.

For the separate Windows local-human prototype, run `./Start-Multiplayer.ps1` in PowerShell and use independent browser profiles. It starts loopback-only RPC, referee and game services; test RF has no real value. Read [local setup, timing and trust policies](https://github.com/cousin-greg/velvet-bluff/blob/main/docs/MULTIPLAYER.md) first. Development fixture routes are removed from production and cannot bypass the public gate.

## Checks and known limitations

**Public-hosted verification:** Verified on September 20, 2026 at 17:32 UTC at the public HTTPS URL. [Linux CI and deployment](https://github.com/cousin-greg/velvet-bluff/actions/runs/35526056096) passed for runtime source `33eee503fb7f9412da65e31ce051963fc3ac9b44`. The actual served site passed a complete 22-move match with isolated SDK wallet/RPC fixtures, six-seat 390px mobile controls, 16 asset status/MIME/hash checks, loaded fonts, sandbox isolation and development-query bypass rejection, with zero browser/network errors or signing/transaction requests. An additional unmocked, account-free browser RPC read returned chain 4663. No personal-wallet playthrough is claimed. [Evidence and actual hosted screenshots](https://github.com/cousin-greg/velvet-bluff/blob/main/docs/VERIFICATION.md).

Verified locally on **September 20, 2026**:

- `npm test`: **68 passed, one intentionally gated integration skip** — 32 rules/bot, 22 contract and 14 service checks. The gated actual-chain recovery/full-match/refund case was run separately and passed.
- `npm run test:e2e`: **14 passed**, covering full three- and six-seat bot matches, SDK ownership/picker/sandbox behavior and the guide. `npm run test:multiplayer`: **7 passed**, including independent three- and six-human matches, actual local deposits/payouts/refunds, private observations and reconnect.
- `npm run build` and `npm run verify:production` passed. Custom-renderer build and browser checks provide game validation; the SDK CLI game-directory checker is not applicable to this external renderer layout. This plain-JavaScript project currently has no dedicated static typecheck command; no typecheck pass is claimed.
- Chrome desktop and 390px phone-size checks covered keyboard focus, 44px controls, reduced motion, original art and fonts inside the opaque iframe. Final production checks found no browser errors and rejected development-query bypasses. They exercised the actual built host with **isolated wallet/RPC fixtures** and fresh ownership reads; the SDK browser cases also verified stale-owner denial. **A personal-wallet playthrough has not been performed.**

Other browsers/wallets are unverified. Public play depends on an eligible wallet and available Robinhood RPC; practice progress is session-only. Upstream SDK `use client` and bundle-size warnings are non-blocking. Local contracts are a tested prototype, **not an audit or trustless system**; unlocked local fixture RPC accounts require a trusted machine and must not be exposed. No personal-wallet or mainnet wagering was tested or enabled. See [verification and screenshots](https://github.com/cousin-greg/velvet-bluff/blob/main/docs/VERIFICATION.md) and [SDK evidence](https://github.com/cousin-greg/velvet-bluff/blob/main/docs/SDK.md).

## Mobile compatibility update

The actual Rabby/iPhone diagnostic established CSP blocking of the child script and stylesheet after successful HTML bootstrap. Public source `f1df9257f589b973c9f45573b2dc8d8b95f8e92f` replaces production `self` sources with the exact HTTPS hashed JS/CSS paths and six canonical Friend SVG paths. It preserves the opaque `allow-scripts` sandbox, startup-probe hash, ownership checks, pinned SDK and read-only RPC boundary; there is no whole-origin script grant, wildcard, unrestricted inline script or eval permission. A separate restoration safeguard still starts a fresh ownership-checked session when a saved page returns.

[Normal versioned play link](https://cousin-greg.github.io/velvet-bluff/?v=f1df925) · [Startup diagnostic fallback](https://cousin-greg.github.io/velvet-bluff/?debug=startup&v=f1df925). The actual CSP block is established; the precise OS/WebKit version is unknown, and a new physical-phone playthrough is still required to confirm recovery.

Ten policy/input-validation tests, six focused production CSP browser cases and two development full-match cases passed locally. Production verification used unchanged public URLs/CSP with local artifact bytes. These checks covered ownership, opaque parent/storage isolation, decoded artwork/fonts, full matches, phone controls and rejection of unlisted script/style/network destinations, inline scripts and eval. [Linux CI and Pages deployment](https://github.com/cousin-greg/velvet-bluff/actions/runs/35530317995) passed 42 engine/bot/policy tests, production verification, 14 recovery, 12 diagnostic and 6 CSP checks. On the actual deployed HTTPS site, all six CSP cases and two healthy diagnostic cases passed across Chromium/WebKit, including two full matches and reports matching build `d49055a84eed620d`. All 28 served static files match the verified deployment artifact by SHA-256 with zero redirects; exact asset grants/probe hash verify, both versioned links serve the current index, and 17 private/legacy routes return 404. Automated wallet/RPC/gameplay checks used isolated read-only fixtures; no personal wallet or signing/transaction was used.

The opt-in diagnostic retains only build/attempt/fixed-stage/timing data, without accounts, Friend IDs, raw URLs, errors or browser identifiers. It has no telemetry or persistence. [Repair details](https://github.com/cousin-greg/velvet-bluff/blob/main/docs/CSP-COMPATIBILITY.md) · [Startup check](https://github.com/cousin-greg/velvet-bluff/blob/main/docs/STARTUP-CHECK.md).

## Credits

Original **Rare Friends canonical Generations artwork** is preserved and attributed; the SDK supplies the selected Friend, with fixed sample/computer sprites recorded in the [artwork provenance and notice](https://github.com/cousin-greg/velvet-bluff/tree/main/public/friends). FriendSDK is by the Rare Friends contributors and retains its Apache-2.0 notice. Gameplay is inspired by **Skull, designed by Hervé Marly**; no Skull artwork or rulebook text is bundled. Flower/skull glyphs, small pixel textures and table presentation are original to this project. **Silkscreen, Sometype Mono and Archivo** are bundled with their SIL OFL 1.1 notices. [Complete sources and credits](https://github.com/cousin-greg/velvet-bluff/blob/main/docs/SOURCES.md).
