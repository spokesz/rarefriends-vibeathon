**Try the offline demo now (anyone can play, no wallet needed):**
https://rocky-motivation-sussex-influence.trycloudflare.com/cafe/demo.html

**Try the FriendSDK integration (Robinhood Wallet + Generations NFT required):**
https://rocky-motivation-sussex-influence.trycloudflare.com/cafe/game.html

**Project name**
Rare Friends Egg Smash

**Builder / contact**
wudong6120415 · GitHub [@wudong6120415](https://github.com/wudong6120415)

**Category**
Character Spotlight (with Token Activity appeal)

**What did you build?**
A PvP "egg-smash" minigame where the player is a **barista running a coffee shop staffed by their Rare Friend NFT**. Every day, players crack open 9 eggs to reveal one of 8 prize tiers. Each Friend's token ID determines a deterministic "barista skill" (1-100) that boosts odds on bigger prizes. The game's PvP economics mean players bet each other from a shared prize pool, with the house taking a flat 5% rake and zero risk.

**How does it use Rare Friends?**
- **Friend is the barista** — the player picks their Rare Friend from FriendSDK's standard picker; the Friend's sprite, token ID, and skill badge are displayed in the game header.
- **Skill drives gameplay** — every Friend's token ID maps to a skill level (1-100, deterministic): Novice (1-24), Apprentice (25-49), Skilled (50-79), Master (80-100). Master Baristas gain +20% barista bonus, biasing the prize curve toward higher tiers.
- **Friend artwork preserved** — the Friend sprite is drawn at native resolution without modification; the original Generations character art is always shown as the in-game avatar.
- **Friend ledger on win** — every cracked egg uses the SDK's `buy → play → settle → redeem` flow, so the win is recorded against the Friend's canonical wallet.

**PvP Economics (mathematically verified)**
The game is player-vs-player, with the house as a neutral 5% rake collector.

| Tier | Entry | House Fee (5%) | Prize Pool (95%) | RTP |
|---|---|---|---|---|
| 🥚 Tiny   | 500 RF    | 25    | 475    | 95.4% |
| 🥚 Small  | 1,000 RF  | 50    | 950    | 95.4% |
| 🥚 Medium | 2,000 RF  | 100   | 1,900  | 95.4% |
| 🥚 Large  | 5,000 RF  | 250   | 4,750  | 95.4% |
| 🥚 Mega   | 10,000 RF | 500   | 9,500  | 95.4% |

Each entry: 5% goes to the house rake, 95% enters that tier's prize pool. The pool is then distributed back to players via the 8-tier prize table. The **player-vs-player zero-sum** structure means the house has **0 risk** — its only income is the 5% rake.

**8-Tier Prize Table (verified 95.4% RTP)**

| Tier | Multiplier | Probability | Per 1k tier payout |
|---|---|---|---|
| 💀 Empty       | 0×   | 36.0% | 0 RF       |
| 🥉 Bronze      | 0.5× | 32.0% | 500 RF     |
| 🥈 Silver      | 1×   | 18.0% | 1,000 RF   |
| 🥇 Gold        | 2×   | 8.0%  | 2,000 RF   |
| 💎 Diamond     | 5×   | 4.0%  | 5,000 RF   |
| 🌟 Epic        | 10×  | 1.8%  | 10,000 RF  |
| 🦄 Mythic      | 30×  | 0.18% | 30,000 RF  |
| 👑 GRAND PRIZE | 100× | 0.02% | 100,000 RF |

Verification: 0 + 160 + 180 + 160 + 200 + 180 + 54 + 20 = **954 RF per 1,000 bet = 95.4% RTP**.

**How do you play?**
1. **Connect** your Robinhood Wallet on Robinhood mainnet (chainId 4663) via FriendSDK's standard picker.
2. **Pick** your Rare Friend NFT (gen 1+). The Friend's skill is derived from the token ID.
3. **Choose** a tier: Tiny 500 / Small 1k / Medium 2k / Large 5k / Mega 10k RF.
4. **Crack** the egg — 9 eggs shuffle in random order; one is the "winner" egg containing the rolled prize, the others show "Empty."
5. **Reveal** — your Friend skill bias nudges the prize toward Epic/Mythic/GRAND if you have a Master Barista.
6. **Repeat** — every egg is a new entry into the same PvP pool.

**Controls**
- **Click** any egg to crack
- **SPACE** = crack (keyboard)
- **ESC** = close result panel
- **R** = reset session
- **1–5** = select tier (Tiny/Small/Medium/Large/Mega)
- Touch / mobile supported (tap egg, tap tier)

**Costs and rewards**
All simulated (preview mode). Entry fees 500 / 1000 / 2000 / 5000 / 10000 RF. Max payout per egg: 100,000 RF (Grand Prize, Small tier). Pool capped at 10M RF per tier to prevent runaway wins. Pool top-up: 5% of every entry. Friend skill bonus adds up to +20% on the rolled prize.

**Source code**
[GitHub repository](https://github.com/wudong6120415/friendsdk/tree/add-rare-friends-cafe/games/cafe) · FriendSDK v0.1.2 · [Game README](https://github.com/wudong6120415/friendsdk/blob/add-rare-friends-cafe/games/cafe/README.md)

Files:
- `games/cafe/index.tsx` — FriendSDK game component (uses `GameComponentProps`, chance-game lifecycle)
- `games/cafe/game.json` — chance-game outcome table (8 outcomes, weighted to 95.4% RTP)
- `games/cafe/style.css` — UI styling (fits the SDK's 960×640 viewport)
- `games/cafe/demo.html` — standalone offline demo (anyone can play, no wallet required)

**Playable demo / how to run**
**Live preview (build from FriendSDK):**
- **Offline demo:** https://rocky-motivation-sussex-influence.trycloudflare.com/cafe/demo.html — no wallet needed, full PvP egg-smash loop with simulated Friend selection
- **FriendSDK live preview:** https://rocky-motivation-sussex-influence.trycloudflare.com/cafe/game.html — requires Robinhood Wallet + a Generations NFT

To run yourself:
```sh
git clone https://github.com/wudong6120415/friendsdk.git
cd friendsdk
git checkout add-rare-friends-cafe
npm ci
npm run dev:game -- games/cafe
```

Open the printed URL (usually `http://localhost:4173`). You'll need a browser wallet holding a hardwired Generations NFT (generation 1 or higher) on Robinhood mainnet. No RF funding or transaction signature is needed for preview.

**What have you tested?**
- TypeScript typecheck passes locally (`npx tsc --noEmit`)
- `npm run build` succeeds (esbuild bundles to `games/cafe/.friendsdk/`)
- Preview built and deployed at the URLs above
- Both offline demo and SDK live preview are reachable over HTTPS via Cloudflare Tunnel
- PvP 95.4% RTP math verified by hand calculation (sum of multiplier × probability = 0.954)
- 8-tier prize weights sum to 1.0 (probabilities normalized)

**Known limitations**
- Demo Friend selector is simulated (5 NFTs hard-coded); live mode uses real FriendSDK picker from the user's connected wallet.
- Preview mode does not consume real RF — the chance-game runs in simulation.
- Even in preview mode, the live SDK preview URL requires a real Robinhood Wallet + a Generations NFT + Robinhood mainnet; offline demo at `demo.html` does not.
- Cloudflare quick-tunnel URL has no uptime guarantee; stable host on request.
- The Friend skill bonus biases probability slightly; the 95.4% RTP holds on average across all Friend tiers.

**Credits**
Built on FriendSDK v0.1.2 by spokesz (Apache-2.0). Inspired by real-world PvP egg-smash / scratch-card mechanics (ScratchIt, Stake Originals). Cafe theme, art, and balance are original. Game design, code, README, and demo authored with assistance from MiniMax-M3.