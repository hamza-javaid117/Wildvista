import React from "react";
import LandingPage from "./pages/LandingPage";
import Destinations from "./pages/Destination";
import TourDetails from "./pages/TourDetails";
import BookForm from "./pages/BookForm";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/tour/:slug" element={<TourDetails />} />
        <Route path="/PackageDetails/:slug" element={<TourDetails />} />
        <Route path="/BookForm" element={<BookForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Login" element={<Navigate to="/login" replace />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;