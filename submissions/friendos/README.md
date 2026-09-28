# FriendOS

## Project details

**Builder / contact:** [@Dingufira88](https://github.com/Dingufira88)  
**Category:** Economy Potential  
**Working demo:** [dingufira88.github.io/friendos](https://dingufira88.github.io/friendos/)  
**Source:** [FriendOS at submission commit `2ce4a53`](https://github.com/Dingufira88/friendos/tree/2ce4a536313fa90887d083d92dcf4f126b87bfe7)

## One sentence

FriendOS turns each Rare Friends Generations NFT into a persistent AI operator that performs useful missions, acquires community-built skills, manages an RF budget, earns mastery, and produces an auditable economic history.

## What I built

The Rare Friend is the operator—not a profile picture beside a generic chatbot. Each token ID has its own identity, evolving profile, simulated wallet, spending limits, installed skills, mastery, mission history, receipts, accepted work, and selective memory.

The core interaction is complete end to end:

1. Choose one of three guest operators, or connect and sign with a wallet to discover up to three owned Generations Friends.
2. Inspect what that specific operator can do and select a mission.
3. Give the operator a brief while its skill and RF cost remain visible.
4. Continue using the site while a compact panel shows the mission progressing.
5. Receive a task-specific result and an RF receipt.
6. Clarify, challenge, or refine the result through a versioned Mission Review.
7. Accept the strongest version, choose what the operator remembers, or continue into a linked mission.

The Skills area demonstrates the larger economy: users install abilities on a chosen operator, matching missions improve skill mastery, and an approved external developer can receive a proposed 20% share of that skill's usage fee. A no-code Skill NFT training concept lets non-developers mint a trainee, specialize it, guide evidence-backed decisions, and eventually publish proven expertise.

## Why it matters to Rare Friends

- **Generations NFT as the character:** identity, art, wallet, progression, skills, memory, and work history belong to the selected Friend.
- **RF activity:** missions, reviews, and skill installation create repeat spending; every action produces a transparent allocation receipt including burn, compute, ecosystem, and eligible creator shares.
- **Economy potential:** skill developers can create productive upgrades with recurring usage revenue, while operator mastery and success history can make skills increasingly valuable.
- **FriendSDK:** version `v0.1.2` powers wallet lifecycle, Robinhood Chain reads, Generations ownership discovery, canonical on-chain sprite data, and Friend wallet addresses. FriendOS is a standalone agent/tool, so it uses FriendSDK's wallet and identity modules rather than its game runtime.

## How to try it

No wallet is required for the full product walkthrough.

1. Open the [working demo](https://dingufira88.github.io/friendos/) and choose **Explore first**.
2. Switch among Nova, Signal, and Atlas to see independent operator profiles.
3. Open **What can this Friend do?** to inspect current capabilities.
4. Enter a brief in Mission Control, choose an available mission, and launch it.
5. Inspect the category-specific result and RF receipt.
6. Use Mission Review to clarify, challenge, or refine the work. Install the routed specialist or explicitly use native ability when prompted.
7. Select a result version, choose the memories to retain, and accept it—or start a linked mission.
8. Open **Agent profile** to inspect the operator's wallet, policy, skills, transactions, progression, and saved memories.
9. Open **Skills** to install a marketplace ability for a specific operator or explore the Skill NFT training flow.

For the optional wallet flow, use an injected browser wallet on Robinhood Chain. Connecting requests a free message signature, then reads owned Generations NFTs and the connected wallet's real RF balance. Wallet connection is not required to judge the working interaction.

## RF costs and economy rules

The public demo labels its economy disclosure at the bottom of the main page. All spending, burning, rewards, creator allocations, operator funding, and internal wallet transactions are simulated and stored locally in the browser.

- Mission costs are displayed before launch.
- Clarify is free; Challenge costs 1 RF; Refine costs 2 RF.
- A mission or paid review allocates 50% to burn and 30% to compute.
- When an installed community skill is eligible, its creator receives a proposed 20% usage share; otherwise the remainder is assigned to the ecosystem.
- Matching installed skills earn more mastery than native fallback execution.
- Operator spending is constrained by editable daily and per-mission limits.
- No approval, transfer, burn, or other on-chain transaction is initiated.

The connected wallet's real RF holding is read-only and displayed separately from simulated operator balances. CRED is internal, non-transferable reputation—not a launched token.

## Source and local setup

Stack: React 19, TypeScript, Vite, FriendSDK v0.1.2, Zustand, Framer Motion, Zod, and Playwright.

```sh
git clone https://github.com/Dingufira88/friendos.git
cd friendos
git checkout 2ce4a536313fa90887d083d92dcf4f126b87bfe7
npm ci
npm run dev
```

Node.js 22 or newer is required. Open the printed local URL. Guest mode works immediately.

## Checks

- Production TypeScript and Vite build passes.
- ESLint passes.
- 16 automated Chromium journeys pass across desktop and mobile.
- Tests cover the complete mission flow, operator switching, guest access, wallet controls, skill installation, skill training, structured versioned reviews, routed specialist use, RF allocation receipts, and responsive behavior.
- Every push to `main` builds, tests, and deploys through GitHub Actions before updating GitHub Pages.

## Known limitations

- The GitHub Pages build is static, so mission and review reports use deterministic offline output. A serverless mission endpoint is included for deployments configured with an OpenAI API key; live review execution is not enabled.
- Simulated balances, progression, memories, and linked missions are browser-local and do not synchronize across devices.
- The wallet signature confirms the local session but is not server-authenticated.
- Skill submission, moderation, public success scoring, live creator payouts, and a public task market are demonstrated product directions rather than active services.
- The three guest portraits are original presentation artwork inspired by the Rare Friends visual language. Connected owned Friends retain canonical on-chain sprite identity data.

## Credits

- Rare Friends and [FriendSDK v0.1.2](https://github.com/spokesz/friendsdk) for the Generations wallet, ownership, sprite, and Friend-wallet primitives.
- The original Rare Friends site and NFT art direction informed the interface identity.
- FriendOS application code and guest presentation artwork were created for this Vibeathon entry.
