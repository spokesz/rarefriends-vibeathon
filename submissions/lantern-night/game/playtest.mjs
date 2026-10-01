// Automated playthrough with the SDK's mock wallet fixture: npm run build && node games/lantern-night/playtest.mjs [outdir] [width]
import { testGame } from "@rarefriends/friendsdk/testing";

const out = process.argv[2] ?? "./artifacts", width = Number(process.argv[3] ?? 960), height = Number(process.argv[4] ?? 800);
const shot = (page, name) => page.locator(".rf-game-frame").screenshot({ path: `${out}/${width}-${name}.png` });

console.log(await testGame(new URL(".", import.meta.url).pathname, {
  width, height, timeout: 120_000,
  check: async ({ page, game }) => {
    const confirm = () => page.getByRole("button", { name: "Confirm preview", exact: true }).click();
    const buy = game.getByRole("button", { name: /Buy a lantern/ });
    await buy.waitFor({ timeout: 30_000 });
    await page.waitForTimeout(800); await shot(page, "1-arrive");
    await buy.click(); await confirm();
    const hold = game.getByRole("button", { name: /Hold to light lantern/ });
    await hold.waitFor();
    await shot(page, "2-holding");
    // A short press must not light the lantern.
    await hold.focus(); await page.keyboard.down(" "); await page.waitForTimeout(250); await page.keyboard.up(" ");
    await game.getByText("Hold until the lantern glows fully.").waitFor();
    await page.keyboard.down(" "); await page.waitForTimeout(600); await shot(page, "3-charging");
    await page.waitForTimeout(500); await page.keyboard.up(" ");
    await shot(page, "3b-confirm"); await confirm();
    await page.waitForTimeout(900); await shot(page, "4-rising");
    const keep = game.getByRole("button", { name: "Keep in the sky" });
    await keep.waitFor({ timeout: 10_000 });
    await page.waitForTimeout(400); await shot(page, "5-reveal");
    await keep.click();
    // Light several more to fill the sky and unlock a paper.
    await game.getByRole("button", { name: "Buy 5" }).click(); await confirm();
    for (let i = 0; i < 5; i++) {
      const button = game.getByRole("button", { name: /Hold to light lantern/ });
      await button.waitFor(); await button.focus();
      await page.keyboard.down("Enter"); await page.waitForTimeout(1000); await page.keyboard.up("Enter"); await confirm();
      const done = game.getByRole("button", { name: "Keep in the sky" }); await done.waitFor({ timeout: 10_000 }); await done.click();
    }
    await page.waitForTimeout(1500); await shot(page, "6-sky");
    await game.getByRole("button", { name: "Festival" }).click();
    await game.getByRole("button", { name: /Striped paper/ }).click();
    await shot(page, "7-festival");
    await page.keyboard.press("Escape");
    await game.getByRole("button", { name: /^Sky/ }).click(); await shot(page, "8-gifts");
    await page.keyboard.press("Escape");
    await game.getByRole("button", { name: "Settings", exact: true }).click();
    await game.getByRole("dialog").getByRole("button", { name: "Sound off" }).click();
    await game.getByLabel("Reduce motion").check();
    await shot(page, "9-settings");
    const burned = await game.locator(".ln-burn").textContent();
    if (!burned?.includes("0.6 RF")) throw new Error(`Unexpected burn counter: ${burned}`);
  },
}));
