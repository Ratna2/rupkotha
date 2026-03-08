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

  try {

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

  } catch (err) {

    console.error("GET REVIEWS ERROR:", err);
    return [];

  }

};

/* ===================================================
   ADD REVIEW (FIREBASE + CLOUDINARY URL SAFE)
=================================================== */
export const addReview = async (productId, review) => {

  try {

    const payload = {
      productId,
      verified: true,

      rating: Number(review.rating || 0),
      text: review.text || "",
      image: review.image || "",

      // ⭐ USER INFO
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

  } catch (err) {

    console.error("ADD REVIEW ERROR:", err);
    return null;

  }

};

/* ===================================================
   ⭐ AUTO AVG RATING
=================================================== */
export const getAverageRating = (reviews) => {

  if (!reviews || !reviews.length) return 0;

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

  try {

    const reviews =
      await getReviewsByProduct(productId);

    return {
      rating: getAverageRating(reviews),
      reviewCount: reviews.length,
    };

  } catch (err) {

    console.error("PRODUCT RATING ERROR:", err);

    return {
      rating: 0,
      reviewCount: 0,
    };

  }

};

/* ===================================================
   ⭐ GET ALL REVIEWS (FOR HOMEPAGE TESTIMONIALS)
=================================================== */
export const getAllReviews = async () => {

  try {

    const snap = await getDocs(
      collection(db, "reviews")
    );

    const reviews = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Safe timestamp sorting
    reviews.sort((a, b) => {

      const aTime =
        a.createdAt?.seconds ||
        a.createdAt?.toDate?.()?.getTime?.() ||
        0;

      const bTime =
        b.createdAt?.seconds ||
        b.createdAt?.toDate?.()?.getTime?.() ||
        0;

      return bTime - aTime;

    });

    return reviews;

  } catch (err) {

    console.error("GET ALL REVIEWS ERROR:", err);
    return [];

  }

};