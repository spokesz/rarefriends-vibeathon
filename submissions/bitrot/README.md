# BITROT

**Builder:** kamiyahame ([@kamiyahame](https://x.com/kamiyahame) · [github.com/kamideathless](https://github.com/kamideathless)) · **Category:** Economy Potential and Token Activity · **SDK:** none — see *Stack* below

**Stack:** no FriendSDK. Vanilla ES modules and a canvas on the client, a Node 22 server using the
built-in `node:sqlite`, and **zero runtime dependencies on either side**. This is the Vibeathon's
independent-stack path: the game needs no wallet and no ownership gate, so anyone can play the
preview.

A 1-bit cellular-automaton arcade game where you dive into a decaying Rare Friends archive to pull
corrupted Friends out of the spreading rot, then **burn simulated $RAREFRIENDS to rebuild the exact
pixels the rot ate** — which is also what unlocks each Friend's permanent perk.

## Links

- **Playable preview:** https://kamideathless.github.io/bitrot/ — landing page at `/`, game at `/play.html`
- **Source:** [github.com/kamideathless/bitrot](https://github.com/kamideathless/bitrot/tree/217fd0d5127d4e506c0b214914340c5b3d885b34) (pinned to the reviewed commit `217fd0d`)

**Wallet and network requirements: none.** No wallet, no chain, no sign-in, no install, no ownership
gate. Any modern browser, desktop or touch. The only network traffic is between the game and its own
server.

The Pages preview is static, so it serves the fully playable **local sandbox**. Verified play and
the leaderboard need the bundled Node server — see *Run it* below.

## Run it

Requires Node.js 22.5+ (for the built-in `node:sqlite`). No build step, no `node_modules`.

```sh
git clone https://github.com/kamideathless/bitrot.git
cd bitrot
git checkout 217fd0d5127d4e506c0b214914340c5b3d885b34
npm start          # landing page, game and API on http://127.0.0.1:4173/
npm test           # 164 tests, including the full server suite
```

For a public deployment:

```sh
BITROT_SECRET="$(openssl rand -base64 32)" BITROT_SECURE_COOKIES=1 NODE_ENV=production npm start
```

The server refuses to start in production without `BITROT_SECRET`, and there is no default in the
repository. A static host (GitHub Pages) can serve the landing page and a fully playable **local
sandbox**, but verified play and the leaderboard need the Node server.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Move | `W A S D` / arrows | drag on the left half; the stick appears under your finger |
| Purge | `Space` / `J` — one press per purge | `PRG` |
| Dash (invulnerable) | `Shift` / `K` | `DSH` |
| Select | `Enter` | tap |
| Pause / back | `Esc` | ▮▮ top right |
| Mute | `M` | Settings |

Every screen is keyboard navigable. Settings has mute, reduced motion, a CRT overlay toggle and a
true inverted palette; the game also honours `prefers-reduced-motion` on its own.

## Rules

You start in a cleared pocket of a 40×23 arena with 3 integrity and a full purge cell.

- The arena is a **cellular automaton**. Each generation a clean cell may rot, with a chance that
  climbs steeply with its rotten-neighbour count (0.5% at one neighbour, 78% at eight). Rot never
  dies on its own.
- **Purge** costs one charge per press; holding does nothing. It eats a disc for as long as its
  ring is on screen, centred on *you* — so moving during a purge drags the cleared ground with you.
  Cleared ground is *scarred* and cannot rot again for 14 generations. That is the whole skill:
  shaping the board rather than panic-clearing it.
- **Shards** are +1 RF and +9 energy; the rot eats them if you are slow. They never spawn within
  5 cells of you, so they cannot be farmed in place.
- **Capsules** hold a Friend. First at 14s, then every 19s, surviving 6s buried — purge one free.
  Rescuing restores 1 integrity, and rescuing is the *only* way to heal.
- **Defrag canisters** wipe every rotten cell on the board. They always spawn in the worst place on
  the map.
- Every **45s** the archive drops a sector: decay accelerates, the payout multiplier rises, and every
  purge costs ~11% more energy. From 18s the rot also seeds itself right next to you on a tightening
  timer, so camping a cleared corner does not work.
- Touching rot costs 1 integrity and grants 1.35s of invulnerability. At 0 integrity the dive ends.

## Server-verified play

The game is not a page that keeps its own score. `Run` is deterministic — same seed, same stats,
same inputs, same dive — so the client never reports an outcome, it reports what buttons were
pressed, and the server replays the dive itself.

1. `POST /api/run/start` — the **server** picks the seed and freezes the account's stat block into a
   single-use, expiring, account-bound ticket.
2. The browser plays, recording one 12-bit code per tick, run-length encoded. A 60-second dive is
   about **7 KB**.
3. `POST /api/run/submit` — the server re-simulates the dive with its own seed and stats, derives
   the score, the RF and the rescued Friend ids, and applies them to the stored save in one
   transaction. **~40 ms** for a 60-second dive.

Put any `score` you like in the request body; it is never read. That is one of the tests.

Upgrades and restoration burns are likewise applied server-side to the stored balance. When the
server is unreachable the game runs as a clearly-labelled local sandbox that is never submitted —
and there is deliberately **no merge** between the two, because reconciling divergent economies is
how duplication bugs are born.

Accounts are anonymous: a random id plus a one-time recovery key hashed with scrypt. No passwords,
no email, nothing personal stored.

### Security

| Concern | Handling |
|---|---|
| Score / currency forgery | server-side replay; client outcomes never read |
| SQL injection | `node:sqlite` prepared statements only; no SQL built from strings |
| XSS | strict CSP (`script-src 'self'`, no inline script or style); names sanitised on write |
| CSRF | `SameSite=Strict` cookie **+** required per-session header token **+** origin check |
| Session theft | `HttpOnly`, `Secure` behind TLS, stored as SHA-256 hashes, rotated on restore |
| Brute force | scrypt, constant-time compare, equal work for a missing account |
| Path traversal | resolved path verified inside the root; `data/`, `server/`, dotfiles never served |
| Floods | fixed-window limits per IP and per account, with a bounded key map |
| Replay CPU exhaustion | hard tick ceiling, byte ceiling and a wall-clock budget per replay |

## Simulated economy

> **All balances, purchases and rewards in BITROT are simulated.** No wallet, no chain, no real
> $RAREFRIENDS is minted, spent or burned. Balances are rows in the game's own SQLite database, and
> the in-game ledger labels them as simulated on every screen.

### Earning

| Source | RF |
|---|---:|
| Shard | 1 |
| Friend rescued | 24 |
| Defrag triggered | 12 |
| Per sector reached | 6 |
| Sector multiplier | ×(1 + 0.09 per sector past the first) |
| Duplicate Friend, salvaged | 10 / 20 / 40 / 85 by rarity |

Reference figures from the repo's scripted-pilot harness (`npm run tune`):
~65 RF/run with no upgrades, ~145 at mid gear, ~475 fully geared.

### Two competing sinks

**Upgrades — spent, not burned.** Six lines, 40–420 RF per level: purge radius, energy capacity,
scar duration, max integrity, move speed, pickup range.

**Restoration — burned.** Every rescued Friend arrives at 22–48% integrity, with the missing pixels
literally missing from its 16×16 portrait. Burning RF restores 10% at a time, in an order fixed per
Friend, and those tokens are destroyed and tracked separately on the ledger.

`cost = 17 RF × rarityMultiplier × (1 + 2.4 × progress)` per 10%, so the last pixels cost the most.

| Rarity | Probability | Restore multiplier | ~RF to 100% | Early runs | Geared runs |
|---|---:|---:|---:|---:|---:|
| COMMON | 62% | 1.0× | ~240 | 3.7 | 0.5 |
| RARE | 26% | 1.7× | ~430 | 6.6 | 0.9 |
| EPIC | 9.5% | 2.6× | ~705 | 10.8 | 1.5 |
| GENESIS | 2.5% | 4.5× | ~1220 | 18.7 | 2.6 |

Every upgrade level together costs 3 460 RF — roughly seven fully-geared dives — so gear and
restoration really are competing for the same wallet.

At 100% integrity the Friend's perk activates while equipped — one of eight (purge radius, energy
regen, move speed, shard value, dash cooldown, max integrity, pickup range, scar duration), scaled
by rarity. So each run asks the same question: **spend on gear to survive longer and earn more, or
burn on a Friend for a permanent perk and an intact portrait?**

### Why this is an economy and not a counter

The burn is *legible*. You can see exactly what your RF bought, pixel by pixel, on the portrait of
the specific Friend you chose to save. That gives a token sink a collection narrative rather than a
fee, and it scales naturally: rarer Friends cost more and are worth more, duplicates feed the faucet
back, and the two sinks compete for the same wallet.

### Does this inflate the $RAREFRIENDS supply?

No — and it is worth being precise about why, because "burn" claims are cheap.

**Today the supply is untouched because the game never touches it.** BITROT mints and burns nothing
on any chain. RF here is an integer column in the game's own SQLite, scoped to one account. Total
$RAREFRIENDS in existence before and after a dive is identical. The burn ledger is an accounting
record of tokens destroyed *inside the simulation*, and every screen that shows a balance says so.

Inside the simulation, play does create RF. That is a faucet, and pretending otherwise would be
nonsense. The real question is what happens when that faucet is wired to a live token — and the
answer is that it never becomes a mint:

**1. The faucet is a funded reserve, not an issuance.** In production, rewards are paid *out of* a
pre-funded prize reserve — the same backing model the reference Fishing submission uses — while
restoration burns to an unrecoverable address. The loop is `reserve → player → burn`, so circulating
supply only ever moves **down**. No game action calls `mint`. When the reserve empties, payouts
stop; they do not print.

**2. The reserve, not the farming rate, is the cap.** This is what makes "you can farm forever" a
non-issue. However fast anyone farms, nobody can extract more than the reserve holds. Emission is
bounded in absolute terms by a funding decision made up front, not by game balance holding.

**3. The per-dive faucet is bounded, which is what makes the reserve pricable.** A dive cannot run
forever: the input trace has a hard 600-second ceiling and the server enforces it on replay
(`tests/invariants.test.js` asserts every dive terminates inside that window). Inside those 600s the
spawners are rate-limited too — one shard replacement per 0.5s, one capsule per 19s, one defrag per
40s, sector 14 at the deepest. Multiplied out, **no single dive can pay more than ~7 400 RF**, and
that bound assumes taking a shard every half second for ten minutes without being touched once. Real
best play is ~475. Submissions are additionally capped server-side at 20 per account per minute.

**4. The sink scales with the thing players actually want.** Restoration cost rises per 10%
(`×(1 + 2.4 × progress)`) and by rarity (up to 4.5×), and the perk only activates at 100% — so the
most-wanted outcome is also the most expensive. One GENESIS Friend at ~1 220 RF costs more than two
and a half fully-geared dives, and the collection never stops asking: there are 200 160 distinct
Friends.

**The honest limitation:** in this build a player who only buys upgrades takes more out of the faucet
than they put into the burn. Upgrades are a **spend**, not a burn — RF leaves the player, and in a
production build would return to the reserve rather than being destroyed. Net destruction comes from
restoration alone. Making that ratio reliably positive is a reserve-funding and pricing exercise, and
it is deliberately left as one rather than hard-coded into a hackathon MVP.

## How it uses Rare Friends

Every Friend is derived from a **6-hex-digit id**: form, crest, optics, vox, gear, marking, rarity,
generation, name, perk and the pixel-restoration order are all pure functions of that one number —
the same relationship a tokenId has to a Generations NFT.

```js
friendTraits('7A31C4')
// → { head:'gem', ears:'cat', eyes:'star', mouth:'fang', accessory:'crown',
//     pattern:'rim', rarity:'EPIC', generation:4, name:'QUEDAR', perk: … }
```

`friendSprite(id, integrity)` is the single seam where a production build would swap the procedural
portrait for the canonical Rare Friends artwork served through FriendSDK — the corruption mask works
on any 16×16 source. The logical screen is 480×320 and presents at **960×640**, deliberately the same
viewport FriendSDK reference games use, so the game would drop into the SDK container unchanged.

Art is procedural here so the preview runs for anyone with no wallet and no ownership gate, which is
what the Vibeathon's independent-stack path asks for.

**What a production build would need:** FriendSDK wallet + Friend selection with the ownership gate
intact, canonical artwork, a real on-chain burn for restoration with an authority for the RF faucet,
and server-side score validation.

## Checks

```sh
npm run check   # imports every module, then the full suite
npm test        # 164 tests (node:test, no dependencies)
npm run tune    # balance harness
```

**164/164 passing**, with no mocks — the server tests drive the real HTTP server on an ephemeral
port against an in-memory database, and the integration tests drive the actual play scene through a
real dive and submission. The suite covers the automaton (walls never eaten, rot never shrinks, scars block
rebirth then expire, purge respects the wall ring), the economy (costs rise, purchases are immutable
and refuse when broke, `burnRestore` destroys exactly what it spends), Friends (traits pure in the
id, restoration only ever adds pixels and in a stable order, rarity distribution in band), runs (the
player cannot leave the arena, idling is fatal, purging and upgrades measurably buy time, shards
cannot be farmed in a corner, same seed replays identically), saves (hostile/corrupt input clamped,
a throwing `localStorage` survived), the renderer (never writes out of bounds, dither monotonic,
every glyph well-formed), a headless render of **every screen** on a fresh save, a full save, with
reduced motion and in touch mode, and a layout probe that records every string and panel drawn and
asserts nothing collides, leaves the screen or spills out of its frame.

Browser checks by hand in Chromium: title → briefing → hub → dive → pause → death → report →
archive → burn-to-100% → equip → upgrade purchase, at ×1/×2/×3 integer scales, no console errors.
Measured 12.1ms average frame time (worst 13.1ms) during a dive.

### Known issues and limits

- **Offline progress is a sandbox and is discarded** when the server is next reachable. Signposted
  in the HUD, on the report screen and in the terminal footer.
- **The recovery key is the only way back into an account** — no email, so no reset.
- **Replay proves the inputs, not the player.** The server proves a dive really was produced by the
  submitted inputs, which kills fabricated scores and currency — but it cannot prove a human pressed
  them. A scripted optimal pilot is indistinguishable from an excellent one. A live economy would
  need that handled separately (proof of humanity, or per-account reserve draw limits); the reserve
  cap above is what keeps it from being a supply problem rather than a leaderboard one.
- Rate limits are per-process and in memory; a multi-instance deployment would need them shared.
- Replay cost is bounded per request and rate-limited, but there is no global work queue.
- No moderation tooling beyond a `banned` column.
- The landing page needs JavaScript (it draws itself with the game's engine); there is a plain
  fallback with a link to the game.
- Audio starts only after the first keypress or tap (browser autoplay policy).
- Touch controls were tested in Chromium device emulation and on a touchscreen laptop, not across a
  range of real phones.
- The arena is a fixed 40×23 with no camera or scrolling world.
- The difficulty ramp tops out around 370s, so very long runs are possible with perfect play.
- Friend portraits are procedural placeholders, not Rare Friends artwork.

### Risks involving wallets or funds

**None.** The project never connects a wallet, never signs anything, and contains no contract code.
The only network traffic is between the game and its own server. Every balance is a row in that
server's SQLite database, labelled as simulated on every screen it appears on.

This has not had a third-party security review and has never run under real load. The threat model
it is built against is a player trying to cheat the economy and the leaderboard, plus ordinary web
hygiene — not a targeted attacker with resources.

## Credits

All code, both bitmap fonts, the procedural Friend art and the chip synth were made for this
Vibeathon. No third-party assets, no runtime dependencies. MIT licensed.
