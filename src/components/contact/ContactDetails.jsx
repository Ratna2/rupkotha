import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

function ContactDetails() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-6 text-black">
        Let's Start a Conversation
      </h2>

      <p className="text-stone-600 leading-relaxed mb-10">
        Whether you have a question about our collection, need styling advice,
        or want to discuss custom orders, our team is here to help make your
        bridal dreams come true.
      </p>

      <div className="space-y-8">

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="bg-[#f8f3e8] p-3 rounded-full">
            <MapPin className="text-[#c6a75e]" size={20} />
          </div>
          <div>
            <h4 className="font-medium text-lg mb-1">Visit Our Showroom</h4>
            <p className="text-stone-600 text-sm">
              Old RMS Chowmoni, Above W Showroom<br />
              Agartala, Tripura, 799001<br />
              India
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="bg-[#f8f3e8] p-3 rounded-full">
            <Phone className="text-[#c6a75e]" size={20} />
          </div>
          <div>
            <h4 className="font-medium text-lg mb-1">Call Us</h4>
            <a
              href="tel:+919366900634"
              className="text-stone-600 text-sm hover:text-black transition"
            >
              +91 93669 00634
            </a>
            <p className="text-stone-500 text-xs mt-1">
              Mon – Sat: 10 AM – 7 PM
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="bg-[#f8f3e8] p-3 rounded-full">
            <Mail className="text-[#c6a75e]" size={20} />
          </div>
          <div>
            <h4 className="font-medium text-lg mb-1">Email Us</h4>
            <a
              href="mailto:hello@rupkotha.com"
              className="text-stone-600 text-sm hover:text-black transition"
            >
              hello@rupkotha.com
            </a>
            <p className="text-stone-500 text-xs mt-1">
              We reply within 24 hours
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default ContactDetails;