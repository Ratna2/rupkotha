import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { addReview } from "../collection/review";

function ProductReviewSection({
  product,
  reviews,
  setReviews
}) {

  const [openModal, setOpenModal] = useState(false);

  // ⭐ SUBMIT REVIEW (ASYNC FIREBASE)
  const submitReview = async (data) => {

    const saved = await addReview(product.id, data);

    // append instantly UI update
    setReviews(prev => [saved, ...(prev || [])]);

    setOpenModal(false);
  };

  return (
    <div className="reviews-section">

      <h2>Customer Reviews</h2>

      <button
        className="write-review-btn"
        onClick={()=>setOpenModal(true)}
      >
        Write a Review
      </button>

      <div className="reviews-grid">

        {(Array.isArray(reviews) ? reviews : []).map((r,i)=>(
          <div className="review-card" key={i}>

            {r.image && <img src={r.image} alt="" />}

            <div className="stars">
              {"⭐".repeat(r.rating || 0)}
            </div>

            {/* ⭐ USER NAME */}
            <div className="review-user">
              <strong>{r.userName || "User"}</strong>
            </div>

            <p>{r.text}</p>

            {/* ⭐ DATE + TIME */}
            <small>
              {r.date} {r.time ? `• ${r.time}` : ""}
            </small>

          </div>
        ))}

      </div>

      {openModal && (
        <ReviewModal
          onClose={()=>setOpenModal(false)}
          onSubmit={submitReview}
        />
      )}

    </div>
  );
}

export default ProductReviewSection;