# Rare Friends Vibeathon

**September 20–30, 2026 · $40,000 advertised prize pool**

1 prompt. 1 Rare Friend. Build something interesting for Rare Friends: a minigame, virtual pet, idle game, gacha, launchpad, tool, agent, or something new. AI-assisted builds are welcome. One working core interaction is enough.

## Choose your approach

### Games using FriendSDK

Use [FriendSDK v0.1.2](https://github.com/spokesz/friendsdk) when its game runtime fits your idea.

- **Make your selected Rare Friend part of the experience** and preserve its original character artwork.
- **Use the SDK's wallet and Friend selection.** Builders and players need a wallet holding a hardwired Generations NFT, generation 1 or higher, on Robinhood mainnet—even for previews.
- **Keep everything inside the SDK's 960 × 640 viewport.** Your world can be larger: custom cameras, scrolling maps and custom renderers are welcome. Support keyboard and touch, with usable loading, error, mute and reduced-motion controls.

Choose your own world, artwork and style. Start with the SDK's starter example and make the main interaction work from beginning to end.

### Projects without FriendSDK

**FriendSDK is optional.** If your idea needs a different interface or capabilities the SDK does not provide—such as a launchpad, tool or agent—use the stack that fits. Explain how it connects to Rare Friends or $RAREFRIENDS, and demonstrate one working interaction. The SDK's game container and game controls apply to SDK games. Document any wallet or identity requirements your project needs.

For either approach, **keep purchases and rewards simulated for your MVP, and label them clearly.** Live contracts and real-money transactions are not required to submit. Describe features that need future support or integration.

## How to submit

Open a pull request in this repository adding `submissions/your-project/README.md` by **September 30, 2026**. Exact cutoff time and timezone: **TBA**.

Use the [Fishing example submission](https://github.com/spokesz/rarefriends-vibeathon/pull/1) as a format guide, adapting the game-specific details to your project. Include these details in your submission README and PR description:

- **Project name, builder name/contact and category.**
- **One sentence** explaining the project and how it uses Rare Friends or $RAREFRIENDS.
- **Source repository** with code, assets and clear setup and run instructions. State whether you use FriendSDK and its version, or name your stack.
- **Playable preview or demo.** Games must include a public playable preview link; web tools and agents must include a working demo link. For CLI tools or background agents without a web interface, include a reproducible demo command and a short recording or example output. State any wallet and network requirements.
- **How to use it.** Describe controls and game rules, or the steps to try your tool, agent or other project. If applicable, list RF costs, outcome probabilities, rewards and consumable rules. Credit any third-party assets.
- **Checks and known issues.** For SDK games, run relevant tests, typecheck, game validation and browser checks. For other projects, report checks appropriate to the stack and main interaction. Report failures, limitations and any known risks involving wallets or funds.

Submit early and improve your entry during the event. **You may host public playable previews and working demos on GitHub Pages or another static host. No separate Rare Friends approval is needed for submission previews.** For SDK games, follow the [build and hosting steps](https://github.com/spokesz/friendsdk#build-and-share-a-preview), keeping the ownership gate and simulated economy intact. Official production publication through Rare Friends still requires a separate review.

Need help choosing an approach or submitting? Join [Vibeathon support on Telegram](https://t.me/RFVibeathon).

## Categories and prizes

| Category | What it recognises | 1st | 2nd | 3rd |
|---|---|---|---|---|
| Character Spotlight | Best use of a Generations NFT as the main character | $1,000 + 1 Genesis NFT | $500 + 10 Gen-1 NFTs | $250 + 9 Gen-1 NFTs |
| Token Activity | Most successful at burning or spending $RAREFRIENDS | $1,000 + 1 Genesis NFT | $500 + 10 Gen-1 NFTs | $250 + 9 Gen-1 NFTs |
| Economy Potential | Best potential for a token economy paired with $RAREFRIENDS | $1,000 + 1 Genesis NFT | $500 + 10 Gen-1 NFTs | $250 + 9 Gen-1 NFTs |

**Details pending:** seven additional paid spots are advertised alongside the $40,000 total pool. Remaining payouts, NFT valuations and how simulated entries are judged for Token Activity are TBA.
