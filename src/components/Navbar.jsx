import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/auth/AuthModal";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // ⚠️ make sure path is correct

import "../assets/styles/navbar.css";

const Navbar = () => {
  const { cart, wishlist, setIsCartOpen } = useShop();
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [username, setUsername] = useState(""); // ✅ NEW STATE

  const profileRef = useRef(null);

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const wishlistCount = wishlist.length;

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Fetch Username From Firestore ---------------- */
  useEffect(() => {
    const fetchUsername = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUsername(docSnap.data().username || "");
          } else {
            setUsername("");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      } else {
        setUsername("");
      }
    };

    fetchUsername();
  }, [user]);

  /* ---------------- Click Outside Profile ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Auto Login Reminder (8 mins) ---------------- */
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setAuthModalOpen(true);
      }, 480000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  /* ---------------- Lock Body Scroll When Modal Open ---------------- */
  useEffect(() => {
    if (authModalOpen) {
      document.body.style.overflow = "hidden";
      setProfileOpen(false);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [authModalOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleWishlistClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      navigate("/wishlist");
    }
  };

  const handleCartClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      setIsCartOpen(true);
    }
  };

  /* ---------------- FINAL Display Name Logic ---------------- */
  let displayName = "";

  if (username) {
    displayName = username; // Email signup username
  } else if (user?.displayName) {
    displayName = user.displayName.split(" ")[0]; // Google login first name
  } else if (user?.email) {
    displayName = user.email; // fallback
  }

  const isHome = location.pathname === "/";
  const navbarClass =
    isHome && !isScrolled ? "navbar" : "navbar scrolled";

  return (
    <>
      <nav className={navbarClass}>
        <div className="navbar-inner">

          <Link to="/" className="logo">Rupkotha</Link>

          {/* DESKTOP LINKS */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${
                  location.pathname === link.path ? "active" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="right-icons">

            {/* PROFILE */}
            <div className="profile-wrapper" ref={profileRef}>
              <div
                className="icon-wrapper"
                onClick={() => {
                  if (!user) {
                    setAuthModalOpen(true);
                  } else {
                    setProfileOpen(!profileOpen);
                  }
                }}
              >
                <FiUser size={22} />
              </div>

              {profileOpen && user && (
                <div className="profile-dropdown">
                  <h3>{displayName}</h3>

                  <div onClick={() => navigate("/account/profile")}>
                    Personal Information
                  </div>
                  <div onClick={() => navigate("/account/orders")}>
                    My Orders
                  </div>
                  <div onClick={() => navigate("/account/history")}>
                    My Order History
                  </div>
                  <div onClick={() => navigate("/account/address")}>
                    My Address
                  </div>
                  <div onClick={() => navigate("/wishlist")}>
                    My Wishlist
                  </div>

                  <div className="logout" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
            </div>

            {/* WISHLIST */}
            <div className="icon-wrapper" onClick={handleWishlistClick}>
              <FiHeart size={22} />
              {wishlistCount > 0 && (
                <span className="icon-badge">{wishlistCount}</span>
              )}
            </div>

            {/* CART */}
            <div className="icon-wrapper" onClick={handleCartClick}>
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="icon-badge">{cartCount}</span>
              )}
            </div>

            {/* MOBILE MENU */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="mobile-dropdown"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;