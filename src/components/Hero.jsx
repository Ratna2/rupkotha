import "../assets/styles/hero.css"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0"
        >
            <img
            src="https://images.unsplash.com/photo-1610099908187-1d7da3514250?auto=format&fit=crop&w=2000&q=80"
            alt="Bengali Bride"
            className="w-full h-full object-cover"
            />

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </motion.div>

        {/* Content */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-5xl"
        >
            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[0.9] mb-6">
            Where Every Bride
            <br />
            Begins Her Fairytale
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-base md:text-lg tracking-wide leading-relaxed mb-10 max-w-2xl mx-auto">
            Celebrating Bengali heritage through exquisite bridal jewelry,
            crafted to honor tradition and elevate modern elegance.
            </p>

            {/* CTA Button */}
            <Link
            to="/shop"
            className="inline-flex items-center gap-3 rounded-full border-2 border-white bg-white text-black px-10 py-4 hover:bg-transparent hover:text-white transition-all duration-500 uppercase tracking-widest text-xs font-medium"
            >
            Explore Collection
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
        </motion.div>

        {/* Bottom Soft Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />

    </section>
  )
}

export default Hero