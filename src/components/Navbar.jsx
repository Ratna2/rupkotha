import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

import "../assets/styles/navbar.css";

const Navbar = () => {
  const { cart, wishlist, setIsCartOpen } = useShop();
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  /* 🔥 NEW LOGIC (transparent only on home top) */
  const isHome = location.pathname === "/";
  const navbarClass =
    isHome && !isScrolled
      ? "navbar"
      : "navbar scrolled";

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
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FiUser size={22} />
              </div>

              {profileOpen && (
                <div className="profile-dropdown">
                  <h3>{user?.displayName || "User"}</h3>
                  <p>{user?.email}</p>

                  <div onClick={() => navigate("/account/profile")}>Personal Information</div>
                  <div onClick={() => navigate("/account/orders")}>My Orders</div>
                  <div onClick={() => navigate("/account/history")}>My Order History</div>
                  <div onClick={() => navigate("/account/address")}>My Address</div>
                  <div onClick={() => navigate("/wishlist")}>My Wishlist</div>

                  <div className="logout" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
            </div>

            {/* WISHLIST */}
            <div className="icon-wrapper" onClick={() => navigate("/wishlist")}>
              <FiHeart size={22} />
              {wishlistCount > 0 && (
                <span className="icon-badge">{wishlistCount}</span>
              )}
            </div>

            {/* CART */}
            <div className="icon-wrapper" onClick={() => setIsCartOpen(true)}>
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
    </>
  );
};

export default Navbar;