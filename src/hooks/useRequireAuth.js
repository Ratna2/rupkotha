import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useRequireAuth() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const requireAuth = (callback) => {
    if (!user) {
      window.dispatchEvent(new Event("showLoginModal"));
      return;
    }
    callback();
  };

  return requireAuth;
}