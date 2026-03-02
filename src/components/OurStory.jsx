import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "/images/story1.jpg",
  "/images/story2.jpg",
  "/images/story3.jpg",
  "/images/story4.jpg"
];

export default function OurStory() {

  const [currentImage, setCurrentImage] = useState(0);

  // Auto image change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 px-6 md:px-16 bg-white overflow-hidden">

      <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

        {/* LEFT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="relative w-full aspect-[4/5] mx-auto md:max-w-none overflow-hidden"
        >
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt="Rupkotha Story"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{
                opacity: currentImage === index ? 1 : 0,
                scale: currentImage === index ? 1 : 1.05
              }}
              transition={{ duration: 1.2 }}
            />
          ))}
        </motion.div>

        {/* RIGHT CONTENT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <p className="uppercase tracking-widest text-sm text-gold">
            Our Story
          </p>

          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-black">
            Crafting Dreams,<br />
            Honoring Tradition
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-lg">
            Rupkotha was born from a deep love for Bengali culture and the
            timeless beauty of traditional bridal jewelry. Each piece tells
            a story — weaving heritage and modern elegance together in a
            celebration of womanhood.
          </p>

          <Link
            to="/about"
            className="uppercase tracking-widest text-sm border-b border-black pb-1 hover:text-gold hover:border-gold transition"
          >
            Learn More →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}