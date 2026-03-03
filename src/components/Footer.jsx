import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div className="space-y-6">
          <img
            src="/rupkotha-logo.png"
            alt="Rupkotha Logo"
            className="w-40"
          />

          <p className="text-gray-400 text-sm leading-relaxed">
            Where Every Bride Begins Her Fairytale.
            Crafting dreams with authentic Bengali bridal excellence.
          </p>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/rupkotha_officials?igsh=bmNmN2d3a3Qxb2k2"
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-gray-700 rounded-full hover:border-[#c6a75e] transition duration-300"
            >
              <Instagram className="w-5 h-5 text-gray-400 hover:text-[#c6a75e] transition duration-300" />
            </a>

            <a
              href="https://www.facebook.com/share/1aFBobUYB5/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-gray-700 rounded-full hover:border-[#c6a75e] transition duration-300"
            >
              <Facebook className="w-5 h-5 text-gray-400 hover:text-[#c6a75e] transition duration-300" />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">
            QUICK LINKS
          </h4>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link to="/shop" className="hover:text-[#c6a75e] transition">
                Shop Collection
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#c6a75e] transition">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#c6a75e] transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">
            POLICIES
          </h4>

          {/* ✅ FIXED HERE */}
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link
                to="/shipping-returns"
                className="hover:text-[#c6a75e] transition"
              >
                Shipping & Returns
              </Link>
            </li>

            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-[#c6a75e] transition"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                to="/terms-conditions"
                className="hover:text-[#c6a75e] transition"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">
            CONTACT
          </h4>

          <div className="space-y-4 text-gray-400 text-sm">

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#c6a75e]" />
              <p>
                Old RMS Chowmoni, Above W Showroom, Agartala, Tripura, 799001
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#c6a75e]" />
              <a
                href="tel:+91936690634"
                className="hover:text-[#c6a75e] transition"
              >
                +91 93669 00634
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#c6a75e]" />
              <a
                href="mailto:hello@rupkotha.com"
                className="hover:text-[#c6a75e] transition"
              >
                hello@rupkotha.com
              </a>
            </div>

          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-16 pt-6 text-center text-gray-500 text-sm">
        ©️ {new Date().getFullYear()} Rupkotha. All rights reserved.
        Crafted with love for Bengali brides.
      </div>
    </footer>
  );
}

export default Footer;