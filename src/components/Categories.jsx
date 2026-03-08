import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    slug: "sarees"
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
    slug: "accessories"
  },
  {
    name: "Gifts",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80",
    slug: "gifts"
  }
];

function Categories() {

  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/shop?category=${slug}`);
  };

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-black tracking-tight mb-3">
          Shop by Category
        </h2>
        <p className="text-stone-600 tracking-wide">
          Discover our curated collections
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {categories.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{
              opacity: 0,
              x: index === 0 ? -80 : index === 2 ? 80 : 0,
              y: index === 1 ? 60 : 0
            }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer"
            onClick={() => handleCategoryClick(item.slug)}
          >
            <div className="overflow-hidden mb-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[300px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <h3 className="text-center text-xl md:text-2xl font-serif text-black transition-colors duration-500 group-hover:text-[#C6A14A]">
              {item.name}
            </h3>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

export default Categories;