**Your Friend is the main character.** Pull it from your wallet and its own on-chain art becomes the face of 33 meme formats, and every Friend gets its own live card.

![The Meme Machine: fetch a wallet, pick a Friend, it takes over every meme](https://raw.githubusercontent.com/Halldon-Inc/rare-friends-cards-public/main/docs/media/meme-machine.gif)

**Try it, no wallet needed:**
- Meme Machine: <https://rare-friends-cards.vercel.app/memes> (paste `0x1f8a8ac54244e4016a376152b2f92d467552fa7b` to borrow a holder's Friends)
- A Friend's own card: <https://rare-friends-cards.vercel.app/card/0x1f8a8ac54244e4016a376152b2f92d467552fa7b/290>

**Project name**

Rare Friends Cards + Meme Machine

**Builder / contact**

Hunt &middot; GitHub [@huntclubhero](https://github.com/huntclubhero) &middot; wallet `huntclubhero.eth`

**Category**

Character Spotlight

**One sentence**

Every Rare Friend stars in its own memes and its own live stat card, drawn from the Friend's on-chain art and
rarefriends.com's numbers, and rarefriends.com's own **Share** button already sends holders here.

**Source code**

<https://github.com/Halldon-Inc/rare-friends-cards-public> &middot; Next.js 15, React 19, `next/og` (satori) for the
card PNGs, canvas in the browser for the memes. **FriendSDK is not used**; this is a web tool. Run it with
`npm ci && npm run dev`.

**Working demo**

<https://rare-friends-cards.vercel.app> &middot; no wallet, no network, no signature, no install. Paste any wallet
address or ENS name.

---

## Why Character Spotlight

The Friend is the star of everything here. The Meme Machine places the Friend's real on-chain artwork on every face
slot of 30 classic templates, plus three formats drawn in code (Classic, Deal with it, Holo card). Every Friend also
gets its own card at `/card/<wallet>/<id>`: its portrait, its rewards, its weight and its own wallet, as a 1200x630
image that unfurls on X, Telegram and Discord.

![Six memes, one Friend](https://raw.githubusercontent.com/Halldon-Inc/rare-friends-cards-public/main/docs/media/meme-collage.png)

![A Friend's own card](https://raw.githubusercontent.com/Halldon-Inc/rare-friends-cards-public/main/docs/media/friend-card.png)

## Already part of Rare Friends

- **rarefriends.com links here.** The portfolio page's **Share** button opens
  `rare-friends-cards.vercel.app/card/<your wallet>`
  ([`reward-overview.tsx` line 42](https://github.com/spokesz/rarefriends-web-public/blob/64a120e29d93cbe3375cc302989d0b0de814d1be/src/features/portfolio/reward-overview.tsx#L42)).
- [Shared by the Rare Friends founder](https://x.com/poopie/status/2100364736550289483).
- Built for the community before the Vibeathon and kept current since: when rarefriends.com changed its APR formula
  (2026-09-20) and retired its per-wallet state route (2026-09-25), the cards followed their public source.

**Phones:** every page fits 320px and up, every control is a 44px tap target, the Meme Machine says "tap to choose a
photo" on touch screens, and tapping a card opens it full size to pinch or save.

## How to use it

**Meme Machine** (`/memes`)
1. Paste a wallet or ENS name and tap fetch, then tap one of your Friends. Or choose, drop or paste any PFP.
2. Every template redraws with your Friend on the faces. Empty space around the art is trimmed so every generation
   fills its slot; a toggle makes black transparent so the art floats on the meme.
3. Edit any caption, shuffle one meme's captions or all of them, then download or copy. Everything is drawn in your
   browser; nothing uploads.

**Cards**
1. Paste a wallet address or ENS name on the home page.
2. `/card/<wallet>` shows the whole portfolio: Friends earning and inactive, claimable RF and WETH, pending rewards,
   your APR, this week's budget, and every Friend's own art.
3. Tap any Friend for its own card at `/card/<wallet>/<id>`.
4. Copy the link or download the PNG. A pasted link unfurls as the card.

No RF is spent, nothing is bought or won, and no wallet is connected. There are no costs, odds or consumables.

## Where the numbers come from

rarefriends.com's public `/api/protocol/snapshot` and `/api/protocol/owned-nfts` routes plus Robinhood Chain reads
per Friend, stamped with the block they were read at. Every derived figure uses rarefriends.com's own formulas from
[their public source](https://github.com/spokesz/rarefriends-web-public): Your APR is the current active stream
divided by the RF you paid to activate, annualized; Pending is (stream remaining + pending) x your share of active
weight.

## Checks

| check | result |
| --- | --- |
| `node scripts/audit.mjs <site> 0x1f8a...fa7b` | **37/37**, including a cold first view of the wallet: every figure on the sample wallet's pages matches an independent implementation of rarefriends.com's formulas; both PNG routes render |
| Phone flow at 360, 390 and 430px with touch, plus desktop 1440 | **30/30 each**: no sideways scroll, 44px taps, no clipped text, no console errors; fetch, pick, caption, shuffle, download and copy all work by tap |
| Viewport sweep, 12 widths from 320 to 2560 | **36/36** on the portfolio card, a Friend card and `/memes` |
| `npx tsc --noEmit`, `npx next build` | clean |

## Known issues and limitations

- **It depends on rarefriends.com's undocumented routes**, which have moved without notice (renamed 2026-09-19,
  state route retired 2026-09-25). The audit script catches drift against their own formulas.
- If the chain's log index is slow, a wallet nobody has opened before can show "reading the activation history..."
  in the APR cell for a few seconds; the page fills it in by itself.
- The Friend picker lists up to 80 Friends, earning ones first.
- Copying a meme as an image needs a browser that supports it; where it does not, the page says so and download
  works. On iPhone, download saves to Files; tap the card and long-press to save to Photos.
- Read-only. There are no wallets, keys or funds anywhere in the tool.

## Credits

- **Meme templates** in `public/memes/` are widely circulated internet meme images, sourced via imgflip.com. They
  are not ours; all rights belong to their original creators, and they are used only as backgrounds for holders'
  own memes: Drake, Distracted boyfriend, Two buttons, Change my mind, Expanding brain, Gru's plan, Once again asking
  (Bernie), Is this a pigeon?, Panik/kalm/panik, Buff doge vs cheems, Trade offer, Always has been, This is fine,
  Surprised Pikachu, Woman yelling at cat, Hide the pain Harold, Draw 25, Tuxedo Pooh, Monkey puppet, Left exit 12,
  Batman slapping Robin, Mocking SpongeBob, Ancient Aliens, Roll Safe, Spider-Man pointing, Sad Pablo, DiCaprio
  cheers, Anakin and Padme, They don't know, Boardroom suggestion.
- **Fonts:** Silkscreen (Jason Kottke), Sometype Mono (Dharma Type) and Archivo (Omnibus-Type), SIL Open Font
  License 1.1.
- **Friend artwork** is each NFT's own on-chain SVG, read from rarefriends.com and rendered unmodified.
