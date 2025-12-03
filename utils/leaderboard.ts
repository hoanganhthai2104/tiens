import { LeaderboardEntry } from '../types';

const LEADERBOARD_KEY = 'tiensCalciumQuizLeaderboard';

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    if (!data) return [];
    const entries: LeaderboardEntry[] = JSON.parse(data);
    // Sort by score descending, then by timestamp descending (newest first)
    return entries.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return b.timestamp - a.timestamp;
    });
  } catch (error) {
    console.error("Failed to retrieve leaderboard data:", error);
    return [];
  }
};

export const saveToLeaderboard = (name: string, score: number): void => {
  if (!name.trim()) return;
  const newEntry: LeaderboardEntry = { name: name.trim(), score, timestamp: Date.now() };
  const leaderboard = getLeaderboard();
  leaderboard.push(newEntry);
  
  const sorted = leaderboard.sort((a, b) => {
      if (b.score !== a.score) {
          return b.score - a.score;
      }
      return b.timestamp - a.timestamp;
  });

  // Keep only top 10 scores
  const top10 = sorted.slice(0, 10);

  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
  } catch (error) {
    console.error("Failed to save to leaderboard:", error);
  }
};
