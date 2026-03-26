import { useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProblemLogger() {
  const { addProblem } = useGame();
  const navigate = useNavigate();

  // Unified state for all form fields
  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    topic: "",
    platform: "LeetCode",
    notes: "",
  });

  // Handles input changes for all fields using the 'name' attribute
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    // 1. Validation Logic
    if (!form.title.trim()) {
      toast.error("⚔️ Guardian! Enter a problem title!", { theme: "dark" });
      return;
    }
    if (!form.topic.trim()) {
      toast.warn("📜 Topic is required to log the scroll!", { theme: "dark" });
      return;
    }

    // 2. Add to Global Context (Game State)
    addProblem(form);
    
    // 3. Success Notification
    toast.success(`🔥 ${form.title} Defeated! XP Added.`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });

    // 4. Programmatic Routing to Dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">📝 Log a Problem</h1>
      <p className="text-gray-400 mb-8">Solved something? Log it and earn XP!</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-5">

        {/* Problem Title */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Problem Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Two Sum"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Topic */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Topic *</label>
          <input
            name="topic"
            value={form.topic}
            onChange={handleChange}
            placeholder="e.g. Arrays, Binary Trees, DP"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="Easy">🟢 Easy (+10 XP)</option>
            <option value="Medium">🟡 Medium (+25 XP)</option>
            <option value="Hard">🔴 Hard (+50 XP)</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Platform</label>
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option>LeetCode</option>
            <option>HackerRank</option>
            <option>CodeChef</option>
            <option>Codeforces</option>
            <option>Other</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="What did you learn? Any tricks?"
            rows={3}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 resize-none transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-purple-900/20"
        >
          ⚔️ Submit & Earn XP
        </button>

      </div>
    </div>
  );
}

export default ProblemLogger;