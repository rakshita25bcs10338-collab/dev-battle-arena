function XPBar({ xpInCurrentLevel }) {
  return (
    <div className="w-full bg-gray-700 rounded-full h-4">
      <div
        className="bg-purple-500 h-4 rounded-full transition-all duration-500"
        style={{ width: `${xpInCurrentLevel}%` }}
      ></div>
    </div>
  );
}

export default XPBar;