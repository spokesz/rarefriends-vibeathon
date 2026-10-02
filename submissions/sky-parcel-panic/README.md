# Sky Parcel Panic

- **Builder/contact:** [Sugoi8130](https://github.com/Sugoi8130)
- **Primary category:** Character Spotlight
- **Additional category:** Economy Potential
- **Source:** [github.com/Sugoi8130/sky-parcel-panic](https://github.com/Sugoi8130/sky-parcel-panic)
- **Playable preview:** [sugoi8130.github.io/sky-parcel-panic](https://sugoi8130.github.io/sky-parcel-panic/)
- **Stack:** FriendSDK v0.1.3, React 19, TypeScript, Canvas 2D

Sky Parcel Panic is a colorful SNES-style delivery adventure where the selected
Rare Friend races across floating routes, collects simulated RF, and delivers
parcels to other Rare Friends from the connected wallet.

## Preview requirements

The public preview keeps FriendSDK's ownership gate. Players need a browser
wallet connected to Robinhood mainnet (chain 4663) that holds a hardwired Rare
Friends Generations NFT, generation 1 or higher. The game does not request an RF
transaction or wallet signature.

## Run locally

Requirements: Node.js 22+ and pnpm.

```sh
git clone https://github.com/Sugoi8130/sky-parcel-panic.git
cd sky-parcel-panic
pnpm install --frozen-lockfile
pnpm run dev
```

Open the URL printed by the FriendSDK development server.

## How to play

1. Choose Postal Route, Forest Canopy, Coral Cove, Cosmic Station, or Random.
2. Complete five deliveries during a five-minute route.
3. On desktop, drive with WASD or arrow keys and hold Space or Shift to boost.
   On mobile, rotate to landscape, drag the left joystick, and hold the right
   BOOST button. Both touch controls work at the same time.
4. Pick up a sparkling parcel, follow the clearly named exit signs between the
   three scenes, and reach the highlighted Rare Friend recipient.
5. Avoid moving carrots and birds, collect small spinning RF coins, and keep
   delivering within twelve seconds to build a combo up to x5.

Every delivery recipient is randomly selected from other Rare Friends available
in the connected wallet and celebrates when a parcel arrives. The main courier
always uses the selected Friend's canonical artwork.

### Route rules and rewards

- Each world has three scenes, ten RF coins per scene, and five to eight moving
  hazards per scene.
- Each coin awards a random **0.05-0.10 simulated RF** and restores 18 boost.
- A Star Core has an **18% chance per route** to appear. It grants twelve seconds
  of free boost and hazard immunity.
- A collision removes one heart, two seconds, and 40 points. The courier has
  brief hit protection afterward.
- Finish with at least 3:00, 2:00, or 1:00 remaining for S, A, or B rank;
  slower completed runs receive C.
- Simulated rank bonuses are **S 120 RF, A 80 RF, B 50 RF, C 25 RF**. An
  incomplete route awards no rank bonus.

## Simulated economy and Courier Closet

The demo wallet starts each session with **1,400 simulated RF** and owns no shop
items. Players earn more simulated RF from route coins and rank bonuses, then
spend it on visible customizations:

| Category | Items and RF prices |
| --- | --- |
| Headgear | Leaf Cap 90; Coral Goggles 120; Party Pop Hat 130; Orbit Halo 160; Courier Helmet 190 |
| Scooters | Moss Runner 180; Tide Rider 220; Nebula Glide 280 |
| Boost trails | Fireflies 140; Bubble Pop 160; Stardust 240 |
| Head pets | Cloud Chick 190; Star Slime 230; Parcel Pup 260 |

Purchases, balances, route coins, and rewards are session-only simulations. They
do not transfer, burn, or award on-chain $RAREFRIENDS and cannot be redeemed.
There is no persistent save. The `game.json` chance definition is a schema-only
FriendSDK requirement; its ticket and result are not shown, sold, or awarded.

## Audio and accessibility

- Three original chiptune route tracks are randomly selected when a run starts.
- RF coin, Star Core, and successful-delivery actions have dedicated cues.
- The HUD has a persistent mute toggle for music and effects.
- Mobile landscape mode provides a draggable joystick, hold-to-boost control,
  safe-area spacing for notched screens, and a rotate-device prompt.
- The mobile `FULL` control uses native fullscreen when available. If a wallet
  WebView such as Rabbit Wallet or MetaMask blocks that API, FriendSDK expands
  the game across the available browser viewport instead. The mobile-only
  control is hidden on desktop.
- Reduced-motion mode removes camera shake, marker pulses, and nonessential
  bobbing.
- Keyboard state clears when the tab loses focus, the page hides, or FriendSDK
  pauses play.

## Checks

Run on September 29, 2026:

- `pnpm run build` - passed
- `pnpm run check` - passed, including FriendSDK validation
- `pnpm run test` - passed in Playwright/Chromium

The automated browser route covers SDK startup, map selection and transitions,
five-minute timing, wallet Friend recipients, pickup and delivery, RF coins,
Star Core parameters, cosmetics purchasing/equipping/scrolling, random music,
mute/unmute behavior, audio cues, reduced motion, mobile landscape controls,
native fullscreen, wallet-WebView fullscreen fallback, and portrait guidance.

## Known limitations

- The cosmetic inventory and simulated balance reset when the page reloads.
- There are no live token transactions, signatures, payouts, or persistent
  profiles in this MVP.
- Because the Star Core intentionally uses an 18% route spawn chance, it will
  not appear in every run.
- Automated browser checks use the development mock wallet; the public preview
  still requires an eligible real wallet for FriendSDK's ownership gate.
- Wallet-browser fallback fills the available WebView content area but cannot
  hide navigation or system bars controlled by the wallet application itself.

## Credits

FriendSDK v0.1.3 provides wallet connection, Friend selection, ownership checks,
canonical Rare Friend artwork, sandboxing, and the initial session state. All
environment maps, UI, cosmetic item artwork, animations, and music/SFX in Sky
Parcel Panic are original for this project. FriendSDK licensing and third-party
notices are included in the source repository dependencies.
