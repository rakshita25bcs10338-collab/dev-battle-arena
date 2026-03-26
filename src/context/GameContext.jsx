import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

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
  const [xp, setXp]                 = useState(0);
  const [level, setLevel]           = useState(1);
  const [problems, setProblems]     = useState([]);
  const [weeklyGoal, setWeeklyGoal] = useState(5); 

  useEffect(() => {
    const saved = localStorage.getItem("devBattleState");
    if (saved) {
      const s = JSON.parse(saved);
      setXp(s.xp || 0);
      setLevel(s.level || 1);
      setProblems(s.problems || []);
      setWeeklyGoal(s.weeklyGoal || 5);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("devBattleState", JSON.stringify({ xp, level, problems, weeklyGoal }));
  }, [loaded, xp, level, problems, weeklyGoal]);

  function addProblem(problem) {
    const earned = XP_MAP[problem.difficulty] || 10;
    const newXp = xp + earned;
    setXp(newXp);
    setLevel(Math.floor(newXp / 100) + 1);
    setProblems(prev => [{ ...problem, id: Date.now(), bookmarked: false }, ...prev]);
  }

  function deleteProblem(id) {
    setProblems(prev => prev.filter(p => p.id !== id));
    toast.error("Battle record erased!", { theme: "dark" });
  }

  function toggleBookmark(id) {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p));
  }

  const weeklyCount = problems.filter(p => getMonday(new Date(p.id)) === getMonday(new Date())).length;

  return (
    <GameContext.Provider value={{
      xp, level, problems, addProblem, deleteProblem, toggleBookmark,
      badges: ALL_BADGES,
      weeklyGoal, setWeeklyGoal, // Exported for editing
      weeklyCount
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);