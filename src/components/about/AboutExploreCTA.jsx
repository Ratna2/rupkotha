import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ExploreCTA() {
  return (
    <section className="bg-black py-28 px-6 md:px-12 text-center overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
          Begin Your Fairytale Journey
        </h2>

        <p className="text-white/70 text-lg md:text-xl mb-10">
          Explore our curated collection and find the perfect pieces to make your special day unforgettable.
        </p>

        {/* BUTTON */}
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="px-10 py-4 rounded-full bg-[#d4af37] text-white font-medium tracking-wide border border-transparent transition-all duration-300 ease-out hover:bg-transparent hover:text-[#d4af37] hover:border-[#d4af37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
          >
            EXPLORE OUR COLLECTION
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

export default ExploreCTA;