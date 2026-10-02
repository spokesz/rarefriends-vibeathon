![Friends Publishing House: cast a Friend, ink a page, publish](https://raw.githubusercontent.com/Halldon-Inc/friends-publishing-house/master/docs/media/demo.gif)

# Friends Publishing House

**Your Friend. Your manga.**

Holders write and publish their own manga starring their Friend. Anyone can read it, and any holder can remix it with credit.

- **Live:** https://friends-publishing-house.vercel.app
- **Read the demo issue (no wallet needed):** https://friends-publishing-house.vercel.app/read/the-gm-heist-2fe169
- **Video (28 s, MP4):** [demo.mp4](https://github.com/Halldon-Inc/friends-publishing-house/blob/master/docs/media/demo.mp4). Pick a FriendSDK world for a panel, cast a Friend, pose it, add a speech bubble and SFX, flip B&W and colour, publish, read it, then the 1200 x 630 card X shows when the link is posted.
- **Phones:** the full editor works by touch, and the reader swipes page to page.

**Project**
Friends Publishing House, a manga studio and publishing shelf for Rare Friends holders, built with FriendSDK v0.1.4.

**Builder / contact**
Hunt &middot; GitHub [@huntclubhero](https://github.com/huntclubhero) &middot; wallet `huntclubhero.eth`

**Category**
Character Spotlight

**One sentence**
Holders build worlds with FriendSDK, cast their own Rare Friends as the leads, ink manga pages in black and white or
full colour, and publish issues anyone can read, share to X, embed, or remix.

**Source**
[github.com/Halldon-Inc/friends-publishing-house](https://github.com/Halldon-Inc/friends-publishing-house)
(Next.js 15, TypeScript). FriendSDK v0.1.4 is vendored as its release tarball (`vendor/`, SHA-256 matches the
release's SHA256SUMS).

```sh
git clone https://github.com/Halldon-Inc/friends-publishing-house && cd friends-publishing-house
npm install
cp .env.example .env.local
npx next dev -p 3190
```

**Wallet and network**
Reading needs nothing. Creating needs a wallet holding a Genesis or Generations Friend on Robinhood mainnet (chain
4663). Sign-in is one signed message: free, no transaction, no approval.

## Why it is Character Spotlight

Your Friend is the main character of every page. Generations Friends are drawn from **FriendSDK's canonical
sprites** (`createGenerationSpriteReader`), so a creator can pose them in **4 facings, idle or walking, across 8
animation frames**, the same artwork the SDK games use. Genesis Friends use their on-chain `tokenURI` portrait.
The cast picker lists the Friends in your wallet, and any Friend can guest star by number.

| Worlds, in colour | ...or black and white |
| --- | --- |
| ![World builder in colour](https://raw.githubusercontent.com/Halldon-Inc/friends-publishing-house/master/docs/media/world-colour.png) | ![World builder in B&W](https://raw.githubusercontent.com/Halldon-Inc/friends-publishing-house/master/docs/media/world-bw.png) |

## How to use it

**Reading (anyone):** open the shelf on the home page, pick an issue, read it scrolling or page by page. Share
buttons post to X, Farcaster or Telegram, copy the link, or copy an iframe embed. Each page downloads as a PNG, and
there is an RSS feed at `/feed.xml`.

**Creating (holders):**
1. **Sign in.** Open `/studio`, connect a wallet holding a Genesis or Generations Friend on Robinhood mainnet, and
   sign one plain-text sign-in message (EIP-4361). The server verifies the signature and checks `balanceOf` on both
   collections.
2. **Build a world.** Start from any of the six FriendSDK worlds (Garden Commons, Circuit Courtyard, Crystal Steps,
   Rooftop Hangout, Tidal Islands, Orbital Array), drag in any of the 18 SDK props, walk your Friends onto the
   ground, and switch between **black and white** (SDK monochrome with signal green) and **colour** (SDK
   `GAME_PALETTE`). Rendering is the SDK's own `renderWorld`, with Friends passed as live actors so they depth-sort
   among the props, and `worldContains` keeping everything on the ground.
3. **Ink the pages.** 9 panel layouts (slanted manga cuts, 4-koma, splash, grid), screentones, speed lines, aimable
   focus lines, worlds as panel backgrounds you pan and zoom, speech/shout/thought/whisper/narration bubbles with
   draggable tails, SFX lettering (GM, LFG and WAGMI included), manga emotes and SDK prop stickers. Undo, autosave,
   and one switch turns the whole issue B&W or colour.
4. **Publish.** Pages render in the browser from the same SVG the editor shows (1200 x 1800 PNG) plus a
   1200 x 630 share card, so a link posted on X unfurls with the cover. Republishing keeps the link.
5. **Remix.** Any published issue has a "Remix this issue" button: a holder gets a copy with their own Friends to
   swap in, and the published remix credits the original.

**On a phone:** the canvas sits on top and the tools live in a tabbed tray (Add, Edit, Page, Issue; World, Props,
Friends, Edit in the world builder). Friends, props, bubble tails and the resize and rotate handles all drag with a
finger. The reader swipes, or tap the right side for next and the left for back.

![The phone editor: canvas, bubble text, cast picker, reader](https://raw.githubusercontent.com/Halldon-Inc/friends-publishing-house/master/docs/media/phone-editor.png)

![The GM Heist, a 3-page demo issue](https://raw.githubusercontent.com/Halldon-Inc/friends-publishing-house/master/docs/media/gm-heist-pages.png)

| Editor | Share card on X |
| --- | --- |
| ![Editor](https://raw.githubusercontent.com/Halldon-Inc/friends-publishing-house/master/docs/media/editor.png) | ![X card](https://raw.githubusercontent.com/Halldon-Inc/friends-publishing-house/master/docs/media/x-card.png) |

**RF costs and rewards:** none. Creating, publishing and reading are free; there are no purchases, simulated or
real, and no contract calls beyond read-only ownership checks.

**Third-party assets:** world, prop and character artwork via FriendSDK (Rare Friends Isometric World Assets,
canonical Generations sprites; see FriendSDK NOTICE.md) and on-chain Genesis portraits. Fonts under the SIL Open
Font License: Dela Gothic One, Bangers, Comic Neue, Silkscreen, Space Grotesk. Everything else (tones, bubbles,
emotes, layouts) is drawn in code.

## Checks and known issues

- **Checks run:** TypeScript typecheck clean; `next build` green.
- **Touch and desktop end to end (Playwright):** real touch drags at 360, 390 and 430 px portrait and 844 x 390
  landscape, and the same flow with a mouse at 1440 px. Build a world (all six bases, props, a Friend, drag both,
  B&W and colour, remove then undo, autosave survives a reload), make a page (drag, resize and rotate a Friend,
  type a bubble and drag its tail, SFX, emote, prop, pan a world panel, change layout, add a page), publish, then
  read it (swipe, tap back, share buttons). All passing, 0 console errors, no horizontal overflow, and every control
  on those screens at least 40 px.
- **Earlier runs:** the reader's `og:image` / `twitter:card` tags check out. After deploy, a production smoke test
  confirmed pages load, studio APIs refuse requests without a holder session, and the local-only dev sign-in
  returns 404.
- **Real wallet:** signing in with a real wallet (MetaMask) on the live site works end to end.
- **Phones:** keyboard handling follows the browser's visual viewport; checked in emulation, not yet on a physical
  iPhone.
- **Demo issue:** "The GM Heist" is a house demo (pen name "FPH Demo Desk") made in the studio so judges without a
  Friend have something to read; its Friends appear as guest stars. The video was recorded on a local run of the
  same code.
- Community project, not affiliated with Rare Friends.

## Wallet note

Sign-in is a free signed message: no transaction, no approval, nothing that can move funds. Some wallets flag new
domains. On this `*.vercel.app` domain, MetaMask's security alerts have shown a "malicious" warning on the sign-in
signature. The message is a valid EIP-4361 sign-in whose domain matches the site, and it is on no phishing list we
checked, so we believe it is a reputation false positive for a new domain.
