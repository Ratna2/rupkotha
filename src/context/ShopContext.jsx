import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../admin/services/productService";

const ShopContext = createContext();

export function ShopProvider({ children }) {

  const [products, setProducts] = useState([]);

  /* 🔥 LOAD CART FROM LOCALSTORAGE */
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  /* 🔥 LOAD WISHLIST FROM LOCALSTORAGE */
  /* ⭐ NOW ONLY IDS */
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    const parsed = saved ? JSON.parse(saved) : [];

    // ⭐ AUTO FIX OLD OBJECT STORAGE
    return parsed.map((item) =>
      typeof item === "object" ? item.id : item
    );
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  /* ============================
     LOAD PRODUCTS
  ============================ */
  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();

      const normalized = (data || []).map((p) => ({
        ...p,

        /* ⭐ SAFE STOCK */
        stock: Number(p.stock || 0),

        image:
          p.image ||
          p.image1 ||
          (Array.isArray(p.images) ? p.images[0] : ""),

        images: Array.isArray(p.images)
          ? p.images
          : [p.image || p.image1].filter(Boolean),

        videos: Array.isArray(p.videos) ? p.videos : [],
      }));

      setProducts(normalized);
    };

    loadProducts();
  }, []);

  /* ============================
     🔥 AUTO SAVE CART
  ============================ */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ============================
     🔥 AUTO SAVE WISHLIST
  ============================ */
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ============================
     ⭐ UPDATE STOCK LIVE
  ============================ */
  const updateProductStock = (productId, qty) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, stock: Math.max(0, p.stock - qty) }
          : p
      )
    );
  };

  // ============================
  // 🛒 ADD / UPDATE CART
  // ============================
  const addToCart = (product) => {

    if (product.stock <= 0) return;

    setCart((prev) => {

      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) => {

          if (p.id === product.id) {

            const newQty =
              p.quantity + (product.quantity || 1);

            return { ...p, quantity: newQty };
          }

          return p;
        });
      }

      return [
        ...prev,
        { ...product, quantity: product.quantity || 1 },
      ];
    });

    updateProductStock(product.id, product.quantity || 1);

    setLastAdded(product);
    setIsCartOpen(true);
  };

  // ============================
  // ❌ REMOVE FROM CART
  // ============================
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ============================
  // ❤️ ADD TO WISHLIST
  // ============================
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) return prev;
      return [...prev, product.id];
    });
  };

  // ============================
  // ❌ REMOVE FROM WISHLIST
  // ============================
  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((pid) => pid !== id)
    );
  };

  // ============================
  // 🔄 TOGGLE WISHLIST
  // ============================
  const toggleWishlist = (product) => {
    setWishlist((prev) => {

      const exists = prev.includes(product.id);

      if (exists) {
        return prev.filter(
          (pid) => pid !== product.id
        );
      }

      return [...prev, product.id];
    });
  };

  // ============================
  // 💰 TOTAL
  // ============================
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        lastAdded,
        total,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);