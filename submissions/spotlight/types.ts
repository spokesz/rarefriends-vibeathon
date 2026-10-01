/**
 * Data Model and Types for Rare Friend Spotlight: Becoming
 * Adheres to Master Build Instructions:
 * - Trait system: Courage, Caution, Loyalty, Ruthlessness, Compassion, Cunning, Cooperation, Independence
 * - Progression: Levels (1-10+), XP, Trait Levels (0-5: Undeveloped -> Defining)
 * - Journal & Memory persistence
 * - Encounters & Behavioral Event Mapping
 */

export type BehaviorDimension =
  | "courage"
  | "caution"
  | "loyalty"
  | "ruthlessness"
  | "compassion"
  | "cunning"
  | "cooperation"
  | "independence";

export const BEHAVIOR_DIMENSIONS: readonly BehaviorDimension[] = [
  "courage",
  "caution",
  "loyalty",
  "ruthlessness",
  "compassion",
  "cunning",
  "cooperation",
  "independence",
] as const;

export type TraitTier = 0 | 1 | 2 | 3 | 4 | 5;

export const TRAIT_TIER_NAMES: Record<TraitTier, string> = {
  0: "Undeveloped",
  1: "Emerging",
  2: "Recognizable",
  3: "Established",
  4: "Strong",
  5: "Defining",
};

export type SkillName = "Diplomacy" | "Survival" | "Infiltration" | "Insight";

export interface FriendSkill {
  name: SkillName;
  level: number;
  description: string;
}

export interface JournalEntry {
  id: string;
  day: number;
  sessionIndex: number;
  timestamp: number;
  title: string;
  narrative: string;
  consequence: string;
  behaviorHighlights: Partial<Record<BehaviorDimension, number>>;
}

export interface MemoryRecord {
  characterId: string;
  characterName: string;
  relationshipStatus: "ally" | "neutral" | "hostile" | "indebted" | "wary";
  trustScore: number; // -100 to 100
  notes: string;
  lastInteraction: string;
}

export interface FriendPersistentState {
  version: 1;
  friendId: string; // BigInt string
  walletAddress: string;
  characterName: string;
  level: number;
  xp: number;
  xpForNextLevel: number;
  totalSessionsPlayed: number;
  totalEncountersResolved: number;
  lastPlayedAt: number;

  // Raw behavioral points accumulated
  behaviorPoints: Record<BehaviorDimension, number>;

  // Computed dominant & secondary titles
  reputationTitle: string;
  dominantTraits: string[];
  secondaryTraits: string[];

  // Game skills
  skills: Record<SkillName, number>;

  // Narrative memory & history
  journal: JournalEntry[];
  memories: Record<string, MemoryRecord>;

  // Achievements unlocked
  achievements: string[];
}

export interface ActionChoice {
  id: string;
  label: string;
  intent: string;
  narrativeChoice: string;
  immediateOutcome: string;
  requiredSkill?: { skill: SkillName; minLevel: number };
  behaviorEffects: Partial<Record<BehaviorDimension, number>>;
  xpReward: number;
  hpDelta?: number;
  rfRewardUnits?: bigint;
  memoryUpdate?: {
    characterId: string;
    characterName: string;
    trustDelta: number;
    notes: string;
  };
  journalSummary: string;
}

export interface Encounter {
  id: string;
  title: string;
  locationName: string;
  npcName?: string;
  situation: string;
  dialogue?: string;
  actions: readonly ActionChoice[];
  specialRequirementNotice?: string;
}

export interface SessionState {
  sessionNumber: number;
  currentEncounterIndex: number;
  encounterList: readonly Encounter[];
  friendHp: number;
  maxHp: number;
  sessionXpGained: number;
  sessionActionsChosen: {
    encounterId: string;
    actionId: string;
    behaviorDelta: Partial<Record<BehaviorDimension, number>>;
  }[];
  activeDialogue: string | null;
  selectedActionOutcome: ActionChoice | null;
  isComplete: boolean;
}
