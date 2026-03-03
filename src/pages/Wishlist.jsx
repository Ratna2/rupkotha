import { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getProductRating } from "../collection/review";
import useRequireAuth from "../hooks/useRequireAuth";

import "../assets/styles/wishlist.css";

function Wishlist() {

  const {
    wishlist,
    products,
    addToCart,
    toggleWishlist
  } = useShop();

  const navigate = useNavigate();

  const [confirmRemove, setConfirmRemove] = useState(null);
  const [toast, setToast] = useState("");
  const requireAuth = useRequireAuth();

  // ⭐ NEW: ratings state (FIX)
  const [ratingsMap, setRatingsMap] = useState({});

  // ⭐ CONNECT WISHLIST IDS → REAL PRODUCTS
  const wishlistProducts =
    products.filter(p => wishlist.includes(p.id));

  // ⭐ LOAD RATINGS (FIX)
  useEffect(() => {

    const loadRatings = async () => {

      const result = {};

      for (const product of wishlistProducts) {
        const data = await getProductRating(product.id);

        result[product.id] = data;
      }

      setRatingsMap(result);
    };

    if (wishlistProducts.length) {
      loadRatings();
    }

  }, [wishlistProducts]);

  // 🔥 MOVE TO CART
  const handleMoveToCart = (product) => {
    requireAuth(() => {
      addToCart({ ...product, quantity: 1 });
      toggleWishlist(product);

      setToast("Item moved to cart ❤️");
      setTimeout(() => setToast(""), 3000);
    });
  };

  return (
    <section className="wishlist-page">

      {/* TOP SPACING (FIX NAV COLLISION) */}
      <div className="wishlist-top-space"></div>

      <div className="wishlist-container">

        {/* HEADER */}
        <div className="wishlist-header">
          <h1>Your Wishlist</h1>
        </div>

        {/* EMPTY STATE */}
        {wishlistProducts.length === 0 && (
          <div className="empty-wishlist">

            <div className="sad-heart">💔</div>

            <h2>Your wishlist feels lonely</h2>

            <p>Add something you love.</p>

            <button
              onClick={() => navigate("/shop")}
            >
              Explore Store
            </button>

          </div>
        )}

        {/* GRID */}
        {wishlistProducts.length > 0 && (
          <div className="wishlist-grid">

            {wishlistProducts.map((product) => {

              // ⭐ SAFE RATING FETCH (FIX)
              const ratingData =
                ratingsMap[product.id] || {};

              const rating =
                ratingData.rating || 0;

              const reviewCount =
                ratingData.reviewCount || 0;

              const stock =
                Number(product.stock || 0);

              return (
                <div
                  key={product.id}
                  className="wishlist-card"
                >

                  {/* IMAGE */}
                  <div
                    className="wishlist-image"
                    onClick={() =>
                      navigate(`/product/${product.id}`)
                    }
                  >
                    <img
                      src={
                        product.image1 ||
                        product.images?.[0] ||
                        product.image
                      }
                      alt={product.name}
                    />
                  </div>

                  {/* INFO */}
                  <div className="wishlist-info">

                    <div className="rating">
                      ⭐ {rating} | {reviewCount}
                    </div>

                    <div className="stock-text">
                      {stock <= 0
                        ? "❌ Out of stock"
                        : `${stock} items left`}
                    </div>

                    <h3>{product.name}</h3>

                    <div className="price-section">
                      <span className="price">
                        ₹{product.price}
                      </span>

                      {product.originalPrice && (
                        <span className="old-price">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="wishlist-actions">

                      <button
                        className="move-cart-btn"
                        onClick={() =>
                          handleMoveToCart(product)
                        }
                      >
                        Move to cart
                      </button>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          setConfirmRemove(product)
                        }
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>

      {/* REMOVE MODAL */}
      {confirmRemove && (
        <div className="confirm-overlay">
          <div className="confirm-box">

            <h3>Remove from wishlist?</h3>

            <p>Are you sure?</p>

            <div className="confirm-actions">

              <button
                className="remove-confirm"
                onClick={() => {
                  toggleWishlist(confirmRemove);
                  setConfirmRemove(null);
                }}
              >
                Yes, Remove
              </button>

              <button
                className="keep-btn"
                onClick={() =>
                  setConfirmRemove(null)
                }
              >
                Keep it
              </button>

            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="wishlist-toast">
          {toast}
        </div>
      )}

    </section>
  );
}

export default Wishlist;