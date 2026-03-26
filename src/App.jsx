import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { ToastContainer } from "react-toastify"; // Added this
import "react-toastify/dist/ReactToastify.css"; // Added this
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProblemLogger from "./pages/ProblemLogger";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Navbar />
        {/* We place the container here so it's available on all pages */}
        <ToastContainer position="top-right" autoClose={3000} theme="dark" /> 
        
        <div className="min-h-screen bg-gray-950 text-white pt-16">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/problems" element={<ProblemLogger />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;