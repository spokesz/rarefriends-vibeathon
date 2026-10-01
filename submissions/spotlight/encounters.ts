/**
 * Encounters and Narrative Scenarios for Rare Friend Spotlight: Becoming
 * Each encounter presents a genuine ethical, tactical, or relational dilemma
 * with distinct, balanced behavioral mapping (no optimal playstyle).
 */

import { Encounter } from "./types.js";

export const ENCOUNTERS: readonly Encounter[] = [
  {
    id: "enc_ambushed_scout",
    title: "The Wounded Courier",
    locationName: "Verdant Pass",
    npcName: "Courier Mara",
    situation:
      "A frontier courier named Mara is pinned beneath a fallen power pylon with wild stalkers circling her. She clutches an encrypted satchel belonging to the Guild.",
    dialogue:
      "Mara: 'Don't just stand there! My leg is pinned... take the satchel and run, or help me pry this beam off before they close in!'",
    actions: [
      {
        id: "act_shield_and_rescue",
        label: "Risk life to pry the pylon off and defend her",
        intent: "Defend & Rescue",
        narrativeChoice: "You placed yourself between Mara and the beasts, straining against the heavy metal beam.",
        immediateOutcome:
          "You endured heavy bruising, but freed Mara in time. Together you drove the beasts off with flares.",
        behaviorEffects: { courage: 4, compassion: 3, loyalty: 2, caution: -1 },
        xpReward: 35,
        hpDelta: -15,
        memoryUpdate: {
          characterId: "mara",
          characterName: "Courier Mara",
          trustDelta: 50,
          notes: "Grateful for life saved at personal cost.",
        },
        journalSummary: "Risked life and limb to rescue Courier Mara from wild stalkers beneath a fallen pylon.",
      },
      {
        id: "act_secure_satchel_and_flee",
        label: "Snatch the encrypted satchel and escape to safety",
        intent: "Prioritize Cargo & Survival",
        narrativeChoice: "You prioritized the irreplaceable guild cargo, seizing the satchel and retreating while Mara held the line.",
        immediateOutcome:
          "You reached safe ground untouched with the valuable intel. Mara managed to trigger an emergency pod, but she will never forget your cold retreat.",
        behaviorEffects: { ruthlessness: 4, cunning: 2, loyalty: -3, compassion: -2, caution: 2 },
        xpReward: 30,
        hpDelta: 0,
        memoryUpdate: {
          characterId: "mara",
          characterName: "Courier Mara",
          trustDelta: -60,
          notes: "Deeply resentful: abandoned her to preserve the satchel.",
        },
        journalSummary: "Took the encrypted satchel from pinned Courier Mara and withdrew without assisting.",
      },
      {
        id: "act_tactical_distraction",
        label: "Create a diversion from the ridgeline to lure stalkers away",
        intent: "Tactical Caution",
        narrativeChoice: "You climbed the high rocks, setting off harmonic sonic beacons to redirect the stalker pack away from the ravine.",
        immediateOutcome:
          "The stalkers pursued the phantom noise. Mara had time to unwedge herself and limp to safety, praising your sharp head.",
        behaviorEffects: { cunning: 3, caution: 3, independence: 2 },
        xpReward: 30,
        hpDelta: -5,
        memoryUpdate: {
          characterId: "mara",
          characterName: "Courier Mara",
          trustDelta: 25,
          notes: "Respects tactical intelligence and survival instinct.",
        },
        journalSummary: "Calculated a safe harmonic diversion to save Mara without engaging in direct melee.",
      },
    ],
  },
  {
    id: "enc_derelict_cache",
    title: "The Sealed Vault of Vael",
    locationName: "Ancient Substation",
    situation:
      "You stumble upon an intact pre-collapse supply cache. A starving scavenger family stands outside with primitive tools, unable to crack the electronic lock.",
    dialogue:
      "Elder Corin: 'Traveler, our children haven't eaten pure rations in three cycles. If you can open this door, please spare us half.'",
    actions: [
      {
        id: "act_share_equally",
        label: "Slice the lock and share all supplies equally",
        intent: "Generous Cooperation",
        narrativeChoice: "You bypassed the security lattice, opened the vault, and divided every ration container equally with Corin's kin.",
        immediateOutcome:
          "The family wept with gratitude, bestowing an ancestral signal charm upon your Friend.",
        behaviorEffects: { compassion: 4, cooperation: 3, ruthlessness: -2 },
        xpReward: 35,
        memoryUpdate: {
          characterId: "corin",
          characterName: "Elder Corin",
          trustDelta: 45,
          notes: "Shares your name among scavenger circles as an honorable traveler.",
        },
        journalSummary: "Cracked the Vault of Vael and shared the spoils equally with starving scavengers.",
      },
      {
        id: "act_claim_all_monopoly",
        label: "Unlock the vault and claim everything for yourself",
        intent: "Total Self-Reliance",
        narrativeChoice: "You bypassed the lock, barred the entrance with your weapon, and loaded all batteries and rations into your own pack.",
        immediateOutcome:
          "The scavengers cursed your name as they retreated into the wastes. Your packs are overflowing with rare parts.",
        behaviorEffects: { ruthlessness: 4, independence: 3, compassion: -3, cooperation: -2 },
        xpReward: 40,
        memoryUpdate: {
          characterId: "corin",
          characterName: "Elder Corin",
          trustDelta: -50,
          notes: "Warns other wanderers that your Friend is a merciless hoarder.",
        },
        journalSummary: "Secured all Vault supplies for your Friend alone, turning away begging scavengers.",
      },
      {
        id: "act_negotiate_scavenge_deal",
        label: "Offer opening services in exchange for their technical scrap",
        intent: "Pragmatic Dealmaking",
        narrativeChoice: "You negotiated a strict contract: you provide access to life-support food, they surrender all refined electronic components.",
        immediateOutcome:
          "A crisp, fair transaction. Both parties left with exactly what they needed most.",
        behaviorEffects: { cunning: 3, caution: 2, independence: 2 },
        xpReward: 30,
        journalSummary: "Negotiated a strict mutual-exchange agreement with the scavenger family at the Vault.",
      },
    ],
  },
  {
    id: "enc_syndicate_bribe",
    title: "The Crossroads Dilemma",
    locationName: "Black Sand Outpost",
    npcName: "Enforcer Kaelen",
    situation:
      "Kaelen, an enforcer of the Rust Syndicate, catches you near an off-grid rebel radio node. He offers a heavy purse of simulated RF if you hand over the node's broadcast frequency.",
    dialogue:
      "Kaelen: 'Look, nobody needs to get fried today. Give me the broadcast key, take this purse of 5 RF, and walk away clean. What do those dreamers ever do for you?'",
    actions: [
      {
        id: "act_refuse_and_fight",
        label: "Refuse the bribe and stand ground for the rebels",
        intent: "Uncompromising Principle",
        narrativeChoice: "You rejected Kaelen's purse and drew your energy stave, standing between the Syndicate and the freedom node.",
        immediateOutcome:
          "A fierce duel followed. Kaelen retreated under flash-grenade cover, leaving the rebel broadcast intact.",
        behaviorEffects: { courage: 4, loyalty: 3, ruthlessness: -2 },
        xpReward: 45,
        hpDelta: -20,
        memoryUpdate: {
          characterId: "kaelen",
          characterName: "Enforcer Kaelen",
          trustDelta: -40,
          notes: "Recognizes your Friend as an unshakeable obstacle.",
        },
        journalSummary: "Rejected Kaelen's Syndicate bribe and defended the rebel frequency node in combat.",
      },
      {
        id: "act_accept_bribe",
        label: "Take the 5 RF bribe and hand over the broadcast key",
        intent: "Pragmatic Profit",
        narrativeChoice: "You weighed ideological warfare against material strength, took the RF purse, and transmitted the signal key.",
        immediateOutcome:
          "Kaelen smiled and deactivated his weapons. Your Friend pocketed substantial resources, though distant signals faded to static.",
        behaviorEffects: { ruthlessness: 4, cunning: 3, loyalty: -4, compassion: -2 },
        xpReward: 35,
        memoryUpdate: {
          characterId: "kaelen",
          characterName: "Enforcer Kaelen",
          trustDelta: 30,
          notes: "Believes your Friend understands how the world really turns.",
        },
        journalSummary: "Accepted Kaelen's Syndicate bribe, trading the rebel broadcast key for valuable resources.",
      },
      {
        id: "act_double_cross_fake_key",
        label: "Provide an altered frequency key and slip into the shadows",
        intent: "Deceptive Cunning",
        narrativeChoice: "Using your technical savvy, you generated a spoofed algorithmic key, accepted the purse, and melted into the crowds before he noticed.",
        immediateOutcome:
          "The Syndicate pursued a wild signal into a dead-end ravine while the real broadcast remained online. Masterful trickery.",
        behaviorEffects: { cunning: 5, independence: 2, caution: 2, courage: 1 },
        xpReward: 40,
        memoryUpdate: {
          characterId: "kaelen",
          characterName: "Enforcer Kaelen",
          trustDelta: -75,
          notes: "Humiliated by your Friend's double-cross; actively plotting revenge.",
        },
        journalSummary: "Outsmarted Enforcer Kaelen with a spoofed frequency, taking the reward and protecting the node.",
      },
    ],
  },
  {
    id: "enc_collapsing_reactor",
    title: "Critical Overload",
    locationName: "Core Conduit 04",
    situation:
      "A subterranean atmospheric stabilizer is going critical. If someone enters the radiation chamber, they can manually shut it down, but will suffer severe burns. You could also seal the blast doors, sacrificing the outer district to save yourself.",
    dialogue:
      "Warning Klaxon: 'Reactor containment at 14%. Core meltdown imminent across sectors 2 through 6.'",
    actions: [
      {
        id: "act_enter_radiation_core",
        label: "Dive into the heat chamber to manually purge the core",
        intent: "Ultimate Sacrifice",
        narrativeChoice: "Without hesitation, your Friend breached the decontamination gate, enduring blinding heat to depressurize the valves.",
        immediateOutcome:
          "The alarm silenced. Thousands of residents never knew how close they came to doom. Your Friend emerged scorched but triumphant.",
        behaviorEffects: { courage: 5, compassion: 4, caution: -3 },
        xpReward: 50,
        hpDelta: -30,
        journalSummary: "Endured agonizing reactor heat to manually purge the core, saving the entire outer sector.",
      },
      {
        id: "act_seal_outer_doors",
        label: "Lock the blast gates and escape behind blast shields",
        intent: "Cold Preservation",
        narrativeChoice: "You slammed the emergency bulkheads shut, securing your own sector while sealing the overloaded zone off from the network.",
        immediateOutcome:
          "You emerged completely unharmed into the sunlight. The muffled shockwave below permanently cratered the outer shantytowns.",
        behaviorEffects: { caution: 4, ruthlessness: 4, compassion: -4, courage: -2 },
        xpReward: 35,
        hpDelta: 0,
        journalSummary: "Sealed the heavy blast gates to ensure personal survival, allowing the lower sector to collapse.",
      },
      {
        id: "act_jury_rig_conduit",
        label: "Overclock the coolant pipelines from the console",
        intent: "Calculated Engineering",
        narrativeChoice: "You studied the schematics under strobe lights, rerouting cryogenic fluid into the fuel lines at great pressure.",
        immediateOutcome:
          "The containment stabilized at 2% margin. A brilliant display of poise under immense pressure.",
        behaviorEffects: { cunning: 3, caution: 2, courage: 2 },
        xpReward: 40,
        hpDelta: -10,
        journalSummary: "Calculated a risky coolant reroute under pressure, halting the meltdown through sheer ingenuity.",
      },
    ],
  },
  {
    id: "enc_mara_returns",
    title: "Echoes of the Past: Mara's Camp",
    locationName: "Dustveil Oasis",
    npcName: "Courier Mara",
    situation:
      "At the Oasis, you encounter Courier Mara once again. The air between you is thick with the memory of your past encounter.",
    dialogue:
      "Mara watches you approach, her hand resting near her holster as she recalls how you acted when she was pinned by the pylon...",
    actions: [
      {
        id: "act_reaffirm_bond",
        label: "Greet her as a trusted comrade and share your campfire",
        intent: "Deepen Camaraderie",
        narrativeChoice: "You sat beside Mara's fire, sharing trail bread and reminiscing over the trials of the frontier.",
        immediateOutcome:
          "Mara smiled warmly. She shared secret maps of the northern perimeter, cementing an enduring friendship.",
        behaviorEffects: { loyalty: 4, cooperation: 3, compassion: 2 },
        xpReward: 35,
        memoryUpdate: {
          characterId: "mara",
          characterName: "Courier Mara",
          trustDelta: 30,
          notes: "Inseparable ally. Would ride into hell for your Friend.",
        },
        journalSummary: "Reunited with Mara as an honored comrade, sharing trail rations and charting the north.",
      },
      {
        id: "act_demand_tithe",
        label: "Remind her that survival is a business and demand payment",
        intent: "Extort Value",
        narrativeChoice: "You looked at her coldly, stating that in this world, nobody owes anyone free courtesy or lingering favors.",
        immediateOutcome:
          "Disgusted, Mara threw down a pouch of batteries and turned her back on you forever.",
        behaviorEffects: { ruthlessness: 4, independence: 3, loyalty: -3 },
        xpReward: 25,
        memoryUpdate: {
          characterId: "mara",
          characterName: "Courier Mara",
          trustDelta: -40,
          notes: "Sees your Friend as a mercenary soul devoid of honor.",
        },
        journalSummary: "Extorted Mara for supplies, severing any chance of mutual trust.",
      },
      {
        id: "act_observe_quietly",
        label: "Keep distance, nodding cordially without entanglements",
        intent: "Cautious Independence",
        narrativeChoice: "You acknowledged her presence with a disciplined salute, maintaining vigilant independence.",
        immediateOutcome:
          "Both nodded in mutual respect as independent operators of the wasteland.",
        behaviorEffects: { independence: 3, caution: 3 },
        xpReward: 25,
        journalSummary: "Observed Mara from a respectful distance, valuing autonomy over emotional ties.",
      },
    ],
  },
];

export function getRandomEncounters(count = 3): Encounter[] {
  const shuffled = [...ENCOUNTERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
