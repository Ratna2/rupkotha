import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

/* ===================================================
   GET REVIEWS (NOW FROM FIREBASE)
=================================================== */
export const getReviewsByProduct = async (productId) => {

  const q = query(
    collection(db, "reviews"),
    where("productId", "==", productId),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ===================================================
   ADD REVIEW (FIREBASE + CLOUDINARY URL SAFE)
=================================================== */
export const addReview = async (productId, review) => {

  const payload = {
    productId,
    verified: true,

    rating: Number(review.rating || 0),
    text: review.text || "",
    image: review.image || "",

    // ⭐ NEW USER INFO
    userName: review.userName || "User",

    // ⭐ DATE + TIME
    date:
      review.date ||
      new Date().toLocaleDateString(),

    time:
      review.time ||
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    collection(db, "reviews"),
    payload
  );

  return {
    id: docRef.id,
    ...payload,
  };
};

/* ===================================================
   ⭐ AUTO AVG RATING
=================================================== */
export const getAverageRating = (reviews) => {

  if (!reviews.length) return 0;

  const total = reviews.reduce(
    (sum, r) => sum + Number(r.rating || 0),
    0
  );

  return Number(
    (total / reviews.length).toFixed(1)
  );
};

/* ===================================================
   ⭐ PRODUCT RATING FETCHER
=================================================== */
export const getProductRating = async (productId) => {

  const reviews =
    await getReviewsByProduct(productId);

  return {
    rating: getAverageRating(reviews),
    reviewCount: reviews.length,
  };
};