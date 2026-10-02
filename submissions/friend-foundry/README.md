# Friend Foundry

**Builder / contact:** [plus8bit](https://github.com/plus8bit). Reach me by mentioning @plus8bit on this PR or opening an [issue](https://github.com/plus8bit/friend-foundry/issues).

**Category:** Economy Potential

**Demo:** https://plus8bit.github.io/friend-foundry/

**Source:** https://github.com/plus8bit/friend-foundry

## What it does

Friend Foundry is a visual studio for designing and stress-testing potential RF economies: simulate 30 days of Friends spending RF, inspect burn/creator/reserve flows, expose unfunded rewards, and export a reproducible blueprint before risking any tokens.

The goal is to help other Rare Friends builders make experiences whose reward promises can actually be funded. A lively illustrated district makes the RF loop understandable, while a deterministic ledger keeps the accounting inspectable.

## Try it in 90 seconds

1. Open the demo. Select **Reward-heavy arcade**, then **Skip to results**. Under its default assumptions, the reserve first falls short on day 4.
2. **Pin this design**. Reduce **RF per reward** from 5 to 1, then run again. Compare the treasury curves and unfunded totals.
3. Select **Claim surge** or **Demand dries up** to change conditions on day 10.
4. **Test 100 possible months** to inspect seeded variability, not just one favorable run.
5. Share the exact assumptions using **Copy shareable blueprint**, or **Export design & ledger** for the complete daily JSON accounting.

## Stack / requirements

Plain HTML, CSS, SVG and JavaScript ES modules, with Node's built-in test runner. No FriendSDK: this is an economy design tool with a multi-panel interface, not an SDK game. No wallet, NFT, network switch, API key, token purchase or transaction is required. All purchase and reward flows are explicitly simulated. Works with pointer, touch and keyboard; responsive layout and reduced-motion styling are included. No audio.

Run `npm test` then `npm start` from the source repo. Open http://localhost:8766. GitHub Actions runs tests and deploys a five-file static app to Pages; no build dependencies.

## Proposed economy and model

RF is the proposed spend/reward asset. Friends make at most one probabilistic purchase per day; each payment splits into a configurable burn, creator income and a finite reserve. Reward requests are sampled and capped by the available reserve; unpaid amounts remain visible as unfunded requests. Cosmetic crafting / access is the intended spending utility, rather than financial yield. The original schematic icons do not represent selected on-chain Generations NFTs.

Three editable presets demonstrate different funding models. Starting cohort, arrivals, retention, purchase frequency, price, reward amount/probability, burn/creator allocations and reserve are inspectable. Demand shock cuts arrivals and purchase probability by 80%; claim surge doubles reward probability (maximum 100%). Both begin on day 10.

Single runs use seed 42; the 100-month test uses seeds 1000–1099. Each daily ledger conserves RF: initial reserve + spending = remaining reserve + burn + creator income + paid rewards. This is a proposed app economy, not Rare Friends' existing protocol distribution or a deployed token.

## Checks and limitations

Nine automated tests pass, including RF conservation across 180 seeded scenarios, no negative reserve, explicit underfunding, reproducibility, day-10 shock timing, zero activity, bad input rejection, shared-config round trips and unit economics. Browser checks cover funded/failing results, pinned comparison, 100-run testing and desktop/mobile layout; details in the source repository's VERIFICATION.md.

The model is hypothetical and not empirically calibrated. It assumes participants can afford each action, keeps retention independent of rewards, and excludes price formation, liquidity, gas, identity and live contracts. Model frequencies are not real-world probabilities; a funded simulation does not promise viable economics or profit. Production would require demand validation, official identity integration and audited funding/settlement contracts. No real spending or burning is claimed.

## Credits

Built by plus8bit with OpenAI Codex assistance. Original interface, schematic art and simulation engine. Google Fonts: DM Sans / Space Grotesk with system fallbacks. Source is MIT licensed. Independent Rare Friends Vibeathon entry.
