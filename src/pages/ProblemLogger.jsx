import { useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

function ProblemLogger() {
  const { addProblem } = useGame();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    topic: "",
    platform: "LeetCode",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    if (!form.title.trim() || !form.topic.trim()) {
      alert("Please fill in problem title and topic!");
      return;
    }
    addProblem(form);
    setSubmitted(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-purple-400">Problem Logged!</h2>
        <p className="text-gray-400">XP added! Redirecting to dashboard...</p>
      </div>
    );
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
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
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
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
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
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
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
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
        >
          ⚔️ Submit & Earn XP
        </button>

      </div>
    </div>
  );
}

export default ProblemLogger;