# Burning Gym

![Burning Gym](https://raw.githubusercontent.com/AlbertGit360/Burning_Gym/main/games/burning-gym/media/cover.png)

**Builder/contact:** Telegram [@albertos360](https://t.me/albertos360) · X [@AlbertErgart](https://x.com/AlbertErgart)

**Category:** Character Spotlight

## Updates

**Sep 25, part 2: Proof of Burn card + flow diagram.**

- **Proof of Burn card.** The character sheet now opens with a card in the style of the Rare Friends portfolio page: **Friends burned**, **XP gained**, **hardwire burned** (the RF value of the burned NFTs) and **Combat Level** with its Tier cap. Below the numbers is a strip of the burned Friends themselves, each with its generation and token id, and a count by generation. It is labelled *since last transfer · resets on sale*. The receipt log and the JSON export are one click below.
- **Flow diagram** of how Proof of Burn works, from burn to receipt to sheet to any game, and how a sale resets it:

![Proof of Burn flow](https://raw.githubusercontent.com/AlbertGit360/Burning_Gym/main/games/burning-gym/media/proof-of-burn-flow.png)

**Sep 25, part 1: Proof of Burn.** Thank you to the Rare Friends team for the feedback on the shared character sheet ("anyone can build on top of this proof of burn"). This update turns that idea into code:

- **Burn receipts.** Every sacrificed Friend now writes a receipt: which Friend was burned, its generation, which stat it trained and how much XP it gave. Stats are no longer stored at all; they are **derived from the receipts**. The character sheet has a new **Proof of burn** section with the receipt log.
- **An open module + spec.** All the rules (food chain, XP, training time, level curve, Tier caps, combat numbers, reset on transfer) now live in [`proof-of-burn.ts`](https://github.com/AlbertGit360/Burning_Gym/blob/main/games/burning-gym/proof-of-burn.ts). It is pure TypeScript that any game can import. The one-page spec is [`PROOF_OF_BURN.md`](https://github.com/AlbertGit360/Burning_Gym/blob/main/games/burning-gym/PROOF_OF_BURN.md) and includes a proposed on-chain `FriendBurned` event: games rebuild the sheet from burn logs after the last transfer, with no stat storage.
- **Export the sheet.** Character → Proof of burn → *View character sheet JSON* shows the full `proof-of-burn` v1 sheet (stats, combat numbers, every receipt) for another game to read.


## What did you build?

A neon underground gym where your own Rare Friend is the star. You walk your Friend between four training machines, sacrifice lesser Friends to fuel its training, and watch it use the equipment. It pedals a bike whose flywheel spins in a ring of fire, presses a barbell, runs on a treadmill and punches a reflex ball. Its four stats (HP, Strength, Agility, Defence) grow into real fighting numbers, which you can test in a live sparring ring.

The stats are a **preview**. They are designed as a shared character base for future Rare Friends mini-games (PvP, PvE, tournaments, raids), which appear in the game as "coming soon" cards.

## How does it use Rare Friends?

- **Your selected Generations NFT is the main character.** Its canonical on-chain sprite, read through the FriendSDK sprite reader and never recoloured, walks the gym, uses every machine while training, and appears on the HUD and character sheet.
- **Its on-chain generation drives the whole balance.** Generation sets which Friends it may burn (the "food chain"), how much XP each burn gives, and the official Tier upgrade prices.
- **Sacrifice.** Burning lesser Friends is the core loop, shown as a full-screen ritual where the chosen Friends catch fire and their embers fly into the training station. Every Generations NFT is originally obtained with $RAREFRIENDS, so burning Friends indirectly removes RF value.
- **Wallet and eligibility** are handled entirely by the FriendSDK runtime (Robinhood mainnet, hardwired Generations NFT, generation ≥ 1).

## How the burn system works

1. **The food chain.** Your Friend can only burn Friends of **its own generation or weaker**. A higher generation number means a weaker, more common Friend. A Gen 1 can burn anything; a Gen 6 can only burn other Gen 6s.

   | Your Friend | Can burn |
   |---|---|
   | Gen 1 | Gen 1–6 |
   | Gen 2 | Gen 2–6 |
   | Gen 3 | Gen 3–6 |
   | Gen 4 | Gen 4–6 |
   | Gen 5 | Gen 5–6 |
   | Gen 6 | Gen 6 |

2. **XP and training time per burned Friend.** A burned Friend gives XP equal to its official hardwire value (10× per generation). Each burn also adds training time: the stat only grows once your Friend has finished training at the machine. You can burn several Friends at once; their XP and time add up into one session.

   | Burned Friend | XP gained | Training time |
   |---|---|---|
   | Gen 1 | 100,000 | 10 h 48 m |
   | Gen 2 | 10,000 | 1 h 48 m |
   | Gen 3 | 1,000 | 18 m |
   | Gen 4 | 100 | 3 m |
   | Gen 5 | 10 | 30 s |
   | Gen 6 | 1 | 5 s |

3. **XP per level depends on your generation.** A rarer Friend needs more XP per level. The rule: **one Friend of your own generation takes a stat from level 1 to 100**. The curve is quadratic (`XP needed = own hardwire × (level / 100)²`), so early levels are cheap and weaker fuel still helps, while the last levels cost the most. Level 20 costs 4% of a same-generation burn, 40 costs 16%, 60 costs 36%, 80 costs 64% and 100 costs 100%.

   *Example: a Gen 3 Friend needs 1,000 XP to max a stat.* One Gen 3 burn → level 100 (18 min). One Gen 4 burn → level 31 (3 min). One Gen 5 → level 10. One Gen 6 → level 3.

4. **Tiers cap the levels.** Tier 0–4 caps every stat at 20 / 40 / 60 / 80 / 100, and each Tier unlocks the next 20 levels. Upgrades cost RF at the official prices. XP earned above the cap isn't lost: it is banked and counts as soon as the next Tier opens.

## Why burning: a progression base for Rare Friends NFTs

Burning Gym is built around one idea: **burning NFTs should make your Friend stronger**. Instead of sitting unused in wallets, lesser Friends become fuel. Your main Friend turns them into permanent, readable stats that future Rare Friends games can build on.

### What it solves

- **Spare Friends get a use.** Common and duplicate Friends (Gen 5–6 especially) have no role today. Here they are training fuel, which creates demand for exactly the Friends people hold most of.
- **Supply goes down, permanently.** A burned Friend leaves circulation. Every Generations NFT was originally hardwired with $RAREFRIENDS, so each burn removes that RF value from the market.
- **A recurring RF sink.** Tier upgrades are paid in RF at the official prices. By the Rare Friends protocol, every upgrade payment is split **50% burned / 50% RF rewards**.
- **Progression that belongs to the Friend.** HP, Strength, Agility and Defence (plus Tier and Combat Level) form one shared character sheet. PvP, PvE, tournaments and raids can all read it, so a Friend trained here matters everywhere.
- **Rarity is respected.** The food chain lets a Friend burn only its own generation or weaker ones, and XP scales 10× per generation. Rare Friends need rare fuel, which keeps the value hierarchy intact.

### Stats reset on sale, just like Tier

The Rare Friends protocol already says: *"A direct transfer clears activation and upgrades; reactivation costs 10% of that generation's hardwire price and starts at tier 0."* Burning Gym follows the same rule for its stats. **When a Friend is sold or transferred, its stats and Tier reset.** This means:

- a buyer pays for the Friend itself (its generation and art), not for someone else's grind;
- the secondary market can't be used to skip training;
- every new owner burns and upgrades again, so the sink keeps working with every sale.

*(In this preview, stats live only in the current session. Reset-on-transfer is the rule for the on-chain version and matches how the protocol already treats Tier.)*

### The numbers: one fully built Friend

"Fully built" means all four stats at 100 and Tier 4. The figures below use the official Hardwire and upgrade tables; amounts are in RF.

| Generation | Hardwire | Friends burned to max 4 stats | …or in Gen 6 Friends | Tier 0→4 upgrades | of which burned (50%) | Reactivation after a sale |
|---|---|---|---|---|---|---|
| Gen 1 | 100,000 | 4 × Gen 1 (400,000 of hardwire value) | 400,000 | 406,250 | 203,125 | 10,000 |
| Gen 2 | 10,000 | 4 × Gen 2 (40,000) | 40,000 | 40,625 | 20,312.5 | 1,000 |
| Gen 3 | 1,000 | 4 × Gen 3 (4,000) | 4,000 | 4,062.5 | 2,031.25 | 100 |
| Gen 4 | 100 | 4 × Gen 4 (400) | 400 | 406.25 | 203.13 | 10 |
| Gen 5 | 10 | 4 × Gen 5 (40) | 40 | 40.63 | 20.31 | 1 |
| Gen 6 | 1 | 4 × Gen 6 (4) | 4 | 4.06 | 2.03 | 0.1 |

In short, a fully built Friend retires about **4× its own hardwire value in burned Friends** and burns another **~2× its hardwire in RF** through Tier upgrades. Because of reset-on-sale, that cost is paid again by every new owner. A single fully built Gen 3 Friend, for example, removes 4 Gen 3 Friends (or 4,000 Gen 6 Friends) from supply and burns about 2,031 RF.

## Source code

- Repository: https://github.com/AlbertGit360/Burning_Gym
- Game folder: `games/burning-gym`
- Built with **FriendSDK v0.1.2** (React game component, custom canvas world renderer as allowed by `WORLD_RULES.md`)

## Playable demo / how to run

- **Public preview:** https://albertgit360.github.io/Burning_Gym/
- Requires a browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired **Generations NFT (generation 1 or higher)**, even for the preview.
- Run locally (Node.js 22+), from the FriendSDK root:

```
npm ci
npm run dev:game -- games/burning-gym --port 4173
```

## How do you play?

- **WASD / arrow keys** to walk, or tap/click the floor. Walk to a machine and press **E**, or click the machine itself.
- **Stations:** Recovery Bike = HP, Barbell Rack = Strength, Sprint Track = Agility, Boxing Reflex Trainer = Defence.
- Pick one or more lesser Friends to sacrifice. Their XP and training time are combined. A Gen 6 Friend trains in 5 seconds, which is the quickest way to try it.
- **Tiers:** each Tier unlocks the next 20 levels (caps 20 / 40 / 60 / 80 / 100). XP earned above the cap is banked until the next Tier opens.
- **Training Ring:** a live practice fight against a dummy of any Tier.
- **Portrait (top left):** character sheet with current fighting numbers, what the next level buys, and the Proof of Burn card with the receipt log and JSON export. **?** opens the full rules. **M** toggles sound; Settings has reduce-motion.

## Screenshots

![Screenshot](https://raw.githubusercontent.com/AlbertGit360/Burning_Gym/main/games/burning-gym/media/screen-1-gym.png)

![Screenshot](https://raw.githubusercontent.com/AlbertGit360/Burning_Gym/main/games/burning-gym/media/screen-2-gym.png)

![Screenshot](https://raw.githubusercontent.com/AlbertGit360/Burning_Gym/main/games/burning-gym/media/screen-3-gym.png)

## Costs and rewards

Everything is simulated and labelled in the game. No transactions are sent.

- **Burnable Friends:** a local mock pool of lesser Friends. The SDK has no burn action.
- **$RF:** each session starts with a simulated demo balance that exactly covers every Tier upgrade for your generation. There is no way to earn $RF in this build.
- **Tier upgrade costs:** the official Rare Friends upgrade table, `generationMultiplier × 0.5 × 1.5^step` (e.g. Gen 6: 0.5 / 0.75 / 1.125 / 1.6875 RF).
- **XP per burn:** Gen 1 = 100,000 … Gen 6 = 1 (10× per generation). Burning one Friend of your own generation maxes a stat.
- **Training time per burn:** 5 s (Gen 6) up to about 10 h 48 m (Gen 1).
- No random outcomes or paid rewards. `game.json` contains only the minimal chance-game definition the SDK runtime requires.

## What have you tested?

- Local (Windows), from the FriendSDK root:
  - `npm ci` — pass (24 packages, 0 vulnerabilities)
  - `npm test` — 110 passed, 4 failed, 2 skipped. The 4 failures are known Windows-only bugs in the FriendSDK v0.1.2 test suite itself (none touch `games/burning-gym`): (1) a test tries to create a symlink, which Windows blocks without Developer Mode; (2) a test asserts a Unix file permission of `0o600`, which reads back as `0o666` (438 in decimal) on Windows; (3) a test builds a path with `new URL().pathname`, which yields a leading-slash `/C:/...` on Windows; (4) a test's regex expects a forward-slash path separator but Windows produces a backslash. The 2 skipped tests need a local Foundry/Anvil install. The SDK's own CI (`.github/workflows/check.yml`) only targets `ubuntu-latest`, where none of this applies.
  - `npm run typecheck` — pass
  - `npm run check:games` — pass (`games/burning-gym: valid; expected reward 1; maximum 1 RF base units; build 852273 bytes`)
  - `npm run check:browser` — pass (all scenarios `PASS`)
  - `npm run build` + `node scripts/dev-game.mjs build games/burning-gym` — pass, static preview built with relative asset paths (works under the `/Burning_Gym/` GitHub Pages subpath)
- GitHub Actions on `ubuntu-latest` (`.github/workflows/check.yml`, job `check`): **success**, run https://github.com/AlbertGit360/Burning_Gym/actions/runs/36025469903
- Manually play-tested by the builder on localhost with a real wallet and Generations NFTs (Gen 3, 4 and 6 Friends)
- Station → sacrifice → training → character sheet → Tier upgrade → Training Ring flow; reduced-motion mode

## Known limitations

- Progress is not saved between sessions.
- The burnable Friends pool and $RF balance are simulated.
- Game modes (PvP, PvE, tournaments, raids) are placeholders.
- Training machines have no collision, so you can always walk to a station.

## Credits

- Built on FriendSDK v0.1.2 (Rare Friends). Friend sprites come from the on-chain Generations artwork via the SDK.
- All gym art (room, equipment, ring, effects, UI icons) is drawn in code for this project. No third-party or AI-generated images are used.
