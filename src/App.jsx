import React from "react";
import LandingPage from "./pages/LandingPage";
import Destinations from "./pages/Destination";
import TourDetails from "./pages/TourDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/tour/:slug" element={<TourDetails />} />
        <Route path="/PackageDetails/:slug" element={<TourDetails />} />
      </Routes>
    </div>
  );
}

export default App;