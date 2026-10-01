# Clean Sweep — A little cleaner, a little kinder

- **Builder/contact:** [kzsun](https://github.com/kzsun)
- **Category:** Character Spotlight; secondary: Economy Potential
- **Stack:** React 19, TypeScript, FriendSDK 0.1.0 with the included host/network and world-view extensions.
- **Source repository:** https://github.com/kzsun/clean-sweep
- **Public playable preview:** https://kzsun.github.io/clean-sweep/ (needs a browser wallet on Robinhood mainnet holding a Generations NFT)

Your owned Rare Friend cleans four worlds, sorts litter, optionally recovers
sellable salvage with paid gloves, then returns to a quiet black-and-white home
and goes to sleep.

## Try it

From the complete source checkout, with Node.js 22 or later:

```sh
npm ci
npm run dev:game -- games/clean-sweep --host 0.0.0.0 --port 4176
```

Open http://localhost:4176. The public preview requires a browser wallet on
Robinhood mainnet (4663) holding a hardwired Generations NFT, generation 1 or
higher. The trusted host verifies eligibility before starting the sandbox.
Network switching is requested explicitly and verified afterwards. No private
keys, wallet signatures or transfers are required for the simulated game.

Move with WASD/arrows or tap a destination. Press E or tap a nearby action.
Collect five items, visit the sorting station and sort the full bag. Two bags
clear each stage. Japanese-only gameplay labels have English equivalents.

1. Park: everyday litter.
2. Riverside: a river, gravel banks and a bridge; fishing line and plastic waste.
3. Raccoon City: a police station, burning apartments and an overturned train;
   spent casings, medicine bottles, bent pliers, broken fuses and rotten meat.
4. Grand Line: ship timber, Sea King meat, sails, ropes and barrels.

Choose **Return home** after stage 4. An 11-second ending shows the selected
Friend walking home and resting under a quilt. Skip/reduced motion goes directly
to good night; pausing or hiding the tab pauses the sequence. Replay returns to
the park and retains the current simulated inventory and RF.

## Simulated economy

Ordinary cleanup and the ending are free. Each completed bag reveals a salvage
opportunity. One single-use pair of Salvage Gloves costs **1 simulated RF** and
is consumed by one recovery. Recovery resumes pending plays without consuming
another pair. Materials can be kept or sold for their fixed simulated value.

| Material | Probability | Fixed sale value |
| --- | ---: | ---: |
| Aluminium Bundle | 50% | 0.25 RF |
| E-waste Components | 30% | 0.75 RF |
| Copper Coil | 15% | 1.50 RF |
| Vintage Device | 5% | 5.00 RF |

Expected value: 0.825 RF. Maximum prize: 5 RF. Each purchased or pending glove
reserves maximum-prize backing; kept rewards retain their backing. Redemption
does not expire. RF uses bigint base units with 18 decimals. No additional token
or live transaction is implemented. Progress resets on reload.

## Art and checks

Canonical selected-Friend pixels come from FriendSDK and are not altered.
Base scenery and sounds are supplied by FriendSDK. Litter, city landmarks,
river, home and bedroom are original procedural canvas art. Raccoon City and
Grand Line are user-requested fan themes, not affiliated with their respective
franchises; no third-party franchise images or music are bundled.

SDK build, typecheck, game validation and automated unit tests were run for
this entry. Route checks cover all litter and recovery stations, blocked water
and the bridge crossing. Automated browser tests were not completed (the local
Chromium download timed out); the builder played the game manually in a browser
with a wallet. Phone layout was not exhaustively tested. No security audit is
claimed. The source repository is a checkout of FriendSDK 0.1.0 plus three
modified host files (`src/game-host.tsx`, `src/switch-network.ts`,
`src/world-view.tsx`) that add an explicit "Switch to Robinhood" button; the game
itself lives in `games/clean-sweep/` and does not depend on that button. The
current event guide points to FriendSDK 0.1.2; compatibility with that newer
version has not been established. Real economics, persistence and official
platform integration require future review and implementation.
