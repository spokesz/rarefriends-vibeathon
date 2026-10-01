# Moonshot 🚀

![Moonshot gameplay](https://raw.githubusercontent.com/bbczzzs/moonshot/49bcd6c/media/moonshot-demo.gif)

🎮 **Play: https://bbczzzs.github.io/moonshot/** · 👀 **No wallet? [Preview page](https://bbczzzs.github.io/moonshot/preview/)** · 📦 [Source](https://github.com/bbczzzs/moonshot)

🎬 [Watch the full recording (MP4)](https://github.com/bbczzzs/moonshot/blob/main/media/moonshot-demo.mp4)

| Liftoff | Flight: cans + eject half | Supernova launch | Flames tab + missions |
|---|---|---|---|
| ![Liftoff](https://raw.githubusercontent.com/bbczzzs/moonshot/49bcd6c/media/liftoff.png) | ![Flight](https://raw.githubusercontent.com/bbczzzs/moonshot/49bcd6c/media/flight.png) | ![Supernova](https://raw.githubusercontent.com/bbczzzs/moonshot/49bcd6c/media/supernova.png) | ![Flames](https://raw.githubusercontent.com/bbczzzs/moonshot/49bcd6c/media/flames.png) |

**Project name**
Moonshot

**Builder / contact**
Ishan · GitHub [@bbczzzs](https://github.com/bbczzzs)

**Category**
Token Activity

**One sentence**
A live crash game where your Rare Friend pilots a rocket carrying a crew of real Generations Friends, and RF burns on every launch: **10% fuel from every stake, win or lose** (20% on Supernova launches), plus fuel cans, Burn for glory and the Hangar, with a new launch every ~15 seconds (all RF simulated in this preview).

**What did you build?**
Rounds of about 15 seconds:
- **Boarding (6 s):** crew Friends walk the gantry arm onto the rocket's outrigger seats, and you join with a stake. Your own Friend climbs into the cockpit dome.
- **Liftoff:** fuel burns, and the multiplier climbs as `m(t) = e^(0.12t)`. Landmarks sit at the altitude of their multiplier: the **Moon at 2x**, satellites at 3x, **Mars at 5x**, **Saturn at 10x**, then a nebula, a black hole and a galaxy.
- **Fuel cans:** mid-flight, throw a **1 RF can (burned 100%)** at any rider. They get a flame aura, and the crowd throws cans too. If the rider you backed ejects safely, you earn **backer XP** (3 XP per can × their multiplier) and their parachute turns signal green with a ★. Backing pays in status, never RF.
- **Eject:** cash out (button, Space, or tap the sky) and your Friend parachutes out with `ride × multiplier`. Crew eject at their own targets.
- **Crash:** everyone still aboard burns with the rocket.

**Supernova launches:** every RF burned by any pilot fills a community meter. Every 300 RF, the next launch is a **SUPERNOVA**: **20% fuel** for everyone aboard, a purple sky, a rainbow flame and **3× Flame XP**.

**Flame rank + Hall of Flames:** every RF you burn earns Flame XP (Spark → Ember → Blaze → Inferno → Supernova). The Flames tab shows your burn receipt and a burn leaderboard.

**Eject half** banks 50% of your ride at the current multiplier and lets the rest keep flying. Each half is an independent fair ride, so the odds don't change; it's the classic crash-game hedge.

**Missions:** five session goals (eject above 3x, back 3 riders who land, throw 10 fuel cans, eject half then land the rest, fly a Supernova) pay Flame XP. Finishing all of them unlocks the Astronaut skin, which can't be bought.

**Real supply:** the Flames tab can read the real $RAREFRIENDS `totalSupply()` on Robinhood mainnet (one read-only call, on demand; token address from the FriendSDK deployment config) and shows the session burn as a share of it.

**Options:** **auto eject**, **auto-launch** (5 to 50 rounds, or indefinitely), and **Burn for glory**, which burns 10% of each payout for 3× XP.

Drawn in the Rare Friends world style with the FriendSDK game palette, ink outlines, checker-dither shading and a floating meadow island. Crew walk the gantry arm onto their seats, the pad erupts in cartoon smoke at liftoff, floating sky islands drift past, and Friends talk in pixel sign bubbles ("WHEE!", "THX!", "AAA!"). The sky dithers from paper into space as you climb. The UI follows the SDK frame's paper-and-ink look and is kept simple: one bet panel, one stage, and three tabs (Crew · Flames · Hangar).

**How does it use Rare Friends?**
- **Your verified Friend is the pilot.** The SDK handles the wallet, Friend selection and the ownership gate, and the pilot's canonical on-chain sprite is read with the SDK's `createFriendReader()`. When you sit a round out, your Friend watches from the HQ stall.
- **The crew are real Generations Friends**, drawn from their canonical on-chain sprites (read from the artwork registry and baked into the build). Their stakes, targets and fuel cans are simulated for the preview; at launch these seats would be real holders.
- Friends stay canonical black and white, as the SDK specifies.

**How does it spend and burn $RAREFRIENDS?**
| Sink | Rule |
|---|---|
| **Fuel** | **10% of every stake, burned at liftoff, every pilot, whatever the outcome** |
| **Supernova fuel** | **20%** on Supernova launches (every 300 RF burned by all pilots) |
| **Fuel cans** | **1 RF each, burned 100%**, thrown at riders mid-flight |
| **Burn for glory** | Optional: **10% of each payout burned** for 3× Flame XP |
| **Hangar** | 4 paid rocket skins and 3 paid trails (25–300 RF), **burned 100%**, cosmetic only |

The house edge equals the fuel and **all of it is burned**; the house keeps nothing. Riders still aboard at the crash lose their ride to the **Launch Pool**, which pays everyone who ejected (zero-sum in expectation). Every launch is a spend event and a guaranteed burn event for every pilot aboard. On top of that come voluntary sinks players *want* to use: cans (social), glory (status) and the Hangar (style). Supernova events spike the burn for everyone.

**Burn projection (illustrative, not measured).** Assumptions: each player averages 40 launches a day at 10 RF, 10% of launches are Supernovas, players throw a fuel can every other launch, and 30% of players use Burn for glory. Hangar purchases are excluded. Per launch that's 1.10 RF fuel + 0.50 RF cans + 0.27 RF glory = **1.87 RF burned per 10 RF staked (≈18.7% of volume)**, or about **75 RF per player per day**.

| Daily players | RF burned / day | RF burned / year |
|---|---|---|
| 50 | 3,740 | ≈1.4M |
| 500 | 37,400 | ≈13.7M |
| 5,000 | 374,000 | ≈137M |

Live, the Supernova threshold (300 RF in the preview) would scale with volume to keep Supernovas near 10% of launches.

**What would be on-chain?**
Nothing in this build: no contracts or transactions, as the vibeathon asks. A live version would need a round contract where:
- the fuel share of each stake, every fuel can and every glory share go through the RF token's `burn()`;
- the ride is escrowed in a Launch Pool that pays ejections and keeps crashed rides;
- the crash point comes from a Dice/VRF seed committed before boarding closes;
- Hangar purchases are burned in full.

**How does it use randomness?**
Crash point: `U ~ Uniform[0,1)`, `C = floor(100/(1−U))/100` (C is the highest multiplier reached). `P(C ≥ m) = 1/m` for any two-decimal target, so ejecting at any fixed target returns **exactly 90%** of the stake on average (80% on a Supernova). About 1% of launches bust at 1.00x. In the preview the draw is browser randomness; live, it must come from Dice/VRF.

**Costs and rewards**
All balances, bets, payouts and burns are **simulated demo RF** (1,000 to start), labelled in the UI. Stake ≥ 1 RF. Eject payout = `ride × multiplier` (minus 10% if Burn for glory is on). No consumables.

**Controls**
Space: bet / cancel / eject · H: eject half · tap the sky to eject · F: fuel can · M: sound. Every action also has a button for touch. The reduced-motion toggle follows the system setting. The runtime's pause freezes the flight without forfeiting anything.

**Playable demo / how to run**
https://bbczzzs.github.io/moonshot/ (GitHub Pages) requires a browser wallet on **Robinhood mainnet (4663)** holding a hardwired Generations NFT (generation ≥ 1). This is the SDK's standard gate. Connecting only reads: no RF, signatures or transactions. The GIF and MP4 above show gameplay for anyone without a wallet.

Built with **FriendSDK v0.1.4** (rebuilt 2026-09-29). v0.1.4 fixes the "Could not load this account's Friend transfers" error that v0.1.2 games now hit, because the public Robinhood RPC rejects log reads spanning more than 10,000,000 blocks. Checked against the live RPC: a real holder's Friends load and the game opens.

```sh
git clone https://github.com/bbczzzs/moonshot && cd moonshot
npm install
npx friendsdk dev games/moonshot
```

**What have you tested?**
All of these pass:
- `node verify-sdk-math.mjs`: 500,000 simulated launches. Instant bust 1.00%. Returns 89.97% / 90.08% / 89.99% / 89.68% at 1.5x / 2x / 5x / 10x targets. Fuel burn exactly 10.00% of volume. Launch Pool balanced. Supernova 20% fuel, glory 10% of payout, fuel can 1 RF, ledger totals and rank ladder asserted.
- `node test-interaction.mjs` at **960 px and 390 px**, in the real sandboxed runtime with the SDK's mock wallet: joining during boarding, liftoff, a fuel can burning exactly 1 RF, Eject half, pausing mid-flight (the multiplier freezes), resuming, ejecting or a valid crash, crash history, a Hangar purchase burning exactly 25 RF, the Flames tab and missions, Burn for glory, auto-launch, and the sound toggle. No browser errors.
- **Real-wallet playtest: done** by the builder on the public GitHub Pages preview (Robinhood mainnet, owned hardwired Generations Friend).
- `npm run typecheck`: strict TypeScript across all game sources, 0 errors.
- `npx friendsdk check games/moonshot` (valid), and `npx friendsdk test` at 1200 px and 360 px.

**Known limitations**
- Crew stakes, targets and fuel cans are simulated; the SDK has no multiplayer. The session burn and Hall of Flames include those simulated burns and are labelled as such.
- `game.json` holds the placeholder chance-game definition the runtime schema requires. Moonshot runs its own documented ledger (`economy.ts`).
- Balances, cosmetics, XP and history reset on reload (no SDK storage).
- The GIF and screenshots come from a local harness mounting the same game component (the wallet screen isn't shown).

**Credits**
All scenery, the rocket, planets, particles and UI are drawn in code, and all audio is synthesized with WebAudio. Friend sprites are canonical Rare Friends Generations artwork via FriendSDK (`NOTICE.md`). The palette is FriendSDK's `GAME_PALETTE`. Fonts: Silkscreen, Sometype Mono and Archivo (SIL OFL, bundled). Built with Claude Code.
