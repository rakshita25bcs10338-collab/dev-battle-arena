import { useState } from "react";
import { useGame } from "../context/GameContext";
import XPBar from "../components/XPBar";
import BadgeCard from "../components/BadgeCard";

const ALL_BADGES = [
  { id: 1, name: "First Blood",   emoji: "🩸", desc: "Solve your first problem",  xpNeeded: 10  },
  { id: 2, name: "Grinder",       emoji: "💪", desc: "Reach 100 XP",              xpNeeded: 100 },
  { id: 3, name: "Code Warrior",  emoji: "⚔️", desc: "Reach 250 XP",              xpNeeded: 250 },
  { id: 4, name: "Algorithm God", emoji: "🧠", desc: "Reach 500 XP",              xpNeeded: 500 },
];

function Dashboard() {
  const { 
    username, setUsername, 
    xp, level, streak, 
    problems, unlockedBadges, 
    xpInCurrentLevel, xpToNextLevel,
    weeklyGoal, setWeeklyGoal, weeklyCount
  } = useGame();
  
  const [nameInput, setNameInput] = useState("");

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <div className="text-5xl">⚔️</div>
        <h1 className="text-3xl font-bold text-purple-400">Welcome to Dev Battle Arena!</h1>
        <p className="text-gray-400">Enter your name to begin your journey</p>
        <input
          type="text"
          placeholder="Your name..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white w-64 focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={() => { if (nameInput.trim()) setUsername(nameInput.trim()); }}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition"
        >
          Start My Journey 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, <span className="text-purple-400">{username}</span>! 👋</h1>
        <p className="text-gray-400 mt-1">Keep grinding. Every problem makes you stronger.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
          <div className="text-4xl font-bold text-purple-400">{level}</div>
          <div className="text-gray-400 text-sm mt-1">Current Level</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
          <div className="text-4xl font-bold text-yellow-400">{xp}</div>
          <div className="text-gray-400 text-sm mt-1">Total XP</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
          <div className="text-4xl font-bold text-orange-400">{streak} 🔥</div>
          <div className="text-gray-400 text-sm mt-1">Day Streak</div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span>Level {level}</span>
          <span>{xpToNextLevel} XP to Level {level + 1}</span>
        </div>
        <XPBar xpInCurrentLevel={xpInCurrentLevel} />
      </div>

      {/* Badges */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <h2 className="text-lg font-bold mb-4">🏆 Badges</h2>
        <div className="grid grid-cols-4 gap-4">
          {ALL_BADGES.map(badge => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              unlocked={unlockedBadges.some(b => b.id === badge.id)}
            />
          ))}
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">🎯 Weekly Goal</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Target:</span>
            <input
              type="number"
              min="1"
              max="100"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(Number(e.target.value))}
              className="w-16 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
            />
            <span className="text-sm text-gray-400">problems</span>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span>{weeklyCount} solved this week</span>
          <span>{Math.max(weeklyGoal - weeklyCount, 0)} remaining</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="h-4 rounded-full transition-all duration-500 bg-green-500"
            style={{ width: `${Math.min((weeklyCount / weeklyGoal) * 100, 100)}%` }}
          ></div>
        </div>

        {weeklyCount >= weeklyGoal && (
          <div className="mt-3 text-center text-green-400 font-bold text-sm">
            🎉 Weekly goal crushed! You're a beast!!
          </div>
        )}
      </div>

      {/* Recent Problems */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-lg font-bold mb-4">📋 Recent Problems</h2>
        {problems.length === 0 ? (
          <p className="text-gray-500 text-sm">No problems logged yet. Go grind! 💪</p>
        ) : (
          <div className="flex flex-col gap-3">
            {problems.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-gray-400">{p.platform} • {p.topic}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    p.difficulty === "Easy" ? "bg-green-900 text-green-400" :
                    p.difficulty === "Medium" ? "bg-yellow-900 text-yellow-400" :
                    "bg-red-900 text-red-400"
                  }`}>{p.difficulty}</span>
                  <span className="text-purple-400 text-sm font-bold">+{p.xpEarned} XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;