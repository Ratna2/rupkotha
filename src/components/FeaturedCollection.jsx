import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Benarasi Saree",
    nameBn: "বেনারসি শাড়ি",
    image: "/images/benarasi.jpg"
  },
  {
    id: 2,
    name: "Gachkouto",
    nameBn: "গাছকৌটো",
    image: "/images/gachkouto.jpg"
  },
  {
    id: 3,
    name: "Bridal Mukut",
    nameBn: "ব্রাইডাল মুকুট",
    image: "/images/mukut.jpg"
  },
  {
    id: 4,
    name: "Bridal Blouse Piece",
    nameBn: "ব্লাউজ পিস",
    image: "/images/blouse.jpg"
  },
  {
    id: 5,
    name: "Bridal Accessories",
    nameBn: "বধূ সাজ",
    image: "/images/accessories.jpg"
  }
];

export default function FeaturedCollection() {

  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  return (
    <section className="py-24 px-6 md:px-16 bg-white overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="font-serif text-4xl md:text-5xl text-black">
          Featured Collection
        </h2>
        <p className="text-gray-500 mt-3 tracking-wide">
          Curated treasures for your bridal story
        </p>
      </div>

      {/* ASYMMETRIC GRID */}
      <div className="grid md:grid-cols-3 gap-8 auto-rows-[400px]">

        {products.map((product, index) => {

          let customClass = "";

          if (index === 0) customClass = "md:row-span-2";
          if (index === 3) customClass = "md:col-span-2";

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className={`relative group overflow-hidden ${customClass}`}
            >
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center gap-4">

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="bg-white p-3 rounded-full hover:bg-gold transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(product.id)
                        ? "text-red-500 fill-red-500"
                        : "text-black"
                    }`}
                  />
                </button>

                <button className="bg-gold text-white px-6 py-2 uppercase text-xs tracking-widest rounded-full hover:scale-105 transition">
                  Add to Cart
                </button>
              </div>

              {/* TEXT */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-serif text-xl">
                  {product.name}
                </h3>
                <p className="text-sm opacity-80">
                  {product.nameBn}
                </p>
              </div>

            </motion.div>
          );
        })}

      </div>

      {/* VIEW ALL */}
      <div className="text-center mt-16">
        <Link
          to="/shop"
          className="uppercase tracking-widest text-sm border-b border-black pb-1 hover:text-gold hover:border-gold transition"
        >
          View All Products →
        </Link>
      </div>

    </section>
  );
}