import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css";
import AnalyticalMaterials from "./pages/AnalyticalMaterials";
import LeaderInterviews from "./pages/LeaderInterviews";
import WarHistory from "./pages/WarHistory";
import WorldAboutUkraine from "./pages/WorldAboutUkraine";
import AdminAuth from "./pages/AdminAuth";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/analytics" element={<AnalyticalMaterials />} />
          <Route path="/leaders" element={<LeaderInterviews />} />
          <Route path="/stories" element={<WarHistory />} />
          <Route path="/world" element={<WorldAboutUkraine />} />
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
