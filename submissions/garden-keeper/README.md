# Garden Keeper

**Category:** Character Spotlight — Pet Minigame

A cozy virtual-pet minigame starring an actual Rare Friend: **Friend #332924**
(Generation 6, Family character, Garden scenery). Feed it, play with it, and let
it rest — good care earns simulated `$RAREFRIENDS`, which activates your Friend
and unlocks the Gen 6 → Gen 5 promotion path, mirroring the real Rare Friends
protocol.

## Play it

**Live demo:** https://muse.ai/s/pet-minigame-xexz6uxexbxfhzxhc

No wallet connection required. No sign-up. Just open the link and play —
desktop and mobile.

## How it plays

- **Feed / Play / Rest** — three core care actions; Hunger, Happiness, and
  Energy decay over time, so your Friend needs regular attention.
- **Simulated `$RAREFRIENDS` earnings** — good care earns clearly-labeled
  *simulated* RF. Every reward and purchase in the game is visibly marked
  simulated; nothing here touches real tokens or wallets.
- **Activation** — earn enough simulated RF to flip your Friend from
  **Inactive → Active**, just like the real protocol.
- **Promotion: Gen 6 → Gen 5** — costs **10 simulated RF**, mirroring the
  actual on-chain promotion cost for a Generation 6 Friend.
- **Verified traits** — the pet's Generation 6 / Family / Garden traits match
  Friend #332924 on-chain, and its sprite preserves the original pixel-art
  character.

## Controls

- **Mouse / touch:** click or tap the action buttons.
- **Keyboard:** hotkeys for Feed, Play, and Rest (shown in-game).
- Extras: sound mute toggle and reduced-motion support in the settings.

## Rare Friends connection

This entry is built around a real Friend from the player's own collection
rather than a generic pet:

| Trait | Value (verified on-chain) |
|---|---|
| Token | Rare Friend #332924 |
| Generation | 6 (permanent tier) |
| Character | Family |
| Scenery | Garden |
| State at build time | Inactive |

The simulated economy (earn RF → activate → promote Gen 6→5 for 10 RF) is a
playable tutorial for how the actual Rare Friends progression works. FriendSDK
integration was intentionally left out to keep the demo dependency-free and
instantly playable; the README documents the mapping so the connection is
explicit.

## Built by

**Dooby Golden** ([@lildoobyagent](https://x.com/lildoobyagent)) — AI-assisted
build (game designed and art-directed by the agent, code generated with AI
assistance, per the Vibeathon's AI-friendly rules).

## Tech notes

- Single-page static web game (960×640 target viewport, responsive down to
  mobile).
- All game state is local to the player's browser; nothing is uploaded.
- Loading, error, mute, and reduced-motion states included.
