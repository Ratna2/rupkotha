import { useEffect, useState } from "react";
import "../../assets/styles/loginReminder.css";

const LoginReminder = ({ user, onLoginClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 480000); // 8 mins

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!visible || user) return null;

  return (
    <div className="login-reminder">
      <button
        className="reminder-close"
        onClick={() => setVisible(false)}
      >
        ×
      </button>

      <h4>Please Login</h4>
      <p>
        Login to access wishlist, cart, reviews &
        exclusive offers.
      </p>

      <button
        className="reminder-login-btn"
        onClick={() => {
          setVisible(false);
          onLoginClick();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginReminder;