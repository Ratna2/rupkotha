import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { addReview } from "../collection/review";

function ProductReviewSection({
  product,
  reviews,
  setReviews
}) {

  const [openModal, setOpenModal] = useState(false);

  const submitReview = async (data) => {

    // ⭐ FIREBASE RETURNS PROMISE
    const newReview = await addReview(product.id, data);

    // ⭐ UPDATE UI SAFELY
    setReviews(prev =>
      Array.isArray(prev)
        ? [newReview, ...prev]
        : [newReview]
    );

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
            <div className="review-card" key={r.id || i}>

                {r.image && <img src={r.image} alt="" />}

                <div className="starts">
                    {"⭐".repeat(r.rating)}
                </div>

                {/* ⭐ USER NAME */}
                <div className="review-user">
                  {r.userName || "Anonymous"}
                </div>

                {/* ⭐ DATE + TIME */}
                <small>
                  {r.date} • {r.time}
                </small>

                <p>{r.text}</p>

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