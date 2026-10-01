/** Canvas renderer for Lantern Night, in the SDK's one-bit style: white paper, black ink, one signal green. */
import { spriteFrame, type GenerationSprites } from "@rarefriends/friendsdk/sprites";

export const VIEW = { width: 960, height: 640 } as const;
export const FRIEND = { x: 480, feet: 470, scale: 5 } as const;
export const INK = "#111", PAPER = "#fff", SIGNAL = "#ccff00";
export type Phase = "idle" | "charging" | "rising" | "descending" | "reveal";
export type Pattern = "plain" | "stripes" | "checks" | "dots";

export type SceneState = Readonly<{
  phase: Phase;
  /** Scene-clock milliseconds when the phase began. */
  phaseStart: number;
  charge: number;
  outcome: number | null;
  holding: boolean;
  inventory: readonly number[];
  pattern: Pattern;
  reducedMotion: boolean;
}>;

export const TIMING = {
  charge: 900,
  rise: { full: 2600, reduced: 700 },
  descend: { full: 1500, reduced: 500 },
} as const;

/** 9 × 9 one-bit gift icons, drawn like the canonical Friend sprites (black mask, white halo). */
const ICONS = [
  ["....#....", "....#....", "...###...", "#########", ".#######.", "..#####..", ".###.###.", ".##...##.", "#.......#"],
  ["..#####..", ".###.....", "###......", "###......", "###......", "###......", "###......", ".###.....", "..#####.."],
  ["......#.#", ".....#.#.", "....#.#..", "..###.#..", ".#####...", "#######..", "#######..", ".#####...", "..###...."],
] as const;

type Ember = { x: number; y: number; vy: number; life: number };
type Drifter = { x: number; y: number; speed: number; size: number; pattern: Pattern };

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 2 ** 32; };
}

const rand = seeded(0x4c4e54);
const STARS = Array.from({ length: 110 }, () => ({ x: Math.round(rand() * VIEW.width), y: Math.round(-320 + rand() * 690), big: rand() > 0.8, phase: Math.floor(rand() * 8) }));
const ROOFS = Array.from({ length: 9 }, (_, i) => ({ x: 40 + i * 105 + Math.round(rand() * 40), w: 22 + Math.round(rand() * 14), lit: rand() > 0.4 }));
/** Visible window onto the 960 × 640 world. Portrait frames crop the sides and extend the sky upward. */
export type Layout = Readonly<{ width: number; height: number }>;
export function layoutFor(aspect: number): Layout {
  return aspect >= 1.2 ? { width: Math.round(640 * aspect), height: 640 } : { width: 480, height: Math.max(640, Math.round(480 / aspect)) };
}

/** Fixed sky slots for kept gifts so each constellation grows stably within the visible sky. */
function skySlots(left: number, top: number, width: number) {
  const skyHeight = 380 - top, spread = Math.max(0.55, width / 960);
  return Array.from({ length: 4 }, (_, kind) => {
    const pick = seeded(0x51 + kind * 97), cx = left + width * (0.16 + 0.23 * kind), cy = top + (width < 700 ? 160 : 100) + (kind % 2) * skyHeight * 0.25;
    return Array.from({ length: 30 }, (_, i) => ({ x: Math.round(cx + (Math.cos(i * 2.4) * (18 + i * 5) + (pick() - 0.5) * 30) * spread), y: Math.round(cy + (Math.sin(i * 2.4) * (10 + i * 2.2) + (pick() - 0.5) * 20) * spread) }));
  });
}

export const ease = (t: number) => 1 - (1 - Math.min(1, Math.max(0, t))) ** 3;
export const riseMs = (reduced: boolean) => reduced ? TIMING.rise.reduced : TIMING.rise.full;
export const descendMs = (reduced: boolean) => reduced ? TIMING.descend.reduced : TIMING.descend.full;

const HELD = { x: FRIEND.x, y: FRIEND.feet - 118 };
const SKY_TOP = 70;

export function lanternPath(progress: number) {
  const p = ease(progress);
  return { x: HELD.x + Math.sin(progress * 5.2) * 40 * progress, y: HELD.y - (HELD.y - SKY_TOP) * p, scale: 1.3 - 0.8 * p };
}

export function createScene(canvas: HTMLCanvasElement, sprites: GenerationSprites | null, layout: Layout = VIEW) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot draw the festival.");
  const ctx = context;
  const ratio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  canvas.width = Math.round(layout.width * ratio); canvas.height = Math.round(layout.height * ratio);
  const offsetX = (layout.width - VIEW.width) / 2, offsetY = layout.height - VIEW.height;
  const L = -offsetX, R = L + layout.width, T = -offsetY;
  const SKY_SLOTS = skySlots(L, T, layout.width);
  let embers: Ember[] = [];
  const drifters: Drifter[] = [];
  let lastEmber = 0, previous = 0;

  const px = (x: number, y: number, w: number, h: number, color = INK) => { ctx.fillStyle = color; ctx.fillRect(Math.round(x), Math.round(y), w, h); };

  function dottedLine(x1: number, y1: number, x2: number, y2: number, gap = 10) {
    const steps = Math.max(1, Math.floor(Math.hypot(x2 - x1, y2 - y1) / gap));
    for (let i = 0; i <= steps; i++) px(x1 + (x2 - x1) * i / steps - 1, y1 + (y2 - y1) * i / steps - 1, 2, 2);
  }

  function drawSky(frame: number) {
    ctx.fillStyle = PAPER; ctx.fillRect(L, T, layout.width, layout.height);
    for (const star of STARS) {
      if ((frame + star.phase) % 8 === 0) continue; // one-bit twinkle: blink off briefly
      if (star.big) { px(star.x - 3, star.y, 7, 1); px(star.x, star.y - 3, 1, 7); } else px(star.x, star.y, 2, 2);
    }
    // Moon: outlined disc with a hatched shadow side
    const mx = R - (layout.width < 700 ? 70 : 148), my = T + (layout.width < 700 ? 150 : 96);
    ctx.save(); ctx.beginPath(); ctx.arc(mx, my, 30, 0, Math.PI * 2); ctx.fillStyle = PAPER; ctx.fill(); ctx.clip();
    for (let y = my - 32; y < my + 34; y += 4) px(mx + 6, y, 40, 1);
    ctx.restore();
    ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(mx, my, 30, 0, Math.PI * 2); ctx.stroke();
  }

  function drawLand() {
    // Distant ridge with tiny rooftops
    ctx.fillStyle = PAPER; ctx.strokeStyle = INK; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 420); ctx.bezierCurveTo(200, 390, 330, 424, 520, 404); ctx.bezierCurveTo(700, 386, 820, 414, 960, 398);
    ctx.lineTo(960, 640); ctx.lineTo(0, 640); ctx.closePath(); ctx.fill(); ctx.stroke();
    for (const roof of ROOFS) {
      const base = Math.round(418 + Math.sin(roof.x / 90) * 8);
      ctx.fillStyle = PAPER; ctx.beginPath(); ctx.moveTo(roof.x, base); ctx.lineTo(roof.x + roof.w / 2, base - 12); ctx.lineTo(roof.x + roof.w, base); ctx.lineTo(roof.x + roof.w, base + 12); ctx.lineTo(roof.x, base + 12); ctx.closePath(); ctx.fill(); ctx.stroke();
      if (roof.lit) px(roof.x + roof.w / 2 - 3, base + 3, 6, 6, SIGNAL);
    }
    // Floating hill, echoing the SDK island: white top, dash texture, black extruded edge
    const cx = 480, cy = 488, rx = 300, ry = 58, depth = 16;
    ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(cx, cy + depth, rx, ry, 0, 0, Math.PI); ctx.lineTo(cx - rx, cy); ctx.ellipse(cx, cy, rx, ry, 0, Math.PI, 0, true); ctx.closePath(); ctx.fill();
    ctx.fillStyle = PAPER; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    for (let i = 1; i < 12; i++) { const a = Math.PI * i / 12; px(cx - Math.cos(a) * rx, cy + Math.sin(a) * ry + 3, 2, depth - 4, PAPER); }
    const dashes = seeded(9);
    for (let i = 0; i < 46; i++) {
      const a = dashes() * Math.PI * 2, r = Math.sqrt(dashes()) * 0.88;
      const x = cx + Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r;
      if (Math.abs(x - cx) > 50 || y > cy + 10) px(x, y, 6, 2);
    }
  }

  function fillPattern(pattern: Pattern, x: number, y: number, w: number, h: number, step: number) {
    if (pattern === "stripes") for (let yy = y; yy < y + h; yy += step) px(x, yy, w, Math.max(1, Math.round(step / 3)));
    else if (pattern === "checks") for (let row = 0, yy = y; yy < y + h; yy += step, row++) for (let xx = x + (row % 2) * step; xx < x + w; xx += step * 2) px(xx, yy, step, step);
    else if (pattern === "dots") for (let yy = y + step / 2; yy < y + h; yy += step) for (let xx = x + step / 2; xx < x + w; xx += step) px(xx, yy, 2, 2);
  }

  /** `light` 0..1 fills the paper with signal green from the bottom up; a lit lantern throws pixel rays. */
  function drawLantern(x: number, y: number, scale: number, pattern: Pattern, light: number, now = 0, rays = false) {
    const w = 30 * scale, top = 20 * scale, h = 38 * scale, left = x - w / 2, upper = y - h / 2;
    const body = new Path2D();
    body.moveTo(x - top / 2, upper); body.lineTo(x + top / 2, upper);
    body.quadraticCurveTo(x + w / 2 + 4 * scale, y, x + w / 2 - 2 * scale, y + h / 2);
    body.lineTo(x - w / 2 + 2 * scale, y + h / 2);
    body.quadraticCurveTo(x - w / 2 - 4 * scale, y, x - top / 2, upper); body.closePath();
    if (rays && light >= 1) {
      const turn = now / 900;
      for (let i = 0; i < 8; i++) { const a = turn + i * Math.PI / 4; dottedLine(x + Math.cos(a) * w * 0.85, y + Math.sin(a) * h * 0.75, x + Math.cos(a) * w * 1.3, y + Math.sin(a) * h * 1.1, 6); }
    }
    ctx.save(); ctx.fillStyle = PAPER; ctx.fill(body); ctx.clip(body);
    if (light > 0) { ctx.fillStyle = SIGNAL; ctx.fillRect(left - 6, y + h / 2 - (h + 2) * light, w + 12, (h + 2) * light); }
    fillPattern(pattern, left - 6, upper, w + 12, h, Math.max(3, Math.round(6 * scale)));
    ctx.restore();
    ctx.strokeStyle = INK; ctx.lineWidth = Math.max(1.5, 2 * scale); ctx.stroke(body);
    px(x - w / 2 + 3 * scale, y + h / 2, w - 6 * scale, Math.max(2, 4 * scale));
    if (light >= 1) px(x - 2 * scale, y + h / 2 - 9 * scale, 4 * scale, 6 * scale); // the wick
  }

  function drawIcon(kind: number, x: number, y: number, pixel: number, now = 0) {
    if (kind === 3) { drawLantern(x, y, pixel / 4, "plain", 1, now, true); return; }
    const rows = ICONS[kind] ?? ICONS[0], left = Math.round(x - 4.5 * pixel), top = Math.round(y - 4.5 * pixel);
    rows.forEach((row, py) => [...row].forEach((cell, pxl) => { if (cell === "#") px(left + pxl * pixel - pixel, top + py * pixel - pixel, pixel * 3, pixel * 3, PAPER); }));
    rows.forEach((row, py) => [...row].forEach((cell, pxl) => { if (cell === "#") px(left + pxl * pixel, top + py * pixel, pixel, pixel); }));
  }

  function drawFriend(now: number, state: SceneState) {
    const celebrating = state.phase === "reveal" && state.outcome !== null && !state.reducedMotion;
    const big = (state.outcome ?? 0) >= 2;
    const hop = celebrating ? Math.round(Math.abs(Math.sin(now / (big ? 140 : 220))) * (big ? 24 : 12)) : 0;
    const size = 16 * FRIEND.scale, left = FRIEND.x - size / 2, top = FRIEND.feet - size + 4 - hop;
    px(FRIEND.x - 26 + hop / 2, FRIEND.feet + 2, 52 - hop, 4); // pixel shadow
    if (!sprites) return;
    const frameIndex = state.reducedMotion ? 0 : Math.floor(now / 160) % 8;
    const rows = spriteFrame(sprites, "down", false, frameIndex).frame.rows, s = FRIEND.scale;
    const pixels: [number, number][] = [];
    rows.forEach((row, py) => [...row].forEach((pixel, pxl) => { if (pixel === "#") pixels.push([pxl, py]); }));
    for (const [x, y] of pixels) px(left + x * s - s, top + y * s - s, s * 3, s * 3, PAPER);
    for (const [x, y] of pixels) px(left + x * s, top + y * s, s, s);
  }

  function drawBurst(now: number, x: number, y: number, legendary: boolean) {
    const turn = now / 1200, count = legendary ? 16 : 10, reach = legendary ? 150 : 95;
    if (legendary) { ctx.fillStyle = SIGNAL; ctx.beginPath(); ctx.arc(x, y, 62 + Math.round(Math.sin(now / 200) * 6), 0, Math.PI * 2); ctx.fill(); }
    for (let i = 0; i < count; i++) { const a = turn + i * Math.PI * 2 / count; dottedLine(x + Math.cos(a) * 44, y + Math.sin(a) * 44, x + Math.cos(a) * reach, y + Math.sin(a) * reach, 8); }
  }

  function drawConstellation(inventory: readonly number[]) {
    inventory.forEach((count, kind) => {
      const slots = SKY_SLOTS[kind].slice(0, Math.min(count, 30));
      slots.forEach((slot, i) => { if (i > 0) dottedLine(slots[i - 1].x, slots[i - 1].y, slot.x, slot.y, 7); });
      slots.forEach(slot => drawIcon(kind, slot.x, slot.y, kind === 3 ? 3 : 2));
    });
  }

  return {
    /** A launched lantern keeps drifting in the background for the rest of the session. */
    addDrifter(pattern: Pattern) {
      if (drifters.length >= 18) drifters.shift();
      drifters.push({ x: L + 40 + Math.random() * (layout.width - 80), y: T + 130 + Math.random() * (360 - T - 130), speed: 0.08 + Math.random() * 0.1, size: 0.35 + Math.random() * 0.2, pattern });
    },
    draw(now: number, state: SceneState) {
      const dt = previous ? Math.min(64, now - previous) : 16; previous = now;
      const frame = state.reducedMotion ? 1 : Math.floor(now / 250);
      const scale = canvas.width / layout.width;
      ctx.setTransform(scale, 0, 0, scale, offsetX * scale, offsetY * scale);
      ctx.imageSmoothingEnabled = false;
      drawSky(frame);
      drawConstellation(state.inventory);
      for (const drifter of drifters) {
        if (!state.reducedMotion) { drifter.y -= drifter.speed * dt / 16; if (drifter.y < T + 20) drifter.y = 380; }
        drawLantern(drifter.x + (state.reducedMotion ? 0 : Math.round(Math.sin(now / 1300 + drifter.x) * 6)), drifter.y, drifter.size, drifter.pattern, 1);
      }
      drawLand();
      const elapsed = now - state.phaseStart;
      if (state.phase === "idle" || state.phase === "charging") {
        if (state.holding || state.phase === "charging") {
          const shake = state.phase === "charging" && !state.reducedMotion && state.charge < 1 ? Math.round(Math.sin(now / 30) * state.charge * 2) : 0;
          drawLantern(HELD.x + shake, HELD.y, 1.3, state.pattern, state.phase === "charging" ? state.charge : 0, now, true);
        }
      } else if (state.phase === "rising") {
        const progress = Math.min(1, elapsed / riseMs(state.reducedMotion)), at = lanternPath(progress);
        for (let t = 0; t < progress - 0.04; t += 0.05) { const p = lanternPath(t); px(p.x - 1, p.y + 30 * p.scale, 2, 2); }
        drawLantern(at.x, at.y, at.scale, state.pattern, 1, now, true);
        if (!state.reducedMotion && now - lastEmber > 60) { lastEmber = now; embers.push({ x: at.x + (Math.random() - 0.5) * 12, y: at.y + 22 * at.scale, vy: 0.8 + Math.random() * 0.7, life: 1 }); }
        if (progress < 0.75) {
          ctx.font = "bold 14px ui-monospace, SFMono-Regular, Menlo, monospace"; ctx.textAlign = "center";
          const label = "0.1 RF wick burned", w = Math.round(ctx.measureText(label).width + 14), lx = Math.round(Math.min(at.x + 60 * at.scale + w / 2, R - w / 2 - 6)), ly = Math.round(at.y);
          px(lx - w / 2, ly - 12, w, 22, INK); px(lx - w / 2 + 2, ly - 10, w - 4, 18, PAPER);
          ctx.fillStyle = INK; ctx.fillText(label, lx, ly + 3);
        }
      } else if (state.phase === "descending" && state.outcome !== null) {
        const progress = ease(elapsed / descendMs(state.reducedMotion)), end = lanternPath(1);
        const x = end.x + (HELD.x - end.x) * progress, y = end.y + (HELD.y - end.y) * progress;
        if (y - 30 > end.y) dottedLine(end.x, end.y, x, y - 30, 12);
        drawIcon(state.outcome, x, y, 4, now);
      } else if (state.phase === "reveal" && state.outcome !== null) {
        if (state.outcome >= 2 && !state.reducedMotion) drawBurst(now, HELD.x, HELD.y, state.outcome === 3);
        drawIcon(state.outcome, HELD.x, HELD.y, 5, now);
      }
      embers = embers.filter(ember => (ember.life -= dt / 1300) > 0);
      for (const ember of embers) { ember.y += ember.vy * dt / 16; px(ember.x, ember.y, 3, 3); }
      drawFriend(now, state);
    },
  };
}
