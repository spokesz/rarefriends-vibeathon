# Deeper Dungeon

**Project name**
Deeper Dungeon

**Builder / contact**
[@wasutz](https://github.com/wasutz)

**Category**
Economy Potential

**What did you build?**
A push-your-luck dungeon crawler. Your owned Rare Friend buys a torch on a cavern ledge, walks to the staircase and clears rooms one at a time; after every safe room there is one question — **bank the pot, or go deeper**. Each room is a committed draw into LOOT (the pot climbs a tier), EMPTY (safe, pot unchanged, and one time in five it leaves a curio in the rubble) or TRAP (the run ends and the unbanked pot is lost). Depth caps at 10. Seven carry-items, two slots per descent, bend a run without ever touching its draw. Everything lives inside the SDK's 960 × 640 container: the ledge is the SDK's own isometric world renderer with geometry authored for this game, the dungeon is inline SVG generated from each room's own draw.

**How does it use Rare Friends?**
The Friend is the crawler. Its canonical Generations sprites are read through the SDK from the pinned artwork deployment and drawn on a canvas at an integer 5× scale — never rotated, non-integrally scaled, recoloured or replaced. Wallet connection, owned-Friend selection, the fresh ownership gate, in-frame confirmations and the sandboxed container are all the SDK runtime's; the game adds no navigation, headers, footers, About/Store pages or a separate wallet flow. On the ledge, tapping a sign from any distance walks the Friend over using the SDK's own pathfinder and opens the menu on arrival.

**How RF is spent, and the economy**
**RF is spent in exactly one place:** a **Torch** costs exactly **1 RF** and lights one run. Everything else in the item economy — the banked pot, and the curios it buys — is priced in banked pot, so no second RF debit exists. Every purchased torch reserves the **25 RF maximum prize** for the whole descent, and purchases stop when free stake cannot back another maximum prize; kept caches have no redemption expiry and always sell for their fixed RF value.

The ladder is solved, not chosen. `scripts/tuning.mjs` solves the optimal policy by backward induction over `(depth, tier)` — necessary because empty rooms decouple depth from pot — and the published `game.json` is checked against it:

```
optimal-stopping EV        0.9059 RF per run   (house edge 9.41%)
published-table EV         0.9122 RF per run   (house edge 8.78%)
bust chance                55.40%
average payout when banked 2.0311 RF
maximum prize              25 RF
```

Those price the bank-or-descend decision alone. The shipped game also drops a curio worth **0.4458 RF** in one empty room in five, paid for out of the same edge, so the pot layer **as actually played returns 0.9435 RF at a 5.65% edge**. The drop rate is the dial, and `check:games` fails if it is ever tuned far enough to give the layer away — dropping from *every* empty room hands the player an 8.12% edge over the house.

Tiers 1–5 clear break-even growth `(1 − empty) / loot` by a hair, so descending is correct but only just — that razor edge is the game. Past tier 5 growth is held below break-even, so deep rooms pay spectacularly without ever being the right call: reaching room 6 on the optimal line takes five empty rooms in a row, 0.0076% of runs. The 25 RF Dragon Hoard is a lure, not a plan. [Full tables and the solver's reasoning](https://github.com/wasutz/deeper-dungeon/blob/c325715/README.md#the-loop).

**What would be on-chain?**
Nothing in this build; no transaction adapter, deployment flow, on-chain action or Solidity is implemented. **The honest answer is that push-your-luck is not fully expressible on SDK v0.1.2, and that is the thing to look at first.** The SDK's chance primitive settles one fixed reward per consumable, chosen by its own weighted draw, and credited rewards cannot be clawed back — so a payout that depends on the player's *stop depth* has no action to carry it. Rather than fake it, the prototype runs both halves and labels them in-game (a **Why?** link on every run-over screen):

- **Through the SDK client:** the 1 RF torch purchase (`buy`), the torch burn and run commitment (`play`), the 25 RF reserve, per-run settlement (`settle`) against an 11-outcome table and cache redemption (`redeem`). Backing and reserves behave exactly as the SDK enforces them.
- **Simulated at the game layer:** the banked pot and the curios it buys.

The two agree in expectation (0.9122 RF from the published table against 0.9059 RF from optimal stopping) but they are separate draws, so a session's banked total and satchel value differ by however variance falls. Closing the gap needs a contract action such as `bank(playId, tier)` that settles a committed play at a player-chosen tier bounded by a committed trap depth. **That is the first item for an on-chain phase**, and it would put torches, the ladder, every room result and every cache on-chain.

**How does it use randomness?**
Rooms are commit-and-reveal, provably fair. A 128-bit nonce is drawn and hashed **before room 1**, and `sha256(nonce)` is shown immediately; the nonce is withheld while the run is live — a player holding it could hash the rooms below and stop one room short of every trap — and revealed with the result. Each room is then a pure function of the commitment:

```
roll = sha256(nonce + ":" + playId + ":" + depth) → first 8 hex digits as uint32, mod 10000
room = roll < trapBps ? TRAP : roll < trapBps + lootBps ? LOOT : EMPTY
```

A curio never touches the draw; it overrides what a roll *resolves to* (a Ward passing a trap off as an empty, a Divining Rod forcing loot) and the Verify panel prints both columns. Three further draws — a Lucky Charm's reroll, whether an empty room drops, and which curio it drops — hang off the same nonce under their own tags so none can collide and each stays recomputable. SHA-256 is implemented in `fairness.ts` rather than taken from WebCrypto because the sandboxed frame has an opaque origin, where `crypto.subtle` is not guaranteed to exist; a test holds it to `node:crypto` across block boundaries and multi-byte input.

Two things check it. `scripts/verify.mjs` re-derives a whole run from the nonce while importing nothing from `game/` — digest from `node:crypto`, boundaries read straight out of `game.json` — so agreement is evidence rather than a tautology, and it exits non-zero printing no rooms at all if the commitment disagrees. The in-game **Fair play** panel then tallies every natural room draw against the published weights and reports Pearson's chi-square on two degrees of freedom, so a table that lied about itself would drift away from its own numbers and a player could watch it fail. Both limits are stated in the panel: neither catches a dishonest operator, because in a browser-drawn preview there isn't one — that only becomes a trust guarantee against a contract.

**Source code**
[GitHub repository](https://github.com/wasutz/deeper-dungeon/tree/c325715) · FriendSDK v0.1.2, installed from its [published release archive](https://github.com/spokesz/friendsdk/releases/tag/v0.1.2) with the SHA-512 pinned in `package-lock.json`. Nothing in the SDK is patched.

**Playable demo / how to run**
**<https://deeper-dungeon.vercel.app>** — the built game, deployed from `main` at `c325715`.

It needs a browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet (chain 4663): the SDK verifies ownership before play, and a wallet without an eligible Friend is told so rather than let in. Nothing is funded and nothing is signed — no RF leaves your wallet and no transaction is submitted. Session state is in memory only, so a reload starts fresh.

To run it locally with Node.js 22+ and the same wallet:

```sh
git clone https://github.com/wasutz/deeper-dungeon.git
cd deeper-dungeon
git checkout c325715
npm ci
npm run dev
```

Open **http://localhost:4173**, choose **Connect wallet**, pick your Friend. For a phone over your LAN: `npx friendsdk dev ./game --host 0.0.0.0 --port 4173`.

**How do you play?**
On the ledge, move with WASD / arrow keys or tap a destination; tap the **Torch Vendor** or **Dungeon Entrance** sign from anywhere and the Friend walks over and opens the menu on arrival, or press <kbd>E</kbd> once you are there. Buy a torch, optionally spend banked pot on up to 2 slots of curios, then take the staircase — it consumes the torch and commits the run. In the dungeon: <kbd>B</kbd> or **Bank**, <kbd>D</kbd> / <kbd>Space</kbd> or **Descend**, tap a curio to spend it, <kbd>R</kbd> / <kbd>Enter</kbd> to run again. Sound is on by default; mute, reduced motion, the odds table and the session log live in the **Menu** chip, which belongs to the ledge — a descent makes the ledge inert, so those are reachable between runs rather than during one. Reduced motion is seeded from the OS preference and then follows the toggle in both directions: on, rooms resolve instantly and nothing animates; off, the reveal plays even for a player whose OS asks for stillness, because they asked for it here.

**Costs and rewards**
Everything is simulated and labelled as such in-game. One **Torch** = **1 RF**, one run. Room weights by depth and the pot at each loot tier:

| Depth | Trap | Loot | Empty | Pot at that tier |
|---:|---:|---:|---:|---:|
| 1 | 15% | 70% | 15% | 1.10 RF |
| 2 | 18% | 67% | 15% | 1.40 RF |
| 3 | 22% | 63% | 15% | 1.90 RF |
| 4 | 28% | 57% | 15% | 2.80 RF |
| 5 | 35% | 50% | 15% | 4.85 RF |
| 6 | 42% | 43% | 15% | 5.65 RF |
| 7 | 50% | 35% | 15% | 7.00 RF |
| 8 | 58% | 27% | 15% | 9.35 RF |
| 9 | 65% | 20% | 15% | 14.25 RF |
| 10 | 70% | 15% | 15% | 25.00 RF |

The trap column is indexed by depth, the pot column by loot tier — an empty room takes you deeper without growing the pot, which is what keeps stopping a decision rather than a table lookup.

Settlement pays one of 11 outcomes: Lost to the dark 55.34% (0 RF), Tin 22.19% (1.10), Copper 7.04% (1.40), Iron 4.43% (1.90), Silver 2.53% (2.80), Gold 8.42% (4.85), then Amber (5.65), Opal (7.00), Ruby (9.35), Obsidian (14.25) and the Dragon Hoard (25.00) at 0.01% each — the run-result distribution under the EV-optimal line, every tier floored at 1 bp so all eleven stay representable and redeemable. Kept caches have no redemption expiry.

Seven curios, bought with banked pot or found in 20% of empty rooms, two slots per descent. Every price is **solved, not chosen** — a curio is worth the expected pot it adds to one run, priced at the same RF-per-RF rate the torch charges, and `check:games` asserts the published prices against the solver so they cannot drift:

| Curio | Slots | Price | Effect |
|---|---|---|---|
| Ward | 1 | 0.27 RF | Armed before a room; that room's trap passes like an empty. Spent either way. |
| Lantern | 1 | 0.27 RF | Reveals the next room's committed result before you choose. |
| Escape Rope | 1 | 0.42 RF | On a revealed trap, leave with half the pot. |
| Loot Sack | 1 | 0.52 RF | Banking pays one rung higher than the tier you stopped on. |
| Divining Rod | 1 | 0.52 RF | Overrides the next room's draw: loot, guaranteed. |
| Greed Idol | **2** | 0.92 RF | Loot advances two tiers; every room's trap chance +10 points. |
| Lucky Charm | 1 | 1.14 RF | On a revealed trap, reroll the room against a second committed draw. |

Overlaps are published rather than tuned away: Divining Rod + Lucky Charm is superadditive by 21% and the strongest legal loadout at 3.00× baseline; Escape Rope + Lantern is 15% *sub*additive, because a rope caps what a trap costs so foreknowledge of one is worth less. The Greed Idol takes both slots precisely because pairing it with protection priced at more than double the sum of its parts.

**What have you tested?**
All of the following pass on `c325715` from a clean tree:

- `npm run typecheck`
- `npm test` — 22 tests: SHA-256 against `node:crypto`, 40 000 committed draws held to a chi-square bound, room boundaries, curio effects, the tagged reroll and drop draws held to the tags the Verify panel prints them under, carry-slot rules, and the independent verifier held to the shipped resolver
- `npm run check:games` — definition, weights, roll boundaries, the economy and the solved item prices
- `npm run build` — the static bundle the preview is deployed from; the live `runtime.js` is byte-identical to this build
- `npm run check:browser` — end-to-end at **1100 px and 360 px** against the real runner with the SDK's mocked wallet, identity and canonical sprite fixture: connect, select, keyboard and touch movement, walk-over interaction, vendor purchase, a committed descent, bank and bust, the `paused` lock, one-tap restart, verification, the satchel, the curio shelf and loadout picker, a room overridden by a Divining Rod, session calibration, mute and reduced motion, and that nothing escapes the container or covers a control

Played by hand with a real wallet and an owned Generations Friend.

**Known limitations**
- **The stop-depth payout is not expressible on SDK v0.1.2** (see *What would be on-chain?*). The banked pot and the curio economy are simulated at the game layer and labelled in-game; they agree with the ledger in expectation but are separate draws.
- **The fairness proofs are demonstrations, not guarantees.** The nonce is drawn in your own browser, so there is no house on the other side; the chi-square panel catches a bug drifting from the published table, not an operator. Its bands are approximate (Poisson-binomial rather than multinomial, which errs towards calling an honest table honest), and it is recomputed after every room, so it crosses a band more often than a fixed-sample false-alarm rate suggests.
- The `uint32 mod 10000` fold leaves 7296 buckets holding one extra preimage, so a published 15.00% band is really 15.0000094%. Rejection sampling would remove it at the cost of a retry loop a verifier has to replay by hand.
- Progress is in memory only: a reload starts a fresh session.
- No live token spending, trading, wearable NFTs or creator fees. Live mode has never run against a deployed contract.

**Credits**
No third-party artwork, audio or fonts are bundled. The cavern ledge uses the SDK's own isometric world renderer and prop set with geometry authored in `world.ts`; the dungeon rooms are inline SVG generated in `descent.tsx`, seeded from each room's committed draw; the curio icons are hand-authored one-bit 16 × 16 masks painted by the SDK's own `ItemArt`. Friend sprites come from the SDK's pinned canonical artwork deployment, and sound is the SDK's ten-cue kit. Typefaces are the platform monospace stack; nothing is downloaded at runtime. [Full notices](https://github.com/wasutz/deeper-dungeon/blob/c325715/NOTICE.md).
