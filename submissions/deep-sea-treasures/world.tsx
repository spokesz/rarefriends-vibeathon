"use client";

import { useEffect, useRef, useState } from "react";
import { loadWorldAssets } from "../../src/assets.js";
import { getWorldPreset, project, unproject, validateWorld, type WorldPoint } from "../../src/friend-world.js";
import { createWorldMovement } from "../../src/movement.js";
import { createFriendReader, spriteFrame, type GenerationSprites } from "../../src/friend-sprites.js";

import { sampleFriendSprites } from "./sample-sprites.js";

export type FishingTarget = "pond" | "vendor";
const world = validateWorld({ ...structuredClone(getWorldPreset("01-garden-oval-complete")), collision: { blocked: [{ x: 396, y: 233, w: 48, h: 34 }] } });
const view = { x: 320, y: 330, width: 960, height: 640 };
const targets = { pond: [214, 268], vendor: [420, 292] } as const;
function nearest(point: WorldPoint): FishingTarget | null {
  const found = (Object.keys(targets) as FishingTarget[]).sort((a, b) => Math.hypot(point[0] - targets[a][0], point[1] - targets[a][1]) - Math.hypot(point[0] - targets[b][0], point[1] - targets[b][1]))[0];
  return Math.hypot(point[0] - targets[found][0], point[1] - targets[found][1]) < 85 ? found : null;
}

/** Bait stand artwork with a matching collision footprint. */
function drawVendor(context: CanvasRenderingContext2D) {
  const [x, y] = project(420, 250);
  context.save(); context.translate(Math.round(x), Math.round(y)); context.lineWidth = 2;
  const polygon = (points: readonly WorldPoint[], fill = "#fff") => {
    context.beginPath(); context.moveTo(...points[0]);
    for (const point of points.slice(1)) context.lineTo(...point);
    context.closePath(); context.fillStyle = fill; context.fill(); context.strokeStyle = "#000"; context.stroke();
  };
  context.fillStyle = "#000"; context.fillRect(-42, -105, 4, 103); context.fillRect(40, -105, 4, 116);
  const vendor = sampleFriendSprites(3412n);
  if (vendor) drawFriend(context, vendor, 2, -23, "down", false, 0, 4);
  polygon([[-48, -19], [5, -35], [48, -21], [-5, -4]]);
  polygon([[-48, -19], [-5, -4], [-5, 24], [-48, 9]], "#000");
  polygon([[-5, -4], [48, -21], [48, 8], [-5, 24]]);
  polygon([[-55, -109], [7, -129], [59, -112], [-3, -92]]);
  polygon([[-55, -109], [-3, -92], [-3, -82], [-55, -99]], "#000");
  polygon([[-3, -92], [59, -112], [59, -102], [-3, -82]]);
  for (let index = 0; index < 4; index++) polygon([[-48 + index * 13, -111 + index * 4], [-38 + index * 13, -108 + index * 4], [24 + index * 9, -120 + index * 3], [15 + index * 9, -123 + index * 3]], index % 2 ? "#fff" : "#000");
  context.beginPath(); context.moveTo(-61, 9); context.lineTo(-69, -61); context.lineTo(-78, -72); context.lineTo(-78, -24); context.lineTo(-74, -20); context.stroke();
  context.restore();
}

function drawFriend(context: CanvasRenderingContext2D, sprites: GenerationSprites, x: number, y: number, facing: "up" | "down" | "left" | "right", walking: boolean, frame: number, scale = 5, side: "left" | "right" = "right") {
  const rows = spriteFrame(sprites, facing, walking, frame, side).frame.rows;
  const pixels = rows.flatMap((row, py) => [...row].flatMap((pixel, px) => pixel === "#" ? [[px, py]] : []));
  const left = Math.round(x) - 8 * scale, top = Math.round(y) - 15 * scale;
  context.save(); context.beginPath(); context.rect(left, top, 16 * scale, 16 * scale); context.clip();
  context.fillStyle = "#fff";
  for (const [px, py] of pixels) context.fillRect(left + px * scale - scale, top + py * scale - scale, scale * 3, scale * 3);
  context.fillStyle = "#000";
  for (const [px, py] of pixels) context.fillRect(left + px * scale, top + py * scale, scale, scale);
  context.restore();
}

/** Canonical terrain/props and character pixels; only the camera is game-specific. */
export function FishingWorld({ friendId, paused, reducedMotion, onNearChange, onInteract }: { friendId: bigint; paused: boolean; reducedMotion: boolean; onNearChange: (target: FishingTarget | null) => void; onInteract: (target: FishingTarget) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const movement = useRef<ReturnType<typeof createWorldMovement> | null>(null);
  const [artStatus, setArtStatus] = useState("Loading Friend artwork…");
  const [worldError, setWorldError] = useState("");
  const pause = useRef(paused);
  const callbacks = useRef({ reducedMotion, onNearChange, onInteract });
  callbacks.current = { reducedMotion, onNearChange, onInteract };
  useEffect(() => { pause.current = paused; if (paused) movement.current?.stop(); }, [paused]);

  useEffect(() => {
    const node = canvas.current, context = node?.getContext("2d");
    if (!node || !context) return;
    const controller = new AbortController();
    const mover = createWorldMovement(world, [288, 192]);
    movement.current = mover;
    let frame = 0, last = 0, sprites: GenerationSprites | undefined;
    let lastNear: FishingTarget | null = null;
    let assets: Awaited<ReturnType<typeof loadWorldAssets>> | undefined;
    let side: "left" | "right" = "right";
    const stop = () => mover.stop();
    const hidden = () => { if (document.hidden) stop(); };
    window.addEventListener("blur", stop);
    document.addEventListener("visibilitychange", hidden);
    loadWorldAssets(world, { color: false, signals: false }, controller.signal).then(value => { assets = value; }).catch(() => {
      if (!controller.signal.aborted) setWorldError("World artwork could not load. The game controls still work.");
    });
    (sampleFriendSprites(friendId) ? Promise.resolve(sampleFriendSprites(friendId)!) : createFriendReader().read(friendId)).then(value => {
      if (controller.signal.aborted) return;
      sprites = value; setArtStatus("");
    }).catch(() => {
      if (!controller.signal.aborted) setArtStatus("Friend artwork unavailable. The circle marks your position.");
    });
    const render = (now: number) => {
      const state = mover.update(!pause.current && !document.hidden && last ? now - last : 0);
      last = now;
      context.clearRect(0, 0, view.width, view.height);
      context.save(); context.translate(-view.x, -view.y); context.imageSmoothingEnabled = false;
      if (assets) context.drawImage(assets.terrain, 0, 0);
      const [x, y] = project(...state.position);
      const character = () => {
        context.fillStyle = "#0003"; context.beginPath(); context.ellipse(x, y + 2, 20, 7, 0, 0, Math.PI * 2); context.fill();
        if (!sprites) {
          context.fillStyle = "#fff"; context.strokeStyle = "#111"; context.lineWidth = 2;
          context.beginPath(); context.arc(x, y - 10, 8, 0, Math.PI * 2); context.fill(); context.stroke(); return;
        }
        if (state.facing === "left" || state.facing === "right") side = state.facing;
        drawFriend(context, sprites, x, y, state.facing, state.walking, callbacks.current.reducedMotion ? 0 : Math.floor(now / 110) % 8, 5, side);
      };
      const layers = (assets?.objects ?? []).map(object => ({ depth: object.depth, draw: () => context.drawImage(object.image, 0, 0) }));
      layers.push({ depth: 670, draw: () => drawVendor(context) });
      layers.push({ depth: state.position[0] + state.position[1], draw: character });
      layers.sort((a, b) => a.depth - b.depth).forEach(layer => layer.draw());
      const target = nearest(state.position);
      if (target !== lastNear) { lastNear = target; callbacks.current.onNearChange(target); }
      context.restore();
      node.dataset.x = state.position[0].toFixed(2); node.dataset.y = state.position[1].toFixed(2);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => {
      controller.abort(); cancelAnimationFrame(frame); mover.stop(); movement.current = null;
      window.removeEventListener("blur", stop); document.removeEventListener("visibilitychange", hidden);
    };
  }, [friendId]);

  return <div className="fv1-world">
    <canvas ref={canvas} width={view.width} height={view.height} tabIndex={paused ? -1 : 0} aria-label="Garden lake. Use arrow keys or WASD to walk, or click or tap a destination."
      onKeyDown={event => {
        if (paused) return;
        if (event.key.toLowerCase() === "e" && !event.repeat && movement.current) {
          const target = nearest(movement.current.state.position);
          if (target) { event.preventDefault(); callbacks.current.onInteract(target); }
        }
        if (movement.current?.setKey(event.key, true)) event.preventDefault();
      }}
      onKeyUp={event => { if (movement.current?.setKey(event.key, false)) event.preventDefault(); }}
      onBlur={() => movement.current?.stop()}
      onPointerDown={event => {
        if (paused) return;
        event.currentTarget.focus(); const rect = event.currentTarget.getBoundingClientRect();
        const scale = Math.min(rect.width / view.width, rect.height / view.height);
        const x = (event.clientX - rect.left - (rect.width - view.width * scale) / 2) / scale;
        const y = (event.clientY - rect.top - (rect.height - view.height * scale) / 2) / scale;
        movement.current?.moveTo(unproject(view.x + x, view.y + y));
      }} />
    <p className="fv1-world-status" data-ready={!worldError && !artStatus} role="status">{worldError || artStatus}</p>
  </div>;
}
