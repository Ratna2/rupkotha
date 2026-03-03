import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { getProductRating } from "../../collection/review";
import useRequireAuth from "../../hooks/useRequireAuth";
import { useState, useEffect } from "react";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addToCart, toggleWishlist, wishlist } = useShop();
  const requireAuth = useRequireAuth();

  const liked = wishlist.includes(product.id);

  /* ⭐ RATING STATE (NEW) */
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  /* ⭐ LOAD RATING FROM FIREBASE (NEW) */
  useEffect(() => {
    const loadRating = async () => {
      const data = await getProductRating(product.id);
      setRating(data.rating || 0);
      setReviewCount(data.reviewCount || 0);
    };

    loadRating();
  }, [product.id]);

  /* SAFE IMAGE HANDLING */
  const mainImage =
    product.images?.[0] ||
    product.image1 ||
    product.image ||
    "";

  const hoverImage =
    product.images?.[1] ||
    product.image2 ||
    product.images?.[0] ||
    product.image1 ||
    product.image ||
    "";

  /* ⭐ AUTO DISCOUNT */
  const discount =
    product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  /* ⭐ STOCK FROM ADMIN (NEW) */
  const stock = Number(product.stock || 0);
  const outOfStock = stock <= 0;

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* IMAGE AREA */}
      <div className="product-image">

        {product.bestseller && (
          <div className="badge">
            <span>BESTSELLER</span>
          </div>
        )}

        <img
          src={mainImage}
          alt={product.name}
          className="img-main"
          loading="lazy"
        />

        <img
          src={hoverImage}
          alt={product.name}
          className="img-hover"
          loading="lazy"
        />

        {/* ❤️ WISHLIST */}
        <span
          className={`wishlist ${liked ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            requireAuth(() => toggleWishlist(product));
          }}
        >
          <svg viewBox="0 0 24 24" className="heart-icon">
            <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 6.6 5.14 8.56c-1.96 1.96-1.96 5.14 0 7.1L12 22l6.86-6.34c1.96-1.96 1.96-5.14 0-7.1-1.96-1.96-5-1.96-6.76.08z" />
          </svg>
        </span>
      </div>

      {/* INFO AREA */}
      <div className="product-info">

        {/* ⭐ RATING LIKE GIVA (AUTO FROM REVIEWS) */}
        <div className="product-rating">
          ⭐ {rating || 0}
          <span className="review-count">
            | {reviewCount || 0}
          </span>
        </div>

        {/* ⭐ STOCK TEXT */}
        <div className="stock-text">
          {outOfStock
            ? "❌ Out of Stock"
            : stock <= 3
            ? `⚡ Only ${stock} left`
            : `${stock} items left`}
        </div>

        {/* PRICE ROW */}
        <div className="price-row">
          <span className="final-price">
            ₹{product.price}
          </span>

          {product.originalPrice && (
            <>
              <span className="original-price">
                ₹{product.originalPrice}
              </span>

              <span className="discount">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* PRODUCT NAME */}
        <h4 className="product-name">
          {product.name}
        </h4>

        {/* COUPON TEXT */}
        {product.couponPrice && (
          <div className="coupon-text">
            Get it for ₹{product.couponPrice} with coupon
          </div>
        )}

        {/* 🛒 ADD TO CART */}
        <button
          className="add-cart-btn"
          disabled={outOfStock}
          onClick={(e) => {
            e.stopPropagation();
            requireAuth(() =>
              addToCart({ ...product, quantity: 1 })
            );
          }}
        >
          {outOfStock ? "Out Of Stock" : "Add to Cart"}
        </button>

      </div>
    </div>
  );
}

export default ProductCard;