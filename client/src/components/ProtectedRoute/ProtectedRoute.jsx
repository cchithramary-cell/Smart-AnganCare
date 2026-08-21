import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // =====================================================
  // USER NOT LOGGED IN
  // =====================================================

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // =====================================================
  // ADMIN ROUTES
  // =====================================================

  if (location.pathname.startsWith("/admin")) {
    if (user.role !== "admin") {
      if (user.role === "manager") {
        return <Navigate to="/manager/dashboard" replace />;
      }

      if (user.role === "parent") {
        return <Navigate to="/parent/dashboard" replace />;
      }

      return <Navigate to="/" replace />;
    }
  }

  // =====================================================
  // MANAGER ROUTES
  // =====================================================

  if (location.pathname.startsWith("/manager")) {
    if (user.role !== "manager") {
      if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      }

      if (user.role === "parent") {
        return <Navigate to="/parent/dashboard" replace />;
      }

      return <Navigate to="/" replace />;
    }
  }

  // =====================================================
  // PARENT ROUTES
  // =====================================================

  if (location.pathname.startsWith("/parent")) {
    if (user.role !== "parent") {
      if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      }

      if (user.role === "manager") {
        return <Navigate to="/manager/dashboard" replace />;
      }

      return <Navigate to="/" replace />;
    }
  }

  // =====================================================
  // AUTHORIZED USER
  // =====================================================

  return children;
}

export default ProtectedRoute;
