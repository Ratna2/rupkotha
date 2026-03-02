import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "../admin/services/productService";
import "../assets/styles/cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    addToCart,
    addToWishlist
  } = useShop();

  const navigate = useNavigate();

  const [confirmItem, setConfirmItem] = useState(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const [recommendedProducts, setRecommendedProducts] =
    useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setRecommendedProducts(data.slice(0, 6));
    });
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = giftWrap ? subtotal + 50 : subtotal;

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      setConfirmItem(item);
    } else {
      addToCart({ ...item, quantity: -1 });
    }
  };

  /* ================= EMPTY CART ================= */

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-icon">🛍️</div>
        <h2>Your cart is empty</h2>
        <p>Let’s fill it up with amazing items</p>
        <button
          className="explore-btn"
          onClick={() => navigate("/shop")}
        >
          Explore More
        </button>
      </div>
    );
  }

  /* ================= MAIN CART ================= */

  return (
    <motion.section
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cart-wrapper">

        {/* LEFT SIDE */}
        <div className="cart-left">

          <h2 className="cart-heading">Shopping Cart</h2>

          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="cart-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="cart-img">
                <img
                  src={
                    item.image1 ||
                    item.images?.[0] ||
                    item.image
                  }
                  alt={item.name}
                />
              </div>

              <div className="cart-details">

                <div className="cart-top">
                  <h3>{item.name}</h3>
                  <FiX
                    className="remove-icon"
                    onClick={() => setConfirmItem(item)}
                  />
                </div>

                <div className="cart-price">
                  ₹{item.price}
                </div>

                <p className="delivery-text">
                  Free Delivery • 15 Days Easy Returns
                </p>

                <div className="qty-wrapper">
                  <button onClick={() => handleDecrease(item)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      addToCart({ ...item, quantity: 1 })
                    }
                  >
                    +
                  </button>
                </div>

                {/* ⭐ FIXED (wishlist ID system safe) */}
                <button
                  className="move-btn"
                  onClick={() => {
                    addToWishlist(item);
                    removeFromCart(item.id);
                  }}
                >
                  Move to wishlist
                </button>

              </div>
            </motion.div>
          ))}

          {/* 🎁 GIFT WRAP */}
          <div className="gift-wrap-box">
            <h3>🎁 Make It Special</h3>

            <label className="gift-option">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={() =>
                  setGiftWrap(!giftWrap)
                }
              />
              Add gift wrap & message (+ ₹50)
            </label>

            {giftWrap && (
              <textarea
                placeholder="Write your message..."
                value={giftMessage}
                onChange={(e) =>
                  setGiftMessage(e.target.value)
                }
                className="gift-message"
              />
            )}
          </div>

          {/* 💌 DIGITAL LETTER */}
          <div className="digital-letter">
            <h3>💌 Send a Digital Letter</h3>
            <p>
              Send a digital letter to your special one —
              delivered directly on WhatsApp.
            </p>
            <button className="digital-btn">
              Add Digital Letter (FREE)
            </button>
          </div>

          {/* 🛍 RECOMMENDED */}
          <div className="recommend-section">
            <h3>Don't Miss Out</h3>

            <div className="recommend-row">
              {recommendedProducts.map((item) => {

                const outOfStock =
                  Number(item.stock || 0) <= 0;

                return (
                  <div
                    key={item.id}
                    className="recommend-card"
                  >
                    <img
                      src={
                        item.image1 ||
                        item.images?.[0] ||
                        item.image
                      }
                      alt=""
                    />
                    <p>{item.name}</p>
                    <span>₹{item.price}</span>

                    <button
                      disabled={outOfStock}
                      onClick={() =>
                        addToCart({
                          ...item,
                          quantity: 1
                        })
                      }
                    >
                      {outOfStock
                        ? "Out Of Stock"
                        : "Add to Cart"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="cart-right">

          <div className="coupon-box">
            <h4>Available Offers</h4>

            <div className="coupon-card">
              <strong>EXTRA 15% Off</strong>
              <p>On orders above ₹2199</p>
            </div>

            <div className="coupon-card">
              <strong>FLAT 20% Off</strong>
              <p>On orders above ₹4999</p>
            </div>
          </div>

          <div className="summary-box">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {giftWrap && (
              <div className="summary-row">
                <span>Gift Wrap</span>
                <span>₹50</span>
              </div>
            )}

            <div className="summary-row total-row">
              <span>Estimated Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Checkout Securely
            </button>

          </div>

        </div>

      </div>

      {/* REMOVE MODAL */}
      <AnimatePresence>
        {confirmItem && (
          <motion.div
            className="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="confirm-box"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h3>Remove this item?</h3>

              <div className="confirm-actions">
                <button
                  className="remove-confirm"
                  onClick={() => {
                    removeFromCart(confirmItem.id);
                    setConfirmItem(null);
                  }}
                >
                  Remove
                </button>

                <button
                  className="wishlist-confirm"
                  onClick={() => {
                    addToWishlist(confirmItem);
                    removeFromCart(confirmItem.id);
                    setConfirmItem(null);
                  }}
                >
                  Move to Wishlist
                </button>
              </div>

              <button
                className="cancel-btn"
                onClick={() => setConfirmItem(null)}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}

export default Cart;