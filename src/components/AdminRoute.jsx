import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

  const { user, loading, isAdmin } = useAuth();

  if (loading) return null;

  if (!user || !isAdmin) 
    return <Navigate to="/admin-login" replace />;
  

  return children;
}

export default AdminRoute;