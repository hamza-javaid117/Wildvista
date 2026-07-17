import React from "react";
import LandingPage from "./pages/LandingPage";
import Destinations from "./pages/Destination";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
    </div>
  );
}

export default App;