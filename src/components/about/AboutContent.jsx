import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function AboutContent() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  return (
    <section
      ref={ref}
      className="relative bg-white py-24 md:py-32 px-6 overflow-hidden"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* BIG HEADING */}
        <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-black leading-tight mb-12">
          Where Tradition Meets Modern Grace
        </h2>

        {/* PARAGRAPHS */}
        <div className="space-y-8 text-stone-600 leading-relaxed text-base md:text-lg">
          <p>
            Rupkotha was born from a profound love for Bengali heritage and a
            vision to celebrate every bride’s unique journey. Our name,
            meaning “fairytale” in Bengali, embodies our commitment to making
            your special day truly magical.
          </p>

          <p>
            Each piece in our collection is handcrafted by skilled artisans
            who have inherited centuries-old techniques passed down through
            generations. We work closely with master craftsmen from West
            Bengal, ensuring that every necklace, saree, and ornament reflects
            the rich cultural tapestry of Bengal traditions.
          </p>

          <p>
            We believe that jewelry is more than adornment — it’s a connection
            to heritage, a celebration of love, and a treasure to be cherished
            for generations. Every bride deserves to feel like royalty,
            adorned in pieces that tell her unique story while honoring
            timeless traditions.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutContent;