import { motion } from "framer-motion";

function ContactHero() {
  return (
    <section className="relative h-[65vh] md:h-[70vh] flex items-center justify-center overflow-hidden">

      {/* Background Image Zoom Animation */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2000&q=80"
          alt="Contact Background"
          className="w-full h-full object-cover"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      {/* Text Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6"
      >
        <h1 className="font-serif text-4xl md:text-6xl mb-4 tracking-wide">
          Get in Touch
        </h1>

        <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto">
          We’d love to hear from you and help bring your bridal vision to life.
        </p>
      </motion.div>

      {/* Soft fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

    </section>
  );
}

export default ContactHero;