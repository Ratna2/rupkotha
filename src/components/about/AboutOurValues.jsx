import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, Sparkles, Medal } from "lucide-react";

function OurValues() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"]
  });

  // HEADER
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [40, 0, 0, -40]
  );

  // LEFT CARD
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [-120, 0, 0, 120] // comes from left, leaves to right
  );

  const leftOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  // MIDDLE CARD
  const midOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const midY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [40, 0, 0, -40]
  );

  // RIGHT CARD
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [120, 0, 0, -120] // comes from right, leaves to left
  );

  const rightOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="relative bg-[#faf9f7] py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* HEADER */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="text-center mb-20"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-black tracking-tight">
          Our Values
        </h2>
        <p className="text-stone-500 mt-4 text-base md:text-lg">
          What guides us in every creation
        </p>
      </motion.div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* LEFT */}
        <motion.div
          style={{ x: leftX, opacity: leftOpacity }}
          className="group bg-white p-10 rounded-2xl border border-stone-200
                     transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                     hover:border-[#c6a75e]"
        >
          <Heart
            className="w-8 h-8 text-[#c6a75e] mb-6 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(198,167,94,0.6)]"
            strokeWidth={1.5}
          />
          <h3 className="font-serif text-2xl mb-4 text-black">
            Crafted with Love
          </h3>
          <p className="text-stone-600 leading-relaxed">
            Every piece is handcrafted with dedication and care,
            ensuring exceptional quality and attention to detail.
          </p>
        </motion.div>

        {/* MIDDLE */}
        <motion.div
          style={{ opacity: midOpacity, y: midY }}
          className="group bg-white p-10 rounded-2xl border border-stone-200
                     transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                     hover:border-[#c6a75e]"
        >
          <Medal
            className="w-8 h-8 text-[#c6a75e] mb-6 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(198,167,94,0.6)]"
            strokeWidth={1.5}
          />
          <h3 className="font-serif text-2xl mb-4 text-black">
            Heritage & Quality
          </h3>
          <p className="text-stone-600 leading-relaxed">
            We honor traditional Bengali craftsmanship while using only
            the finest materials for lasting beauty.
          </p>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          style={{ x: rightX, opacity: rightOpacity }}
          className="group bg-white p-10 rounded-2xl border border-stone-200
                     transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                     hover:border-[#c6a75e]"
        >
          <Sparkles
            className="w-8 h-8 text-[#c6a75e] mb-6 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(198,167,94,0.6)]"
            strokeWidth={1.5}
          />
          <h3 className="font-serif text-2xl mb-4 text-black">
            Timeless Elegance
          </h3>
          <p className="text-stone-600 leading-relaxed">
            Our designs transcend trends, creating heirloom pieces
            that will be cherished for generations.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default OurValues;