function BadgeCard({ badge, unlocked }) {
  return (
    <div className={`p-4 rounded-xl border text-center ${unlocked ? "border-purple-500 bg-purple-950" : "border-gray-700 bg-gray-900 opacity-40"}`}>
      <div className="text-3xl mb-2">{badge.emoji}</div>
      <div className="font-bold text-sm">{badge.name}</div>
      <div className="text-xs text-gray-400 mt-1">{badge.desc}</div>
      {!unlocked && <div className="text-xs text-gray-600 mt-2">🔒 Locked</div>}
    </div>
  );
}

export default BadgeCard;