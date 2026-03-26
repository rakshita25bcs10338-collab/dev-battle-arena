import { useState } from "react";
import { useGame } from "../context/GameContext";
import XPBar from "../components/XPBar";
import BadgeCard from "../components/BadgeCard";

function Dashboard() {
  const { xp, level, problems, badges, deleteProblem, toggleBookmark, weeklyGoal, setWeeklyGoal, weeklyCount } = useGame();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterDifficulty === "All" || p.difficulty === filterDifficulty;
    return matchesSearch && matchesFilter;
  });

  const handleEditGoal = () => {
    const newGoal = prompt("Target problems to solve this week:", weeklyGoal);
    if (newGoal && !isNaN(newGoal)) {
      setWeeklyGoal(Number(newGoal));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8 text-gray-200">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 uppercase italic">
          Warrior Dashboard
        </h1>
        <XPBar xp={xp} level={level} />
      </header>

      {/* Weekly Goal Progress Card */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Weekly Conquest</p>
              <button onClick={handleEditGoal} className="text-[10px] text-purple-500 hover:underline">Edit Goal</button>
            </div>
            <h2 className="text-xl font-bold">Goal Progress</h2>
          </div>
          <div className="text-right">
             <span className="text-2xl font-black text-purple-400">{weeklyCount}</span>
             <span className="text-gray-600 font-bold"> / {weeklyGoal}</span>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-1000 shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
            style={{ width: `${Math.min((weeklyCount/weeklyGoal)*100, 100)}%` }} 
          />
        </div>
        {weeklyCount >= weeklyGoal && (
          <p className="text-center text-[10px] text-green-400 font-bold mt-2 uppercase tracking-tighter animate-bounce">
            🔥 Legendary! Weekly goal accomplished!
          </p>
        )}
      </div>

      {/* Search & Difficulty Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          className="flex-1 bg-gray-900 border border-gray-800 p-4 rounded-xl focus:border-purple-500 outline-none transition-all shadow-inner" 
          placeholder="Search through your battle history..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="bg-gray-900 border border-gray-800 p-4 rounded-xl outline-none cursor-pointer hover:bg-gray-800 transition"
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Problems List */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {filteredProblems.length > 0 ? (
           filteredProblems.map(p => (
            <div key={p.id} className="p-5 border-b border-gray-800 flex justify-between items-center group hover:bg-gray-800/40 transition-colors">
              <div className="flex items-center gap-5">
                <button onClick={() => toggleBookmark(p.id)} className={`text-xl transition-transform hover:scale-125 ${p.bookmarked ? "text-yellow-400" : "text-gray-700"}`}>
                  {p.bookmarked ? '★' : '☆'}
                </button>
                <div>
                  <p className="font-bold text-gray-100">{p.title}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-medium">{p.topic} • {p.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                  p.difficulty === 'Easy' ? 'bg-green-950 text-green-400' :
                  p.difficulty === 'Medium' ? 'bg-yellow-950 text-yellow-400' :
                  'bg-red-950 text-red-400'
                }`}>
                  {p.difficulty}
                </span>
                <button onClick={() => deleteProblem(p.id)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 transition-all">
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-600 italic">No records found in the arena.</div>
        )}
      </div>

      {/* Badges Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tighter text-gray-400 px-1">Unlocked Artifacts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(b => <BadgeCard key={b.id} badge={b} currentXP={xp} />)}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;