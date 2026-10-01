# Alien Angler

**Builder / contact:** [@Sugoi8130](https://github.com/Sugoi8130)  
**Category:** Economy Potential  
**Source:** [Sugoi8130/alien-angler](https://github.com/Sugoi8130/alien-angler)  
**Playable preview:** [sugoi8130.github.io/alien-angler](https://sugoi8130.github.io/alien-angler/)  
**Stack:** FriendSDK v0.1.3, React, TypeScript and Canvas

Alien Angler is a pixel-art idle collection game where the player's selected
Rare Friend fishes alien signals from animated galaxy pools while spending
simulated $RAREFRIENDS on bait, UFOs, pools and a long-term cosmetic economy.

![Alien Angler gameplay](https://raw.githubusercontent.com/Sugoi8130/alien-angler/main/screenshots/alien-angler-halo-iii.png)

## How it uses Rare Friends and $RAREFRIENDS

The selected hardwired Generations NFT is the main character, rendered with its
canonical Friend artwork while it lives, bobs and fishes from an equipable UFO.
The MVP models $RAREFRIENDS as the premium game currency: fishing returns
simulated RF and the Market sinks it into consumable bait, cosmetics, UFOs and
new galaxy pools. Stardust, fragments, Pool Mastery and contracts create a
second progression loop without promising live token redemption.

All balances, purchases and rewards in this preview are simulated. No RF
funding, transaction signature or real-money payment is required.

## Requirements and controls

The hosted preview requires a browser wallet on Robinhood mainnet holding a
hardwired Rare Friends Generations NFT, generation 1 or higher.

1. Connect the wallet and select an eligible Friend.
2. Choose **Auto Fishing**, or reel manually when **Reel now** appears.
3. Open **Market** to buy bait and equip cosmetics, UFOs or pools.
4. Open **Contracts** for three daily objectives and the Weekly Constellation.
5. Select a discovered alien in **Collection** to inspect its captured variants.
6. Use **Sound** and **Reduced motion** controls as needed. All primary actions
   are usable with mouse, keyboard or touch.

## Fishing rules and rewards

Each cast consumes one equipped bait. Species probabilities and base simulated
RF rewards are:

| Species rarity | Probability | Base RF reward |
| --- | ---: | ---: |
| Normal | 50% | 0.2 RF |
| Rare | 30% | 0.5 RF |
| Epic | 11% | 1 RF |
| Legendary | 6% | 3 RF |
| Mythical | 3% | 10 RF |

The first discovery of each species adds a one-time 0.5 / 1 / 2 / 5 / 15 RF
bonus. Duplicate catches fill a Signal Meter that provides staged discovery
protection. Alien variants do not alter RF rewards: Default 70%, Shiny 12%,
Glitched 5%, Baby 8%, Cosmic 3% and Seasonal 2%. Cosmic becomes eligible at
Pool Mastery level 10; a crafted Variant Scanner doubles eligible non-Default
weights for one catch.

## Market and progression economy

- Bait: Basic Signal 1 RF for one cast; Signal Pack 9.5 RF for ten Basic casts;
  Shimmer Bait 10 RF for five variant-oriented casts; Discovery Bait 15 RF for
  five discovery-oriented casts.
- Cosmetics: Space Fisher 40 RF, Star Sprout 110 RF, Orbit Headphones 140 RF,
  Nebula Wings 190 RF, Astro Suit 225 RF, Comet Buddy 240 RF, Cosmic Aura 375 RF
  and Royal Set 600 RF.
- UFOs: Starter Saucer free, Scout UFO 75 RF, Retro Cruiser 180 RF and Bio
  Saucer 350 RF.
- Pools: Genesis Whirlpool free, Crimson Rift 250 RF, Crystal Void 450 RF and
  Ancient Black Hole 700 RF.
- Cosmetic upgrades are per item: Recolor costs 300 Stardust + 2 fragments,
  Glow costs 500 + 4, and Animated costs 750 + 5.
- Mystery Cosmetic Chests cost 250 Stardust + 3 fragments. They contain an
  unowned cosmetic 30% of the time and bait 70% of the time. These exact odds
  are documented here but hidden inside the Market so opening stays surprising.

Each pool has 30 mastery levels. Level 5 recolors the pool, level 10 unlocks the
Cosmic variant, level 15 adds a UFO aura, level 20 unlocks a pool outfit, and
level 30 opens a Mythical boss quest. Daily Contracts pay a Mystery Signal;
Weekly Constellation rows pay bait, Stardust, fragments, RF and a limited
Constellation Halo. Halo can progress visually from Halo I to Halo III.

## Run locally

With Node.js 22+ and npm installed:

```bash
git clone https://github.com/Sugoi8130/alien-angler.git
cd alien-angler
npm install
npm run dev
```

Open the printed URL, normally `http://localhost:4173`.

## Checks

- FriendSDK game validation passes.
- Production static build passes.
- Automated browser checks cover the complete fishing loop, out-of-bait state,
  economy, Market layout, UFO and cosmetic loadouts, alien variants, Pool
  Mastery, daily/weekly contracts, Stardust Workshop and Halo progression.
- Desktop and reduced-motion presentation were visually reviewed.
- The public GitHub Pages URL returns the FriendSDK wallet/Friend ownership gate.

## Known limitations

- Progress, balances, inventory, contracts and mastery reset when the preview
  session reloads because FriendSDK v0.1.3 does not provide persistent saves.
- There are no live token transactions, RF redemption, trading, creator fees or
  wearable NFTs in this MVP.
- Automated checks use the SDK mock wallet. A real-wallet public-host playthrough
  is still recommended before production publication.

## Credits

Friend identity, wallet selection, canonical Friend sprites, runtime UI and
sound utilities come from [FriendSDK v0.1.3](https://github.com/spokesz/friendsdk)
under Apache-2.0. Alien, UFO, galaxy-pool and interface artwork was created for
Alien Angler. Full notices are included in the source repository.
