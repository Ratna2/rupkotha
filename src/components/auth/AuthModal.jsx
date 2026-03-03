import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../../auth/pages/Login";
import Signup from "../../auth/pages/Signup";
import "../../assets/styles/authModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login");
  const leftRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMode("login");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // 3D Mouse Parallax Effect
  const handleMouseMove = (e) => {
    const el = leftRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    el.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const resetTilt = () => {
    if (leftRef.current) {
      leftRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="auth-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="auth-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            ×
          </button>

          {/* LEFT SIDE PREMIUM PANEL */}
          <div
            className="auth-left"
            ref={leftRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
          >
            <div className="gold-overlay"></div>

            {/* Big Half Visible Background Logo */}
            <img
              src="/src/assets/images/logo-gold.png"
              alt="Background Logo"
              className="bg-logo"
            />

            <div className="brand-wrapper">
              <img
                src="/src/assets/images/logo-gold.png"
                alt="Rupkotha Logo"
                className="brand-logo"
              />

              <h2 className="brand-title">Rupkotha</h2>
              <p className="brand-tagline">
                Premium Jewellery Experience
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="auth-right">
            {mode === "login" ? (
              <>
                <Login isModal={true} onClose={onClose} />
                <div className="auth-switch">
                  Don’t have an account?
                  <span onClick={() => setMode("signup")}>
                    Sign Up
                  </span>
                </div>
              </>
            ) : (
              <>
                <Signup isModal={true} onClose={onClose} />
                <div className="auth-switch">
                  Already have an account?
                  <span onClick={() => setMode("login")}>
                    Login
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;