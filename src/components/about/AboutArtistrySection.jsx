import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ArtistrySection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"]
  });

  // TEXT animation
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 1], [40, 0, -40]);

  // IMAGE animations
  const upperLeftY = useTransform(scrollYProgress, [0, 0.3, 1], [-60, 0, -60]);
  const upperLeftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const upperRightScale = useTransform(scrollYProgress, [0, 0.3, 1], [0.8, 1, 0.8]);
  const upperRightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const lowerLeftScale = useTransform(scrollYProgress, [0, 0.3, 1], [0.8, 1, 0.8]);
  const lowerLeftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const lowerRightX = useTransform(scrollYProgress, [0, 0.3, 1], [80, 0, 80]);
  const lowerRightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="bg-white py-28 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">

        {/* TEXT BLOCK */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="space-y-8"
        >
          <p className="uppercase tracking-widest text-sm text-[#c6a75e] font-medium">
            Craftsmanship
          </p>

          <h2 className="font-serif text-4xl md:text-6xl leading-tight text-black">
            Artistry in Every Detail
          </h2>

          <p className="text-stone-600 leading-relaxed">
            Our artisans dedicate countless hours to perfecting each piece,
            ensuring intricate details that honor traditional Bengali designs.
          </p>

          <p className="text-stone-600 leading-relaxed">
            We source the finest materials to create jewelry that not only
            looks stunning but also stands the test of time.
          </p>
        </motion.div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-2 gap-10">

          {/* Upper Left */}
          <motion.div
            style={{ opacity: upperLeftOpacity, y: upperLeftY }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1758995115857-2de1eb6283d0?crop=entropy&cs=srgb&fm=jpg&q=85"
              className="w-full h-[220px] object-cover"
            />
          </motion.div>

          {/* Upper Right */}
          <motion.div
            style={{ opacity: upperRightOpacity, scale: upperRightScale }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1762201732755-b59e912de5d9?crop=entropy&cs=srgb&fm=jpg&q=85"
              className="w-full h-[220px] object-cover"
            />
          </motion.div>

          {/* Lower Left */}
          <motion.div
            style={{ opacity: lowerLeftOpacity, scale: lowerLeftScale }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1760613130027-3959a3eb939c?crop=entropy&cs=srgb&fm=jpg&q=85"
              className="w-full h-[220px] object-cover"
            />
          </motion.div>

          {/* Lower Right */}
          <motion.div
            style={{ opacity: lowerRightOpacity, x: lowerRightX }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1751606615009-30f61ff1a510?crop=entropy&cs=srgb&fm=jpg&q=85"
              className="w-full h-[220px] object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default ArtistrySection;