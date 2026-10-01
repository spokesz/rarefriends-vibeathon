# Lantern Night

A FriendSDK **v0.1.2** game. Your Rare Friend hosts a night-sky lantern festival:
buy a paper lantern, hold to light it, and let it go. The wick burns part of the
lantern's price as it rises, and a gift drifts back down into your Friend's hands.
Gifts you keep become stars in your night sky.

Everything economic is **simulated**. An owned hardwired Generations NFT
(generation ≥ 1) on Robinhood mainnet is still required to play; the SDK runtime
handles wallet connection, Friend selection and the ownership check.

## Run

From a FriendSDK v0.1.2 checkout, with this folder at `games/lantern-night`:

```sh
npm ci
npm run build
npx friendsdk dev games/lantern-night      # local play at http://localhost:4173
npx friendsdk check games/lantern-night    # SDK game validation
npx friendsdk build games/lantern-night    # static preview in games/lantern-night/.friendsdk/
node games/lantern-night/playtest.mjs ./artifacts 960   # scripted mock-wallet playthrough
```

## Controls

| Action | Mouse / touch | Keyboard |
| --- | --- | --- |
| Buy lanterns | **Buy a lantern** or **Buy 5** | Tab to the button, Enter |
| Light and release | Press and hold **Hold to light** (or the sky) until the lantern glows, then release | Hold Space or Enter on the button, then release |
| Keep or redeem a gift | Buttons on the gift card | Tab, Enter; Escape keeps the gift |
| Gifts, rules, settings | **Sky**, **Festival**, **Settings** | Tab, Enter; Escape closes |

Releasing early doesn't light the lantern and doesn't use it up. **Settings**
has a sound toggle (sound starts muted), a **Reduce motion** option (it follows
the system setting by default) and a **One tap lights a lantern** option for
players who can't press and hold.
Gameplay stops while the runtime shows a menu or confirmation.

## Layout

`host.css` gives portrait phones a tall 3:4 frame, or 2:3 on tall screens, in place of the default 3:2 strip. The canvas measures its frame and redraws the scene for that shape. Desktop keeps the 960 × 640 reference frame.

## Rules and economy

| Rule | Exact value |
| --- | --- |
| Lantern price | 1 RF (`1000000000000000000` base units) |
| Wick burn (proposed) | 0.1 RF per lantern lit (`100000000000000000`) |
| Paper Star | 55% / 5,500 bps · 0.4 RF |
| Moon Charm | 30% / 3,000 bps · 1 RF |
| Comet | 12% / 1,200 bps · 2 RF |
| Golden Lantern | 3% / 300 bps · 3 RF |
| Expected gift value | 0.85 RF per lantern |
| Consumable | One lantern gives exactly one gift |
| Backing | Each purchased or pending lantern reserves 3 RF; kept gifts reserve their fixed value |
| Redemption | Fixed value, no expiry |
| Lantern papers | Cosmetic ink patterns (striped, dotted, checked) unlocked after 3, 8 and 15 lanterns lit; no RF value |

Where each 1 RF goes in the proposed live split: 0.10 RF burned, 0.85 RF
expected back to players as gifts, 0.05 RF retained by the gift pool.

**What is simulated:** balances, lanterns, gifts, redemptions and the burn counter.
The SDK preview client sends the whole lantern price to its prize pool. The
0.1 RF wick burn is shown as a counter and describes the intended split for a
live contract. No tokens are burned or transferred. Balances and lantern papers
reset when you reload.

## Assets

All scenery, lanterns and gifts are drawn procedurally on canvas in `scene.ts`, in the SDK's one-bit style: white paper, black ink and signal green (`#ccff00`) reserved for lantern light. Menus use the SDK `GameMenu`.
The Friend is rendered from its canonical on-chain sprite through
`@rarefriends/friendsdk/sprites`, and sound cues come from the SDK sound kit.
