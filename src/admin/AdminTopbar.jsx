import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminTopbar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  return (
    <header className="admin-topbar">

      <input
        className="admin-search"
        placeholder="Search products, orders..."
      />

      <div className="admin-profile">

        Admin

        {/* LOGOUT BUTTON */}
        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default AdminTopbar;