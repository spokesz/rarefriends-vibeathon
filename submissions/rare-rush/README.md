# Rare Rush

- **Builder:** XIBOT.
- **Public contact:** X / Twitter [@xavieriturralde](https://x.com/xavieriturralde) · Email [xiturralde@gmail.com](mailto:xiturralde@gmail.com) · Telegram [@xibot0x](https://t.me/xibot0x).
- **Category:** Economy Potential; also relevant to Character Spotlight.
- **One sentence:** Rare Rush is an SVG sidescroller starring your verified Rare Friend, with Easy, Normal and Degen challenges, collectible-driven growth, and a simulated diminishing-emission token economy designed for a future $RAREFRIENDS pair.
- **Source repository:** https://github.com/xibot/rare-rush (public; judges can review without an invitation).
- **Playable preview:** https://rarerush.app — collection choice at `/arcade/`; SDK submission entry at `/play/`.
- **Project pitch:** https://rarerush.app/pitch/ — the core idea, playable demo, collection benefits, and planned token integrations.
- **Game guide:** https://rarerush.app/docs/ — illustrated controls, difficulty, collectibles, and the interactive reward calculator.
- **Stack:** TypeScript, React, FriendSDK v0.1.2, canonical Rare Friends SVG world compositions/props and original character frames.
- **Wallet/network:** An owned hardwired Generations NFT, generation 1+, with a browser wallet on Robinhood mainnet (4663). Genesis holders can also test through the separate `/genesis/` ownership gate; the FriendSDK submission route remains `/play/` for Generations. No real RF balance or transaction is required.

## Run locally

Use a current Node.js 22.x release:

```sh
git clone https://github.com/xibot/rare-rush.git
cd rare-rush
npm ci
npm run dev
```

Open http://localhost:4173. No environment variables or private credentials are needed to build or watch the landing preview. Wallet play still requires an eligible owned NFT. `npm run build` produces the complete static site in `dist/`. See the [setup, verification commands and asset credits](https://github.com/xibot/rare-rush/blob/main/games/rare-rush/README.md).

## Try it

The public landing page autoplays a run using a random cached canonical Friend. Both landing and game use the shared pixel-bear coin + **RARERUSH / BY XIBOT** header. Choose Generations from `/arcade/` to play through FriendSDK, select your eligible Friend from an artwork card, choose Easy (120s), Normal (90s) or Degen (60s), then select LET’S RUSH. Space/↑/W or JUMP jumps; tap twice to double jump. Hold ↓/S/SLIDE to duck floating bridges, →/FAST to accelerate or ←/SLOW to ease off. Collect pixel-bear coins to grow; obstacle hits shrink the Friend. Look for flying surprise coins at twice the ordinary display size (60 versus 30 logical pixels). Their first wave spawns after 4–6 active seconds, then every 10–15 seconds while flight time remains, occasionally as a staggered pair. They travel at 1.15× current world-scroll speed + 25 logical pixels/second. S shields and M magnets help. Survive the timer or until three hits. P/Escape pauses. Touch controls, sound toggle and reduced motion are included. On a phone, use a supported wallet browser with an injected wallet; WalletConnect is not included. The start card’s **BACK** button returns to your Friend selector, the **RARERUSH** logo returns to the landing, and **Change difficulty** on the results screen lets you choose another mode.

## Costs and rewards

All mechanics are explicitly simulated. Each Generations run charges 1 demo RF from a 100-RF local demo balance and adds it to a demo prize pool. Ordinary coin rewards start at 7.5 demo $RUSH in Easy, 10 in Normal or 20 in Degen; flying bonuses start at 75, 100 or 200 before cap clipping. The difficulty-scaled reward is floored to microtokens, multiplied by 1 for an ordinary coin or 10 for a bonus, then clipped to remaining issuance. Each bonus is still one pickup, growth increment and combo/score increment. The base rate halves every 10,000 actual simulated pickups. The Genesis tester route enters free and applies 100× demo token rewards after difficulty rounding and coin bonuses, before cap clipping. Both collection rules, all modes and coin types share a 200,000-token lifetime cap within each local session; harder modes and bonuses can exhaust it earlier. Combo bonuses boost score only. Pool payouts are not implemented. Token Lab uses Normal-rate historical scenarios with ordinary coins only, never historical bonuses. Counters and balances reset on reload/identity change and are not global live activity. No real tokens, fees, swaps or redemptions occur. Full equations and accounting appear in the [economy design](https://github.com/xibot/rare-rush/blob/main/docs/ECONOMY.md).

`game.json` holds unused SDK compatibility terms (1 RF item, guaranteed 1 RF reference reward). No chance-game actions are invoked; this is a deterministic skill game with its own local simulation.

## Checks and known issues

Recorded validation includes **83 passing unit tests: 38 engine, 30 economy, and 15 Genesis identity**, including flying bonus scheduling, pickup behavior, 10× rewards, rounding order, shared-cap clipping and invalid multipliers. TypeScript, FriendSDK game validation and the static production build passed. The latest gameplay release is [556ab5b](https://github.com/xibot/rare-rush/commit/556ab5b), with desktop/phone entry, Genesis and five gameplay viewport/mode checks passing after the navigation update; see the [validation record](https://github.com/xibot/rare-rush/blob/main/docs/VALIDATION.md). Browser suites now pass five playable viewport/mode cases and three landing sizes plus reduced motion. These cover the shared pixel-bear header, visible BY XIBOT, flying bonus rendering and pause, alongside fixture ownership checks, sandbox isolation, canonical sprites/fonts, controls, mode rewards, fee accounting, scenarios and run completion. The landing suite also covers wallet-free autoplay, character rotation, mobile layout and navigation to the real SDK gate. The pitch suite passes at desktop, tablet and two phone widths, including public navigation, actual autoplay pickups, Friend rotation, pause, offscreen suspension, reduced-motion opt-in, and collection selection leading to the SDK ownership gate. The focused bonus browser suite also passes desktop Normal and phone Easy/Degen, verifying actual 10× payouts, single-pickup growth, flight and pause through legal controls. Automated game tests use SDK-only fixtures through the actual runtime/sandbox, without exposing fixtures in the public build. A browser without a wallet remains on the SDK entry screen. The builder confirmed connecting their real Generations-holding wallet and playing all three difficulties with all the Generations Friends in their wallet on rarerush.app on September 20, 2026. They also confirmed a completed run. This is a builder-reported manual check; no wallet address was requested or published. A human Genesis-wallet playthrough remains unconfirmed.

A live token/pair, trustworthy run validation, durable global state and prize escrow/distribution need future integration. Browser scores are untrusted, and the emission curve does not promise price stability. The phone layout uses a responsive frame while desktop uses 960 × 640.

## Credits

Game and interface: **XIBOT**. Rare Friends: canonical Generations sprite frames, world compositions, vector props, pixel-bear token artwork and synthesized sounds; used according to SDK notices. Rare Rush adapts the running lane and interface to the same palette and patterns. The site's Silkscreen, Archivo and Sometype Mono fonts are bundled with their OFL licenses. SDK v0.1.2 archive is pinned to upstream commit `762d6f58a73ace723f7f82dc1a61bfa036c21edc` and retains its licenses/notices.
