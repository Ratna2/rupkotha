import { motion } from "framer-motion";

function ArtistrySection() {
  return (
    <section className="bg-white py-28 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">

        {/* TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
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

          {[
            "https://images.unsplash.com/photo-1758995115857-2de1eb6283d0?auto=format&fit=crop&w=800&q=70",
            "https://images.unsplash.com/photo-1762201732755-b59e912de5d9?auto=format&fit=crop&w=800&q=70",
            "https://images.unsplash.com/photo-1760613130027-3959a3eb939c?auto=format&fit=crop&w=800&q=70",
            "https://images.unsplash.com/photo-1751606615009-30f61ff1a510?auto=format&fit=crop&w=800&q=70"
          ].map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: index * 0.15
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={src}
                loading="lazy"
                className="w-full h-[220px] object-cover"
                alt="Jewellery craftsmanship"
              />
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default ArtistrySection;