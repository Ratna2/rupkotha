import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { getProducts } from "../admin/services/productService";
import useRequireAuth from "../hooks/useRequireAuth";
import {
  getReviewsByProduct,
  getProductRating
} from "../collection/review";

import ProductReviewSection from "../components/ProductReviewSection";
import "../assets/styles/productDetails.css";

function ProductDetails() {

  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const requireAuth = useRequireAuth();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  const [reviews, setReviews] = useState([]);

  // ⭐ MISSING STATES (ADDED)
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  /* =============================
     LOAD PRODUCT
  ============================= */
  useEffect(() => {

    const loadProducts = async () => {

      const data = await getProducts();
      setProducts(data);

      const found = data.find(
        (p) => String(p.id) === String(id)
      );

      setProduct(found || null);

      if (found) {

        const media = found.images?.length
          ? [...found.images]
          : [found.image1, found.image2].filter(Boolean);

        setMainImage(media[0]);

        const saved =
          await getReviewsByProduct(found.id);

        setReviews(saved);
      }
    };

    loadProducts();

  }, [id]);

  /* =============================
     ⭐ AUTO RATING (MOVED UP)
  ============================= */
  useEffect(() => {

    if (!product) return;

    const loadRating = async () => {
      const data = await getProductRating(product.id);
      setRating(data.rating);
      setReviewCount(data.reviewCount);
    };

    loadRating();

  }, [product]);

  /* =============================
     SAFE RETURN
  ============================= */
  if (!product)
    return <h2 style={{ padding: "120px" }}>Product not found</h2>;

  const media = product.images?.length
    ? [...product.images]
    : [product.image1, product.image2].filter(Boolean);

  const isWishlisted =
    wishlist.some(p => p.id === product.id);

  return (
    <div className="product-page">

      <div className="product-top-spacing"></div>

      <div className="product-container">

        {/* LEFT */}
        <div className="product-left">

          <img
            src={mainImage}
            alt={product.name}
            className="main-image"
          />

          <div className="thumbnail-row">
            {media.map((img,i)=>(
              <img
                key={i}
                src={img}
                onClick={()=>setMainImage(img)}
                className={mainImage===img?"active":""}
                alt=""
              />
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="product-right">

          <h1>{product.name}</h1>

          {/* ⭐ LIVE RATING */}
          <div className="product-rating">
            ⭐ {rating} | {reviewCount} Reviews
          </div>

          <div className="price">
            ₹{product.price}
          </div>

          <button
            className="cart-btn"
            onClick={() =>
              requireAuth(() =>
                addToCart({ ...product,quantity })
              )
            }
          >
            Add To Cart
          </button>

          <button
            className="wishlist-btn"
            onClick={() =>
              requireAuth(() => toggleWishlist(product))
            }
          >
            {isWishlisted ? "❤️ Wishlisted" : "♡ Add to Wishlist"}
          </button>

          <div className="description">
            {product.description}
          </div>

        </div>
      </div>

      <ProductReviewSection
        product={product}
        reviews={reviews}
        setReviews={setReviews}
      />

    </div>
  );
}

export default ProductDetails;