import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css";
import AnalyticalMaterials from "./pages/AnalyticalMaterials";
import LeaderInterviews from "./pages/LeaderInterviews";
import WarHistory from "./pages/WarHistory";
import WorldAboutUkraine from "./pages/WorldAboutUkraine";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
