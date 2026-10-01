# AFTERLIGHT — Leave a little light behind

**Category:** Character Spotlight.

**Builder/contact:** [lilacchio](https://github.com/lilacchio).

**One sentence:** Your Generations Friend records twelve seconds of light that guides another player home while you are offline, then keeps that completed journey and thank-you as a replayable memory.

**Playable preview:** http://45.134.226.215:4317 — choose **Explore in practice mode** to play immediately without a wallet. This public HTTP preview demonstrates the complete practice-world interaction. HTTPS and a real holder sign-in playtest remain pending for verified-wallet play.

**Source:** https://github.com/lilacchio/afterlight

**Stack:** Standalone React 19, TypeScript, Canvas 2D, Node.js 24, Express, SQLite and viem. Does not use the FriendSDK runtime. Public artwork and identity contract details reference FriendSDK v0.1.2.

## The working interaction

Player A records and publishes a safe light on one of three islands. Player B follows that recording at a different time and completes the crossing. The server independently verifies the run. A completed rescue, full replay and optional preset thank-you appear in both players' journals. A can be offline for the entire rescue. Recordings and journals survive server restarts.

## Try the core interaction

1. Open the preview in two separate browser profiles. Choose **Explore in practice mode** to try the explicitly separate guest world without a wallet.
2. In the first browser, choose **Leave a light**. Turn **Light on**, walk to the upper winch wheel, and stay there until the twelve-second recording ends. Choose **Leave this light**, then **Invite a traveler** and copy the invitation URL.
3. Close the first browser. Open the invitation in the second browser, enter practice mode if needed, and choose **Follow a light**. Move right along the lower path to the lighthouse.
4. Send a thank-you after arriving. Reopen the first browser, open **My memories**, and replay the rescue that happened while you were away.

For a quick solo preview, follow the clearly labeled keeper recording. For the NFT version, sign in with your own qualifying Generations Friend instead of entering practice mode. Guest demonstrations do not prove wallet ownership or count toward verified activity.

## Identity and controls

Verified mode requires an injected EOA wallet on Robinhood mainnet (4663) owning a hardwired Generations NFT with generation >= 1. Gen-5 qualifies; reward activation is not required. One login signature authenticates persistent writes. There are no transaction prompts, approvals or token transfers. Original NFT pixels and animation frames are preserved.

An explicitly separate practice world uses original non-NFT characters. It is not counted as verified activity and never serves as an automatic fallback for a failed ownership check. Authored keeper recordings are clearly labeled. Our own persistent replay and identity implementation is necessary because the stock SDK bridge does not expose authenticated replay storage.

Use A/D, arrows, on-screen arrows or tap to move. Follow the lower path toward the lighthouse. To leave a light, record on the upper path for twelve seconds while holding E/Space or enabling Light on. The crossing requires holding a wheel, the hollow requires carrying light past three lanterns, and the final chapter requires lighting two beacons. All recordings must pass a server-side safe passage check. Sound is opt-in. Pause and reduced motion are provided.

## Economy

Free play. No RF costs, purchases, randomized rewards, consumables, redemption promises, new tokens or live contracts. This entry makes no Token Activity claim.

## Run and validation

Node.js 24+; `npm ci`, `npm run dev`, then open http://127.0.0.1:5173. Production: `npm run build`, configure `PUBLIC_URL`, then `npm start`. Docker deployment instructions and complete mechanics are in the [source README](https://github.com/lilacchio/afterlight#readme) and [DEPLOYMENT.md](https://github.com/lilacchio/afterlight/blob/main/DEPLOYMENT.md).

Validation covers deterministic safe passage for all three chapters, two-browser offline rescue and replay, mobile controls/layout, pause, wallet errors, signed authentication, current ownership checks, CSRF/origin rejection, malformed inputs, duplicate completion and persistence across restart. Automated wallet tests use fixtures; a real wallet signing playtest remains pending. Public read-only mainnet checks successfully loaded #79950's generation and canonical artwork.

Release checks on September 24, 2026: production build, typecheck, formatting, and all 21 engine/API tests passed. All four browser scenarios passed against the public demo in one run, including the offline two-player rescue and replay. Its health endpoint returned HTTP 200, and deployed JavaScript/CSS asset names matched the validated local build. Earlier layout checks covered widths from 320px to 1440px, device pixel ratios from 1 to 3, and desktop fullscreen. See [VALIDATION.md](https://github.com/lilacchio/afterlight/blob/main/VALIDATION.md) for the scope and remaining gaps.

## Known limitations

- Three authored chapters; no level editor or token economy.
- Initial IP preview uses HTTP. A final HTTPS domain and a real holder sign-in playtest are pending.
- EOA injected wallets only; no WalletConnect or smart-contract-wallet authentication.
- Guest identity is tied to a seven-day browser cookie.
- Deterministic validation rejects impossible results but cannot prove a human supplied the inputs. No financial rewards depend on the counters.
- SQLite supports the single-server deployment; this is not a distributed backend.

## Credits

Rare Friends character frames come from the canonical on-chain Families Registry, following the public contract and frame documentation in FriendSDK v0.1.2. World scenery and practice sprites are original project code. Typography uses Silkscreen and Space Mono; interface icons use Lucide. Full attribution and license notices are in [THIRD_PARTY.md](https://github.com/lilacchio/afterlight/blob/main/THIRD_PARTY.md).

Official Rare Friends production publication remains a separate review.
