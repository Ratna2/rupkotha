import { useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/miniCart.css";

function MiniCartPopup() {
  const { isCartOpen, setIsCartOpen, lastAdded, cart } = useShop();
  const navigate = useNavigate();

  // ✅ Auto close after 5 sec
  useEffect(() => {
    if (isCartOpen) {
      const timer = setTimeout(() => {
        setIsCartOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  if (!isCartOpen || !lastAdded) return null;

  return (
    <div className="mini-cart-wrapper">
      <div className="mini-cart">

        <div className="mini-header">
          <span>✓ Item added to your cart</span>
          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div className="mini-product">
          {/* ✅ IMAGE FIX (Firebase + Cloudinary) */}
          <img
            src={
              lastAdded.image1 ||
              lastAdded.images?.[0] ||
              lastAdded.image
            }
            alt=""
          />
          <div>
            <h4>{lastAdded.name}</h4>
            <p>₹{lastAdded.price}</p>
          </div>
        </div>

        <button
          className="view-cart-btn"
          onClick={() => {
            setIsCartOpen(false);
            navigate("/cart");
          }}
        >
          View Cart ({cart.length})
        </button>

        {/* ✅ FIXED CHECKOUT BUTTON */}
        <button
          className="checkout-btn"
          onClick={() => {
            setIsCartOpen(false);
            navigate("/checkout");
          }}
        >
          Checkout Securely
        </button>

      </div>
    </div>
  );
}

export default MiniCartPopup;