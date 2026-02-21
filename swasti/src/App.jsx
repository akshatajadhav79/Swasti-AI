import React from "react";
import "./index.css";
import Ans from "../src/components/Ans";
import { Link, Routes, Route } from "react-router-dom";
import { PreviewChat } from "./components/PreviewChat";

function App() {
  return (
    <div className="h-screen flex bg-gray-100 ">
      <div className="w-64 bg-gray-900 text-white flex flex-col sidebar-glow">
        <div className="p-4 text-xl font-semibold border-b border-gray-700">
          Swasti
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link to="/" className="block p-2 bg-gray-800 rounded hover:shadow-lg hover:shadow-indigo-500/40 transition">
            New Chat
          </Link>

          <Link to="/previewChat" className="block p-2 bg-gray-800 rounded hover:shadow-lg hover:shadow-indigo-500/40 transition">
            Preview Chat
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col glow-container">
        <div className="h-14 bg-white border-b flex items-center px-6 shadow-sm">
          <h1 className="text-lg font-semibold text-indigo-400">Swasti AI</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <Routes>
            <Route path="/" element={<Ans />} />
            <Route path="/previewChat" element={<PreviewChat/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
