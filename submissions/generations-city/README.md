# Rare City

**Build your Friend. Build your district. Build the city.**

**Builder / contact:** [420JB](https://github.com/420JB) · Twitter: [@CallOfTheStars](https://twitter.com/CallOfTheStars)  
**Category:** **Token Activity** (primary) · **Economy Potential** (secondary)  
**Playable demo:** https://rarecity.world/  
**Source:** https://github.com/420JB/generations-city/tree/f4b53b309410cd1c93d0134e32afac1cf41e999a

*(The project was renamed from Generations City to Rare City; the demo URL, repository and this submission folder keep the original `generations-city` slug.)*

> **One sentence:** Rare City turns every simulated $RAREFRIENDS spend into visible, persistent development of a Rare Friend property, its family district, and the shared city around it.

## What it is

Rare City is a social strategy city built around nine Rare Friends family districts. Each active Friend receives a property; spending RF grows that building, owner spending unlocks architecture, contributions to other Friends can build patron recognition, and progression can change district monument control and swing the Capital or the individual City Crown.

**RF is not merely an entry fee or reward currency. RF spending is the action that physically changes the world.** District Radio and Rally Calls react to the resulting world state.

**Everything in this Vibeathon build is simulated, deliberately.** All RF is labelled **SIMULATED RF**. No real tokens move, no wallet is connected, and nothing is written on-chain. The Vibeathon MVP rules ask entries to keep purchases and rewards simulated and clearly labelled, and live contracts and real-money transactions are not required to submit. Rare City uses that MVP model to demonstrate the full downstream effect of RF activity safely, end to end.

## Judge walkthrough

### Core RF loop (~30 seconds)

1. Open **Build Board**.
2. Find **Demo Friend #812**, which starts **38 RF from Tier 4** and can capture **The Grand Fountain** from Sparkling.
3. Press **WARP**.
4. Contribute exactly **38 SIMULATED RF**.
5. Watch the building grow into Tier 4 and The Grand Fountain move to the **Family District**.
6. You earn **Closer** and **Kingmaker**, and **District Radio** records the event.
7. Reopen Build Board / Radio: **Demo Friend #288** is now **63 RF from Tier 3**, which can make Family the **Capital**.

The in-app **Demo Guide** walks through the core RF loop and updates from real game state. Its optional **WATCH THE CITY GROW** block opens the city-growth flow. **Reset Demo** restores the starting scenario.

### Then grow the city

1. In the Demo Guide, choose **Watch the city grow · Choose a plot** — or open **Districts & Monuments → Simulate Real City Growth**.
2. Press **+ Add Friend · choose plot**. The Friend's family fixes the district and available plots highlight on the city map.
3. Choose the exact property location and press **Place Friend here**. If the current Wards are full, the next Ward is previewed and opens only when you confirm the placement.

## What to try after the core loop

- **District Radio → Rally Calls:** live strategic recommendations recomputed after every move. Completed objectives disappear and new opportunities surface.
- **Architect Mode:** customize your own property. Owner spending separately raises Architect Level.
- **Property media:** install a billboard, upload an image, add a short owner message, then click the billboard in-world to open its media viewer. Links are intentionally blocked.
- **District competition:** capture tier-based civic monuments, fight for the prestige-only Capital, or chase the **City Crown** for tallest building.
- **Patronage:** contribute to another Friend's building and earn increasingly visible recognition on that property.
- **Fast-forward district growth:** **District Radio → Demo Tools → Simulate Family growth** activates deterministic simulated residents through the real plot allocator (first free plot) until the next Family Ward opens. The control always shows the next Family Ward it will open and stops as soon as that Ward opens.

## RF rules and costs

Building tiers are based on cumulative RF built:

| Tier | Total RF built |
|---|---:|
| Tier 1 | 100 RF |
| Tier 2 | 500 RF |
| Tier 3 | 2,500 RF |
| Tier 4 | 10,000 RF |
| Tier 5 | 50,000 RF |
| Tier 6 | 250,000 RF |

**Total RF Built** includes both owner and community contributions. **Owner RF Built** is tracked separately and is the only spend that raises the owner's Architect progression.

Community patron recognition also grows with support to one property, from supporter-list presence through increasingly prominent exterior recognition. The Capital is **prestige only** and provides no scoring multiplier or economic snowball.

## City scale

The city does **not** pre-create every Rare Friend property. A building is created when a Friend becomes active.

The world hierarchy is:

`City → District → Ward → Plot → Building`

Each of the nine family districts expands independently. Wards are generated procedurally and deterministically as plots fill. The demo starts with **180 seeded buildings** and uses level-of-detail rendering plus viewport culling so the city remains navigable as it grows.

The live demo exposes this directly in **Districts & Monuments → Simulate Real City Growth**: judges can add one simulated Friend to any family district, choose its exact plot, and watch the new property appear. This runs through the real district/ward/plot allocation logic rather than toggling a prebuilt visual state.

### Player-chosen property placement

**Implemented in this demo.** A Friend's family fixes its district; the player **chooses the exact available plot** in that family district instead of being forced into the allocator's first free plot.

- Every free plot in the district's open Wards is highlighted on the real map. Plots in other districts, occupied plots and closed future Wards cannot be chosen.
- When every open Ward is full, the picker **previews the next Ward's plots**. The Ward opens only when a Friend is actually placed there, together with the join, and the normal City Feed / District Radio expansion event fires once.
- Selecting, previewing, **Cancel** and **Escape** never change the city: no Friend id, plot, clock tick, Ward or event is consumed until **Place Friend here**. Reset Demo also exits plot selection.
- The chosen plot is validated against the same availability rules before the property is created, and chosen placement shares the normal join path with automatic placement.
- Plot choice is spatial/personal preference only: no scoring multiplier, RF, earning or construction advantage.

District capacity still governs expansion, and the deterministic first-free-plot allocator remains for simulated bulk growth (Demo Tools).

**Still future production infrastructure:** the demo validates and applies the choice against **deterministic local browser state** using the real ward/plot allocator. There is no server, so there is no multi-user contention here. Production needs authoritative shared state and **atomic server-side plot reservation** (validate the plot and open the next Ward in one transaction, with conflict handling when two players pick the same plot).

## Stack / FriendSDK status

**Stack:** React · TypeScript · Vite · SVG world renderer · CSS · localStorage · Vitest · Playwright

**FriendSDK:** not used in this MVP.

Rare City needs a full-viewport shared-world model with persistent building/patron/history state, rich property customization, uploaded property media, procedural district growth, and its own city camera/renderer. For the Vibeathon build, those systems run as deterministic local state behind small identity/data boundaries. A production version would replace the demo identity/economy adapters with wallet ownership, backend/shared state, and chain/indexer integration.

## Production path / live readiness

The Vibeathon build is intentionally structured so taking the core experience live is an **integration and infrastructure step, not a gameplay rewrite**. Production replaces the simulated settlement, identity and local-state adapters with verified wallet ownership, RF transaction settlement and authoritative shared state, without redesigning the deterministic game/economy rules (economy, allocation, progression, competition, ward growth and strategy) demonstrated here. None of that live infrastructure exists in this build.

A production rollout would primarily replace or add:

- demo identity → wallet connection + Rare Friend ownership lookup;
- local browser state → authoritative shared backend/database state;
- local, single-browser plot selection → authoritative, atomic server-side plot reservation with conflict handling;
- SIMULATED RF balance changes → live RF settlement / transaction verification;
- no RF destination today → a defined token sink/reward policy for verified spends. In this MVP no RF is actually transferred, burned or distributed; the exact burn-versus-reward allocation is a separate production tokenomics decision, not yet made;
- local event history → indexed on-chain/backend history and reconciliation;
- browser-local billboard uploads → hosted media storage with moderation/reporting controls;
- demo rival/growth actions → real user activity and production indexing.

That means the existing city renderer, buildings, ward allocator, RF progression, Architect system, patronage, monuments, Capital, Crown, Rally Calls, billboards and judge-facing interaction model can remain largely intact while the adapters underneath them are connected to live services. Security review, transaction design, moderation and production operations would still be required before real funds are enabled.

## Wallet / network requirements

None for this demo.

- No wallet connection
- No chain/network selection
- No token approval or signature
- No real RF spending

## Controls

- **Click/tap** buildings, map controls, Build Board entries, Radio cards and HUD actions.
- **WARP** jumps the camera to a strategic building.
- **Mouse/touch pan and zoom** navigate the city.
- **City overview** returns to an automatically framed overview.
- **Choose a plot:** click/tap a highlighted plot (or focus it and press Enter/Space), then **Place Friend here**; **Cancel** or **Escape** exits without changes.
- **Reset Demo** restores the seeded judge scenario.

## Checks

Final submitted source commit: `f4b53b309410cd1c93d0134e32afac1cf41e999a` (README-only change on top of the validated app release `53c3b01a723cb2cfa19b19dea463001559e60443`; the application code is identical, so the results below apply unchanged)

- `npm run lint` — passed
- `npm run test` — **138/138 passed**
- `npm run test:e2e` — **37/37 passed**, parallel, first attempt on the final pass
- `npm run build` — passed
- `git diff --check` — clean
- Railway production deployment of `53c3b01a723cb2cfa19b19dea463001559e60443` — successful, followed by a live desktop + 390px mobile smoke test of the production URL
- Railway production deployment of docs-only `f4b53b309410cd1c93d0134e32afac1cf41e999a` — successful

Automated coverage includes the 38 RF monument-capture path, Capital progression, strategic Rally Calls, clickable property media and link blocking, mobile build reveal, deterministic district growth through Ward II/III, exact plot placement (chosen-plot semantics, non-mutating preview/cancel/Escape, invalid-plot rejection, next-Ward opening, Reset Demo during placement, keyboard and touch selection, phone layout), reset behavior, family art integrity, scaling/allocation, competition rules and production rendering behavior.

## Known limitations

- This is a deterministic browser demo using `localStorage`, not a live shared backend. Different browsers do not share city state.
- All Friends, users, RF balances, rival moves and district-growth residents in the demo are simulated.
- Exact plot selection is implemented against deterministic local state, not a server: there is no multi-user concurrency or server-side atomic plot reservation yet.
- The hackathon monument/Capital model uses simplified cumulative tier counts. A production seasonal system should normalize competition against active seasonal participation rather than raw family supply.
- Uploaded billboard media is stored locally in the browser. Production media needs server storage, moderation, reporting and content controls.
- No live token settlement, wallet ownership verification or chain indexer is included.

## Credits

Designed and built for the Rare Friends Vibeathon by **420JB**. Rare Friends family silhouette assets used for district identity were supplied for the hackathon build; the source repository documents their derivation/provenance and keeps the supplied source paths unchanged. The project was built with AI-assisted development and testing.
