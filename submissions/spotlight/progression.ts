/**
 * Behavior and Progression Engine for Rare Friend Spotlight
 * Converts actions into emergent personality traits, computes tiers, and manages XP/leveling.
 */

import {
  BehaviorDimension,
  BEHAVIOR_DIMENSIONS,
  FriendPersistentState,
  SkillName,
  TraitTier,
  TRAIT_TIER_NAMES,
  JournalEntry,
  ActionChoice,
} from "./types.js";

export function createInitialFriendState(
  friendId: bigint,
  walletAddress = "0x0000000000000000000000000000000000000000"
): FriendPersistentState {
  const initialBehavior: Record<BehaviorDimension, number> = {
    courage: 0,
    caution: 0,
    loyalty: 0,
    ruthlessness: 0,
    compassion: 0,
    cunning: 0,
    cooperation: 0,
    independence: 0,
  };

  const initialSkills: Record<SkillName, number> = {
    Diplomacy: 1,
    Survival: 1,
    Infiltration: 1,
    Insight: 1,
  };

  return {
    version: 1,
    friendId: friendId.toString(),
    walletAddress,
    characterName: `Friend #${friendId.toString()}`,
    level: 1,
    xp: 0,
    xpForNextLevel: 100,
    totalSessionsPlayed: 0,
    totalEncountersResolved: 0,
    lastPlayedAt: Date.now(),
    behaviorPoints: initialBehavior,
    reputationTitle: "Unformed Wanderer",
    dominantTraits: [],
    secondaryTraits: [],
    skills: initialSkills,
    journal: [
      {
        id: "entry_genesis",
        day: 1,
        sessionIndex: 0,
        timestamp: Date.now(),
        title: "The Awakening",
        narrative: "Your Rare Friend stepped onto the frontier. Their heart and destiny are unwritten.",
        consequence: "The world awaits your choices to see who they will become.",
        behaviorHighlights: {},
      },
    ],
    memories: {},
    achievements: [],
  };
}

/**
 * Trait Level mapping based on accumulated points:
 * 0: Undeveloped (0-4)
 * 1: Emerging (5-11)
 * 2: Recognizable (12-21)
 * 3: Established (22-34)
 * 4: Strong (35-51)
 * 5: Defining (52+)
 */
export function getTraitTier(points: number): TraitTier {
  if (points >= 52) return 5;
  if (points >= 35) return 4;
  if (points >= 22) return 3;
  if (points >= 12) return 2;
  if (points >= 5) return 1;
  return 0;
}

export function getTraitTierLabel(points: number): string {
  return TRAIT_TIER_NAMES[getTraitTier(points)];
}

const TRAIT_DESCRIPTORS: Record<BehaviorDimension, { positiveTitle: string; highTitle: string }> = {
  courage: { positiveTitle: "Brave", highTitle: "Fearless Vanguard" },
  caution: { positiveTitle: "Prudent", highTitle: "Master Sentinel" },
  loyalty: { positiveTitle: "Devoted", highTitle: "Steadfast Pillar" },
  ruthlessness: { positiveTitle: "Pragmatic", highTitle: "Merciless Operative" },
  compassion: { positiveTitle: "Kind-Hearted", highTitle: "Benevolent Guardian" },
  cunning: { positiveTitle: "Astute", highTitle: "Subtle Strategist" },
  cooperation: { positiveTitle: "Cooperative", highTitle: "Grand Unifier" },
  independence: { positiveTitle: "Self-Reliant", highTitle: "Lone Freeblade" },
};

/**
 * Re-evaluates dominant/secondary traits and dynamic reputation title based on behaviors
 */
export function updateFriendReputation(state: FriendPersistentState): void {
  const sorted = [...BEHAVIOR_DIMENSIONS]
    .map(dim => ({ dim, pts: state.behaviorPoints[dim] }))
    .sort((a, b) => b.pts - a.pts);

  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  const dominants: string[] = [];
  const secondaries: string[] = [];

  if (top1 && top1.pts >= 5) {
    dominants.push(
      top1.pts >= 35
        ? TRAIT_DESCRIPTORS[top1.dim].highTitle
        : TRAIT_DESCRIPTORS[top1.dim].positiveTitle
    );
  }
  if (top2 && top2.pts >= 5) {
    if (top2.pts >= 22) {
      dominants.push(TRAIT_DESCRIPTORS[top2.dim].positiveTitle);
    } else {
      secondaries.push(TRAIT_DESCRIPTORS[top2.dim].positiveTitle);
    }
  }
  if (top3 && top3.pts >= 5) {
    secondaries.push(TRAIT_DESCRIPTORS[top3.dim].positiveTitle);
  }

  state.dominantTraits = dominants;
  state.secondaryTraits = secondaries;

  // Generate Emergent Archetype Title
  if (state.totalSessionsPlayed === 0 && top1.pts < 5) {
    state.reputationTitle = "The Unwritten Wanderer";
  } else if (state.behaviorPoints.compassion >= 25 && state.behaviorPoints.loyalty >= 20) {
    state.reputationTitle = "Shield of the Vulnerable";
  } else if (state.behaviorPoints.ruthlessness >= 25 && state.behaviorPoints.cunning >= 20) {
    state.reputationTitle = "Dread Whisperer";
  } else if (state.behaviorPoints.courage >= 25 && state.behaviorPoints.independence >= 20) {
    state.reputationTitle = "The Undaunted Maverick";
  } else if (state.behaviorPoints.cunning >= 25 && state.behaviorPoints.cooperation >= 20) {
    state.reputationTitle = "The Grand Arbiter";
  } else if (state.behaviorPoints.caution >= 25 && state.behaviorPoints.loyalty >= 20) {
    state.reputationTitle = "The Faithful Bulwark";
  } else if (top1.pts >= 20) {
    state.reputationTitle = `The ${TRAIT_DESCRIPTORS[top1.dim].positiveTitle}`;
  } else {
    state.reputationTitle = "Emerging Soul";
  }

  // Check achievements
  checkAchievements(state);
}

function checkAchievements(state: FriendPersistentState) {
  const current = new Set(state.achievements);
  const pts = state.behaviorPoints;

  // Trait Mastery Achievements
  if (pts.courage >= 30 && !current.has("Heart of Iron")) {
    state.achievements.push("Heart of Iron");
  }
  if (pts.compassion >= 30 && !current.has("Sanctuary for All")) {
    state.achievements.push("Sanctuary for All");
  }
  if (pts.ruthlessness >= 30 && !current.has("Cold Ambition")) {
    state.achievements.push("Cold Ambition");
  }
  if (pts.cunning >= 30 && !current.has("Shadow Chessmaster")) {
    state.achievements.push("Shadow Chessmaster");
  }
  if (pts.loyalty >= 30 && !current.has("Unbroken Oath")) {
    state.achievements.push("Unbroken Oath");
  }
  if (pts.independence >= 30 && !current.has("Sovereign Will")) {
    state.achievements.push("Sovereign Will");
  }
  if (pts.cooperation >= 30 && !current.has("Grand Peacemaker")) {
    state.achievements.push("Grand Peacemaker");
  }
  if (pts.caution >= 30 && !current.has("Vigilant Guardian")) {
    state.achievements.push("Vigilant Guardian");
  }

  // Progression & Campaign Achievements
  if (state.totalEncountersResolved >= 1 && !current.has("Frontier Bloodied (Sector 1)")) {
    state.achievements.push("Frontier Bloodied (Sector 1)");
  }
  if (state.totalEncountersResolved >= 2 && !current.has("Syndicate Breaker (Sector 2)")) {
    state.achievements.push("Syndicate Breaker (Sector 2)");
  }
  if (state.totalEncountersResolved >= 3 && !current.has("Matrix Overload (Sector 3)")) {
    state.achievements.push("Matrix Overload (Sector 3)");
  }
  if (state.totalEncountersResolved >= 4 && !current.has("Conqueror of the Void (Sector 4)")) {
    state.achievements.push("Conqueror of the Void (Sector 4)");
  }
  if (state.level >= 5 && !current.has("Seasoned Traveler")) {
    state.achievements.push("Seasoned Traveler");
  }
  if (state.level >= 10 && !current.has("Ascended Legend")) {
    state.achievements.push("Ascended Legend");
  }
  if (state.journal.length >= 5 && !current.has("Chronicle Scribe")) {
    state.achievements.push("Chronicle Scribe");
  }
  if (state.journal.length >= 10 && !current.has("Living Chronicle")) {
    state.achievements.push("Living Chronicle");
  }
}

/**
 * Processes an action choice from an encounter into the Friend's persistent state
 */
export function applyActionToFriend(
  state: FriendPersistentState,
  choice: ActionChoice,
  encounterTitle: string
): {
  xpGained: number;
  levelUp: boolean;
  newLevel: number;
  behaviorSummary: string[];
} {
  state.totalEncountersResolved += 1;
  state.lastPlayedAt = Date.now();

  const behaviorSummary: string[] = [];

  // Apply behavior deltas
  for (const [dim, val] of Object.entries(choice.behaviorEffects) as [BehaviorDimension, number][]) {
    if (val) {
      state.behaviorPoints[dim] = Math.max(0, (state.behaviorPoints[dim] || 0) + val);
      behaviorSummary.push(`${val > 0 ? "+" : ""}${val} ${dim.charAt(0).toUpperCase() + dim.slice(1)}`);
    }
  }

  // Apply Skill synergetic boost
  if (choice.requiredSkill) {
    const sName = choice.requiredSkill.skill;
    state.skills[sName] = (state.skills[sName] || 1) + 1;
  }

  // Update memories
  if (choice.memoryUpdate) {
    const mem = choice.memoryUpdate;
    const existing = state.memories[mem.characterId] || {
      characterId: mem.characterId,
      characterName: mem.characterName,
      relationshipStatus: "neutral",
      trustScore: 0,
      notes: "",
      lastInteraction: "",
    };

    existing.trustScore = Math.max(-100, Math.min(100, existing.trustScore + mem.trustDelta));
    existing.relationshipStatus =
      existing.trustScore >= 40
        ? "ally"
        : existing.trustScore <= -40
        ? "hostile"
        : existing.trustScore < 0
        ? "wary"
        : "neutral";
    existing.notes = mem.notes;
    existing.lastInteraction = choice.narrativeChoice;
    state.memories[mem.characterId] = existing;
  }

  // Apply XP & check Level-up
  let levelUp = false;
  state.xp += choice.xpReward;
  while (state.xp >= state.xpForNextLevel) {
    state.xp -= state.xpForNextLevel;
    state.level += 1;
    state.xpForNextLevel = Math.round(state.xpForNextLevel * 1.45);
    levelUp = true;
  }

  // Add meaningful journal entry if action has weight
  if (choice.journalSummary) {
    const newEntry: JournalEntry = {
      id: `entry_${Date.now()}_${state.totalEncountersResolved}`,
      day: Math.floor(state.totalEncountersResolved / 3) + 1,
      sessionIndex: state.totalSessionsPlayed + 1,
      timestamp: Date.now(),
      title: encounterTitle,
      narrative: choice.narrativeChoice,
      consequence: choice.immediateOutcome,
      behaviorHighlights: choice.behaviorEffects,
    };
    state.journal.unshift(newEntry);
  }

  updateFriendReputation(state);

  return {
    xpGained: choice.xpReward,
    levelUp,
    newLevel: state.level,
    behaviorSummary,
  };
}
