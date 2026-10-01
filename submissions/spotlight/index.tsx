/**
 * Rare Friend Spotlight: Becoming
 * The premier Character Spotlight experience for Rare Friends Vibe-a-thon.
 * "You're not playing as yourself. You're playing for your Friend. Every decision changes who they become."
 */

"use client";

import { useEffect, useRef, useState } from "react";
import type { GameComponentProps } from "@rarefriends/friendsdk/runtime";
import { formatGameAmount } from "@rarefriends/friendsdk/ui";
import { maximumPrize, type GameSnapshot, type GamePlay } from "@rarefriends/friendsdk/game";
import { createFriendSoundKit, type FriendSoundKit, type FriendSoundCue } from "@rarefriends/friendsdk/sounds";
import { GameWorld, type GameWorldInteraction } from "@rarefriends/friendsdk/world-view";
import { getWorldPreset, validateWorld } from "@rarefriends/friendsdk/world";
import { GameMenu } from "@rarefriends/friendsdk/frame";

import { FriendPersistentState, Encounter, ActionChoice } from "./types.js";
import { loadFriendState, saveFriendState } from "./storage.js";
import { applyActionToFriend, getTraitTier, getTraitTierLabel } from "./progression.js";
import { ENCOUNTERS, getRandomEncounters } from "./encounters.js";
import { FriendPortrait } from "./FriendPortrait.js";
import { RealTimeCombatArena, COMBAT_SCENARIOS, CombatEncounterConfig } from "./RealTimeCombatArena.js";
import { RoadmapModal } from "./RoadmapModal.js";

import "@rarefriends/friendsdk/frame.css";
import "@rarefriends/friendsdk/world-view.css";
import "./style.css";

const baseWorld = getWorldPreset("01-garden-oval-complete");
const world = validateWorld({
  ...baseWorld,
  props: [
    ...baseWorld.props,
    { type: "terminal", x: 220, y: 155, scale: 1.5 },
    { type: "crystal", x: 386, y: 250, scale: 1.5 },
    { type: "bench", x: 288, y: 290, scale: 1.5 },
  ],
  actors: [],
});

const spawn = [288, 192] as const;

const interactions: readonly GameWorldInteraction[] = [
  { id: "adventure", label: "Frontier Portal (Begin Session)", position: [220, 155], reach: 90, labelOffset: -180 },
  { id: "journal", label: "Friend Chronicle (Profile & Journal)", position: [386, 250], reach: 90, labelOffset: -120 },
  { id: "sanctuary", label: "Meditate / Rest Sanctuary", position: [288, 290], reach: 85, labelOffset: -100 },
];

type ActiveView =
  | "world"
  | "intro"
  | "combat"
  | "roadmap"
  | "profile"
  | "journal"
  | "memories"
  | "encounter"
  | "encounter_result"
  | "session_summary"
  | "settings";

export default function FriendSpotlightGame({ friendId, client, paused }: GameComponentProps) {
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [friendState, setFriendState] = useState<FriendPersistentState | null>(null);
  const [currentView, setCurrentView] = useState<ActiveView>("intro");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [muted, setMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Active Session state
  const [activeSessionEncounters, setActiveSessionEncounters] = useState<Encounter[]>([]);
  const [currentEncounterIdx, setCurrentEncounterIdx] = useState(0);
  const [combatZoneIndex, setCombatZoneIndex] = useState(0);
  const [activeCombatScenario, setActiveCombatScenario] = useState<CombatEncounterConfig | null>(null);
  const [lastActionOutcome, setLastActionOutcome] = useState<{
    choice: ActionChoice;
    encounterTitle: string;
    xpGained: number;
    levelUp: boolean;
    newLevel: number;
    behaviorSummary: string[];
  } | null>(null);
  const [sessionDeltas, setSessionDeltas] = useState<string[]>([]);
  const [sessionInitialLevel, setSessionInitialLevel] = useState(1);

  const sound = useRef<FriendSoundKit | null>(null);
  const locked = useRef(false);
  const epoch = useRef(0);

  // Initialize Audio & persistent state on load or Friend ID change
  useEffect(() => {
    const version = ++epoch.current;
    sound.current = createFriendSoundKit({ muted: true });
    setBusy(false);
    setError("");
    setMessage("");

    // Load persistent state isolated strictly for this Friend ID
    const loaded = loadFriendState(friendId);
    setFriendState(loaded);

    // Initial read from SDK client to settle loading state
    client
      .read()
      .then(snap => {
        if (version === epoch.current) {
          setSnapshot(snap);
        }
      })
      .catch(err => {
        if (version === epoch.current) {
          setError(err instanceof Error ? err.message : "Could not load preview state.");
        }
      });

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    updateMotion();
    preference.addEventListener("change", updateMotion);

    return () => {
      epoch.current++;
      sound.current?.dispose();
      sound.current = null;
      preference.removeEventListener("change", updateMotion);
    };
  }, [client, friendId]);

  const playCue = (cue: FriendSoundCue) => {
    if (!muted) {
      sound.current?.unlock();
      sound.current?.play(cue);
    }
  };

  const startCombatSession = (scenarioIndex?: number) => {
    if (!friendState) return;
    const targetIndex = scenarioIndex !== undefined ? scenarioIndex : combatZoneIndex;
    const scenario = COMBAT_SCENARIOS[targetIndex % COMBAT_SCENARIOS.length];
    setCombatZoneIndex(targetIndex % COMBAT_SCENARIOS.length);
    setActiveCombatScenario(scenario);
    setLastActionOutcome(null);
    setSessionDeltas([]);
    setSessionInitialLevel(friendState.level);
    setCurrentView("combat");
    playCue("action-start");
  };

  const startNewSession = () => {
    if (!friendState) return;
    const encounters = getRandomEncounters(3);
    setActiveSessionEncounters(encounters);
    setCurrentEncounterIdx(0);
    setLastActionOutcome(null);
    setSessionDeltas([]);
    setSessionInitialLevel(friendState.level);
    setCurrentView("encounter");
    playCue("action-start");
  };

  const handleCombatResolve = (choice: ActionChoice) => {
    if (!friendState || !activeCombatScenario) return;
    playCue("select");

    const outcome = applyActionToFriend(friendState, choice, activeCombatScenario.title);
    saveFriendState(friendState);

    setSessionDeltas(prev => [...prev, ...outcome.behaviorSummary]);
    setLastActionOutcome({
      choice,
      encounterTitle: activeCombatScenario.title,
      ...outcome,
    });

    if (outcome.levelUp) {
      playCue("reveal-legendary");
    } else {
      playCue("reward");
    }

    setCombatZoneIndex(prev => (prev + 1) % COMBAT_SCENARIOS.length);
    setActiveCombatScenario(null);
    setCurrentView("encounter_result");
  };

  const chooseAction = (choice: ActionChoice) => {
    if (!friendState || locked.current || paused) return;
    const currentEnc = activeSessionEncounters[currentEncounterIdx];
    if (!currentEnc) return;

    locked.current = true;
    playCue("select");

    // Apply behavioral impacts, progression, and journal updates
    const outcome = applyActionToFriend(friendState, choice, currentEnc.title);
    saveFriendState(friendState);

    // Save for session wrap-up
    setSessionDeltas(prev => [...prev, ...outcome.behaviorSummary]);
    setLastActionOutcome({
      choice,
      encounterTitle: currentEnc.title,
      ...outcome,
    });

    if (outcome.levelUp) {
      playCue("reveal-legendary");
    } else {
      playCue("reward");
    }

    setCurrentView("encounter_result");
    locked.current = false;
  };

  const advanceEncounter = () => {
    const nextIdx = currentEncounterIdx + 1;
    if (nextIdx < activeSessionEncounters.length) {
      setCurrentEncounterIdx(nextIdx);
      setCurrentView("encounter");
      playCue("anticipation");
    } else {
      // Completed session
      if (friendState) {
        friendState.totalSessionsPlayed += 1;
        saveFriendState(friendState);
      }
      playCue("reveal-rare");
      setCurrentView("session_summary");
    }
  };

  const navigateTo = (view: ActiveView) => {
    if (busy || paused) return;
    setCurrentView(view);
    playCue("select");
  };

  if (!snapshot || !friendState) {
    return (
      <div className="spotlight-loading" role="status">
        <p>Awakening your Rare Friend…</p>
      </div>
    );
  }

  const currentEncounter = activeSessionEncounters[currentEncounterIdx];

  return (
    <section className="spotlight-root" aria-label="Rare Friend Spotlight">
      {/* 1. Main Isometric World Surface */}
      <div className="spotlight-world-viewport" inert={currentView !== "world" ? true : undefined}>
        <GameWorld
          world={world}
          spawn={spawn}
          interactions={interactions}
          friendId={friendId}
          paused={currentView !== "world" || paused}
          reducedMotion={reducedMotion}
          onInteract={id => {
            if (id === "adventure") startNewSession();
            else if (id === "journal") navigateTo("profile");
            else if (id === "sanctuary") {
              setMessage("The sanctuary restores your spirit and centers your Friend.");
              navigateTo("profile");
            }
          }}
        />

        {/* Minimal High-Contrast In-World HUD */}
        <header className="spotlight-hud">
          <div className="hud-friend-badge" onClick={() => navigateTo("profile")}>
            <FriendPortrait friendId={friendId} scale={3} />
            <div className="hud-friend-meta">
              <strong>{friendState.characterName}</strong>
              <span>
                Lv.{friendState.level} · {friendState.reputationTitle}
              </span>
            </div>
          </div>
          <div className="hud-actions">
            <button type="button" className="spotlight-btn primary small" onClick={() => startCombatSession(0)}>
              ⚔️ Real Combat
            </button>
            <button type="button" className="spotlight-btn secondary small" onClick={startNewSession}>
              ⚡ Adventure
            </button>
            <button type="button" className="spotlight-btn secondary small" onClick={() => navigateTo("roadmap")}>
              🗺️ Roadmap
            </button>
            <button type="button" className="spotlight-btn secondary small" onClick={() => navigateTo("profile")}>
              📖 Profile
            </button>
            <button type="button" className="spotlight-btn secondary small" onClick={() => navigateTo("settings")}>
              ⚙️
            </button>
          </div>
        </header>

        <footer className="spotlight-world-hint">
          <span>WASD / Arrow keys or Click/Tap destination · Press E or tap station</span>
        </footer>
      </div>

      {/* 2. REAL-TIME COMBAT ARENA */}
      {currentView === "combat" && activeCombatScenario && (
        <RealTimeCombatArena
          friendId={friendId}
          friendState={friendState}
          config={activeCombatScenario}
          onResolveChoice={handleCombatResolve}
          onCancel={() => navigateTo("world")}
          onSelectSector={idx => startCombatSession(idx)}
        />
      )}

      {/* 3. FIRST-TIME EXPERIENCE MODAL (INTRO) */}
      {currentView === "intro" && (
        <GameMenu title="Rare Friend Spotlight" onClose={() => navigateTo("world")}>
          <div className="spotlight-modal-body intro-card">
            <div className="intro-hero-visual">
              <FriendPortrait friendId={friendId} scale={6} walking={true} />
              <div className="intro-titles">
                <h3>{friendState.characterName}</h3>
                <span className="badge-tag">Level {friendState.level} · {friendState.reputationTitle}</span>
              </div>
            </div>
            <p className="intro-core-credo">
              <strong>Fight monsters in real-time combat and guide your Friend's journey.</strong>
            </p>
            <div className="summary-metrics-grid" style={{ marginBottom: 12 }}>
              <div className="summary-metric-box">
                <span className="metric-label">CONTROLS</span>
                <span className="metric-val">WASD Move · Space Attack · Shift Dash</span>
              </div>
              <div className="summary-metric-box">
                <span className="metric-label">CHOICES</span>
                <span className="metric-val">Defeat bosses & choose their destiny</span>
              </div>
            </div>
            <div className="intro-cta-row">
              <button
                type="button"
                className="spotlight-btn primary large"
                onClick={() => startCombatSession(0)}
              >
                ⚔️ Play Battle
              </button>
              <button
                type="button"
                className="spotlight-btn secondary"
                onClick={() => navigateTo("world")}
              >
                🌲 Enter Hub
              </button>
            </div>
          </div>
        </GameMenu>
      )}

      {/* 4. ENCOUNTER SCREEN */}
      {currentView === "encounter" && currentEncounter && (
        <GameMenu
          title={`${currentEncounter.locationName} · ${currentEncounter.title}`}
          onClose={() => navigateTo("world")}
        >
          <div className="spotlight-modal-body encounter-layout">
            <div className="encounter-progress-pill">
              Stage {currentEncounterIdx + 1} of {activeSessionEncounters.length}
            </div>
            <div className="encounter-situation-box">
              <p className="encounter-desc">{currentEncounter.situation}</p>
              {currentEncounter.dialogue && (
                <blockquote className="encounter-dialogue">{currentEncounter.dialogue}</blockquote>
              )}
            </div>

            <div className="encounter-prompt-label">Choose Action:</div>
            <div className="encounter-actions-list">
              {currentEncounter.actions.map(action => (
                <button
                  key={action.id}
                  type="button"
                  className="encounter-action-card"
                  onClick={() => chooseAction(action)}
                >
                  <div className="action-card-header">
                    <span className="action-intent-pill">{action.intent}</span>
                    <span className="action-xp-tag">+{action.xpReward} XP</span>
                  </div>
                  <strong className="action-card-label">{action.label}</strong>
                  <p className="action-card-preview">{action.narrativeChoice}</p>
                </button>
              ))}
            </div>
          </div>
        </GameMenu>
      )}

      {/* 5. ENCOUNTER RESULT SCREEN */}
      {currentView === "encounter_result" && lastActionOutcome && (
        <GameMenu title="Battle Outcome" onClose={advanceEncounter}>
          <div className="spotlight-modal-body outcome-card">
            <div className="outcome-header-banner">
              <FriendPortrait friendId={friendId} scale={4} />
              <div>
                <h4>{lastActionOutcome.encounterTitle}</h4>
                <p className="outcome-narration">"{lastActionOutcome.choice.narrativeChoice}"</p>
              </div>
            </div>

            <div className="outcome-consequence-box">
              <strong>Result:</strong>
              <p>{lastActionOutcome.choice.immediateOutcome}</p>
            </div>

            <div className="outcome-behavior-deltas">
              <span className="delta-title">Stat Growth:</span>
              <div className="delta-tags">
                {lastActionOutcome.behaviorSummary.map((tag, i) => (
                  <span key={i} className="delta-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {lastActionOutcome.levelUp && (
              <div className="level-up-banner">
                ★ LEVEL UP! You reached <strong>Level {lastActionOutcome.newLevel}</strong>!
              </div>
            )}

            <div className="summary-actions-row">
              <button
                type="button"
                className="spotlight-btn primary"
                onClick={() => startCombatSession(0)}
              >
                ⚔️ Next Battle
              </button>
              <button
                type="button"
                className="spotlight-btn secondary"
                onClick={advanceEncounter}
              >
                {activeSessionEncounters.length > 0 && currentEncounterIdx + 1 < activeSessionEncounters.length
                  ? "Next Stage →"
                  : "Back to Hub"}
              </button>
            </div>
          </div>
        </GameMenu>
      )}

      {/* 5. SESSION SUMMARY SCREEN (DEVELOPMENT SUMMARY) */}
      {currentView === "session_summary" && (
        <GameMenu title="Session Complete · Character Evolution" onClose={() => navigateTo("profile")}>
          <div className="spotlight-modal-body session-summary-card">
            <div className="summary-hero">
              <FriendPortrait friendId={friendId} scale={5} />
              <div className="summary-hero-info">
                <h3>{friendState.characterName}</h3>
                <span className="reputation-badge">{friendState.reputationTitle}</span>
                <p>
                  Level: {sessionInitialLevel} → <strong>Level {friendState.level}</strong>
                </p>
              </div>
            </div>

            <div className="summary-metrics-grid">
              <div className="summary-metric-box">
                <span className="metric-label">Dominant Traits</span>
                <strong className="metric-val">
                  {friendState.dominantTraits.length ? friendState.dominantTraits.join(", ") : "Developing…"}
                </strong>
              </div>
              <div className="summary-metric-box">
                <span className="metric-label">Total Chronicle Events</span>
                <strong className="metric-val">{friendState.journal.length} entries</strong>
              </div>
            </div>

            <div className="summary-behavior-log">
              <span className="log-title">Session Behavioral Imprints:</span>
              <div className="log-tags">
                {sessionDeltas.map((delta, i) => (
                  <span key={i} className="log-delta-item">
                    {delta}
                  </span>
                ))}
              </div>
            </div>

            <div className="summary-actions-row">
              <button type="button" className="spotlight-btn primary" onClick={() => startNewSession()}>
                Play Another Session
              </button>
              <button type="button" className="spotlight-btn secondary" onClick={() => navigateTo("profile")}>
                View Full Character Profile
              </button>
              <button type="button" className="spotlight-btn secondary" onClick={() => navigateTo("world")}>
                Return to Hub
              </button>
            </div>
          </div>
        </GameMenu>
      )}

      {/* 6. FRIEND PROFILE & JOURNAL SCREEN */}
      {currentView === "profile" && (
        <GameMenu title={`Friend Dossier · ${friendState.characterName}`} onClose={() => navigateTo("world")}>
          <div className="spotlight-modal-body profile-dossier">
            {/* Header Profile */}
            <div className="dossier-top">
              <FriendPortrait friendId={friendId} scale={5} />
              <div className="dossier-info">
                <h3>{friendState.characterName}</h3>
                <span className="dossier-rep-title">{friendState.reputationTitle}</span>
                <div className="dossier-xp-bar-container">
                  <div
                    className="dossier-xp-fill"
                    style={{
                      width: `${Math.min(100, Math.round((friendState.xp / friendState.xpForNextLevel) * 100))}%`,
                    }}
                  />
                </div>
                <div className="dossier-xp-stats">
                  <span>Level {friendState.level}</span>
                  <span>
                    {friendState.xp} / {friendState.xpForNextLevel} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <nav className="dossier-nav-tabs">
              <button
                type="button"
                className="dossier-tab active"
                onClick={() => {}}
              >
                Behavior & Traits
              </button>
              <button
                type="button"
                className="dossier-tab"
                onClick={() => navigateTo("roadmap")}
              >
                Roadmap & Sectors
              </button>
              <button
                type="button"
                className="dossier-tab"
                onClick={() => navigateTo("journal")}
              >
                Journal ({friendState.journal.length})
              </button>
              <button
                type="button"
                className="dossier-tab"
                onClick={() => navigateTo("memories")}
              >
                Relationships ({Object.keys(friendState.memories).length})
              </button>
            </nav>

            {/* Trait Matrix (All 8 dimensions with progress tier) */}
            <div className="trait-matrix-grid">
              {(
                [
                  "courage",
                  "caution",
                  "loyalty",
                  "ruthlessness",
                  "compassion",
                  "cunning",
                  "cooperation",
                  "independence",
                ] as const
              ).map(dim => {
                const pts = friendState.behaviorPoints[dim] || 0;
                const tier = getTraitTier(pts);
                const tierName = getTraitTierLabel(pts);
                return (
                  <div key={dim} className="trait-metric-cell">
                    <div className="trait-cell-head">
                      <span className="trait-name">{dim.charAt(0).toUpperCase() + dim.slice(1)}</span>
                      <span className={`trait-tier-tag tier-${tier}`}>
                        T{tier} {tierName}
                      </span>
                    </div>
                    <div className="trait-bar">
                      <div
                        className={`trait-bar-fill fill-${dim}`}
                        style={{ width: `${Math.min(100, (pts / 52) * 100)}%` }}
                      />
                    </div>
                    <span className="trait-points-val">{pts} behavioral pts</span>
                  </div>
                );
              })}
            </div>

            {/* Skills & Achievements */}
            <div className="dossier-secondary-grid">
              <div className="dossier-skills-box">
                <h4>Practical Skills</h4>
                <ul>
                  {Object.entries(friendState.skills).map(([sk, lv]) => (
                    <li key={sk}>
                      <strong>{sk}:</strong> Rank {lv}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dossier-achievements-box">
                <h4>Unlocked Titles & Achievements ({friendState.achievements.length})</h4>
                {friendState.achievements.length ? (
                  <div className="achievement-badges">
                    {friendState.achievements.map((ach, i) => {
                      const isSector = ach.includes("Sector");
                      const isLegend = ach.includes("Legend") || ach.includes("Void");
                      return (
                        <span
                          key={i}
                          className={`achievement-badge ${isSector ? "sector-badge" : isLegend ? "legend-badge" : ""}`}
                        >
                          {isLegend ? "👑" : isSector ? "⚔️" : "🏆"} {ach}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="spotlight-text-secondary">Conquer sectors and make defining moral decisions to earn achievements.</p>
                )}
              </div>
            </div>

            <div className="dossier-footer-btns">
              <button type="button" className="spotlight-btn primary" onClick={() => startNewSession()}>
                Enter Adventure
              </button>
              <button type="button" className="spotlight-btn secondary" onClick={() => navigateTo("world")}>
                Return to World
              </button>
            </div>
          </div>
        </GameMenu>
      )}

      {/* 7. JOURNAL SCREEN */}
      {currentView === "journal" && (
        <GameMenu title={`Chronicle of Friend #${friendId}`} onClose={() => navigateTo("profile")}>
          <div className="spotlight-modal-body journal-view">
            <p className="journal-subtitle">
              Every entry represents a real decision made during your adventures.
            </p>
            <div className="journal-entries-list">
              {friendState.journal.map(entry => (
                <article key={entry.id} className="journal-entry-card">
                  <header className="journal-card-header">
                    <strong>
                      Day {entry.day} · {entry.title}
                    </strong>
                    <time>{new Date(entry.timestamp).toLocaleDateString()}</time>
                  </header>
                  <p className="journal-narrative">{entry.narrative}</p>
                  <p className="journal-consequence">
                    <em>Result: {entry.consequence}</em>
                  </p>
                  {entry.behaviorHighlights && (
                    <div className="journal-highlights">
                      {Object.entries(entry.behaviorHighlights).map(([k, v]) => (
                        <span key={k} className="journal-highlight-tag">
                          {v && v > 0 ? `+${v}` : v} {k}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
            <button type="button" className="spotlight-btn secondary" onClick={() => navigateTo("profile")}>
              ← Back to Profile
            </button>
          </div>
        </GameMenu>
      )}

      {/* 8. MEMORIES & RELATIONSHIPS SCREEN */}
      {currentView === "memories" && (
        <GameMenu title="Memories & Encounters" onClose={() => navigateTo("profile")}>
          <div className="spotlight-modal-body memories-view">
            <p className="memories-subtitle">
              Characters remember how your Friend treated them in past sessions.
            </p>
            {Object.keys(friendState.memories).length ? (
              <div className="memories-list">
                {Object.values(friendState.memories).map(mem => (
                  <div key={mem.characterId} className="memory-card">
                    <div className="memory-card-head">
                      <strong>{mem.characterName}</strong>
                      <span className={`memory-status status-${mem.relationshipStatus}`}>
                        {mem.relationshipStatus.toUpperCase()} ({mem.trustScore > 0 ? `+${mem.trustScore}` : mem.trustScore})
                      </span>
                    </div>
                    <p className="memory-notes">{mem.notes}</p>
                    <small className="memory-last">Last interaction: {mem.lastInteraction}</small>
                  </div>
                ))}
              </div>
            ) : (
              <p className="spotlight-text-secondary">
                No persistent NPC relationships recorded yet. Play encounters to interact with people in the world.
              </p>
            )}
            <button type="button" className="spotlight-btn secondary" onClick={() => navigateTo("profile")}>
              ← Back to Profile
            </button>
          </div>
        </GameMenu>
      )}

      {/* 9. SETTINGS & INFO SCREEN */}
      {currentView === "settings" && (
        <GameMenu title="Settings & Architecture" onClose={() => navigateTo("world")}>
          <div className="spotlight-modal-body settings-card">
            <div className="settings-row">
              <label>Audio & Sound Effects:</label>
              <button
                type="button"
                className="spotlight-btn secondary"
                onClick={() => {
                  const next = !muted;
                  setMuted(next);
                  sound.current?.setMuted(next);
                  if (!next) void sound.current?.unlock();
                }}
              >
                {muted ? "🔇 Sound Off (Click to Enable)" : "🔊 Sound Enabled"}
              </button>
            </div>
            <div className="settings-row">
              <label>Motion Effects:</label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={e => setReducedMotion(e.target.checked)}
                />
                Reduce Motion
              </label>
            </div>
            <div className="settings-row">
              <label>Friend Storage Key:</label>
              <code>rf_spotlight_v1_friend_{friendId.toString()}</code>
            </div>
            <div className="settings-notice">
              <strong>Rare Friends Vibe-a-thon · Character Spotlight</strong>
              <p>
                Connected Wallet & Friend selection provided by FriendSDK v0.1.2. Personality, Journal, and Memory
                progression are persisted safely per-Friend ID.
              </p>
            </div>
            <button type="button" className="spotlight-btn primary" onClick={() => navigateTo("world")}>
              Done
            </button>
          </div>
        </GameMenu>
      )}

      {/* 10. CAMPAIGN & ECOSYSTEM ROADMAP SCREEN */}
      {currentView === "roadmap" && (
        <RoadmapModal
          friendState={friendState}
          onClose={() => navigateTo("world")}
          onLaunchSector={sectorIdx => startCombatSession(sectorIdx)}
        />
      )}
    </section>
  );
}
