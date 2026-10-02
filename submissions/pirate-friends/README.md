![Pirate Friends gameplay: load kegs with one confirmation, fire, sink Barnacle Bess](https://raw.githubusercontent.com/Halldon-Inc/pirate-friends/main/games/pirate-friends/media/pirate-friends.gif)

# Pirate Friends

**Load RF. Fire. Sink their ship. Keep their hold.**

**Every battle burns about 2.7 RF worth of shots (simulated, measured over 24 bot battles).**

- **Play:** https://halldon-inc.github.io/pirate-friends/
- **Video:** [27 s gameplay MP4](https://github.com/Halldon-Inc/pirate-friends/blob/main/games/pirate-friends/media/pirate-friends.mp4)
- **Ammo:** the cannonballs are called Generations, an in-game unit (10 per RF). No NFT is ever burned; your
  Generations NFT is the captain.
- **Phones:** plays in portrait and landscape. A wallet is needed, so open the link in your wallet app's browser.
- **Tested with a real wallet:** Hunt played the live preview with his own wallet on 2026-09-29; the Friend gate and
  play worked. That was before the phone layout shipped.

## Submission

- **Project:** Pirate Friends, a cannon battle game built on FriendSDK v0.1.4.
- **Builder / contact:** Hunt &middot; GitHub [@huntclubhero](https://github.com/huntclubhero) &middot; wallet `huntclubhero.eth`
- **Category:** Token Activity
- **One sentence:** Your Rare Friend captains a pirate ship and fires cannonballs bought with $RAREFRIENDS at a rival
  ship; every shot is burned and the winner keeps the loser's entire stake.
- **Source:** [github.com/Halldon-Inc/pirate-friends](https://github.com/Halldon-Inc/pirate-friends), game in
  [`games/pirate-friends`](https://github.com/Halldon-Inc/pirate-friends/tree/main/games/pirate-friends). FriendSDK
  **v0.1.4** (CLI game directory; the SDK runtime supplies wallet, Friend selection, ownership gate and confirmations).
- **Preview requirements:** a wallet on Robinhood mainnet (chain 4663) holding a hardwired Generations NFT, generation
  1 or higher. The FriendSDK runtime checks ownership at a fresh block before play. All RF, stakes and rewards are
  simulated.

```sh
git clone https://github.com/Halldon-Inc/pirate-friends && cd pirate-friends
npm ci && npm run build
npm run dev:game -- games/pirate-friends
```

## How it plays

<img src="https://raw.githubusercontent.com/Halldon-Inc/pirate-friends/main/games/pirate-friends/media/phone.gif" width="220" align="right" alt="Portrait phone battle">

1. **Load the hold with one confirmation.** Pick 1 to 10 kegs. One SDK confirmation turns RF into kegs; each keg is
   10 Generations. No more prompts after that.
2. **Pick a rival and stake.** Both sides load the same stake: Barnacle Bess 30, Redbeard Rook 40, The Dread
   Admiral 60.
3. **Fire.** Your Friend is the captain on deck, the emblem on your mainsail and the ammunition. Mouse: direction
   sets angle, distance sets power, click to fire, hold for rapid fire. Keyboard: A/D angle, W/S power, Space fire,
   M mute, Esc pause. Touch: drag and release, or hold FIRE; Pause opens settings and forfeit.
4. **Hit the weak points.**
5. **Winner takes the hold.** Sink them or outlast their ammunition: your unfired shots come back, plus their whole
   stake, plus salvage. Run dry or sink and they take your whole stake. Fired shots are burned either way.

| Target | Damage | Effect |
| --- | --- | --- |
| Powder magazine (small glowing TNT hatch) | 34 | One blast per ship, sets the deck on fire, +5 Generations salvage |
| Waterline cracks | 11 | Leak that keeps draining hull until their crew bails it out |
| Captain's cabin | 8 | +2 Generations plunder |
| Sails | 3 | Each tear slows their reload 28%; 4 tears snap the mast |
| Hull | 6 | Solid hit |

On the way across: gulls bounce your shot higher (+1), RF barrels are trampolines (+2), treasure chests pay +5, flat
fast shots skip off the water, the Kraken eats any shot it touches, and you can shoot their cannonballs out of the sky
(+1). Salvage pays only if you win.

## Why it is hard

- Rapid shots heat the cannon and scatter it; max heat locks it for 2.6 s. Deliberate shots fly true.
- Stop hitting a rival for 1.4 s and their crew patches the hull and bails out leaks.
- Below 35% hull they turn desperate and reload in 38% less time.
- The wind swings every few seconds, ships tack on an irregular course, and the aim preview shows only the first
  third of a second.
- Hit streaks add +10% damage per hit, up to +50%; every fifth hit in a row pays +2. Three misses earn a taunt.

## Difficulty and burn (simulated, measured)

24 battles on the SDK mock-wallet harness, one at a time, with the `bot.mjs` deliberate aimer (a shot every 1.25 s,
nudging its aim after each miss):

| Rival | Stake | Bot won | Shots fired per battle (avg, range) | Burned per battle |
| --- | --- | --- | --- | --- |
| Barnacle Bess | 30 | 8 of 8 | 19.4 (16 to 23) | 1.94 RF |
| Redbeard Rook | 40 | 8 of 8 | 29.0 (21 to 35) | 2.90 RF |
| The Dread Admiral | 60 | 5 of 8 | 32.4 (22 to 42) | 3.24 RF |
| **All** | | **21 of 24** | **26.9** | **2.69 RF** |

Only your own shots are counted; the AI rival's shots are not. At 1 keg = 1 RF = 10 Generations.

An independent rerun of 12 more battles (4 per rival, one at a time) averaged the same 26.9 shots, 2.69 RF, with
the bot winning 10 of 12.

## Economy (simulated, as the rules require)

| Rule | Exact value |
| --- | --- |
| Keg price | 1 RF (`1000000000000000000` base units), SDK consumable "Powder kegs" |
| Generations per keg | 10 |
| SDK outcome table | One row, 10,000 bps, "Keg buyback reserve" worth 1 RF. The SDK requires a prize, so each keg reserves its full price. The game never calls `play`, `settle` or `redeem`, so no buyback is offered in the preview. |
| Stakes | 30, 40 or 60 Generations a side |
| Win | `+ stake - fired + salvage` Generations |
| Loss | `- stake` Generations |

**Why it is Token Activity:** Generations exist only by spending RF, and every shot destroys one. Battles are fast,
and the only way back into a fight after a loss is to load more kegs. In a live version each fired Generation burns
its RF.

The only SDK action used is `client.buy(kegs)`, the single confirmation. The Generations ledger, stakes, payouts and
salvage live inside the game frame for the runtime session, reset on reload and are labelled simulated throughout.

## Checks

- `npx friendsdk check games/pirate-friends`: valid.
- `npx tsc -p games/pirate-friends/tsconfig.json`: clean.
- SDK mock-wallet browser runs at 960, 600, 390, 390x664, 360x740, and 844x390 and 750x342 with touch: load kegs with
  one confirmation, fire 6 shots with no further prompt, fire by touch drag and by the FIRE button, pause, forfeit,
  check the result. On phones every screen measures 12px or larger text and 44px or larger controls, with nothing
  outside the frame or under the SDK toolbar.
- Difficulty and burn: 24 bot battles, table above.
- The live preview is built with FriendSDK v0.1.4: its `runtime.js` and `game.js` contain no transaction sending,
  signing, approve or transfer code (checked on the GitHub Pages files on 2026-09-29). Wallet connection and the Friend
  ownership check are unchanged.
- Real wallet: see the line at the top.

## Known issues and limits

- **Opponents are AI captains, not other players.** The SDK sandbox only allows network access to the Robinhood RPC,
  so live matchmaking is not possible in SDK v0.1.4. Real player vs player needs a match service and an escrow
  contract holding both stakes.
- **Skill results are decided in the browser.** A live version needs a server-verified or replay-verified result
  before an escrow pays out.
- **Generations are a game-local currency in the preview.** Minting, transferring and burning an RF-backed currency
  needs integration beyond the SDK's single consumable.
- Preview state resets on reload (the SDK has no save API). On iPhone SE sized screens the harbor scrolls to reach
  the last rival.
- No real funds move anywhere in this preview.

## Credits

All art is drawn in code for this game; the Friend is the canonical Generations sprite via FriendSDK, drawn unmodified
with a tricorn hat on top. Sound is synthesized with Web Audio. No third-party assets. FriendSDK is Apache-2.0.
