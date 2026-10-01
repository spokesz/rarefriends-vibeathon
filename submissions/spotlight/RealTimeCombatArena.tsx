/**
 * Real-Time Combat Arena for Rare Friend Spotlight
 * - Interactive real-time battle against hostile frontier entities (Stalker Alpha / Syndicate Enforcer)
 * - Attacks (Space / Click), Dash / Dodge (Shift), Projectiles, Shielding
 * - Ally rescue / defense choices happening LIVE in combat
 * - End of battle moral decision: Spare vs Execute vs Extort
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { createFriendReader, spriteFrame, type GenerationSprites } from "@rarefriends/friendsdk/sprites";
import { sampleFriendSprites } from "./sample-sprites.js";
import { FriendPortrait } from "./FriendPortrait.js";
import { ActionChoice, FriendPersistentState } from "./types.js";

export interface CombatEncounterConfig {
  id: string;
  title: string;
  zoneNumber: number;
  locationName: string;
  enemyName: string;
  enemyType: "stalker" | "syndicate" | "construct" | "doppelganger";
  enemyHp: number;
  enemySpeed: number;
  attackPattern: "lunge_drones" | "ricochet_turret" | "radial_lasers" | "mirrored_traits";
  hasAllyInDanger?: boolean;
  allyName?: string;
  allyHp?: number;
  arenaTheme: "gorge" | "outpost" | "monolith" | "void";
  dilemmaPrompt: string;
  resolutionChoices: ActionChoice[];
}

export const COMBAT_SCENARIOS: CombatEncounterConfig[] = [
  {
    id: "combat_zone1_stalker",
    title: "Sector 1: Crimson Ridge Ambush",
    zoneNumber: 1,
    locationName: "Crimson Gorge",
    enemyName: "Razor Stalker Alpha",
    enemyType: "stalker",
    enemyHp: 160,
    enemySpeed: 2.2,
    attackPattern: "lunge_drones",
    hasAllyInDanger: true,
    allyName: "Courier Mara",
    allyHp: 80,
    arenaTheme: "gorge",
    dilemmaPrompt: "The Alpha is staggered! How will you conclude the skirmish?",
    resolutionChoices: [
      {
        id: "choice_mercy_drive_away",
        label: "Drive the beast into the wilds without slaughter",
        intent: "Merciful Restraint",
        narrativeChoice: "You threw a concussive flash flare, driving the Alpha away rather than butchering it.",
        immediateOutcome: "Mara was rescued safely. She marvelled at your discipline in not letting bloodlust take over.",
        behaviorEffects: { compassion: 4, courage: 3, ruthlessness: -2, cooperation: 2 },
        xpReward: 45,
        memoryUpdate: {
          characterId: "mara",
          characterName: "Courier Mara",
          trustDelta: 40,
          notes: "Admired your bravery in combat and mercy toward wild creatures.",
        },
        journalSummary: "Defeated the Razor Stalker in active combat and granted mercy, driving it off safely.",
      },
      {
        id: "choice_ruthless_trophy",
        label: "Execute the Alpha and harvest its cybernetic core",
        intent: "Cold Severance",
        narrativeChoice: "You struck down the downed Alpha without hesitation, wrenching out its rare overclocked optic core.",
        immediateOutcome: "You pocketed valuable salvage. Mara shivered at the cold efficiency of your blow.",
        behaviorEffects: { ruthlessness: 5, independence: 3, compassion: -3, courage: 2 },
        xpReward: 50,
        memoryUpdate: {
          characterId: "mara",
          characterName: "Courier Mara",
          trustDelta: -20,
          notes: "Acknowledges lethal combat prowess, but finds your Friend unnervingly brutal.",
        },
        journalSummary: "Slew the Alpha in cold blood to harvest its rare internal components.",
      },
    ],
  },
  {
    id: "combat_zone2_syndicate",
    title: "Sector 2: Outpost Showdown",
    zoneNumber: 2,
    locationName: "Rust Syndicate Outpost",
    enemyName: "Enforcer Kaelen",
    enemyType: "syndicate",
    enemyHp: 220,
    enemySpeed: 1.6,
    attackPattern: "ricochet_turret",
    arenaTheme: "outpost",
    dilemmaPrompt: "Kaelen's kinetic shield has shattered! What is your judgment?",
    resolutionChoices: [
      {
        id: "choice_capture_and_interrogate",
        label: "Disarm him and extract syndicate codes",
        intent: "Calculated Cunning",
        narrativeChoice: "You pinned Kaelen to the steel deck, methodically extracting his outpost broadcast codes.",
        immediateOutcome: "You gained valuable tactical intel and left him bound for the local constabulary.",
        behaviorEffects: { cunning: 5, caution: 2, ruthlessness: 2 },
        xpReward: 55,
        memoryUpdate: {
          characterId: "kaelen",
          characterName: "Enforcer Kaelen",
          trustDelta: -50,
          notes: "Besting him in combat was humiliating; your cunning broke his syndicate codes.",
        },
        journalSummary: "Shattered Kaelen's defense in open duel and extracted his command ciphers.",
      },
      {
        id: "choice_honor_duel",
        label: "Offer an honorable truce: exile without execution",
        intent: "Noble Honor",
        narrativeChoice: "You sheathed your weapon and pointed toward the wastes, offering an honorable truce.",
        immediateOutcome: "Kaelen stood slowly, touched his brow in solemn respect, and retreated without another shot.",
        behaviorEffects: { loyalty: 4, compassion: 3, courage: 3, ruthlessness: -3 },
        xpReward: 50,
        memoryUpdate: {
          characterId: "kaelen",
          characterName: "Enforcer Kaelen",
          trustDelta: 35,
          notes: "Deeply honors the warrior's mercy shown when he was defenseless.",
        },
        journalSummary: "Defeated Enforcer Kaelen in a duel and offered an honorable truce.",
      },
    ],
  },
  {
    id: "combat_zone3_monolith",
    title: "Sector 3: Ancient Monolith Overload",
    zoneNumber: 3,
    locationName: "Verdant Core Ruins",
    enemyName: "Gorgon Core Construct",
    enemyType: "construct",
    enemyHp: 280,
    enemySpeed: 1.2,
    attackPattern: "radial_lasers",
    arenaTheme: "monolith",
    dilemmaPrompt: "The Monolith Core is destabilizing! How do you handle the ancient power?",
    resolutionChoices: [
      {
        id: "choice_stabilize_for_all",
        label: "Channel power outward into the frontier colony grid",
        intent: "Altruistic Cooperation",
        narrativeChoice: "You re-routed the surging antimatter conduit into the civilian relay stations across the valley.",
        immediateOutcome: "The valley hummed with restored clean energy. Frontier settlers celebrated your selflessness.",
        behaviorEffects: { cooperation: 5, compassion: 4, loyalty: 2, independence: -2 },
        xpReward: 65,
        journalSummary: "Stabilized the Gorgon Core to power frontier communities.",
      },
      {
        id: "choice_absorb_core",
        label: "Siphon the core directly into your Friend's chassis",
        intent: "Sovereign Power",
        narrativeChoice: "You absorbed the pristine matrix energy directly, feeling quantum power flood your frame.",
        immediateOutcome: "Your systems surged with unmatched autonomous output, ignoring the colony's energy needs.",
        behaviorEffects: { independence: 6, ruthlessness: 3, caution: -2, cooperation: -3 },
        xpReward: 70,
        journalSummary: "Claimed the Monolith's infinite battery matrix for absolute self-reliance.",
      },
    ],
  },
  {
    id: "combat_zone4_doppelganger",
    title: "Sector 4: The Mirror of Becoming",
    zoneNumber: 4,
    locationName: "Chamber of Echoes",
    enemyName: "Shadow Reflection",
    enemyType: "doppelganger",
    enemyHp: 320,
    enemySpeed: 2.4,
    attackPattern: "mirrored_traits",
    arenaTheme: "void",
    dilemmaPrompt: "The Shadow Reflection shatters! What truth do you accept?",
    resolutionChoices: [
      {
        id: "choice_embrace_identity",
        label: "Embrace the journey: 'I am defined by the choices I made.'",
        intent: "Unyielding Conviction",
        narrativeChoice: "You looked into the splintered glass of your doppelgänger and smiled with hard-earned serenity.",
        immediateOutcome: "Your Friend's emergent archetype locked in with transcendent clarity and permanent mastery.",
        behaviorEffects: { courage: 5, loyalty: 4, independence: 3 },
        xpReward: 100,
        journalSummary: "Conquered the Echo of the Void and cemented their true sovereign nature.",
      },
    ],
  },
];

interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  fromPlayer: boolean;
  damage: number;
  color: string;
  ricochetsLeft?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface CoverObstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  hp: number;
  maxHp: number;
}

export function RealTimeCombatArena({
  friendId,
  friendState,
  config,
  onResolveChoice,
  onCancel,
  onSelectSector,
}: {
  friendId: bigint;
  friendState?: FriendPersistentState | null;
  config: CombatEncounterConfig;
  onResolveChoice: (choice: ActionChoice) => void;
  onCancel: () => void;
  onSelectSector?: (index: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sprites, setSprites] = useState<GenerationSprites | null>(null);

  // Trait Combat Perks:
  // High courage: +40% projectile damage
  const couragePoints = friendState?.behaviorPoints?.courage ?? 0;
  const cautionPoints = friendState?.behaviorPoints?.caution ?? 0;
  const ruthlessnessPoints = friendState?.behaviorPoints?.ruthlessness ?? 0;
  const compassionPoints = friendState?.behaviorPoints?.compassion ?? 0;

  const baseDamage = 16 + Math.min(14, Math.floor(couragePoints / 2));
  const baseDodgeCooldown = Math.max(22, 40 - Math.floor(cautionPoints / 2));
  const basePlayerSpeed = 3.8 + (couragePoints > 10 ? 0.4 : 0);

  // Destructible Tactical Cover Pillars in Arena
  const [obstacles, setObstacles] = useState<CoverObstacle[]>([
    { x: 260, y: 140, w: 44, h: 64, hp: 120, maxHp: 120 },
    { x: 260, y: 280, w: 44, h: 64, hp: 120, maxHp: 120 },
    { x: 500, y: 140, w: 44, h: 64, hp: 120, maxHp: 120 },
    { x: 500, y: 280, w: 44, h: 64, hp: 120, maxHp: 120 },
  ]);

  // Combat State
  const [playerHp, setPlayerHp] = useState(120 + Math.min(60, compassionPoints * 3));
  const [maxPlayerHp] = useState(120 + Math.min(60, compassionPoints * 3));
  const [enemyHp, setEnemyHp] = useState(config.enemyHp * 1.8);
  const [maxEnemyHp, setMaxEnemyHp] = useState(config.enemyHp * 1.8);
  const [allyHp, setAllyHp] = useState(config.allyHp ?? 0);
  const [combatPhase, setCombatPhase] = useState<"fighting" | "victory" | "defeated">("fighting");
  const [dodgeCooldown, setDodgeCooldown] = useState(0);
  const [attackCooldown, setAttackCooldown] = useState(0);
  const [combatScore, setCombatScore] = useState({ hitsLanded: 0, dodgesUsed: 0, timeElapsed: 0 });

  // Load Sprites for live combat character rendering
  useEffect(() => {
    let active = true;
    const sample = sampleFriendSprites(friendId);
    if (sample) {
      setSprites(sample);
    } else {
      createFriendReader()
        .read(friendId)
        .then(res => {
          if (active) setSprites(res);
        })
        .catch(() => {
          const fallback = sampleFriendSprites(7730n);
          if (active && fallback) setSprites(fallback);
        });
    }
    return () => {
      active = false;
    };
  }, [friendId]);

  // Entities Ref
  const stateRef = useRef({
    px: 160,
    py: 240,
    pRadius: 18,
    speed: 3.8,
    ex: 640,
    ey: 240,
    eRadius: 26,
    eSpeed: 1.8,
    eAngle: 0,
    ax: 120,
    ay: 160,
    aRadius: 15,
    keys: new Set<string>(),
    projectiles: [] as Projectile[],
    particles: [] as Particle[],
    lastEnemyAttack: 0,
    invincibleTimer: 0,
    dashTimer: 0,
    dashVx: 0,
    dashVy: 0,
    phaseTick: 0,
  });

  const resetBattle = () => {
    setPlayerHp(maxPlayerHp);
    setEnemyHp(maxEnemyHp);
    setAllyHp(config.allyHp ?? 0);
    setCombatPhase("fighting");
    setDodgeCooldown(0);
    setAttackCooldown(0);
    setCombatScore({ hitsLanded: 0, dodgesUsed: 0, timeElapsed: 0 });
    setObstacles([
      { x: 260, y: 140, w: 44, h: 64, hp: 120, maxHp: 120 },
      { x: 260, y: 280, w: 44, h: 64, hp: 120, maxHp: 120 },
      { x: 500, y: 140, w: 44, h: 64, hp: 120, maxHp: 120 },
      { x: 500, y: 280, w: 44, h: 64, hp: 120, maxHp: 120 },
    ]);

    stateRef.current.px = 160;
    stateRef.current.py = 240;
    stateRef.current.ex = 640;
    stateRef.current.ey = 240;
    stateRef.current.projectiles = [];
    stateRef.current.particles = [];
    stateRef.current.invincibleTimer = 30; // brief spawn grace
    stateRef.current.dashTimer = 0;
    stateRef.current.lastEnemyAttack = 0;
    stateRef.current.phaseTick = 0;
    stateRef.current.eSpeed = config.enemySpeed;
  };

  // Re-sync combat state when sector/config changes
  useEffect(() => {
    const nextEnemyHp = Math.round(config.enemyHp * 1.8);
    setEnemyHp(nextEnemyHp);
    setMaxEnemyHp(nextEnemyHp);
    setAllyHp(config.allyHp ?? 0);
    setCombatPhase("fighting");
    setDodgeCooldown(0);
    setAttackCooldown(0);
    setCombatScore({ hitsLanded: 0, dodgesUsed: 0, timeElapsed: 0 });
    stateRef.current.px = 160;
    stateRef.current.py = 240;
    stateRef.current.ex = 640;
    stateRef.current.ey = 240;
    stateRef.current.projectiles = [];
    stateRef.current.particles = [];
    stateRef.current.eSpeed = config.enemySpeed;
    stateRef.current.lastEnemyAttack = 0;
    stateRef.current.phaseTick = 0;
    setObstacles([
      { x: 260, y: 140, w: 44, h: 64, hp: 120, maxHp: 120 },
      { x: 260, y: 280, w: 44, h: 64, hp: 120, maxHp: 120 },
      { x: 500, y: 140, w: 44, h: 64, hp: 120, maxHp: 120 },
      { x: 500, y: 280, w: 44, h: 64, hp: 120, maxHp: 120 },
    ]);
  }, [config.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      stateRef.current.keys.add(e.key.toLowerCase());
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        playerAttack();
      }
      if (e.key === "Shift" || e.key.toLowerCase() === "q") {
        e.preventDefault();
        playerDash();
      }
      if (e.key.toLowerCase() === "r" && combatPhase !== "fighting") {
        resetBattle();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      stateRef.current.keys.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [combatPhase]);

  const spawnParticles = (x: number, y: number, color: string, count = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 1.5 + Math.random() * 3.5;
      stateRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 0,
        maxLife: 15 + Math.random() * 15,
        color,
      });
    }
  };

  const playerAttack = () => {
    const st = stateRef.current;
    if (attackCooldown > 0 || combatPhase !== "fighting") return;

    // Fire plasma pulse towards enemy
    const dx = st.ex - st.px;
    const dy = st.ey - st.py;
    const dist = Math.hypot(dx, dy) || 1;
    const speed = 9.5;

    st.projectiles.push({
      x: st.px,
      y: st.py,
      vx: (dx / dist) * speed,
      vy: (dy / dist) * speed,
      radius: 6,
      fromPlayer: true,
      damage: 16,
      color: "#5cd6d6",
    });

    spawnParticles(st.px, st.py, "#5cd6d6", 5);
    setAttackCooldown(10);
  };

  const playerDash = () => {
    const st = stateRef.current;
    if (dodgeCooldown > 0 || combatPhase !== "fighting") return;

    let mx = 0;
    let my = 0;
    if (st.keys.has("w") || st.keys.has("arrowup")) my -= 1;
    if (st.keys.has("s") || st.keys.has("arrowdown")) my += 1;
    if (st.keys.has("a") || st.keys.has("arrowleft")) mx -= 1;
    if (st.keys.has("d") || st.keys.has("arrowright")) mx += 1;

    // Default to backwards dodge if not moving
    if (mx === 0 && my === 0) {
      mx = st.px > st.ex ? 1 : -1;
    }

    const mag = Math.hypot(mx, my) || 1;
    const dashSpd = 10;
    st.dashTimer = 7;
    st.dashVx = (mx / mag) * dashSpd;
    st.dashVy = (my / mag) * dashSpd;
    st.invincibleTimer = 16;
    setDodgeCooldown(40);
    setCombatScore(s => ({ ...s, dodgesUsed: s.dodgesUsed + 1 }));
    spawnParticles(st.px, st.py, "#7db4db", 10);
  };

  // Main 60FPS Game Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      const st = stateRef.current;

      // Update cooldowns
      setAttackCooldown(c => Math.max(0, c - 1));
      setDodgeCooldown(c => Math.max(0, c - 1));

      if (combatPhase === "fighting") {
        st.phaseTick++;
        if (st.phaseTick % 60 === 0) {
          setCombatScore(s => ({ ...s, timeElapsed: s.timeElapsed + 1 }));
        }

        // Player Movement
        if (st.dashTimer > 0) {
          st.px = Math.max(30, Math.min(770, st.px + st.dashVx));
          st.py = Math.max(30, Math.min(450, st.py + st.dashVy));
          st.dashTimer--;
        } else {
          let dx = 0;
          let dy = 0;
          if (st.keys.has("w") || st.keys.has("arrowup")) dy -= 1;
          if (st.keys.has("s") || st.keys.has("arrowdown")) dy += 1;
          if (st.keys.has("a") || st.keys.has("arrowleft")) dx -= 1;
          if (st.keys.has("d") || st.keys.has("arrowright")) dx += 1;
          const mag = Math.hypot(dx, dy);
          if (mag > 0) {
            st.px = Math.max(30, Math.min(770, st.px + (dx / mag) * st.speed));
            st.py = Math.max(30, Math.min(450, st.py + (dy / mag) * st.speed));
          }
        }

        if (st.invincibleTimer > 0) st.invincibleTimer--;

        // Enemy AI Movement & Tactical Phases
        const isStalker = config.enemyType === "stalker";
        const targetX = config.hasAllyInDanger && Math.random() < 0.25 ? st.ax : st.px;
        const targetY = config.hasAllyInDanger && Math.random() < 0.25 ? st.ay : st.py;
        const edx = targetX - st.ex;
        const edy = targetY - st.ey;
        const edist = Math.hypot(edx, edy) || 1;

        // Circle strafe / hover behavior
        st.eAngle += 0.02;
        const orbitRadius = isStalker ? 160 : 220;
        const desiredX = targetX + Math.cos(st.eAngle) * orbitRadius;
        const desiredY = targetY + Math.sin(st.eAngle) * (orbitRadius * 0.7);

        const moveDx = desiredX - st.ex;
        const moveDy = desiredY - st.ey;
        const moveDist = Math.hypot(moveDx, moveDy) || 1;

        st.ex += (moveDx / moveDist) * st.eSpeed;
        st.ey += (moveDy / moveDist) * st.eSpeed;

        // Boundary clamp enemy
        st.ex = Math.max(50, Math.min(750, st.ex));
        st.ey = Math.max(50, Math.min(430, st.ey));

        // Distinct Enemy Attack Patterns per Boss Type (Scaled Progressive Difficulty)
        st.lastEnemyAttack++;
        const attackInterval =
          config.enemyType === "stalker" ? 44 :
          config.enemyType === "syndicate" ? 38 :
          config.enemyType === "construct" ? 32 : 24;

        if (st.lastEnemyAttack > attackInterval) {
          st.lastEnemyAttack = 0;
          const aimX = st.px - st.ex;
          const aimY = st.py - st.ey;
          const aimDist = Math.hypot(aimX, aimY) || 1;

          if (config.enemyType === "stalker") {
            // Sector 1: Baseline Hunter - Aimed needle + 2-needle spread under 50% HP
            st.projectiles.push({
              x: st.ex,
              y: st.ey,
              vx: (aimX / aimDist) * 4.8,
              vy: (aimY / aimDist) * 4.8,
              radius: 7,
              fromPlayer: false,
              damage: 12,
              color: "#ed927e",
            });
            if (enemyHp < maxEnemyHp * 0.5) {
              const spread = 0.22;
              st.projectiles.push({
                x: st.ex,
                y: st.ey,
                vx: ((aimX * Math.cos(spread) - aimY * Math.sin(spread)) / aimDist) * 4.2,
                vy: ((aimX * Math.sin(spread) + aimY * Math.cos(spread)) / aimDist) * 4.2,
                radius: 6,
                fromPlayer: false,
                damage: 9,
                color: "#f2ce68",
              });
              st.projectiles.push({
                x: st.ex,
                y: st.ey,
                vx: ((aimX * Math.cos(-spread) - aimY * Math.sin(-spread)) / aimDist) * 4.2,
                vy: ((aimX * Math.sin(-spread) + aimY * Math.cos(-spread)) / aimDist) * 4.2,
                radius: 6,
                fromPlayer: false,
                damage: 9,
                color: "#f2ce68",
              });
            }
          } else if (config.enemyType === "syndicate") {
            // Sector 2: Heavy Enforcer - Dual ricochet kinetic rounds bouncing twice
            st.projectiles.push({
              x: st.ex,
              y: st.ey,
              vx: (aimX / aimDist) * 5.0,
              vy: (aimY / aimDist) * 5.0,
              radius: 11,
              fromPlayer: false,
              damage: 18,
              color: "#5cd6d6",
              ricochetsLeft: 2,
            });
            // Flanking ricochet shell
            const flankAngle = 0.45;
            st.projectiles.push({
              x: st.ex,
              y: st.ey,
              vx: ((aimX * Math.cos(flankAngle) - aimY * Math.sin(flankAngle)) / aimDist) * 4.6,
              vy: ((aimX * Math.sin(flankAngle) + aimY * Math.cos(flankAngle)) / aimDist) * 4.6,
              radius: 9,
              fromPlayer: false,
              damage: 14,
              color: "#f2ce68",
              ricochetsLeft: 1,
            });
          } else if (config.enemyType === "construct") {
            // Sector 3: Bullet-Hell Monolith - Rotating 12-to-16 ray radial laser ring
            const rays = enemyHp < maxEnemyHp * 0.5 ? 16 : 12;
            const baseRot = (st.phaseTick * 0.08) % (Math.PI * 2);
            for (let r = 0; r < rays; r++) {
              const theta = baseRot + (r * Math.PI * 2) / rays;
              st.projectiles.push({
                x: st.ex,
                y: st.ey,
                vx: Math.cos(theta) * 3.8,
                vy: Math.sin(theta) * 3.8,
                radius: 6,
                fromPlayer: false,
                damage: 15,
                color: "#72a832",
              });
            }
            // Direct central lance aimed at player
            st.projectiles.push({
              x: st.ex,
              y: st.ey,
              vx: (aimX / aimDist) * 6.2,
              vy: (aimY / aimDist) * 6.2,
              radius: 8,
              fromPlayer: false,
              damage: 22,
              color: "#c4f08a",
            });
          } else if (config.enemyType === "doppelganger") {
            // Sector 4: Final Boss Shadow Reflection - Ultra fast triple stream & cross-fire
            st.projectiles.push({
              x: st.ex,
              y: st.ey,
              vx: (aimX / aimDist) * 6.6,
              vy: (aimY / aimDist) * 6.6,
              radius: 9,
              fromPlayer: false,
              damage: 24,
              color: "#d4a736",
            });
            // Left & Right Flanking Pincher shots
            const pAngle = 0.32;
            st.projectiles.push({
              x: st.ex,
              y: st.ey,
              vx: ((aimX * Math.cos(pAngle) - aimY * Math.sin(pAngle)) / aimDist) * 5.8,
              vy: ((aimX * Math.sin(pAngle) + aimY * Math.cos(pAngle)) / aimDist) * 5.8,
              radius: 7,
              fromPlayer: false,
              damage: 16,
              color: "#f2ce68",
            });
            st.projectiles.push({
              x: st.ex,
              y: st.ey,
              vx: ((aimX * Math.cos(-pAngle) - aimY * Math.sin(-pAngle)) / aimDist) * 5.8,
              vy: ((aimX * Math.sin(-pAngle) + aimY * Math.cos(-pAngle)) / aimDist) * 5.8,
              radius: 7,
              fromPlayer: false,
              damage: 16,
              color: "#f2ce68",
            });
            // Teleport or surge when damaged
            if (enemyHp < maxEnemyHp * 0.4 && Math.random() < 0.08) {
              spawnParticles(st.ex, st.ey, "#d4a736", 16);
              st.ex = 100 + Math.random() * 600;
              st.ey = 80 + Math.random() * 320;
            }
          }
        }

        // Update Projectiles
        for (let i = st.projectiles.length - 1; i >= 0; i--) {
          const p = st.projectiles[i];
          p.x += p.vx;
          p.y += p.vy;

          // Out of bounds check & bounce
          if (p.x < 0 || p.x > 800 || p.y < 0 || p.y > 480) {
            if (p.ricochetsLeft && p.ricochetsLeft > 0) {
              p.ricochetsLeft--;
              if (p.x < 0 || p.x > 800) p.vx = -p.vx;
              if (p.y < 0 || p.y > 480) p.vy = -p.vy;
              p.x = Math.max(2, Math.min(798, p.x));
              p.y = Math.max(2, Math.min(478, p.y));
              spawnParticles(p.x, p.y, p.color, 4);
            } else {
              st.projectiles.splice(i, 1);
              continue;
            }
          }

          // Check collision with cover obstacles
          let hitCover = false;
          for (const obs of obstacles) {
            if (obs.hp <= 0) continue;
            if (
              p.x > obs.x - p.radius &&
              p.x < obs.x + obs.w + p.radius &&
              p.y > obs.y - p.radius &&
              p.y < obs.y + obs.h + p.radius
            ) {
              obs.hp -= p.damage;
              spawnParticles(p.x, p.y, "#8c9c8c", 5);
              hitCover = true;
              break;
            }
          }
          if (hitCover) {
            st.projectiles.splice(i, 1);
            continue;
          }

          // Hit Enemy
          if (p.fromPlayer) {
            if (Math.hypot(p.x - st.ex, p.y - st.ey) < st.eRadius + p.radius) {
              spawnParticles(st.ex, st.ey, "#72a832", 10);
              setCombatScore(s => ({ ...s, hitsLanded: s.hitsLanded + 1 }));
              setEnemyHp(hp => {
                const next = Math.max(0, hp - p.damage);
                if (next === 0) setCombatPhase("victory");
                return next;
              });
              st.projectiles.splice(i, 1);
              continue;
            }
          } else {
            // Hit Player
            if (st.invincibleTimer === 0 && Math.hypot(p.x - st.px, p.y - st.py) < st.pRadius + p.radius) {
              spawnParticles(st.px, st.py, "#ed927e", 12);
              setPlayerHp(hp => {
                const next = Math.max(0, hp - p.damage);
                if (next === 0) setCombatPhase("defeated");
                return next;
              });
              st.projectiles.splice(i, 1);
              continue;
            }

            // Hit Ally
            if (config.hasAllyInDanger && Math.hypot(p.x - st.ax, p.y - st.ay) < st.aRadius + p.radius) {
              spawnParticles(st.ax, st.ay, "#f2ce68", 8);
              setAllyHp(hp => Math.max(0, hp - p.damage));
              st.projectiles.splice(i, 1);
              continue;
            }
          }
        }
      }

      // Update Particles
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const pt = st.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life++;
        if (pt.life >= pt.maxLife) {
          st.particles.splice(i, 1);
        }
      }

      // DRAW CANVAS
      ctx.clearRect(0, 0, 800, 480);

      // Distinct Arena Theme Backgrounds
      let bgGrad = ctx.createLinearGradient(0, 0, 800, 480);
      let gridColor = "rgba(255, 255, 255, 0.05)";
      if (config.arenaTheme === "gorge") {
        bgGrad.addColorStop(0, "#120a09");
        bgGrad.addColorStop(1, "#1c100e");
        gridColor = "rgba(237, 146, 126, 0.07)";
      } else if (config.arenaTheme === "outpost") {
        bgGrad.addColorStop(0, "#0a1114");
        bgGrad.addColorStop(1, "#101a1e");
        gridColor = "rgba(92, 214, 214, 0.07)";
      } else if (config.arenaTheme === "monolith") {
        bgGrad.addColorStop(0, "#0a140a");
        bgGrad.addColorStop(1, "#122012");
        gridColor = "rgba(114, 168, 50, 0.08)";
      } else {
        // void
        bgGrad.addColorStop(0, "#0d0814");
        bgGrad.addColorStop(1, "#160e22");
        gridColor = "rgba(212, 167, 54, 0.07)";
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 800, 480);

      // Arena Grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < 800; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 480);
        ctx.stroke();
      }
      for (let y = 0; y < 480; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(800, y);
        ctx.stroke();
      }

      // Draw Destructible Cover Obstacles
      for (const obs of obstacles) {
        if (obs.hp <= 0) continue;
        ctx.save();
        const hpPct = obs.hp / obs.maxHp;
        ctx.fillStyle = obs.hp > obs.maxHp * 0.4 ? "#1e281e" : "#2a201c";
        ctx.strokeStyle = obs.hp > obs.maxHp * 0.4 ? "#3d543d" : "#7a463a";
        ctx.lineWidth = 2;
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        // Cracks / details
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`COVER ${Math.ceil(hpPct * 100)}%`, obs.x + obs.w / 2, obs.y + obs.h / 2 + 3);
        ctx.restore();
      }

      // Draw Ally (if present)
      if (config.hasAllyInDanger) {
        ctx.save();
        ctx.fillStyle = "#b9d984";
        ctx.beginPath();
        ctx.arc(st.ax, st.ay, st.aRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(config.allyName ?? "Ally", st.ax, st.ay - 22);
        ctx.restore();
      }

      // Draw Custom Boss Entities based on Enemy Type
      ctx.save();
      if (config.enemyType === "stalker") {
        // Crimson Alpha Stalker - Beast silhouette with crimson horns and glowing eye
        ctx.save();
        ctx.translate(st.ex, st.ey);
        ctx.fillStyle = "#ed927e";
        ctx.beginPath();
        ctx.ellipse(0, 0, st.eRadius, st.eRadius * 0.75, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Stalker Horns / Spikes
        ctx.fillStyle = "#b85542";
        ctx.beginPath();
        ctx.moveTo(-16, -14);
        ctx.lineTo(-26, -26);
        ctx.lineTo(-6, -16);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(16, -14);
        ctx.lineTo(26, -26);
        ctx.lineTo(6, -16);
        ctx.fill();

        // Glowing red pupil
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(st.px > st.ex ? 6 : -6, -2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ed927e";
        ctx.beginPath();
        ctx.arc(st.px > st.ex ? 7 : -5, -2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (config.enemyType === "syndicate") {
        // Enforcer Kaelen Mech - Heavy angular armor with kinetic shield rings
        ctx.save();
        ctx.translate(st.ex, st.ey);
        ctx.fillStyle = "#1e2c33";
        ctx.strokeStyle = "#5cd6d6";
        ctx.lineWidth = 2.5;
        ctx.fillRect(-st.eRadius, -st.eRadius, st.eRadius * 2, st.eRadius * 2);
        ctx.strokeRect(-st.eRadius, -st.eRadius, st.eRadius * 2, st.eRadius * 2);

        // Turret barrel pointing toward player
        const rot = Math.atan2(st.py - st.ey, st.px - st.ex);
        ctx.rotate(rot);
        ctx.fillStyle = "#5cd6d6";
        ctx.fillRect(8, -4, 20, 8);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(8, -4, 20, 8);
        ctx.restore();
      } else if (config.enemyType === "construct") {
        // Gorgon Monolith Construct - Rotating crystal diamond with pulsating energy
        ctx.save();
        ctx.translate(st.ex, st.ey);
        const rot = (st.phaseTick * 0.03) % (Math.PI * 2);
        ctx.rotate(rot);
        ctx.fillStyle = "#1b331b";
        ctx.strokeStyle = "#72a832";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -st.eRadius * 1.3);
        ctx.lineTo(st.eRadius * 1.3, 0);
        ctx.lineTo(0, st.eRadius * 1.3);
        ctx.lineTo(-st.eRadius * 1.3, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Pulsing Core
        const coreScale = 0.6 + Math.sin(st.phaseTick * 0.1) * 0.2;
        ctx.fillStyle = "#c4f08a";
        ctx.beginPath();
        ctx.arc(0, 0, st.eRadius * coreScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        // Doppelganger / Shadow Reflection - Inverted dark silhouette of player Friend
        ctx.save();
        ctx.translate(st.ex, st.ey);
        ctx.fillStyle = "#22162e";
        ctx.strokeStyle = "#d4a736";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, st.eRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Dual golden eye slits
        ctx.fillStyle = "#f2ce68";
        ctx.fillRect(-8, -4, 5, 8);
        ctx.fillRect(3, -4, 5, 8);
        ctx.restore();
      }

      // Enemy Health Bar over head
      const eBarW = 70;
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(st.ex - eBarW / 2, st.ey - 38, eBarW, 7);
      ctx.fillStyle = config.enemyType === "stalker" ? "#ed927e" : config.enemyType === "syndicate" ? "#5cd6d6" : config.enemyType === "construct" ? "#72a832" : "#f2ce68";
      ctx.fillRect(st.ex - eBarW / 2, st.ey - 38, (enemyHp / maxEnemyHp) * eBarW, 7);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.fillText(config.enemyName, st.ex, st.ey - 44);
      ctx.restore();

      // Draw Player Character (Canonical Rare Friend Sprite)
      ctx.save();
      if (st.invincibleTimer > 0 && Math.floor(Date.now() / 60) % 2 === 0) {
        ctx.globalAlpha = 0.5;
      }

      // Draw shadow under character
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.beginPath();
      ctx.ellipse(st.px, st.py + 14, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      if (sprites) {
        ctx.imageSmoothingEnabled = false;
        const facing = st.px < st.ex ? "right" : "left";
        const isMoving = st.keys.has("w") || st.keys.has("s") || st.keys.has("a") || st.keys.has("d");
        const frameTick = Math.floor(Date.now() / 120) % 8;
        const frameData = spriteFrame(sprites, facing, isMoving, frameTick, "right");
        const rows = frameData.frame.rows;
        const pScale = 2.2;
        const startX = st.px - (16 * pScale) / 2;
        const startY = st.py - (16 * pScale) / 2 - 4;

        // Draw white silhouette outline around character
        ctx.fillStyle = "#ffffff";
        for (let y = 0; y < rows.length; y++) {
          for (let x = 0; x < rows[y].length; x++) {
            if (rows[y][x] === "#") {
              ctx.fillRect(
                startX + x * pScale - pScale,
                startY + y * pScale - pScale,
                pScale * 3,
                pScale * 3
              );
            }
          }
        }

        // Draw crisp black inner pixels
        ctx.fillStyle = "#0c0d10";
        for (let y = 0; y < rows.length; y++) {
          for (let x = 0; x < rows[y].length; x++) {
            if (rows[y][x] === "#") {
              ctx.fillRect(startX + x * pScale, startY + y * pScale, pScale, pScale);
            }
          }
        }
      } else {
        // Fallback circle
        ctx.fillStyle = "#5cd6d6";
        ctx.beginPath();
        ctx.arc(st.px, st.py, st.pRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Aim trajectory indicator towards enemy
      ctx.strokeStyle = "rgba(92, 214, 214, 0.35)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(st.px, st.py);
      ctx.lineTo(st.ex, st.ey);
      ctx.stroke();
      ctx.restore();

      // Draw Projectiles
      for (const p of st.projectiles) {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Particles
      for (const pt of st.particles) {
        ctx.save();
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = 1 - pt.life / pt.maxLife;
        ctx.fillRect(pt.x, pt.y, 3, 3);
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [combatPhase, enemyHp, maxEnemyHp, config, obstacles]);

  return (
    <div className="combat-arena-container">
      {/* Top HUD */}
      <div className="combat-hud">
        <div className="combat-player-stats">
          <FriendPortrait friendId={friendId} scale={2} />
          <div className="stat-bars">
            <div className="bar-label">
              <span>PLAYER HP</span>
              <strong>{playerHp} / {maxPlayerHp}</strong>
            </div>
            <div className="bar-track">
              <div className="bar-fill hp" style={{ width: `${(playerHp / maxPlayerHp) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="combat-controls-hint">
          <div className="combat-sectors-switch">
            {COMBAT_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                className={`sector-tab-btn ${config.id === sc.id ? "active" : ""}`}
                onClick={() => onSelectSector?.(idx)}
                title={sc.title}
              >
                Stage {sc.zoneNumber}: {sc.enemyName}
              </button>
            ))}
          </div>
          <div className="control-keys-bar">
            <span>WASD Move · SPACE Attack · SHIFT Dash</span>
          </div>
        </div>

        <div className="combat-enemy-stats">
          <div className="stat-bars">
            <div className="bar-label">
              <span>{config.enemyName.toUpperCase()}</span>
              <strong>
                {Math.ceil(enemyHp)} / {maxEnemyHp}
              </strong>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill enemy"
                style={{ width: `${(enemyHp / maxEnemyHp) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Canvas */}
      <div
        className="combat-canvas-wrapper"
        onClick={playerAttack}
        tabIndex={0}
      >
        <canvas ref={canvasRef} width={800} height={480} />
      </div>

      {/* In-Combat Actions Bar */}
      <div className="combat-bottom-bar">
        <button
          type="button"
          className="spotlight-btn secondary small"
          onClick={resetBattle}
          title="Restart this fight"
        >
          Retry (R)
        </button>
        <button
          type="button"
          className="spotlight-btn secondary small"
          onClick={onCancel}
          title="Return to the world hub"
        >
          Exit to Hub
        </button>
      </div>

      {/* Victory Dilemma Overlay */}
      {combatPhase === "victory" && (
        <div className="combat-modal-overlay">
          <div className="combat-dilemma-card">
            <span className="victory-badge">VICTORY</span>
            <h3>{config.dilemmaPrompt}</h3>
            <p className="dilemma-subtext">
              Hits: <strong>{combatScore.hitsLanded}</strong> · Dodges: <strong>{combatScore.dodgesUsed}</strong> · Time: <strong>{combatScore.timeElapsed}s</strong>
            </p>
            <div className="dilemma-choices-list">
              {config.resolutionChoices.map(c => (
                <button
                  key={c.id}
                  type="button"
                  className="dilemma-choice-btn"
                  onClick={() => onResolveChoice(c)}
                >
                  <div className="dilemma-btn-header">
                    <span className="dilemma-intent">{c.intent}</span>
                    <span className="dilemma-xp">+{c.xpReward} XP</span>
                  </div>
                  <strong>{c.label}</strong>
                  <p>{c.immediateOutcome}</p>
                </button>
              ))}
            </div>
            <div className="dilemma-footer-actions">
              <button
                type="button"
                className="spotlight-btn secondary"
                onClick={resetBattle}
              >
                🔄 Replay This Battle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Defeat Screen */}
      {combatPhase === "defeated" && (
        <div className="combat-modal-overlay">
          <div className="combat-dilemma-card defeat">
            <span className="defeat-badge">⚠️ COMBAT LOSS</span>
            <h3>Your Friend Was Overpowered</h3>
            <p>Your shields collapsed under enemy fire. You can immediately retry the battle or return to the hub.</p>
            <div className="defeat-cta-row">
              <button
                type="button"
                className="spotlight-btn primary large"
                onClick={resetBattle}
              >
                🔄 Retry Battle Now
              </button>
              <button
                type="button"
                className="spotlight-btn secondary"
                onClick={onCancel}
              >
                Retreat to Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
