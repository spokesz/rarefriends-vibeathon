# Kaldareth: The Healed Shadows

## Project name

Kaldareth: The Healed Shadows

## Builder

gimogo — 235aryugi@gmail.com

## Category

- **Character Spotlight** (primary) — the verified Rare Friend *is* the player
  character: every run is titled by the Friend, keyed to its token id, and the
  Friend is never a side decoration.
- **Economy Potential** (secondary) — the entry-fee split (50% prize pool /
  30% circulation / 20% burn) is fully modelled, with a weekly harmonic prize
  ladder, a researchable pot cap, and the Friend as the quota subject. The run
  ladder is an escrow: what a run leaves unearned returns half to circulation
  (the treasury keeps the rest), and every finisher pays a 250 RR readers'
  dividend into next week's pot — `npm run check:econ` prints the whole
  settlement table, conservation-closed row by row.

## One sentence

Kaldareth is a dark-fantasy text RPG in which your Rare Friend is the hero —
the FriendSDK runtime verifies the NFT on Robinhood Chain, then mounts the game
where numbered choices, seeded deterministic runs and twenty-three
boss fights carry the story through all four acts, from Emberfall's silence to
Kaldareth Healed — Veyra holding the blood anchor, Ilsevet undone by her own
refusal of the light, the Mist Zones thinning into fields.

## Repository

https://github.com/gimogo/kaldareth-healed-shadows

## Playable preview

**https://kaldareth.netlify.app/playtest.html** — the full
game, all thirty-two chapters, no wallet and no install: it mounts the real app
with a preview-mode session, so balances and rivals are simulated while every
choice, Litany check, fight and ending is the shipped one. (Mirrored at
https://gimogo.github.io/kaldareth-healed-shadows/playtest.html.)

The complete FriendSDK runtime (wallet connect, ownership gate, quota) runs
from the repository: `npm install && npm run dev` → http://127.0.0.1:4173. It
needs a Robinhood Chain wallet holding a Generations NFT (generation ≥ 1), per
the SDK — the ownership gate is real either way; the preview relaxes nothing
that exists there, it simply runs without the runtime around it.

## The Litany Echoes (what makes it a game, not a click-through)

The Hollowing eats memory. So, twelve times on the road, it stops the player
and checks theirs. Eight checks quote the story's speech; four are worse — they
probe the prose: how many figures stood in the ring on the dais, how many
fragments the map listed and who held three, what Yessa did with his nets when
the word lighthouse was spoken, what became of the wheat on the fourth blow.
You cannot answer those from dialogue; you answer them from having read the
world. The true answer banks an echo; the plausible-but-wrong ones are eaten.
What you remember scales what the run pays: perfect recall returns the full
5,000 RR ladder, three or more misses and the road keeps three-quarters.
Mashing choices still finishes the story (a loss never strands it), but the
ladder pays it 1,250 instead of 5,000 — attention is the strategy, and it is
diegetic.

And the Hollowing is fair: anything it eats comes back once, later on the road,
reworded. A run that missed a check finds "The fog asks again" waiting at a
later chapter opening — tell the memory back truly and the ledger heals (the
miss is unmade, the payout restored); let it stay eaten and the road keeps its
tithe. No other system in the submission says *it was paying attention* back.

A run that keeps ALL eight echoes finds a hidden ninth verdict at the epilogue:
the Hollowing, unarmored, asks what the remembering is for — and the Litany is
revealed as the leash the first Sundering's survivors wound around it. Two
final choices, no fight. Reading the story is the only key.

## Reading order for jurors

1. Open the preview link above (also https://kaldareth.netlify.app/) and play a run. When the road pauses, answer
   from memory — that IS the combat system for the story half.
2. Miss nothing, then hold all eight echoes to the epilogue gate: the ninth
   door is the submission's showcase.
3. `docs/campaign-transcript-*.txt` shows three full classes playing the
   current build honestly — every node's prose, every choice, every fight —
   regenerated at submission time.
4. `npm run verify` re-proves every gate behind it (see Checks below).

## Stack

- **FriendSDK v0.1.2** (`@rarefriends/friendsdk`, vendored from the release
  tarball with a recorded SHA256) — game runtime, wallet and Friend selection,
  ownership gate.
- React 19 + TypeScript + Vite (host document and sandboxed game frame are
  separate builds with a strict SDK boundary, enforced by `npm run check:sdk`).
- Zod-validated story content (`content/kaldareth.act1.json`, 308 nodes across
  all four acts — authored chapters plus the Litany Echo system), with a GDD
  regression test suite pinning class tables and the EXP curve.
- Simulated economy only: the game never calls `buy`/`play`/`settle`/`redeem`
  and signs nothing — asserted by the same SDK-boundary check.

## How it uses Rare Friends

The player must hold a Generations NFT (generation ≥ 1) on Robinhood mainnet.
The host document connects the wallet, discovers owned Friends, re-verifies the
selected Friend at a fresh block and only then mounts the game in a sandboxed
iframe. The game learns the verified `friendId` and nothing else — no wallet
address, no RPC, no way to re-derive ownership. The daily run quota and the
leaderboard are keyed to the Friend, so one Friend is one player identity.

## How to play

1. Open the game with a wallet holding an eligible Friend (preview mode
   simulates balances; the ownership gate is real either way).
2. Pick a class — Warrior, Archer or Mage.
3. Read the terms of entry, then enter Kaldareth.
4. Choices are numbered buttons. Twelve times on the road the Litany checks
   your memory of the story — answer from memory; it is the combat system for
   the story half, and it decides your pay (see The Litany Echoes above).
5. Fights are turn-based: pick skills, manage your class resource, watch the
   log — with an ASCII duel on screen, ambient music underneath, a battle pulse
   in combat and a boss theme for the four big fights. Twenty-three encounters
   across four acts — from a Whisper in a burned village, through corrupted
   sentinels and Ilsevet's Vessels, to the Hollow Tide, the Seam Vessel and
   Ilsevet Refusing the Light at the apex of the Blood Moon — carry the story
   from Chapter 1 to Kaldareth Healed.
6. Finish, and the run is scored against the simulated weekly leaderboard.
   Every run carries a seed code (e.g. `K7T2-VX4M-QR8A`): same code, same run —
   the whole campaign is deterministic from it.

Costs: each run charges one daily run against the Friend's quota (1 run/day at
generation 1, up to 10 at generation 6, reset UTC midnight) and simulates a 500
RR (RAREFRIENDS) entry fee split 250/150/100 to pool/circulation/burn. Milestone
rewards climb from break-even at Chapter 15 toward the 5,000 RR run cap, and the
ending settles the run with the season: half of its unearned ladder returns to
circulation, the treasury keeps the rest, and every finisher pays a 250 RR
readers' dividend into next week's prize pool. Nothing is charged on-chain in
this build.

## Requirements

- Browser: any modern Chromium/Firefox.
- Wallet: a Robinhood Chain wallet holding a hardwired Generations NFT,
  generation ≥ 1, on chain 4663 — required even for previews of the full
  runtime, per the SDK. The playable preview above needs no wallet.
- Network: the frame talks only to `https://rpc.mainnet.chain.robinhood.com`
  (through the injected client) and its own static host, under a strict CSP.

## Checks and known issues

- `npm run verify` runs typecheck, oxlint, story validation (structure,
  reachability, class gates, layout budgets), progression/balance/economy
  checks, 138 unit tests, the production build, the SDK-boundary audit and 38
  Playwright e2e tests over desktop and 360px-mobile viewports — all green at
  submission time.
- Known gaps (deliberate, documented in the README): the frame never learns the
  real NFT generation, so quota uses the generation-1 floor; quota is
  session-local (opaque origin, no storage) and bounds honest play only; the
  economy is simulated end to end and moves no funds.
- The full campaign (GDD Chapters 1–32) is implemented; a run ends at
  level 39–40 of the 40 cap, and the level cap is reachable.

## Credits

- Rare Friends FriendSDK by `spokesz` (see `vendor/PROVENANCE.md`).
- Original dark-fantasy setting, prose and systems: the Kaldareth GDD
  (`docs/kaldareth_gdd.md`).
