import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
