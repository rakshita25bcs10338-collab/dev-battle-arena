function BadgeCard({ badge, currentXP }) {
  const isUnlocked = currentXP >= badge.xpNeeded;

  return (
    <div className={`p-5 rounded-2xl border text-center transition-all ${
      isUnlocked ? 'bg-gray-800/60 border-purple-500/50 opacity-100' : 'bg-gray-900/50 border-gray-800 opacity-30 grayscale'
    }`}>
      <div className="text-4xl mb-2">{badge.emoji}</div>
      <p className="text-xs font-black uppercase tracking-tighter text-gray-200">{badge.name}</p>
      <p className="text-[9px] text-gray-500 mt-1">{badge.desc}</p>
      <div className="mt-3 text-[10px] font-bold">
        {isUnlocked ? "✅ UNLOCKED" : `🔒 ${badge.xpNeeded} XP`}
      </div>
    </div>
  );
}
export default BadgeCard;