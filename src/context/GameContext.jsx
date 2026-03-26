import React, { createContext, useContext, useState, useEffect } from "react";

export const GameContext = createContext();

const XP_MAP = { Easy: 10, Medium: 25, Hard: 50 };

const ALL_BADGES = [
  { id: 1, name: "First Blood",   emoji: "🩸", desc: "Solve your first problem",  xpNeeded: 10  },
  { id: 2, name: "Grinder",       emoji: "💪", desc: "Reach 100 XP",              xpNeeded: 100 },
  { id: 3, name: "Code Warrior",  emoji: "⚔️", desc: "Reach 250 XP",              xpNeeded: 250 },
  { id: 4, name: "Algorithm God", emoji: "🧠", desc: "Reach 500 XP",              xpNeeded: 500 },
];

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date.toDateString();
}

export function GameProvider({ children }) {
  const [loaded, setLoaded]         = useState(false);
  const [username, setUsername]     = useState("");
  const [xp, setXp]                 = useState(0);
  const [level, setLevel]           = useState(1);
  const [streak, setStreak]         = useState(0);
  const [problems, setProblems]     = useState([]);
  const [lastSolved, setLastSolved] = useState(null);
  const [weeklyGoal, setWeeklyGoal] = useState(10); // default goal = 10

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("devBattleState");
    if (saved) {
      const s = JSON.parse(saved);
      setUsername(s.username ?? "");
      setXp(s.xp ?? 0);
      setLevel(s.level ?? 1);
      setStreak(s.streak ?? 0);
      setProblems(s.problems ?? []);
      setLastSolved(s.lastSolved ?? null);
      setWeeklyGoal(s.weeklyGoal ?? 10);
    }
    setLoaded(true);
  }, []);

  // SAVE
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("devBattleState", JSON.stringify({
      username, xp, level, streak, problems, lastSolved, weeklyGoal
    }));
  }, [loaded, username, xp, level, streak, problems, lastSolved, weeklyGoal]);

  function addProblem(problem) {
    const earned = XP_MAP[problem.difficulty] || 10;
    const newXp = xp + earned;
    setXp(newXp);
    setLevel(Math.floor(newXp / 100) + 1);
    setProblems(prev => [{ ...problem, id: Date.now(), xpEarned: earned }, ...prev]);

    const today     = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastSolved === today) {
      // already solved today
    } else if (lastSolved === yesterday) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(1);
    }
    setLastSolved(today);
  }

  // count problems solved this week
  const thisMonday = getMonday(new Date());
  const weeklyCount = problems.filter(p => {
    const solvedMonday = getMonday(new Date(p.id)); // p.id is Date.now()
    return solvedMonday === thisMonday;
  }).length;

  const unlockedBadges   = ALL_BADGES.filter(b => xp >= b.xpNeeded);
  const xpInCurrentLevel = xp % 100;
  const xpToNextLevel    = 100 - xpInCurrentLevel;

  return (
    <GameContext.Provider value={{
      username, setUsername,
      xp, level, streak,
      problems, addProblem,
      unlockedBadges,
      xpInCurrentLevel,
      xpToNextLevel,
      weeklyGoal, setWeeklyGoal,
      weeklyCount,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}