# Friend Planets 🪐

![Your Friend is the planet](https://raw.githubusercontent.com/bbczzzs/friend-planets/0d9200e/media/portrait-planet.png)

🎮 **Play: https://bbczzzs.github.io/friend-planets/** · 👀 **No wallet? [About page](https://bbczzzs.github.io/friend-planets/preview/)** · 📦 [Source](https://github.com/bbczzzs/friend-planets)

| Standing on your own face | Landing burn | A Friend says hi | Ring race | Other players online |
|---|---|---|---|---|
| ![On your face](https://raw.githubusercontent.com/bbczzzs/friend-planets/0d9200e/media/on-your-face.png) | ![Landing](https://raw.githubusercontent.com/bbczzzs/friend-planets/0d9200e/media/landing.png) | ![Host](https://raw.githubusercontent.com/bbczzzs/friend-planets/0d9200e/media/host.png) | ![Race](https://raw.githubusercontent.com/bbczzzs/friend-planets/0d9200e/media/race.png) | ![Online](https://raw.githubusercontent.com/bbczzzs/friend-planets/0d9200e/media/online.png) |

**Project name**
Friend Planets

**Builder / contact**
Ishan · GitHub [@bbczzzs](https://github.com/bbczzzs)

**Category**
Character Spotlight

**One sentence**
Every Rare Friend is a planet: your Generations Friend's own on-chain pixels are raised across its tiny 3D world, which you walk, fly away from in a rocket, and share with every other player online, visiting real Friends' planets to fish, farm, dig, race and take on each Friend at its own sport.

**What did you build?**
A 3D planet-hopping game where the NFT is the main character in three ways at once:
- **Its pixels are its planet.** The Friend's canonical 16×16 front frame (black mask, white halo), read on-chain through the SDK, is raised across the ground as a giant geoglyph. The game opens on it from space, every landing opens on the host Friend's portrait, and you can walk across your own face.
- **Its family is its world and its perk.** Nine biomes (sky, trees, water, fish, crop, night glow and voice), and nine perks that change how you play: Hoverers float, Colossus punches 50% harder, Family grows crops twice as fast, Masks can't be read by the keeper, Sparklings light the night and attract fish, and more.
- **Its token number is its planet.** Name, size, layout, rings, moons and sport all come from the token, so a Friend's planet is the same for everyone who visits it.

Around that:
- **A galaxy of real Friends:** 16 planets to start, each belonging to a real Generations Friend; **🔭 Discover** reads a random Friend from the chain and adds its planet, or type any token number to visit that Friend.
- **The rocket:** walk up the ramp, the hatch closes, 3-2-1 from the cockpit with your Friend in the pilot seat (radar, throttle, yoke), steer or use autopilot, then fly the **landing burn** yourself (touch down under 2.8 m/s for a perfect landing) and walk down the ramp.
- **Things to do on every planet:** fishing with fish you can see, nibbles, a bite and a tension fight; a farm; treasure spots (one rare treasure per family); butterflies; a hoverboard ring race around the whole planet; and a sport against the planet's Friend: a two-way **penalty shootout**, **tennis** with real bounces and scoring, or Punch-Out style **boxing**.
- **Friends feel alive:** each planet's Friend wanders, greets you in its family's voice and cheers or teases after a match; Friends you've visited come to your campfire; your Friend celebrates your wins. A 10-step quest list with a guide arrow and a collection book give you goals.
- **Online:** everyone playing shares the galaxy. You see other players' Friends on your planet, chat and emote, and a who's-online list flies you to them. Peer to peer (Trystero over public Nostr relays, which only introduce players), no server, no wallet addresses shared.
- **The look:** cel shading with ink outlines to match the Friends' ink-and-halo pixels, soft shadows, glow, swaying grass, orbiting clouds, fireflies on the night side, and a sky that turns to sunset and night as you walk around the planet.

**Source repository**
https://github.com/bbczzzs/friend-planets. Game in `games/planets3d/`, the online bridge in `host/net.ts`, setup and run instructions in the README. Stack: **FriendSDK v0.1.4**, React, TypeScript, three.js 0.186, Trystero 0.25.

**Playable preview**
https://bbczzzs.github.io/friend-planets/ requires a browser wallet on **Robinhood mainnet (chain 4663)** holding a hardwired Rare Friends **Generations NFT (generation ≥ 1)**: the SDK's standard ownership gate. No signature, transaction or RF is ever requested. No wallet? The [about page](https://bbczzzs.github.io/friend-planets/preview/) has screens and the trailer.

**How to use it**
- Walk: WASD / arrows or the on-screen stick · look: drag · zoom: wheel · jump: Space · use: E or tap the prompt. Follow the quest list and the arrow.
- Rocket: E at the pad; in space WASD steers, Shift boosts, C swaps cockpit and outside view, tap a planet for autopilot, E to land; hold Space / THRUST for the landing burn.
- Fishing: aim ◀ ▶, hold to charge, release; wait out the nibbles, hook the bite, hold to reel and ease off on its runs.
- Sports are played with Space / E / tap, WASD or the stick, A / D to aim or dodge, S to block, W for the star punch. Esc leaves.
- Online: T to chat, emote buttons, the 🌐 list to see and join other players (and to switch online off).
- Rewards are ★ stars, planet trophies, best times and a collection book. **No RF anywhere.** `game.json` is the placeholder chance-game definition the SDK runtime requires and is not a mechanic.
- Credits: three.js (MIT), Trystero (MIT); the follow camera, input, low-poly blocks, labels and Friend billboard are adapted from the Steal An Egg FriendSDK example (Apache-2.0); Silkscreen, Sometype Mono and Archivo fonts (SIL OFL). Rare Friends artwork is read through FriendSDK and drawn unmodified; all models, shaders and sounds are made in code.

**Checks and known issues**
- `tsc` clean · `friendsdk check games/planets3d` valid.
- `test-interaction.mjs` passes at 960 px and 390 px in the SDK's automated runtime (mock wallet, fixture Friend #7730): play, walk, plant, a full fishing fight, board and launch, boost, outside view, autopilot, the landing burn and walking out, a sport, the collection, pause through the runtime menu, sound.
- Every activity was played to a result by in-page bots (catch, shootout, tennis match, boxing KO, dig, butterfly, ring race).
- Live chain: the production build, opened with a read-only stand-in wallet reporting a real holder's address, lists that holder's Friends from mainnet and opens the game.
- Online: two browsers met on the same planet over the public relays and saw each other's Friends, chat and emotes.
- Known: it's 3D and needs WebGL; quality adapts automatically (bloom → shadows → resolution) and phones start lighter. I tested in headless Chromium with software rendering. Online depends on public Nostr relays and WebRTC (no TURN relay), so some networks will play solo; peers can see each other's IP, as in any peer-to-peer game; received data is validated and rate-limited and chat is stripped of links, but there is no moderation. Progress is saved per browser.
