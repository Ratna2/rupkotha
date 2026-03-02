import { motion } from "framer-motion";

function AboutHero() {
  return (
    <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden">

      {/* Background Zoom Animation */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1762709414755-864441676f5d?crop=entropy&cs=srgb&fm=jpg&q=85\"
          alt="Bengali Bride"
          className="w-full h-full object-cover object-center"
        />

        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Soft white fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent" />
      </motion.div>

      {/* Content Animation */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight">
          Our Story
        </h1>

        <p className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed">
          Crafting dreams with authentic Bengali bridal excellence
          since the beginning.
        </p>
      </motion.div>

    </section>
  );
}

export default AboutHero;