# Called It

**Post a prediction → people bet YES or NO with RF → winners split the losers' RF.**

**Builder:** [@uphoricdesign](https://github.com/uphoricdesign) · **Category:** Economy Potential (best potential for a token economy paired with $RAREFRIENDS) · **SDK:** FriendSDK v0.1.2

A prediction game where every mechanic moves or burns existing $RAREFRIENDS and never creates
it: posts burn 20 RF, settled markets burn 15% of the losing pot (≈7.5% of volume in a balanced
market), and winnings stream out over 7 days. You play as your own Generations Friend, whose
original on-chain artwork and Truth Score appear on every post and bet.
[Source code](https://github.com/uphoricdesign/called-it) · [Playable preview](https://uphoricdesign.github.io/called-it/)

## Run it

**Preview:** https://uphoricdesign.github.io/called-it/. Open it in a browser with a wallet extension, or inside your
wallet app's built-in browser on a phone, connected to **Robinhood mainnet (4663)** and holding
a hardwired Generations NFT (generation ≥ 1). The SDK verifies ownership before play. No RF,
private key or transaction signature is needed.

Locally, with Node.js 22+:

```sh
git clone https://github.com/uphoricdesign/called-it.git
cd called-it
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`, connect your wallet and pick your Friend.

## Play

1. **Post a prediction:** a yes/no claim, a deadline and a resolution source. 20 RF, burned.
2. **Bet YES or NO:** minimum 10 RF; live multiplier `1 + (other pot × 0.8) / this pot`. Short
   on RF? **Buy RF & bet** makes a simulated purchase and places the bet in one tap.
3. **Winners split the losers' RF:** 80% to winners by stake, 15% burned, 5% to the creator.

The feed opens with nine NPC predictions at every stage (open, closing soon, betting closed,
needs a result, challenge window, jury vote, invalid/refunded, paid out). **Skip 30 s** (`F`)
fast-forwards the demo clock. Mouse, touch or keyboard (`1`–`4` tabs, `?` tutorial, `Esc`
close). Settings has sound, reduced motion, the tutorial and a demo reset.

## Rules and economy

**Everything is simulated**; the demo wallet starts with 1,000 RF.

| Rule | Value |
| --- | --- |
| Post a prediction | 20 RF, 100% burned; blocked topics: deaths, violence, harm to specific people, events the bettors control |
| Minimum bet | 10 RF; betting closes 1 h before the deadline (demo: 30 s) |
| Losing pot split | 80% to winners pro rata by stake · 15% burned · 5% to the creator; winners get their stake back |
| One-sided pool or INVALID | full refunds, nothing burned |
| Winnings | unlock linearly over 7 days (demo: 2 min); can be bet right away with no fee |
| Early cash-out | 5% of the amount, burned |
| Resolution | anyone but the creator proposes YES / NO / INVALID with a 200 RF bond; 24 h challenge window (demo: 20 s) |
| Dispute | matching 200 RF bond; jury of 5 NPC Friend holders; losing bond: 50% burned, 25% to the dispute winner, 25% to majority jurors |
| Truth Score | record, streak and weekly rank on every post; top 3 weekly callers wear a crown aura |

Worked example: YES 1,000 vs NO 3,000, YES wins → 2,400 RF to winners, 450 burned, 150 to the
creator; a 100 RF YES bet returns 340 RF (3.4x). **The app never creates RF**: tests assert that
total simulated supply is unchanged after every action.

## Checks, credits and limitations

`npm test` (18 economy tests), `npm run typecheck`, `npm run check:games` and `npm run build`
pass. `npm run check:browser` runs the SDK's test harness (real runtime, sandbox and ownership
gate with a mocked wallet) through the full desktop flow and a 390 px phone flow; both pass.
The builder also played it end to end with a real wallet and an owned Friend on Robinhood mainnet.

Uses the FriendSDK runtime, sprite reader and sound kit; Friend artwork is the original
on-chain art (NPCs use captured frames of real Generations NFTs, whose holders did not make
these predictions); fonts are Silkscreen, Archivo and Sometype Mono (OFL). See
[NOTICE.md](https://github.com/uphoricdesign/called-it/blob/main/NOTICE.md).

Limitations: all economy actions are simulated and reset on reload; NPC outcomes use made-up
source snapshots and outcomes of player-posted predictions are random; the topic filter is a
keyword screen; the SDK's own Friend wallet menu shows its unused reference ledger. On phones in
portrait the SDK container switches to a portrait ratio via `host.css`; desktop keeps 960 × 640.
A real-money launch would need legal review, since prediction markets are regulated differently
in each jurisdiction. No trading, creator-fee contracts or wearable NFTs are implemented.
