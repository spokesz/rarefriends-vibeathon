# Friend's Sound Studio: Lo-Fi Beat Lab

- **Builder / contact:** [@proplayer688](https://github.com/proplayer688)
- **Categories:** Character Spotlight (primary); Economy Potential (secondary)
- **Stack:** FriendSDK v0.1.2, React, and the native Web Audio API
- **Source:** [proplayer688/SoundNess](https://github.com/proplayer688/SoundNess)
- **Playable preview:** [Friend's Sound Studio](https://proplayer688.github.io/SoundNess/)

## What it is

A selected Rare Friend becomes the lo-fi studio producer, reacting to a four-lane beat sequencer while players synthesize and shape their own loops in the browser.

## How to try it

Open the public preview and connect a browser wallet on Robinhood mainnet (chain 4663) that owns a hardwired Rare Friends Generations NFT, generation 1 or higher. FriendSDK applies this ownership requirement in previews too. The developer session did not complete an end-to-end playthrough, so the ownership-gated game interaction remains unverified by the builder.

Press **Play** or **Space** to start or pause. Tap or click the 16-step pads to toggle kick, snare, hat, and chord hits. Set tempo from 65–95 BPM, solo a lane, and adjust reverb, low-pass, and tape-warble controls with mouse, touch, or keyboard. Audio starts after the Play gesture to comply with browser audio policies.

To run from source with Node.js 22 or newer: run `npm ci`, then `npx friendsdk dev ./games/lofi-beat-lab`. The app also supports the SDK's 960 × 640 container and reduced-motion preference.

## $RAREFRIENDS economy

The store demonstrates fixed, deterministic preview prices: 50 RF for Analog Tape Saturation & Master Reverb, 100 RF for the 8-Bit Chiptune Sound Bank, 150 RF for the Neo-Tokyo Rainy Night theme, and 200 RF for WAV/stem export. The store uses a clearly labeled 500 RF session-only simulated balance. It does not spend or burn real tokens, persist unlocks, use random outcomes, or offer gambling. FriendSDK v0.1.2 does not provide a general deterministic upgrade-purchase or persistent-save API; these require future integration.

## Assets and sound

Friend identity and original character sprites come from FriendSDK's canonical Generations sprite registry. Kick, snare, hi-hat, chords, and vinyl texture are synthesized in code with Web Audio; the studio scene is drawn locally. There are no external audio or visual assets.

## Checks and known issues

- `npm run typecheck` passes.
- The GitHub Actions build and GitHub Pages deployment completed successfully on GitHub's Ubuntu runner: [workflow run](https://github.com/proplayer688/SoundNess/actions/runs/36143963216).
- The public page loads into FriendSDK's Friend-selection screen. The developer did not complete an end-to-end, ownership-gated playthrough.
- `friendsdk check` could not complete in native Windows PowerShell: the SDK CLI returned an access-denied error while resolving the Windows workspace path. FriendSDK documents WSL2 as the Windows CLI environment.
- The WAV exporter prepares browser-rendered audio, but saving files may be blocked by the SDK iframe's download sandbox.
- The SDK currently requires `game.json`; its placeholder entry is unused by this studio.

