import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";

import { getAllReviews } from "../collection/review";

export default function Testimonials() {

  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  // ===============================
  // LOAD 5 STAR REVIEWS
  // ===============================

  useEffect(() => {

    const loadReviews = async () => {

      try {

        const data = await getAllReviews();

        console.log("ALL REVIEWS FROM FIREBASE:", data);

        if (!data || data.length === 0) return;

        const fiveStar = data.filter(
          r => Number(r.rating) >= 5
        );

        console.log("FILTERED FIVE STAR:", fiveStar);

        const cleanedReviews = fiveStar.map(r => ({
          id: r.id,
          rating: r.rating,
          text: r.text,
          userName: r.userName,
          createdAt: r.createdAt
        }));

        const sorted = cleanedReviews.sort((a, b) => {

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

        setReviews(sorted);

      } catch (err) {
        console.error("TESTIMONIAL LOAD ERROR:", err);
      }

    };

    loadReviews();

  }, []);

  // ===============================
  // SLIDER FUNCTIONS
  // ===============================

  const next = () => {

    if(reviews.length <= 1) return;

    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {

    if(reviews.length <= 1) return;

    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // ===============================
  // AUTO PLAY
  // ===============================

  useEffect(() => {

    if(reviews.length <= 1) return;

    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);

  }, [reviews]);

  // ===============================
  // EMPTY STATE
  // ===============================

  if(reviews.length === 0){
    return (
      <section className="py-28 bg-white overflow-hidden">

        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl text-black tracking-tight">
            Treasured Memories
          </h2>

          <p className="text-stone-500 mt-3">
            Stories from our beloved brides
          </p>
        </div>

        <div className="text-center text-stone-400">
          Loading reviews...
        </div>

      </section>
    );
  }

  return (
    <section className="py-28 bg-white overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="font-serif text-5xl text-black tracking-tight">
          Treasured Memories
        </h2>

        <p className="text-stone-500 mt-3">
          Stories from our beloved brides
        </p>
      </div>

      <div
        ref={sectionRef}
        className="relative max-w-6xl mx-auto"
      >

        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex justify-center items-center relative h-[320px]">

          {reviews.map((review, i) => {

            const position =
              i === index
                ? "center"
                : i === (index - 1 + reviews.length) % reviews.length
                ? "left"
                : "right";

            return (

              <motion.div
                key={review.id}

                initial={{ opacity: 0, y: 40 }}

                animate={{
                  opacity: position === "center" ? 1 : 0.7,
                  scale: position === "center" ? 1.1 : 0.85,
                  x:
                    position === "center"
                      ? 0
                      : position === "left"
                      ? -350
                      : 350
                }}

                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}

                drag="x"
                dragConstraints={{ left: 0, right: 0 }}

                onDragEnd={(e, info) => {

                  if (info.offset.x < -100) next();
                  if (info.offset.x > 100) prev();

                }}

                className="absolute w-[320px] md:w-[420px] p-8 border border-stone-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >

                <div className="flex gap-1 mb-4 justify-center">

                  {[...Array(Number(review.rating || 5))].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}

                </div>

                <p className="text-stone-700 text-center italic leading-relaxed mb-6">
                  "{review.text || review.review}"
                </p>

                <div className="text-center">

                  <h4 className="font-serif text-lg text-black">
                    {review.userName || review.name || "Customer"}
                  </h4>

                </div>

              </motion.div>

            );

          })}

        </div>

        <div className="flex justify-center gap-6 mt-16">

          <button
            onClick={prev}
            className="p-3 border border-stone-300 hover:border-gold transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="p-3 border border-stone-300 hover:border-gold transition-all"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </section>
  );

}