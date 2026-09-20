import type { GameItem } from "../../src/items.js";

export const fishingBait: GameItem = {
  id: "bait", name: "Bait", rarity: "Basic",
  art: { rows: ["    ####    ", "  ##....##  ", " #........# ", "#..........#", "#..........#", "##........##", " #........# ", " #........# ", " #........# ", " #........# ", " ########## "] },
};

export function Bobber({ ready = false }: { ready?: boolean }) {
  return <svg className="fv1-bobber" viewBox="0 0 80 84" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" aria-hidden="true" data-ready={ready}>
    <path d="M40 0v35M34 35h12v12H34zM26 47h28v20H26zM26 57h28M14 72h52M24 79h32" />
    {ready && <path d="M9 28 2 19M69 28l8-9M7 43H0M73 43h7" />}
  </svg>;
}

export function SoundIcon({ muted }: { muted: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m11 4-5 5H3v6h3l5 5z" />{muted ? <path d="m15 9 6 6m0-6-6 6" /> : <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />}</svg>;
}

export function SettingsIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16M8 3v6m8 0v6m-6 0v6" /></svg>;
}
