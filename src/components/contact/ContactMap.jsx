import { motion } from "framer-motion";

function ContactMap() {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
            Rupkotha Store Location
          </h2>

          <p className="text-stone-600">
            Above W Showroom, Mantribari Road, Old RMS Chowmoni,  
            Agartala, Tripura – 799001
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-black rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            title="Rupkotha Store Location"
            src="https://www.google.com/maps?q=Above%20W%20Showroom,%20Mantribari%20Road,%20Old%20RMS%20Chowmoni,%20Agartala,%20Tripura%20799001&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            className="w-full"
          />
        </motion.div>

      </div>
    </section>
  );
}

export default ContactMap;