# Dragon Stakes

**Project name:** Dragon Stakes
**Builder / contact:** UCHAL · [@tmuchal](https://github.com/tmuchal)
**Category:** Economy Potential

**One sentence:** A project puts a pool of RF into an open sky, and players ride a dragon with their Rare Friend to win it from rings, monsters and each other, then land at the Roost to keep what they carry.

**How it uses Rare Friends:** the rider is a Generations Friend. Its pixels are read live from the Generations contracts on Robinhood Chain and shown unchanged, as a sprite that always faces the camera using the four on-chain views (front, back, left, right). A player can load their own Friend by token ID. Friends carry coins, take them from each other and bank them, which is the Rare Friends idea ("Friends have wallets") turned into a game. All coins are RF, simulated for the Vibeathon.

**Source code:** https://github.com/tmuchal/dragon-stakes · no FriendSDK. Plain HTML, CSS and JavaScript modules, three.js r160 for the world, Web Audio for every sound, PeerJS 1.5.4 for the optional room with friends. No build step.

**Playable preview:** https://dragon-stakes.vercel.app · no wallet needed. The page only reads from the public Robinhood Chain RPC. Works on desktop and on a phone.

## How to play

1. **Fly in.** Free by default: you take off carrying nothing, so there is nothing to lose. You can also bring a stake (10, 25, 50 or 100 RF from a simulated purse of 1,000 RF) to fight from the first second.
2. **Fly anywhere.** Six dragons to choose from, ten islands, thermals, clouds. Each dragon has one real edge (fastest dive, tightest turns, longer shield, richer rings, and so on).
3. **Take coins.**
   - Gold rings pay 1 RF. Timed events (a ring storm, a treasure) pay more.
   - Other riders: fly close and start a fight. A fight is two rounds of call and response on the beat. One rider taps any rhythm over four beats, the other plays it back. Missed and stray taps are hits for the caller. More hits wins and takes half of what the loser carries. The rider carrying the most wears a crown; beat it and you take three quarters.
   - Monsters: some dare you to a luck wheel. You see the odds before you accept.
4. **Land at the Roost** (the tower in the gold light) to move what you carry into your safe purse. Until then it can be taken from you. Leaving anywhere else keeps only what you brought.

### Controls

| | Desktop | Phone |
|---|---|---|
| Climb / dive | W / S or arrow keys | stick up / down |
| Turn | A / D | stick left / right |
| Boost | Shift | Boost button |
| Fight, land, accept a dare | E | on-screen button |
| Decline a dare | Q | on-screen button |
| Look around, zoom | drag, wheel | drag, pinch |
| Play a rhythm in a fight | Space or click | tap |

English by default; Korean from the language toggle.

## The economy

**Whose coins are these?** The project's. A sky starts with a pool (5,000 RF here). Nothing is minted during play: every ring, event prize, monster hoard and computer rider's stake comes out of that pool, and the pool only shrinks when a player banks coins at the Roost or when coins are burned. A player needs no coins to join. The intended real version is a sky funded on-chain by whoever sponsors it, in RF or in a project's own token paired with RF.

**Costs, rewards and odds (all simulated):**

- Rings 1 RF (2 RF on the Gold Hoarder). Ring-storm rings 2 RF. Treasure 10 RF.
- A fight moves half of what the loser carries, rounded up. Three quarters if the loser wears the crown. A third if the loser bought insurance. 5% of what moves is burned.
- Roost shop, one-flight items, price burned: ring magnet 5 RF, insurance 10 RF, head start 5 RF.
- The monster's luck wheel:

| Chance | Outcome |
|---|---|
| 10% | you take its whole hoard |
| 25% | you take half its hoard |
| 25% | you take a quarter of its hoard |
| 15% | nothing moves |
| 20% | it takes a quarter of what you carry |
| 5% | it takes half of what you carry |

The books are checked against one identity at every step: `pool at start + stakes brought by players = pool now + carried by riders + held by monsters + burned + taken home`. The in-game fight record lists every fight and dare with each tap and recounts your coins.

**Reasons to come back:** three daily quests, a six-step rank that lasts across flights, win streaks, the crown.

## Run it

Static site:

```
python3 -m http.server 8827
```

Test hooks: `?test` exposes state, `?auto&go` lets a bot fly and fight, `&stake=25`, `&dragon=lung`, `&lang=ko`, `&pool=200`. The checks need `npm i playwright`.

## Checks

- Rules, headless (`node scripts/검산.mjs`): every dragon's edge is measured, the wheel lands on its published odds over a large sample, shop items change the outcome they claim to, and the books balance over ten simulated minutes.
- Single player in a real browser (`node scripts/check.mjs`): setup screens at desktop and phone sizes in both languages, flight controls, a full bot flight with fights, a dare accepted and one declined, an event, landing, the record's recount.
- With friends (`node scripts/online-check.mjs`): a host and two guests agree on riders, monsters, pool, crown and every fight's result; leaving mid-fight forfeits; a dropped guest can rejoin.

## Known limitations

- RF, purses and burns are simulated and stored in the browser. Nothing is on-chain.
- Most riders in the sky are flown by the computer. "Fly with friends" is a beta: up to 8 players, peer-to-peer through the public PeerJS broker, and the host's device keeps score, so play it with people you trust. It was tested on one machine, not across real networks.
- Phone: checked with emulated multi-touch in portrait and landscape, not yet on a physical device (safe areas, the on-screen keyboard).
- Rank and quests live in the browser's storage.

## Credits

No third-party art or audio. The world, dragons and monsters are built in code; all sound is synthesized with the Web Audio API; the only artwork that is not ours is the Friends' own on-chain pixels. Libraries: three.js (MIT), PeerJS (MIT). Font: Inter, Noto Sans KR (Google Fonts).
