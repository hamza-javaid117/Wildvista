import React from "react";
import LandingPage from "./pages/LandingPage";
import Destinations from "./pages/Destination";
import PackageDetails from "./pages/PackageDetails";
import { Routes, Route } from "react-router-dom";
import TourDetails from "./pages/PackageDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/tour/:slug" element={<TourDetails />} />
      </Routes>

      
    </div>
  );
}

export default App;