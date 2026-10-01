/**
 * Persistence layer for Rare Friend Spotlight
 * Strict association: keyed by friendId and scoped safely.
 * Never merges or cross-contaminates friend states across wallets or tokens.
 */

import { FriendPersistentState } from "./types.js";
import { createInitialFriendState, updateFriendReputation } from "./progression.js";

const STORAGE_PREFIX = "rf_spotlight_v1_friend_";

export function getFriendStorageKey(friendId: bigint | string): string {
  return `${STORAGE_PREFIX}${friendId.toString()}`;
}

export function loadFriendState(
  friendId: bigint,
  walletAddress = "0x0000000000000000000000000000000000000000"
): FriendPersistentState {
  const key = getFriendStorageKey(friendId);
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as FriendPersistentState;
      // Sanity checks on parsed state
      if (parsed.friendId === friendId.toString()) {
        // Ensure walletAddress is up-to-date
        parsed.walletAddress = walletAddress;
        updateFriendReputation(parsed);
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read persistent friend state from localStorage:", e);
  }

  // If no saved state, create brand new initial state
  const fresh = createInitialFriendState(friendId, walletAddress);
  saveFriendState(fresh);
  return fresh;
}

export function saveFriendState(state: FriendPersistentState): boolean {
  if (!state || !state.friendId) return false;
  const key = getFriendStorageKey(state.friendId);
  try {
    localStorage.setItem(key, JSON.stringify(state));
    return true;
  } catch (e) {
    console.error("Could not write persistent friend state to localStorage:", e);
    return false;
  }
}

export function exportFriendHistoryJson(state: FriendPersistentState): string {
  return JSON.stringify(state, null, 2);
}
