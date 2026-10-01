/**
 * Roadmap Modal Component for Rare Friend Spotlight: Becoming
 * Displays both:
 * 1. Campaign Sector & Trait Mastery Roadmap (in-game 4 sectors, requirements, rewards, trait evolution)
 * 2. Ecosystem & Release Roadmap (Phase 1 Vibe-a-thon, Phase 2 On-Chain Sync, Phase 3 Frontier Raids)
 */

import React, { useState } from "react";
import { GameMenu } from "@rarefriends/friendsdk/frame";
import { FriendPersistentState } from "./types.js";
import { COMBAT_SCENARIOS } from "./RealTimeCombatArena.js";

export function RoadmapModal({
  friendState,
  onClose,
  onLaunchSector,
}: {
  friendState: FriendPersistentState;
  onClose: () => void;
  onLaunchSector: (sectorIndex: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<"campaign" | "ecosystem">("campaign");

  // Determine which sectors the user has beaten / can access based on level/encounters
  const sectors = [
    {
      index: 0,
      title: "Stage 1: Crimson Ridge",
      location: "Crimson Gorge",
      boss: "Razor Stalker",
      threatLevel: "Normal",
      recommendedLevel: 1,
      mechanic: "Needle lunges & fast attacks",
      reward: "+45 XP · Trait Evolution",
      completed: friendState.totalEncountersResolved >= 1 || friendState.level > 1,
      unlocked: true,
      lore: "A crimson ravine plagued by stalkers hunting frontier supply couriers.",
    },
    {
      index: 1,
      title: "Stage 2: Rust Outpost",
      location: "Rust Outpost",
      boss: "Enforcer Kaelen",
      threatLevel: "Hard",
      recommendedLevel: 2,
      mechanic: "Shield turret & ricochet wall shots",
      reward: "+55 XP · Trait Evolution",
      completed: friendState.totalEncountersResolved >= 2 || friendState.level >= 3,
      unlocked: friendState.level >= 1,
      lore: "A fortified perimeter held by cybernetic enforcers.",
    },
    {
      index: 2,
      title: "Stage 3: Ancient Monolith",
      location: "Verdant Core Ruins",
      boss: "Gorgon Core",
      threatLevel: "Extreme",
      recommendedLevel: 3,
      mechanic: "Rotating radial lasers & bullet barrage",
      reward: "+65 XP · Trait Evolution",
      completed: friendState.totalEncountersResolved >= 3 || friendState.level >= 4,
      unlocked: friendState.level >= 2,
      lore: "An ancient power matrix on the verge of critical meltdown.",
    },
    {
      index: 3,
      title: "Stage 4: Chamber of Echoes",
      location: "Chamber of Echoes",
      boss: "Shadow Reflection",
      threatLevel: "Boss",
      recommendedLevel: 5,
      mechanic: "Doppelgänger mirroring your movements and fire",
      reward: "+100 XP · Trait Mastery",
      completed: friendState.totalEncountersResolved >= 4 || friendState.level >= 5,
      unlocked: friendState.level >= 3,
      lore: "The inner sanctum where the shadow tests everything you have become.",
    },
  ];

  const milestones = [
    {
      phase: "Phase 1: Spotlight (Live)",
      status: "Playable",
      tagColor: "active",
      timeline: "Current",
      features: [
        "Real-Time Combat Arena (WASD, shoot, dash)",
        "4 Boss Stages with escalating AI & attacks",
        "Tactical cover pillars that absorb enemy shots",
        "Persistent character leveling, traits & chronicle journal",
      ],
    },
    {
      phase: "Phase 2: On-Chain Records",
      status: "In Development",
      tagColor: "upcoming",
      timeline: "Next Up",
      features: [
        "On-chain trait attestations linked to Friend NFT token IDs",
        "Exportable character profiles for cross-game play",
        "Token reward claims for clearing stages",
      ],
    },
    {
      phase: "Phase 3: Multiplayer Co-Op",
      status: "Planned",
      tagColor: "future",
      timeline: "Future",
      features: [
        "2-Player Co-Op boss raids",
        "Community world events",
        "Custom community maps & encounters",
      ],
    },
  ];

  return (
    <GameMenu title="Campaign Roadmap" onClose={onClose}>
      <div className="spotlight-modal-body roadmap-layout">
        {/* Navigation Tabs */}
        <nav className="dossier-nav-tabs" style={{ marginBottom: 16 }}>
          <button
            type="button"
            className={`dossier-tab ${activeTab === "campaign" ? "active" : ""}`}
            onClick={() => setActiveTab("campaign")}
          >
            🗺️ Stages (1-4)
          </button>
          <button
            type="button"
            className={`dossier-tab ${activeTab === "ecosystem" ? "active" : ""}`}
            onClick={() => setActiveTab("ecosystem")}
          >
            🚀 Future Updates
          </button>
        </nav>

        {/* TAB 1: CAMPAIGN SECTORS */}
        {activeTab === "campaign" && (
          <div className="roadmap-campaign-view">
            <div className="roadmap-intro-banner">
              <div>
                <h4>Campaign Stages</h4>
                <p>
                  Clear each stage to level up and evolve your Friend's stats.
                </p>
              </div>
              <div className="roadmap-progress-badge">
                <span>Friend Level</span>
                <strong>Lv.{friendState.level}</strong>
              </div>
            </div>

            <div className="roadmap-timeline">
              {sectors.map((sec, idx) => (
                <div
                  key={sec.index}
                  className={`roadmap-node ${sec.completed ? "node-completed" : sec.unlocked ? "node-unlocked" : "node-locked"}`}
                >
                  <div className="roadmap-node-marker">
                    <span className="node-num">{idx + 1}</span>
                    <div className="node-line" />
                  </div>

                  <div className="roadmap-card">
                    <div className="roadmap-card-head">
                      <div>
                        <span className="roadmap-location">{sec.location}</span>
                        <h5>{sec.title}</h5>
                      </div>
                      <div className="roadmap-tags">
                        <span className={`threat-tag threat-${sec.threatLevel.toLowerCase()}`}>
                          {sec.threatLevel} Threat
                        </span>
                        {sec.completed && <span className="status-tag completed">✓ Conquered</span>}
                        {!sec.completed && sec.unlocked && <span className="status-tag active">Ready</span>}
                        {!sec.unlocked && <span className="status-tag locked">🔒 Lv.{sec.recommendedLevel}</span>}
                      </div>
                    </div>

                    <p className="roadmap-lore">{sec.lore}</p>

                    <div className="roadmap-meta-grid">
                      <div className="roadmap-meta-item">
                        <span className="meta-label">Boss Target:</span>
                        <strong className="meta-val">{sec.boss}</strong>
                      </div>
                      <div className="roadmap-meta-item">
                        <span className="meta-label">Combat Mechanic:</span>
                        <span className="meta-val">{sec.mechanic}</span>
                      </div>
                      <div className="roadmap-meta-item full">
                        <span className="meta-label">Moral Evolution:</span>
                        <span className="meta-val highlight">{sec.reward}</span>
                      </div>
                    </div>

                    <div className="roadmap-card-actions">
                      <button
                        type="button"
                        className="spotlight-btn primary small"
                        onClick={() => {
                          onClose();
                          onLaunchSector(sec.index);
                        }}
                      >
                        ⚔️ Battle {sec.boss}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ECOSYSTEM & PROJECT ROADMAP */}
        {activeTab === "ecosystem" && (
          <div className="roadmap-ecosystem-view">
            <div className="roadmap-intro-banner">
              <div>
                <h4>Rare Friends Spotlight: Project Evolution</h4>
                <p>
                  Built with FriendSDK v0.1.2. The long-term journey from interactive solo chronicle to
                  verifiable on-chain soulbound traits and frontier multiplayer raids.
                </p>
              </div>
            </div>

            <div className="ecosystem-cards-list">
              {milestones.map((m, idx) => (
                <div key={idx} className={`ecosystem-card card-${m.tagColor}`}>
                  <div className="eco-header">
                    <div>
                      <span className="eco-timeline">{m.timeline}</span>
                      <h5>{m.phase}</h5>
                    </div>
                    <span className={`eco-badge badge-${m.tagColor}`}>{m.status}</span>
                  </div>
                  <ul className="eco-feature-list">
                    {m.features.map((f, fIdx) => (
                      <li key={fIdx}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="dossier-footer-btns" style={{ marginTop: 14 }}>
          <button type="button" className="spotlight-btn secondary" onClick={onClose}>
            Close Roadmap
          </button>
        </div>
      </div>
    </GameMenu>
  );
}
