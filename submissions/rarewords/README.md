# RareWords

**Builder:** Alan Carr · **Category:** Economy Potential
**Stack:** no FriendSDK — custom stack (contracts + minimal web demo)

**One sentence:** RareWords is a gacha-and-forge word-collection game on Robinhood
Chain where players sacrifice a fully-leveled (tier-4) Gen 5 Rare Friend to roll for
letters and words, then forge new words permissionlessly with RF royalties flowing
to the owners of the words used as inputs.

## What it is

A near-straight clone of WORD's `add(string,string)` forge mechanic, re-seeded for
the Rare Friends economy:

- **Sacrifice gacha:** burn a tier-4 Generation 5 into the contract (transfer-to-lock,
  no withdrawal) to draw from ~10,000 weighted outcomes — common words (~89%), rare
  words (~10%), epic words (~0.79%), twenty consonant 1/1s (~0.2% combined), and the
  letter `s` as a 1/1 chase (~1/10,000). Letters are drawn without replacement.
- **Permissionless forging:** anyone can forge a new word from two registered words
  (`add("cat","s")` → "cats"). Both inputs survive. The forge fee (1,000 RF strawman)
  splits 500/500 to the current owners of the two direct inputs. No dev cut.
- **The economy:** every manufactured sacrifice burns ~25.3 RF (50.6 RF all-in:
  10 RF hardwire + 40.625 RF across four tier upgrades; half of every protocol
  payment burns). Leveling Gen 5s to tier 4 becomes a crafting profession — grinders
  sell them to word-hunters at a markup. Early primitives (vowels, `s`, hyphen)
  earn the most royalties; `s` is the persistent money printer because pluralization
  always consumes it directly.
- Builder vaults the vowels `a e i o u` and `-`; the 21 consonants are public 1/1s.

## How to try it (MVP demo)

**Live demo:** https://alanfalcon.github.io/rarewords-vibeathon/ (GitHub Pages —
static host, no Rare Friends approval needed for submission previews)

1. Open the demo. Purchases are **simulated** (clearly labeled) — no wallet or
   real RF required for the preview.
2. Press **Sacrifice** — simulates locking a tier-4 Gen 5 and rolls the weighted
   gacha; a word or letter is drawn and assigned to you.
3. Open the **forge box**, enter two registered words, press **Forge** — the
   concatenation mints to you and the simulated 1,000 RF fee splits to the two
   input owners.

Wallet/network requirements for the full build: MetaMask (or any wallet) on
Robinhood Chain (chain ID 4663); players need RF for forge fees. The preview
needs no wallet.

## RF costs, odds, rewards (strawman numbers for the MVP)

| Action | Cost | Where it goes |
|---|---|---|
| Sacrifice roll | 1 tier-4 Gen 5 (locked forever) | ~25.3 RF burned at manufacture |
| Forge | 1,000 RF | 500 RF to each direct-input owner |

Gacha odds: ~89% common word / ~10% rare / ~0.79% epic / ~0.2% a consonant 1/1 /
~0.01% `s` 1/1. Letters drawn without replacement; word draws skip already-
registered words.

## Checks and known issues

- [x] Demo playtested end-to-end: sacrifice → draw → forge.
- [x] Simulated purchases and rewards clearly labeled in the UI.
- [x] Dictionary list finalized (~10,000 curated words).
- Open: randomness source on Robinhood Chain (Chainlink VRF on 4663 vs
  commit-reveal) — simulated in the MVP, documented as future work.
- Open: fate of accrued credits in sacrificed Gen 5s' token-bound accounts.
- Risk note: live contracts are not part of this submission; real-money
  mechanics (permanent lock, real RF fees) are described as future integration
  and would need audit before mainnet.

## Source repository

https://github.com/AlanFalcon/rarewords-vibeathon — static single-page demo
(`index.html`); open it in any browser, no build step, no dependencies.
