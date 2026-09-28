# Rare Heist

![Rare Heist: your Rare Friend slips past a drone, takes the trophy and escapes clean](https://raw.githubusercontent.com/warninghejo-blip/rare-heist/main/media/rare-heist.gif)

**Project name**
Rare Heist

**Builder / contact**
[@warninghejo-blip](https://github.com/warninghejo-blip)

**Category**
Character Spotlight (also entering Token Activity and Economy Potential)

**One sentence**
A turn-based stealth heist in a 1-bit cutaway building where the thief is your own Generations Friend, drawn from its original on-chain frames, and players take turns rewriting one shared vault.

**Play it**

| Link | What you get | Wallet |
|---|---|---|
| **[▶ rareheist-bc89faa0.sslip.io](https://rareheist-bc89faa0.sslip.io/)** | The full game, including the shared **Last Heist** server | None needed to play. Connect one to play as the Friend you own. |
| [warninghejo-blip.github.io/rare-heist](https://warninghejo-blip.github.io/rare-heist/) | Static mirror on GitHub Pages: everything except shared Last Heist rounds | Same |
| [Friend Edition on FriendSDK v0.1.2](https://warninghejo-blip.github.io/rare-heist/friend-edition/) | A landing page with two doors: the FriendSDK build (`friend-edition/app/`: lessons and the 14-job campaign inside the official FriendSDK host, with its wallet, Friend selection and ownership gate) or the full game as a guest | The SDK build needs a Generations NFT, generation 1 or higher, on Robinhood mainnet |

Pitch: https://warninghejo-blip.github.io/rare-heist/pitch/

Trailer (1:50, cut from the game's own engine and renderer): [720p](https://github.com/warninghejo-blip/rare-heist/blob/main/media/rare-heist-trailer-720p.mp4) · [1080p](https://github.com/warninghejo-blip/rare-heist/blob/main/media/rare-heist-trailer.mp4)

Every level, solved (proof video, 2:44: all 23 levels beaten by the stored solutions, rendered by the game's own engine): [720p](https://github.com/warninghejo-blip/rare-heist/blob/main/media/all-levels-solved-720p.mp4) · [1080p](https://github.com/warninghejo-blip/rare-heist/blob/main/media/all-levels-solved.mp4)

**Source code**
[github.com/warninghejo-blip/rare-heist @ `3e486a7`](https://github.com/warninghejo-blip/rare-heist/tree/3e486a79d1cb7a3dfaa4b86b4d6a9df905eb4dff) · MIT

- Main build: plain JavaScript, one self-contained `index.html`, plus a small Node 22 + SQLite server for Last Heist. No framework, no bundler, no dependencies.
- Friend Edition: FriendSDK v0.1.2 (`friend-edition/app/` in the same repository, behind a landing page at `friend-edition/`), same engine and levels.

**Why two builds**
FriendSDK v0.1.2 is the right home for the character: the Friend Edition uses its wallet, Friend selection and ownership gate. The full game needs three things the SDK sandbox does not provide yet: a shared server that re-verifies every submitted route (Last Heist), saved progress across 22 jobs, and one opt-in wallet transaction (LIVE BURN). It follows the SDK game rules anyway: a 960 × 640 play area, keyboard and touch, loading and error states, SOUND and MOTION toggles.

## How it uses Rare Friends

**You play as the Friend you own.**
1. **CONNECT WALLET** (EIP-6963 or `window.ethereum`) switches to Robinhood Chain (4663).
2. The game finds your hardwired Generations Friends the way FriendSDK's `readOwnedFriends` does: `balanceOf`, owner-filtered `Transfer` history, then a fresh `ownerOf` and `generation` check.
3. Your Friend's own idle and walk frames are read from the registry (`familyOf`, `seedOf`, `frames`).

- **Drawn as the original.** 16 × 16 1-bit frames, never redrawn or recoloured; integer scale, black mask, white one-pixel halo, as in the FriendSDK reference.
- **Checked on mainnet.** A real holder wallet with 13 Generations returned the same 12 playable Friends as FriendSDK's `readOwnedFriends` (generation 0 and burned tokens excluded), in about 7 seconds. Frames match the SDK sprite reader bit for bit.
- **No wallet?** PREVIEW any Friend by token ID, view any holder's Friends read-only, or play as a guest with the FriendSDK samples #3412 Skeleton and #7730 Hoverer.
- **Your Friend is in the replays.** Last Heist replays show each player's own Friend.
- **The Friend is the star.** Picking a Friend opens a reveal with its walking frames, #ID, family and generation. Its portrait faces you and breathes on the home screen and leads the play bar and every result, staged at the open exit or under a searchlight ("#7730 Hoverer was spotted"). Last Heist, the burn ledger and My Runs show players as their Friends (#ID and sprite; unnamed players read "Friend #ID"). In the building it keeps its exact 1-bit pixels, lit by a night-shift palette with one signal colour, `#CCFF00`, from the SDK's scenery.

## How do you play?

You move one cell, then security moves. Cameras, lasers, drones and guards on foot run on fixed, readable clocks, so every job has a clean route. **One detection ends the job.** Guards see three cells ahead with a flashlight (one in the dark) and ignore EMP: cut the lights, wait in a ladder hatch or walk behind them.

| Input | Action |
|---|---|
| Click / tap a cell | walk there; stops before a step that would be seen |
| ← → / A D, ↑ ↓ / W S | walk, climb |
| Space | wait one turn |
| E / L / Q | vent / light switch / EMP (sensors off for 4 turns) |
| I | INSPECT a device's next beats without spending a turn |
| Z / R | rewind (practice) / retry |

**Content:** 5 lessons, 14 campaign jobs (guards on foot in 7 of them), 3 Black Archive jobs and the shared Last Heist vault. Each job has three marks: CLEAN (no EMP), ALL INTEL and PAR. INTEL is the security plans: taking it draws every patrol route, with its turn points, and every camera sweep on the building for the rest of the job. Every level ships with a stored solution you can watch.

**Last Heist:** clear the current vault, then drag one wall, laser or camera from the side palette onto it. A built-in solver checks at once that it breaks the previous winning route and that the vault can still be beaten; then you prove your version by clearing it yourself. The server replays every route with the same engine. The last accepted solver when the round closes collects the DEMO prize.

## Costs and rewards

DEMO is the default on every load and everything a player needs is free.

**Simulated (default)**

| Item | Rule |
|---|---|
| Last Heist sponsor pool | 20,000 DEMO RF, fixed, never refilled. 1,000 reserved per round. |
| Winner | Last accepted clean solver before the deadline, if at least two different sessions cleared |
| Empty or uncontested round | Reservation returns to the pool. Invariant: initial = available + reserved + paid |
| Last Heist stake rounds (the core loop) | Playable in DEMO RF: 50 per entry from a 200-a-day guest wallet, 70% of the pot to the winner, 30% burned, every stake refunded when fewer than two sessions clear. Settled on the server with the invariant stakes = paid + burned + refunded + held. |
| DEMO Studio | Themes and a level pack for DEMO RF; proposed split 70% creator / 20% burn / 10% developer. Cosmetic only. |
| Solo jobs | No payout. Marks are local progress. |

The economy is two parts: **stake rounds in Last Heist** (the core loop, DEMO RF today) and a **shop where every real RF is burned**. Nothing else: no faucets, no play-to-earn, no ranks or titles.

**Shop: LIVE BURN (beta, opt-in, real $RAREFRIENDS)**

Studio → LIVE BURN. One plain ERC-20 `transfer(0x…dEaD, price)` on the RF token `0x0779…B71f`, confirmed twice in the game and once in the wallet. **100% is burned; nobody is paid.** No approvals, no signatures, no contract of ours.

| Item | RF, burned | Unlocks |
|---|---|---|
| The Black Archive | 50 | three extra heists (harder, not stronger) |
| Golden Trail | 25 | a trail behind your Friend |
| Hatchwork / Signal Paper | 10 each | interface themes |

No randomness, no consumables, no gameplay advantage, no refunds. Unlocks are granted only from a receipt where the RF contract logged `Transfer(player → 0x…dEaD, ≥ price)`. A 32-byte tag after the call data names the item and the Friend.

**Token Activity**
- **Stake rounds are the reason to come back.** Last Heist opens on the stake round: every entrant stakes 50, the last thief standing takes 70% of the pot and 30% is burned; with fewer than two clearing sessions every stake comes back. Playable now in **DEMO RF** (play money on the server, invariant stakes = paid + burned + refunded + held).
- **The shop burns real RF today**, 100% to `0x…dEaD`, for items worth having: three extra heists, a trail behind your Friend, two themes.
- **A transparent burn ledger.** Studio → LIVE BURN shows "RF burned through Rare Heist: N" and every tagged Rare Heist burn read from chain logs: item, amount, Friend #ID if tagged, and a link to the transaction on the Robinhood Chain explorer. Your own purchases are listed below it. No leaderboard, no titles.
- Every burn is the same single `transfer` to `0x…dEaD` with the same receipt check and one-burn-at-a-time lock across tabs.

**Economy Potential**
Studio → **RF ECONOMY** leads with stake rounds: DEMO RF in live pots, entrants, DEMO RF burned so far, the last winners, and a **From DEMO RF to real RF** roadmap card: DEMO stake rounds (now) → an audited escrow contract → one Friend one entry → results anyone can check → legal review → real-RF rounds with 70% to the winning Friend's own wallet and 30% to `0x…dEaD` in the settlement transaction. Then where RF goes (shop live, stake rounds DEMO, **no live faucets**), live chain counters (burned via Rare Heist, by you, at `0x…dEaD`, `totalSupply`) and an editable calculator, "What would Rare Heist burn per month with real RF?", labelled **PROJECTION, NOT A RESULT**. With its defaults (10 stake rounds a day, 6 entrants, 80% with a winner; 300 players a day, 3% buying a 20 RF item) it projects 21,600 + 5,400 = 27,000 RF a month.

Faking a contest with a second session burns 30% of your own stake, so self-dealing never profits. The production design ([docs/STAKES.md](https://github.com/warninghejo-blip/rare-heist/blob/3e486a79d1cb7a3dfaa4b86b4d6a9df905eb4dff/docs/STAKES.md)) is an escrow on Robinhood Chain: `stake(roundId, friendId)` after `approve`, one Friend one entry checked with `ownerOf`, the result posted by a server key with a challenge window and checkable by anyone replaying the published routes, 30% sent to `0x…dEaD` in the settlement transaction, the prize claimed by the winning Friend's token-bound account, liveness refunds, pause without trapping funds, and an audit checklist. It stays simulated for now: the rules ask for it, the contract is not written or audited, and guest sessions are not people.

First mainnet burn through the game: none yet at submission time. The burn ledger in Studio → LIVE BURN lists every Rare Heist burn from chain logs as it happens.

Economy design, the burn ledger, the calculator model and what would go on-chain next: [docs/ECONOMY.md](https://github.com/warninghejo-blip/rare-heist/blob/3e486a79d1cb7a3dfaa4b86b4d6a9df905eb4dff/docs/ECONOMY.md).

## What have you tested?

| Check | Result |
|---|---|
| `node --test tests/levels.test.cjs tests/burn.test.cjs tests/burn-history.test.cjs tests/solver.test.cjs tests/solutions.test.cjs`: every level is a valid engine map with a clean route; LIVE BURN encoding, tags (old Tribute/Bounty codes still decode), receipt-forgery checks, retired items refused before the wallet; solver and stored solutions | 125/125 |
| `npm test`: shared mode against the real Node/SQLite server, two sessions, clear, lead shown as the Friend that played | 10/10 |
| `tests/campaign-browser.mjs`: whole campaign played through the UI with the keyboard | 14/14 jobs won |
| `tests/wallet-browser.mjs`: wallet flow and LIVE BURN against a mock EIP-6963 wallet answering like the Generations, registry and RF contracts, burn ledger with explorer links | 28/28 |
| `tests/travel-browser.mjs`: click-to-travel stops before any step that would be seen | 5/5 |
| LIVE BURN safety in the browser: one burn at a time, no second transaction while a burn is pending or its outcome is unknown (wallet timeout, reload, another tab), restore only from a later block with the attempt nonce, unlocks survive restore, retired items not for sale (pending, inflight, unknown, restore, classify, nonce, samehead, tabs, persist, release) | 16/16, 11/11, 16/16, 2/2, 6/6, 7/7, 4/4, 7/7, 11/11, 29/29 |
| Friend discovery on Robinhood mainnet, read-only, real holder wallet | 12/12 Friends, same set as FriendSDK |
| RF token checked on chain | `name` RareFriends, `symbol` RAREFRIENDS, `decimals` 18, chain 4663 |
| Friend Edition: `friendsdk check`; `friendsdk test` at 960 and 360 | valid; PASS, PASS |
| Friend Edition in the SDK host with a test wallet: lesson 1 by keyboard, campaign job 02 by touch buttons, input ignored while the SDK menu is open | won, 0 alarms; 23 turns under PAR 26; turn 0 → 0 |
| Friend Edition static build on GitHub Pages without a wallet | ownership gate shown, 0 page errors, 0 failed requests |
| `tests/burn-ledger-browser.mjs`: four shop items only, the burn ledger (old Tribute/Bounty burns still named, newest first, explorer links), no ranks or bounty anywhere, Last Heist opening on the stake round, a legacy Bounty lock still blocking, RF ECONOMY stake headline, roadmap, counters and calculator, phone | 33/33 |
| `tests/stakes.test.mjs`: DEMO stake rounds on the real store and API (70/30, refunds, idempotent settlement, no negative balances, one stake per session, parallel HTTP and four threads on one SQLite file, database upgrade) | 11/11 |
| `tests/stakes-browser.mjs`: stake flow in the real UI against the real server, settlement card, refund, RF ECONOMY stake headline, pipe and calculator, phone | 28/28 |
| Independent review of the LIVE BURN money path (separate reviewers, mock wallet, reproducible probes): double-send across tabs, reloads, wallet timeouts and ambiguous errors, restore binding, retired items | 11 rounds; every finding fixed and re-checked; no open findings |

## Known limitations

- Guest sessions are not unique people: two browsers can collude in Last Heist, so no valuable prize should depend on the guest version. Stake rounds are DEMO only for this reason, among others.
- The Last Heist server labels attempts with a Friend ID but does not verify ownership.
- Safari and physical phones were not tested by hand; the phone layout is tested in an emulated 390 px viewport.
- The Friend Edition is lessons and campaign only; Last Heist, saves and LIVE BURN need the full build.
- If a wallet's own RPC cannot serve archive reads, discovery falls back to the official Robinhood Chain RPC (the account still comes from the wallet).

## Credits

- Rare Friends character artwork: canonical Generations sample frames from FriendSDK v0.1.2 (commit `762d6f5`), used under the FriendSDK NOTICE.
- Code, levels, scenery, trailer and music: original to this project.
