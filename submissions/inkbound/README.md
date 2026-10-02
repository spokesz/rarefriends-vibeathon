# Inkbound

**Project name**
Inkbound

**Builder / contact**
BADAKKAKITIGA · [@BADAKKAKITIGA](https://github.com/BADAKKAKITIGA) · bagpredict@gmail.com

**Category**
Character Spotlight

**What did you build?**
A hand-controlled action platformer across three zones: your Rare Friend runs, double jumps, dashes and slashes through shadow wisps and flyers, gathers ember motes, and unseals the Ember Gate — and can ignite RF-bought sigils mid-run for a surge that heals and doubles the slash.

**How does it use Rare Friends?**
You play as your own hardwired Generations NFT, drawn with its own canonical on-chain artwork decoded from the Generations registry — the lobby portrait and the in-game sprite are the same frames. The runtime verifies wallet ownership and eligibility before play, and the Friend's family is shown on the character card. The economy is the SDK's RF chance game: RF buys the consumable, outcomes carry RF redemption value, and kept sigils hold their backing with no expiry.

**Source code**
[GitHub repository](https://github.com/BADAKKAKITIGA/friendsdk) · FriendSDK **v0.1.2**. The game lives in `games/inkbound/`.

```sh
git clone https://github.com/BADAKKAKITIGA/friendsdk
cd friendsdk
npm ci
npm run build
npm run dev:game -- games/inkbound
```

Checks:

```sh
npx friendsdk check games/inkbound
node scripts/check-games.mjs
npx friendsdk test games/inkbound
npx playwright install --with-deps chromium
node games/inkbound/check.mjs ./artifacts
```

**Playable preview**
https://badakkakitiga.github.io/friendsdk/

Requires a browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired Generations NFT (generation ≥ 1). No RF funding, private key or transaction signature is needed for the preview.

**How do you play?**

- **Move** `A` `D` or `←` `→` · **Jump / double jump** `Space` · **Slash** `J` · **Dash** `Shift` · **Ignite** `E`. The same actions are on-screen touch buttons.
- Three zones — Ember Shore, Ash Garden, Hollow Gate — each with its own layout, palette, platforms, spikes and enemy mix. Deep enough that you cannot finish a zone by holding right.
- **The gate is sealed until you do the work:** destroy 60% of the zone's shadows and gather 40% of its motes. The objective bars sit at the top of the screen and the gate glows gold when it unlocks.
- Walkers take two slashes, flyers take one. Combos build while you keep killing; five hearts and 1.5s of invulnerability after a hit. Death restarts the zone at full health; the run is three zones.
- **Ignite** a sealed sigil mid-run for a surge: heals, refills Ember, ×1.35 move speed and double slash damage.

**Costs, odds and rewards (RF)**
Everything is simulated for this preview and resets on reload.

| Sigil | Chance | Redemption | Surge |
| --- | --: | --: | --: |
| Ash Wisp | 20.00% | 0 RF | 6.0 s |
| Coal Fleck | 22.00% | 0.25 RF | 6.8 s |
| Ember Bead | 18.00% | 0.5 RF | 7.2 s |
| Copper Sigil | 15.00% | 0.75 RF | 7.6 s |
| Silver Ink | 11.00% | 1.5 RF | 8.3 s |
| Gold Rune | 9.00% | 2.5 RF | 9.1 s |
| Prism Ember | 4.00% | 5 RF | 10.7 s |
| First Flame | 1.00% | 10 RF | 13.4 s |

- **Sealed Ember Sigil** costs **1 RF**; one sigil reserves **10 RF** (the highest prize). The table holds 8 outcomes totalling 10,000 basis points.
- Expected return **0.9475 RF per sigil (~94.75%)**; the remaining ~5.25% is the community pool edge. The SDK check reports `expected reward 947500000000000000; maximum 10000000000000000000 RF base units`.
- Consumable rule: each purchased sigil reserves its maximum prize; pending ignitions and kept sigils cannot share backing; kept sigils retain their RF backing with no redemption expiry.
- Combat, motes and surges are game effects only. They never change the RF outcome, which always comes from the SDK's weighted table.

**What have you tested?**

- `friendsdk check` (expected reward `947500000000000000`, maximum `10 RF`), `node scripts/check-games.mjs`, `npm run build` and a strict `tsc --noEmit` over `index.tsx`, `world.ts` and the CSS module declaration all pass.
- A game-specific browser check, `node games/inkbound/check.mjs`, drives the real sandboxed runtime with read-only fixtures: it buys a hand of sigils, confirms each host confirmation, enters the run, moves/jumps/slashes on a loop, ignites a sigil, asserts the HUD reads the zone and objective bars, and asserts the run stays live or shows a clear/retry panel. It captures `artifacts/inkbound-1-lobby.png`, `-2-play.png` and `-4-outcome.png`.
- `npx friendsdk test games/inkbound` passes against the SDK fixture.
- A real-wallet playthrough is still outstanding; please verify with a funded eligible wallet.

**Known limitations**

- Simulated preview only: no live contracts, transactions, trading or creator fees.
- FriendSDK v0.1.2 exposes one consumable and one weighted table with no persistence APIs, so sigils are a single type and progress is session-local; reloading resets the run. Durable sigils, permanent upgrades and an on-chain journal are documented future integration.
- Each ignite needs a host confirmation that pauses the game while the dialog is open.
- Portrait phones letterbox the 16/9 frame; landscape is recommended.

**Credits**
Built with FriendSDK v0.1.2 (Apache-2.0). Uses the SDK runtime, the canonical Friend sprite reader, the sound kit and the frame/menu components under [NOTICE.md](https://github.com/spokesz/friendsdk/blob/main/NOTICE.md). All scenery, forest, reeds, particles and effects in `world.ts` are drawn procedurally in code in this repository.
