import { useState, useMemo, useEffect } from "react";
import ShopFilterBar from "../components/shop/ShopFilterBar";
import ProductGrid from "../components/shop/ProductGrid";
import MobileBottomBar from "../components/shop/MobileBottomBar";
import { getProducts } from "../admin/services/productService";


import "../assets/styles/shop.css";

function Shop() {

  const [products, setProducts] = useState([]);

  /* 🔥 NEW MOBILE STATES (ADDED) */
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();

      // 🔥 SAFE NORMALIZATION (FIREBASE + CLOUDINARY)
      const normalized = data.map((p) => ({
        ...p,
        price: Number(p.price || 0),
      }));

      setProducts(normalized);
    };

    loadProducts();
  }, []);

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    type: [],
    shopfor: [],
    occasion: [],
    sort: "Best Selling",
  });

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 10000,
      type: [],
      shopfor: [],
      occasion: [],
      sort: "Best Selling",
    });
  };

  // 🔥 FILTER + SORT
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // PRICE FILTER
    result = result.filter(
      (p) =>
        Number(p.price) >= filters.minPrice &&
        Number(p.price) <= filters.maxPrice
    );

    // TYPE FILTER
    if (filters.type.length > 0) {
      result = result.filter((p) =>
        filters.type.includes(p.type)
      );
    }

    // 🔥 FIX (shopfor → gender)
    if (filters.shopfor.length > 0) {
      result = result.filter((p) =>
        filters.shopfor.includes(p.gender)
      );
    }

    // OCCASION
    if (filters.occasion.length > 0) {
      result = result.filter((p) =>
        filters.occasion.includes(p.occasion)
      );
    }

    // SORTING
    switch (filters.sort) {
      case "Price: Low to High":
        result.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        break;

      case "Price: High to Low":
        result.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
        break;

      case "Newest":
        result.sort(
          (a, b) =>
            Number(b.createdAt || b.id || 0) -
            Number(a.createdAt || a.id || 0)
        );
        break;

      case "Best Selling":
      default:
        result.sort((a, b) => {
          if (a.bestseller === b.bestseller) return 0;
          return a.bestseller ? -1 : 1;
        });
        break;
    }

    return result;
  }, [filters, products]);

  return (
    <section className="shop-page">
      <div className="shop-container">

        <div className="shop-header">
          <h1 className="shop-title">Collections</h1>
        </div>

        {/* DESKTOP FILTER (UNCHANGED) */}
        <div className="desktop-filter">
          <ShopFilterBar
            filters={filters}
            updateFilters={updateFilters}
            clearFilters={clearFilters}
          />
        </div>

        <div className="shop-layout">
          <ProductGrid products={filteredProducts} />
        </div>

        <MobileBottomBar
          filters={filters}
          updateFilters={updateFilters}
          clearFilters={clearFilters}
        />
      </div>
    </section>
  );
}

export default Shop;