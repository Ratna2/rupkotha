import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";

const reviews = [
  {
    id: 1,
    name: "Priya Mukherjee",
    nameBn: "প্রিয়া মুখার্জী",
    rating: 5,
    text: "The most beautiful bridal jewelry I could have asked for. Rupkotha made my wedding day magical."
  },
  {
    id: 2,
    name: "Sayani Roy",
    nameBn: "সায়নী রায়",
    rating: 5,
    text: "Exceptional quality and designs that honor our Bengali heritage. Highly recommend!"
  },
  {
    id: 3,
    name: "Ananya Das",
    nameBn: "অনন্যা দাস",
    rating: 5,
    text: "From the moment I saw their collection, I knew this was where my bridal journey would begin."
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const next = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // ✅ AUTO PLAY EVERY 4s
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 bg-white overflow-hidden">
      {/* Heading (NO animation as requested) */}
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

        {/* Fade Edges */}
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
                  opacity: isInView
                    ? position === "center"
                      ? 1
                      : 0.4
                    : 0,
                  scale: position === "center" ? 1.1 : 0.85,
                  x:
                    position === "center"
                      ? 0
                      : position === "left"
                      ? -350
                      : 350
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -100) next();
                  if (info.offset.x > 100) prev();
                }}
                className="absolute w-[320px] md:w-[420px] p-8 border border-stone-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-stone-700 text-center italic leading-relaxed mb-6">
                  "{review.text}"
                </p>

                <div className="text-center">
                  <h4 className="font-serif text-lg text-black">
                    {review.nameBn}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {review.name}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Manual Controls */}
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