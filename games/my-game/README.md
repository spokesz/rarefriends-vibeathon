# Game component starter

SDK version **v0.1.2**. This component is a small playable garden with a pack
dispenser and an opening station. It has no application routes, navigation,
wallet connection code or identity gate. The SDK runtime supplies those game
infrastructure capabilities and the selected, verified owned Friend.

Use the SDK's local game command from your current project to run this component.
For an existing project, mount the SDK runtime in its existing game slot and
provide this component and `game.json`. Other project setups and layouts are
welcome; retain the runtime's real ownership checks and sandbox boundary.
See the package README for the exact installation and runtime command.

Move with WASD, arrow keys, or a tap/click destination. Walk to the dispenser,
press E or tap its prompt, and buy a simulated pack. Walk to the crate to open
it. Keep the revealed collectible or redeem it through the inventory menu.
Settings include mute and reduced motion; failed artwork loads can be retried.

| Rule | Exact value |
| --- | --- |
| Pack price | 1 RF (`1000000000000000000` base units) |
| Garden pebble | 60% / 6,000 basis points; 0.5 RF |
| Pressed flower | 30% / 3,000 basis points; 1 RF |
| Crystal | 10% / 1,000 basis points; 3 RF |
| Expected reward | 0.9 RF per pack |
| Consumable | One pack produces exactly one collectible |
| Backing | Each purchased or pending pack reserves 3 RF; kept rewards reserve their fixed RF value |
| Redemption | Fixed value, no expiry; paid to the selected Friend's canonical wallet in a future approved real integration |

All balances, purchases, openings, collectibles and redemptions are simulated.
An owned hardwired Generations NFT is still required. The component only calls
the SDK's fixed preview client. It does not deploy contracts or send transactions.
No trading, creator fees or wearable NFTs are implemented.

The source uses public SDK modules only. This example uses `GameWorld` to render
the bundled garden props and the selected Friend's live sprites, with collision,
depth sorting and keyboard/touch movement. `GameWorld`, these assets, the camera
and the garden's visual style are optional starting points. Build your own
setting, assets, character art, renderer and menus, with controls suited to your
genre. Custom artwork does not replace the runtime's NFT ownership checks. Use
the supported action client for economy actions and keep the game accessible.
