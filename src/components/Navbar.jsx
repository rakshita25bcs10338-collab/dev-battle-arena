import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      <div className="text-xl font-bold text-purple-400">⚔️ Dev Battle Arena</div>
      <div className="flex gap-6">
        <Link
          to="/dashboard"
          className={`text-sm font-medium ${pathname === "/dashboard" ? "text-purple-400" : "text-gray-400 hover:text-white"}`}
        >
          🏠 Dashboard
        </Link>
        <Link
          to="/problems"
          className={`text-sm font-medium ${pathname === "/problems" ? "text-purple-400" : "text-gray-400 hover:text-white"}`}
        >
          📝 Log Problem
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;