import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClipboardPage from "./pages/ClipboardPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:clipId" element={<ClipboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
