import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Higher-order component to protect routes that require authentication.
 * Redirects to /login if the user is not authenticated.
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to. This allows us to send them back to that page after they login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * Component to handle public routes that should NOT be accessible if the user is logged in.
 * For example: /login, /register.
 */
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
