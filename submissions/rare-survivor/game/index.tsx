"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { GameComponentProps } from "@rarefriends/friendsdk/runtime";
import { formatGameAmount } from "@rarefriends/friendsdk/ui";
import type { GameSnapshot } from "@rarefriends/friendsdk/game";
import { createFriendSoundKit, type FriendSoundKit } from "@rarefriends/friendsdk/sounds";
import { createFriendReader, type GenerationSprites } from "@rarefriends/friendsdk/sprites";
import "@rarefriends/friendsdk/frame.css";
import "./style.css";

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 640;

// --- Entity Types ---
type EnemyType = "jeet" | "candle" | "fud" | "boss";

interface Enemy {
  id: number;
  type: EnemyType;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  speed: number;
  radius: number;
  color: string;
  wobble: number;
}

interface Projectile {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  damage: number;
  color: string;
  life: number;
  pierce: number;
}

interface Gem {
  id: number;
  x: number;
  y: number;
  value: number;
  radius: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

interface DamageText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  life: number;
}

interface LightningBolt {
  points: { x: number; y: number }[];
  life: number;
}

interface Bomb {
  x: number;
  y: number;
  radius: number;
  timer: number;
}

interface Perk {
  id: string;
  name: string;
  tier: "common" | "rare" | "legendary";
  icon: string;
  description: string;
}

const AVAILABLE_PERKS: readonly Perk[] = [
  { id: "fire_rate", name: "Laser Overclock", tier: "common", icon: "⚡", description: "+35% weapon attack frequency." },
  { id: "multi_shot", name: "Multi-Candle Split", tier: "rare", icon: "🟢", description: "+1 extra laser projectile per volley." },
  { id: "diamond_shield", name: "Diamond Hands Shield", tier: "rare", icon: "💎", description: "+1 orbiting protective crystal." },
  { id: "chain_lightning", name: "Bull Run Lightning", tier: "legendary", icon: "🌩️", description: "Discharges chain lightning zapping nearby enemies." },
  { id: "bomb_drop", name: "Airdrop Explosives", tier: "rare", icon: "💣", description: "Periodically drops high-damage explosive crates." },
  { id: "move_speed", name: "Rocket Boots", tier: "common", icon: "👟", description: "+25% player movement speed." },
  { id: "magnet", name: "Liquidity Magnet", tier: "common", icon: "🧲", description: "+60% gem collection pull radius." },
  { id: "heal", name: "Emergency Bailout", tier: "common", icon: "💖", description: "Restores 45 HP immediately and adds +20 Max HP." },
];

export default function RareSurvivor({ friendId, client, paused }: GameComponentProps) {
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [gameState, setGameState] = useState<"ready" | "playing" | "levelup" | "gameover" | "victory">("ready");
  
  // HUD state
  const [playerHp, setPlayerHp] = useState(100);
  const [playerMaxHp, setPlayerMaxHp] = useState(100);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpNext, setXpNext] = useState(10);
  const [timeSurvived, setTimeSurvived] = useState(0);
  const [kills, setKills] = useState(0);
  const [gemsCollected, setGemsCollected] = useState(0);
  const [offeredPerks, setOfferedPerks] = useState<Perk[]>([]);
  const [muted, setMuted] = useState(false);
  const [busy, setBusy] = useState(false);

  // Virtual Joystick State
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickOrigin, setJoystickOrigin] = useState<{ x: number; y: number } | null>(null);
  const [joystickKnob, setJoystickKnob] = useState<{ x: number; y: number } | null>(null);

  // Engine Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const soundRef = useRef<FriendSoundKit | null>(null);
  const spritesRef = useRef<GenerationSprites | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const touchVector = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Game Engine Internal mutable state
  const sim = useRef({
    px: CANVAS_WIDTH / 2,
    py: CANVAS_HEIGHT / 2,
    hp: 100,
    maxHp: 100,
    speed: 4.2,
    facing: "right" as "left" | "right",
    invulnerableTimer: 0,
    magnetRadius: 90,
    
    // Weapons
    fireRateCooldwon: 0.38,
    fireTimer: 0,
    laserCount: 1,
    laserDamage: 18,
    
    shields: 0,
    shieldAngle: 0,
    shieldDamage: 25,
    
    hasLightning: false,
    lightningTimer: 0,
    
    hasBombs: false,
    bombTimer: 0,
    bombs: [] as Bomb[],

    // Collections
    enemies: [] as Enemy[],
    projectiles: [] as Projectile[],
    gems: [] as Gem[],
    particles: [] as Particle[],
    damageTexts: [] as DamageText[],
    lightningBolts: [] as LightningBolt[],
    
    // Wave tracking
    spawnTimer: 0,
    gameTime: 0,
    killsCount: 0,
    gemsCount: 0,
    xpVal: 0,
    xpThreshold: 10,
    lvl: 1,
    screenShake: 0,
    idSeq: 1,
    lastBossSpawnedTime: 0,
  });

  // Sound helper
  const playSound = useCallback((cue: "select" | "purchase" | "action-start" | "impact" | "reward" | "reveal-legendary" | "action-ready") => {
    if (muted || !soundRef.current) return;
    try {
      void soundRef.current.unlock().then(() => {
        soundRef.current?.play(cue);
      });
    } catch {
      // Ignored
    }
  }, [muted]);

  // Load Snapshot & Sound Kit
  useEffect(() => {
    soundRef.current = createFriendSoundKit({ volume: 0.7 });
    void client.read().then(setSnapshot).catch(() => {});

    // Read On-Chain NFT Artwork
    void createFriendReader().read(friendId).then(sprites => {
      spritesRef.current = sprites;
    }).catch(() => {
      // Fallback pixel art will be rendered
    });

    return () => {
      soundRef.current?.dispose();
      soundRef.current = null;
    };
  }, [client, friendId]);

  // Handle Input Listeners
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Level Up Perks Picker
  const rollPerks = useCallback(() => {
    const shuffled = [...AVAILABLE_PERKS].sort(() => Math.random() - 0.5);
    setOfferedPerks(shuffled.slice(0, 3));
    setGameState("levelup");
    playSound("reveal-legendary");
  }, [playSound]);

  // Select Perk
  const selectPerk = (perk: Perk) => {
    playSound("select");
    const s = sim.current;

    switch (perk.id) {
      case "fire_rate":
        s.fireRateCooldwon = Math.max(0.12, s.fireRateCooldwon * 0.72);
        break;
      case "multi_shot":
        s.laserCount += 1;
        break;
      case "diamond_shield":
        s.shields += 1;
        break;
      case "chain_lightning":
        s.hasLightning = true;
        break;
      case "bomb_drop":
        s.hasBombs = true;
        break;
      case "move_speed":
        s.speed += 0.9;
        break;
      case "magnet":
        s.magnetRadius += 55;
        break;
      case "heal":
        s.maxHp += 20;
        s.hp = Math.min(s.maxHp, s.hp + 45);
        setPlayerMaxHp(s.maxHp);
        setPlayerHp(s.hp);
        break;
    }

    setGameState("playing");
  };

  // Start / Restart Game
  const startGame = () => {
    playSound("action-start");
    const s = sim.current;
    s.px = CANVAS_WIDTH / 2;
    s.py = CANVAS_HEIGHT / 2;
    s.hp = 100;
    s.maxHp = 100;
    s.speed = 4.2;
    s.invulnerableTimer = 0;
    s.magnetRadius = 90;
    s.fireRateCooldwon = 0.38;
    s.fireTimer = 0;
    s.laserCount = 1;
    s.laserDamage = 18;
    s.shields = 0;
    s.shieldAngle = 0;
    s.hasLightning = false;
    s.lightningTimer = 0;
    s.hasBombs = false;
    s.bombTimer = 0;
    s.bombs = [];
    s.enemies = [];
    s.projectiles = [];
    s.gems = [];
    s.particles = [];
    s.damageTexts = [];
    s.lightningBolts = [];
    s.spawnTimer = 0;
    s.gameTime = 0;
    s.killsCount = 0;
    s.gemsCount = 0;
    s.xpVal = 0;
    s.xpThreshold = 10;
    s.lvl = 1;
    s.screenShake = 0;
    s.lastBossSpawnedTime = 0;

    setPlayerHp(100);
    setPlayerMaxHp(100);
    setLevel(1);
    setXp(0);
    setXpNext(10);
    setTimeSurvived(0);
    setKills(0);
    setGemsCollected(0);
    setGameState("playing");
  };

  // Buy Simulated Pack
  const buyPack = async () => {
    if (busy || paused) return;
    setBusy(true);
    try {
      await client.buy(1n);
      playSound("purchase");
      const next = await client.read();
      setSnapshot(next);
    } catch {
      // Handled
    } finally {
      setBusy(false);
    }
  };

  // Main 60 FPS Game Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (canvas && ctx && gameState === "playing" && !paused) {
        const s = sim.current;
        s.gameTime += dt;
        setTimeSurvived(Math.floor(s.gameTime));

        // Screen Shake decay
        if (s.screenShake > 0) s.screenShake = Math.max(0, s.screenShake - dt * 15);

        // --- Player Movement Calculation ---
        let mx = 0;
        let my = 0;
        const keys = keysRef.current;
        if (keys["w"] || keys["arrowup"]) my -= 1;
        if (keys["s"] || keys["arrowdown"]) my += 1;
        if (keys["a"] || keys["arrowleft"]) mx -= 1;
        if (keys["d"] || keys["arrowright"]) mx += 1;

        // Touch Vector Override
        if (touchVector.current.x !== 0 || touchVector.current.y !== 0) {
          mx = touchVector.current.x;
          my = touchVector.current.y;
        }

        const len = Math.hypot(mx, my);
        if (len > 0.05) {
          const normX = mx / len;
          const normY = my / len;
          s.px += normX * s.speed;
          s.py += normY * s.speed;
          if (normX < -0.1) s.facing = "left";
          else if (normX > 0.1) s.facing = "right";
        }

        // Clamp inside 960x640 canvas
        s.px = Math.max(28, Math.min(CANVAS_WIDTH - 28, s.px));
        s.py = Math.max(28, Math.min(CANVAS_HEIGHT - 28, s.py));

        if (s.invulnerableTimer > 0) s.invulnerableTimer -= dt;

        // --- Spawn Enemies Waves ---
        s.spawnTimer += dt;
        const spawnInterval = Math.max(0.28, 1.4 - s.gameTime * 0.01);
        if (s.spawnTimer >= spawnInterval) {
          s.spawnTimer = 0;
          // Pick spawn position on perimeter
          const edge = Math.floor(Math.random() * 4);
          let ex = 0;
          let ey = 0;
          if (edge === 0) { ex = Math.random() * CANVAS_WIDTH; ey = -20; }
          else if (edge === 1) { ex = CANVAS_WIDTH + 20; ey = Math.random() * CANVAS_HEIGHT; }
          else if (edge === 2) { ex = Math.random() * CANVAS_WIDTH; ey = CANVAS_HEIGHT + 20; }
          else { ex = -20; ey = Math.random() * CANVAS_HEIGHT; }

          // Enemy Type Selection based on survival time
          const r = Math.random();
          let type: EnemyType = "jeet";
          let hp = 16 + Math.floor(s.gameTime * 0.4);
          let speed = 2.4 + Math.random() * 0.8;
          let radius = 14;
          let color = "#ff4d6d";

          if (s.gameTime > 25 && r > 0.65) {
            type = "fud";
            hp = 28 + Math.floor(s.gameTime * 0.5);
            speed = 1.9;
            radius = 16;
            color = "#a855f7";
          } else if (s.gameTime > 15 && r > 0.4) {
            type = "candle";
            hp = 48 + Math.floor(s.gameTime * 0.8);
            speed = 1.3;
            radius = 18;
            color = "#ef4444";
          }

          s.enemies.push({
            id: s.idSeq++,
            type,
            x: ex,
            y: ey,
            hp,
            maxHp: hp,
            speed,
            radius,
            color,
            wobble: Math.random() * Math.PI * 2,
          });
        }

        // Spawn Giga Bear Boss every 75 seconds
        if (s.gameTime - s.lastBossSpawnedTime >= 75) {
          s.lastBossSpawnedTime = s.gameTime;
          playSound("action-ready");
          s.enemies.push({
            id: s.idSeq++,
            type: "boss",
            x: CANVAS_WIDTH / 2,
            y: -40,
            hp: 350 + Math.floor(s.gameTime * 3),
            maxHp: 350 + Math.floor(s.gameTime * 3),
            speed: 1.1,
            radius: 34,
            color: "#dc2626",
            wobble: 0,
          });
          s.damageTexts.push({
            id: s.idSeq++,
            text: "⚠️ BEAR MARKET BOSS INCOMING!",
            x: CANVAS_WIDTH / 2,
            y: 120,
            color: "#ffcc00",
            life: 2.2,
          });
        }

        // --- Weapon: Green Candle Blaster Auto-Attack ---
        s.fireTimer += dt;
        if (s.fireTimer >= s.fireRateCooldwon && s.enemies.length > 0) {
          s.fireTimer = 0;
          // Find closest enemies
          const sorted = [...s.enemies].sort((a, b) => {
            const da = Math.hypot(a.x - s.px, a.y - s.py);
            const db = Math.hypot(b.x - s.px, b.y - s.py);
            return da - db;
          });

          const shots = Math.min(s.laserCount, sorted.length);
          for (let i = 0; i < shots; i++) {
            const target = sorted[i];
            const angle = Math.atan2(target.y - s.py, target.x - s.px) + (i - (shots - 1) / 2) * 0.12;
            const pSpeed = 9.5;
            s.projectiles.push({
              id: s.idSeq++,
              x: s.px,
              y: s.py,
              vx: Math.cos(angle) * pSpeed,
              vy: Math.sin(angle) * pSpeed,
              radius: 6,
              damage: s.laserDamage,
              color: "#00ff88",
              life: 1.8,
              pierce: 1,
            });
          }
        }

        // --- Weapon: Diamond Hands Shield Orbit ---
        if (s.shields > 0) {
          s.shieldAngle += dt * 3.2;
          const shieldDist = 58;
          for (let i = 0; i < s.shields; i++) {
            const a = s.shieldAngle + (i * (Math.PI * 2 / s.shields));
            const sx = s.px + Math.cos(a) * shieldDist;
            const sy = s.py + Math.sin(a) * shieldDist;

            // Damage nearby enemies
            for (const enemy of s.enemies) {
              if (Math.hypot(enemy.x - sx, enemy.y - sy) < enemy.radius + 14) {
                enemy.hp -= s.shieldDamage * dt * 3;
                // Knockback
                enemy.x += Math.cos(a) * 3;
                enemy.y += Math.sin(a) * 3;
              }
            }
          }
        }

        // --- Weapon: Bull Run Chain Lightning ---
        if (s.hasLightning) {
          s.lightningTimer += dt;
          if (s.lightningTimer >= 2.6 && s.enemies.length > 0) {
            s.lightningTimer = 0;
            const chainTargets: Enemy[] = [];
            let curr = s.enemies[Math.floor(Math.random() * s.enemies.length)];
            chainTargets.push(curr);

            for (let c = 0; c < 3; c++) {
              const next = s.enemies.find(e => !chainTargets.includes(e) && Math.hypot(e.x - curr.x, e.y - curr.y) < 180);
              if (next) {
                chainTargets.push(next);
                curr = next;
              } else break;
            }

            const points: { x: number; y: number }[] = [{ x: s.px, y: s.py }];
            for (const t of chainTargets) {
              t.hp -= 38;
              points.push({ x: t.x, y: t.y });
              s.damageTexts.push({ id: s.idSeq++, text: "38", x: t.x, y: t.y - 12, color: "#00e5ff", life: 0.8 });
            }
            s.lightningBolts.push({ points, life: 0.25 });
            playSound("impact");
          }
        }

        // --- Weapon: Airdrop Bombs ---
        if (s.hasBombs) {
          s.bombTimer += dt;
          if (s.bombTimer >= 4.0) {
            s.bombTimer = 0;
            s.bombs.push({ x: s.px, y: s.py, radius: 18, timer: 1.5 });
          }
        }

        // Update Bombs
        for (let i = s.bombs.length - 1; i >= 0; i--) {
          const b = s.bombs[i];
          b.timer -= dt;
          if (b.timer <= 0) {
            // Explode!
            s.screenShake = 6;
            playSound("impact");
            for (let p = 0; p < 24; p++) {
              const ang = Math.random() * Math.PI * 2;
              const spd = Math.random() * 5 + 2;
              s.particles.push({
                x: b.x,
                y: b.y,
                vx: Math.cos(ang) * spd,
                vy: Math.sin(ang) * spd,
                color: Math.random() > 0.5 ? "#00ff88" : "#ffcc00",
                size: Math.random() * 5 + 3,
                life: 0.6,
                maxLife: 0.6,
              });
            }
            for (const enemy of s.enemies) {
              if (Math.hypot(enemy.x - b.x, enemy.y - b.y) <= 120) {
                enemy.hp -= 65;
                s.damageTexts.push({ id: s.idSeq++, text: "65", x: enemy.x, y: enemy.y - 10, color: "#ffcc00", life: 0.8 });
              }
            }
            s.bombs.splice(i, 1);
          }
        }

        // --- Update Projectiles ---
        for (let i = s.projectiles.length - 1; i >= 0; i--) {
          const p = s.projectiles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= dt;

          // Check enemy collision
          for (let j = s.enemies.length - 1; j >= 0; j--) {
            const enemy = s.enemies[j];
            if (Math.hypot(enemy.x - p.x, enemy.y - p.y) < enemy.radius + p.radius) {
              enemy.hp -= p.damage;
              s.damageTexts.push({
                id: s.idSeq++,
                text: `${p.damage}`,
                x: enemy.x + (Math.random() * 12 - 6),
                y: enemy.y - 12,
                color: "#00ff88",
                life: 0.7,
              });

              // Hit particles
              for (let k = 0; k < 3; k++) {
                s.particles.push({
                  x: p.x,
                  y: p.y,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4,
                  color: "#00ff88",
                  size: 3,
                  life: 0.3,
                  maxLife: 0.3,
                });
              }

              p.pierce--;
              if (p.pierce <= 0) {
                p.life = 0;
                break;
              }
            }
          }

          if (p.life <= 0 || p.x < 0 || p.x > CANVAS_WIDTH || p.y < 0 || p.y > CANVAS_HEIGHT) {
            s.projectiles.splice(i, 1);
          }
        }

        // --- Update Enemies & Player Contact Damage ---
        for (let i = s.enemies.length - 1; i >= 0; i--) {
          const enemy = s.enemies[i];
          enemy.wobble += dt * 4;

          // Move towards player
          const dx = s.px - enemy.x;
          const dy = s.py - enemy.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 1) {
            let vx = (dx / dist) * enemy.speed;
            let vy = (dy / dist) * enemy.speed;
            if (enemy.type === "fud") {
              // Sine wave floating movement
              vx += Math.sin(enemy.wobble) * 1.5;
            }
            enemy.x += vx;
            enemy.y += vy;
          }

          // Player contact damage
          if (dist < enemy.radius + 18 && s.invulnerableTimer <= 0) {
            const dmg = enemy.type === "boss" ? 30 : enemy.type === "candle" ? 18 : 12;
            s.hp -= dmg;
            s.invulnerableTimer = 0.55;
            s.screenShake = 7;
            playSound("impact");
            setPlayerHp(Math.max(0, s.hp));

            s.damageTexts.push({
              id: s.idSeq++,
              text: `-${dmg}`,
              x: s.px,
              y: s.py - 24,
              color: "#ff3366",
              life: 0.9,
            });

            if (s.hp <= 0) {
              setGameState("gameover");
              playSound("impact");
              return;
            }
          }

          // Enemy Death Check
          if (enemy.hp <= 0) {
            s.killsCount++;
            setKills(s.killsCount);

            // Drop Gem
            s.gems.push({
              id: s.idSeq++,
              x: enemy.x,
              y: enemy.y,
              value: enemy.type === "boss" ? 5 : 1,
              radius: enemy.type === "boss" ? 10 : 6,
            });

            // Elimination particles
            const pCount = enemy.type === "boss" ? 32 : 8;
            for (let k = 0; k < pCount; k++) {
              s.particles.push({
                x: enemy.x,
                y: enemy.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: enemy.color,
                size: Math.random() * 4 + 2,
                life: 0.5,
                maxLife: 0.5,
              });
            }

            s.enemies.splice(i, 1);
          }
        }

        // --- Update Gems Collection ---
        for (let i = s.gems.length - 1; i >= 0; i--) {
          const gem = s.gems[i];
          const dist = Math.hypot(s.px - gem.x, s.py - gem.y);

          // Magnet Attraction
          if (dist < s.magnetRadius) {
            const pullSpeed = 8.5;
            gem.x += ((s.px - gem.x) / dist) * pullSpeed;
            gem.y += ((s.py - gem.y) / dist) * pullSpeed;
          }

          // Pickup Gem
          if (dist < 22) {
            playSound("reward");
            s.gemsCount += gem.value;
            setGemsCollected(s.gemsCount);

            s.xpVal += gem.value;
            setXp(s.xpVal);

            // Level Up Check
            if (s.xpVal >= s.xpThreshold) {
              s.lvl++;
              setLevel(s.lvl);
              s.xpVal = 0;
              s.xpThreshold = Math.floor(s.xpThreshold * 1.35);
              setXp(0);
              setXpNext(s.xpThreshold);
              rollPerks();
            }

            s.gems.splice(i, 1);
          }
        }

        // --- Update Particles & Texts ---
        for (let i = s.particles.length - 1; i >= 0; i--) {
          const p = s.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= dt;
          if (p.life <= 0) s.particles.splice(i, 1);
        }

        for (let i = s.damageTexts.length - 1; i >= 0; i--) {
          const t = s.damageTexts[i];
          t.y -= 30 * dt;
          t.life -= dt;
          if (t.life <= 0) s.damageTexts.splice(i, 1);
        }

        for (let i = s.lightningBolts.length - 1; i >= 0; i--) {
          s.lightningBolts[i].life -= dt;
          if (s.lightningBolts[i].life <= 0) s.lightningBolts.splice(i, 1);
        }

        // ================= RENDERING =================
        ctx.save();
        if (s.screenShake > 0) {
          const shakeX = (Math.random() - 0.5) * s.screenShake;
          const shakeY = (Math.random() - 0.5) * s.screenShake;
          ctx.translate(shakeX, shakeY);
        }

        // 1. Cyber Grid Background
        ctx.fillStyle = "#07090e";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.strokeStyle = "rgba(0, 255, 136, 0.05)";
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < CANVAS_WIDTH; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, CANVAS_HEIGHT);
          ctx.stroke();
        }
        for (let y = 0; y < CANVAS_HEIGHT; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(CANVAS_WIDTH, y);
          ctx.stroke();
        }

        // 2. Render Bombs
        for (const b of s.bombs) {
          ctx.save();
          ctx.fillStyle = "#f59e0b";
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 14px monospace";
          ctx.textAlign = "center";
          ctx.fillText("💣", b.x, b.y + 5);
          ctx.restore();
        }

        // 3. Render Gems ($RF Crystals)
        for (const gem of s.gems) {
          ctx.save();
          ctx.shadowColor = "#ffcc00";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#ffcc00";
          ctx.beginPath();
          // Diamond polygon
          ctx.moveTo(gem.x, gem.y - gem.radius);
          ctx.lineTo(gem.x + gem.radius, gem.y);
          ctx.lineTo(gem.x, gem.y + gem.radius);
          ctx.lineTo(gem.x - gem.radius, gem.y);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // 4. Render Projectiles (Green Candles / Lasers)
        for (const p of s.projectiles) {
          ctx.save();
          ctx.shadowColor = "#00ff88";
          ctx.shadowBlur = 10;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // 5. Render Orbiting Diamond Shields
        if (s.shields > 0) {
          const shieldDist = 58;
          for (let i = 0; i < s.shields; i++) {
            const a = s.shieldAngle + (i * (Math.PI * 2 / s.shields));
            const sx = s.px + Math.cos(a) * shieldDist;
            const sy = s.py + Math.sin(a) * shieldDist;

            ctx.save();
            ctx.shadowColor = "#00e5ff";
            ctx.shadowBlur = 14;
            ctx.fillStyle = "#00e5ff";
            ctx.beginPath();
            ctx.arc(sx, sy, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
          }
        }

        // 6. Render Lightning Bolts
        for (const bolt of s.lightningBolts) {
          ctx.save();
          ctx.strokeStyle = "#00e5ff";
          ctx.lineWidth = 3;
          ctx.shadowColor = "#00e5ff";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          for (let i = 0; i < bolt.points.length; i++) {
            const pt = bolt.points[i];
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
          ctx.restore();
        }

        // 7. Render Enemies
        for (const enemy of s.enemies) {
          ctx.save();
          if (enemy.type === "candle") {
            // Tall Red Candlestick
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x - 8, enemy.y - 18, 16, 36);
            // Wick
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(enemy.x, enemy.y - 24);
            ctx.lineTo(enemy.x, enemy.y + 24);
            ctx.stroke();
          } else if (enemy.type === "boss") {
            // Boss Giga Bear
            ctx.shadowColor = "#ff0033";
            ctx.shadowBlur = 20;
            ctx.fillStyle = enemy.color;
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#ffcc00";
            ctx.lineWidth = 4;
            ctx.stroke();
            // Glowing Boss Eyes
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(enemy.x - 14, enemy.y - 6, 8, 8);
            ctx.fillRect(enemy.x + 6, enemy.y - 6, 8, 8);
          } else {
            // Jeet or FUD
            ctx.fillStyle = enemy.color;
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
            ctx.fill();
            // Eyes
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(enemy.x - 5, enemy.y - 4, 3, 3);
            ctx.fillRect(enemy.x + 2, enemy.y - 4, 3, 3);
          }

          // Enemy Health Bar
          if (enemy.hp < enemy.maxHp) {
            const barW = enemy.radius * 2;
            const fillW = Math.max(0, (enemy.hp / enemy.maxHp) * barW);
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(enemy.x - enemy.radius, enemy.y - enemy.radius - 8, barW, 4);
            ctx.fillStyle = "#00ff88";
            ctx.fillRect(enemy.x - enemy.radius, enemy.y - enemy.radius - 8, fillW, 4);
          }
          ctx.restore();
        }

        // 8. Render Player (Rare Friend)
        ctx.save();
        const isHurt = s.invulnerableTimer > 0 && Math.floor(s.invulnerableTimer * 20) % 2 === 0;

        // Shadow under player
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.beginPath();
        ctx.ellipse(s.px, s.py + 18, 16, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        if (isHurt) {
          ctx.filter = "brightness(2) drop-shadow(0 0 8px #ff3366)";
        }

        // Render Loaded Canonical Sprites or Rich Pixel Art Fallback
        const sprites = spritesRef.current;
        if (sprites && sprites.clips) {
          const facingClip = s.facing === "left" ? sprites.clips.walk.left : sprites.clips.walk.right;
          const frame = facingClip[0];
          if (frame && frame.rows) {
            const pSize = 2.4;
            const startX = s.px - (16 * pSize) / 2;
            const startY = s.py - (16 * pSize) / 2;
            for (let r = 0; r < 16; r++) {
              for (let c = 0; c < 16; c++) {
                if (frame.rows[r][c] === "#") {
                  ctx.fillStyle = isHurt ? "#ff3366" : "#00ff88";
                  ctx.fillRect(startX + c * pSize, startY + r * pSize, pSize, pSize);
                }
              }
            }
          }
        } else {
          // Detailed Cyber Pixel Rare Friend Fallback
          ctx.fillStyle = isHurt ? "#ff3366" : "#0f172a";
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(s.px, s.py, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Neon Visor / Eyes
          ctx.fillStyle = "#00e5ff";
          const eyeOff = s.facing === "left" ? -4 : 4;
          ctx.fillRect(s.px + eyeOff - 4, s.py - 3, 8, 4);
        }
        ctx.restore();

        // 9. Render Particles
        for (const p of s.particles) {
          ctx.save();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // 10. Render Damage Numbers
        for (const t of s.damageTexts) {
          ctx.save();
          ctx.fillStyle = t.color;
          ctx.font = "bold 13px 'Space Grotesk', sans-serif";
          ctx.textAlign = "center";
          ctx.shadowColor = "#000000";
          ctx.shadowBlur = 4;
          ctx.fillText(t.text, t.x, t.y);
          ctx.restore();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, paused, playSound, rollPerks]);

  // Touch Virtual Joystick Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== "playing") return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setJoystickOrigin({ x, y });
    setJoystickKnob({ x, y });
    setJoystickActive(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!joystickActive || !joystickOrigin) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const curX = touch.clientX - rect.left;
    const curY = touch.clientY - rect.top;

    const dx = curX - joystickOrigin.x;
    const dy = curY - joystickOrigin.y;
    const dist = Math.hypot(dx, dy);
    const maxRadius = 45;

    if (dist > 0) {
      const clampedDist = Math.min(dist, maxRadius);
      const angle = Math.atan2(dy, dx);
      setJoystickKnob({
        x: joystickOrigin.x + Math.cos(angle) * clampedDist,
        y: joystickOrigin.y + Math.sin(angle) * clampedDist,
      });

      touchVector.current = {
        x: Math.cos(angle) * (clampedDist / maxRadius),
        y: Math.sin(angle) * (clampedDist / maxRadius),
      };
    }
  };

  const handleTouchEnd = () => {
    setJoystickActive(false);
    setJoystickOrigin(null);
    setJoystickKnob(null);
    touchVector.current = { x: 0, y: 0 };
  };

  // Format Time (MM:SS)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const rfDisplay = snapshot ? `${formatGameAmount(snapshot.rfBalance, 18)} RF` : "0.00 RF";

  return (
    <div 
      className="survivor-root" 
      onTouchStart={handleTouchStart} 
      onTouchMove={handleTouchMove} 
      onTouchEnd={handleTouchEnd}
    >
      {/* 60 FPS HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="survivor-canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />

      {/* Top HUD */}
      <div className="survivor-hud">
        {/* XP Progress Bar */}
        <div className="survivor-xp-container">
          <div 
            className="survivor-xp-fill" 
            style={{ width: `${Math.min(100, (xp / xpNext) * 100)}%` }} 
          />
          <div className="survivor-xp-text">
            LVL {level} · {xp} / {xpNext} XP
          </div>
        </div>

        {/* Stats Row */}
        <div className="survivor-stats-row">
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div className="hud-stat-pill level">Friend #{friendId.toString()}</div>
            <div className="hud-stat-pill timer">⏱️ {formatTime(timeSurvived)}</div>
            <div className="hud-stat-pill gems">💎 {gemsCollected} RF Gems</div>
            <div className="hud-stat-pill kills">💀 {kills} Jeets</div>
          </div>

          <div className="hud-actions">
            <div className="hud-stat-pill" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              <div className="hud-hp-bar">
                <div 
                  className="hud-hp-fill" 
                  style={{ width: `${Math.max(0, (playerHp / playerMaxHp) * 100)}%` }} 
                />
              </div>
            </div>

            <button 
              type="button" 
              className="hud-btn" 
              onClick={() => setMuted(m => !m)}
            >
              {muted ? "🔇 Sound Off" : "🔊 Sound On"}
            </button>
          </div>
        </div>
      </div>

      {/* Virtual Joystick Visual for Mobile */}
      {joystickActive && joystickOrigin && joystickKnob && (
        <>
          <div 
            className="virtual-joystick-base" 
            style={{ left: joystickOrigin.x, top: joystickOrigin.y }} 
          />
          <div 
            className="virtual-joystick-knob" 
            style={{ left: joystickKnob.x, top: joystickKnob.y }} 
          />
        </>
      )}

      {/* Initial Ready Overlay */}
      {gameState === "ready" && (
        <div className="survivor-modal-overlay">
          <div className="game-over-box victory">
            <h1 className="game-over-title">RARE SURVIVOR</h1>
            <p className="game-over-summary">
              CRYPTO WINTER EDITION · 2D ACTION MINIGAME
            </p>
            <div style={{ textAlign: "left", fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "20px" }}>
              <p>🔴 <strong>Bear market enemies</strong> are swarming to wreck your holdings!</p>
              <p>🟢 Auto-fire Green Candle lasers at nearest foes.</p>
              <p>💎 Collect glowing <strong>$RF gems</strong> to level up and unlock game-changing perks.</p>
              <p>📱 Desktop: <strong>WASD / Arrows</strong> | Mobile: <strong>Touch & Drag</strong> anywhere.</p>
            </div>
            <button 
              type="button" 
              className="primary-btn" 
              onClick={startGame}
            >
              ENTER ARENA 🚀
            </button>
          </div>
        </div>
      )}

      {/* Level Up Perks Modal */}
      {gameState === "levelup" && (
        <div className="survivor-modal-overlay">
          <div className="level-up-box">
            <h2 className="level-up-title">⚡ LEVEL UP! ⚡</h2>
            <p className="level-up-subtitle">CHOOSE AN UPGRADE TO SURVIVE THE NEXT WAVE</p>
            <div className="perks-grid">
              {offeredPerks.map(perk => (
                <div 
                  key={perk.id} 
                  className={`perk-card ${perk.tier}`}
                  onClick={() => selectPerk(perk)}
                >
                  <div className="perk-icon-wrap">{perk.icon}</div>
                  <div className="perk-name">{perk.name}</div>
                  <div className="perk-tier">{perk.tier}</div>
                  <div className="perk-desc">{perk.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameState === "gameover" && (
        <div className="survivor-modal-overlay">
          <div className="game-over-box">
            <h2 className="game-over-title">💀 LIQUIDATED! 💀</h2>
            <p className="game-over-summary">The crypto winter bear market caught you.</p>

            <div className="stats-summary-grid">
              <div className="summary-stat-item">
                <div className="summary-stat-label">Time Survived</div>
                <div className="summary-stat-value">{formatTime(timeSurvived)}</div>
              </div>
              <div className="summary-stat-item">
                <div className="summary-stat-label">Level Reached</div>
                <div className="summary-stat-value">LVL {level}</div>
              </div>
              <div className="summary-stat-item">
                <div className="summary-stat-label">Enemies Banished</div>
                <div className="summary-stat-value">{kills}</div>
              </div>
              <div className="summary-stat-item">
                <div className="summary-stat-label">Simulated $RF Mined</div>
                <div className="summary-stat-value gold">+{gemsCollected} RF</div>
              </div>
            </div>

            <div className="game-over-actions">
              <button 
                type="button" 
                className="primary-btn" 
                onClick={startGame}
              >
                TRY AGAIN (RE-ENTER)
              </button>

              <button 
                type="button" 
                className="secondary-btn" 
                disabled={busy || paused}
                onClick={buyPack}
              >
                {busy ? "Confirming..." : `Buy Simulated Pack (1 RF) · Balance: ${rfDisplay}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Instructions Hint */}
      <div className="survivor-hint-bar">
        WASD / Arrows to dodge · Auto-aim & auto-shoot · Touch drag for mobile joystick · FriendSDK Preview Mode
      </div>
    </div>
  );
}
