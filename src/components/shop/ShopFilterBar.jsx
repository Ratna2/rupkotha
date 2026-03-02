import { useState, useRef, useEffect } from "react";

function ShopFilterBar({ filters, updateFilters, clearFilters }) {

  const [activeFilter, setActiveFilter] = useState(null);
  const filterRef = useRef();

  const toggleFilter = (name) => {
    setActiveFilter(activeFilter === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category];

    let updated;
    if (currentValues.includes(value)) {
      updated = currentValues.filter((i) => i !== value);
    } else {
      updated = [...currentValues, value];
    }

    updateFilters({ [category]: updated });
  };

  return (
    <div className="filter-bar" ref={filterRef}>

      {/* LEFT FILTER */}
      <div className="filter-left">

        {["price","shopfor","occasion","type"].map((name) => (
          <div
            key={name}
            className={`filter-item ${activeFilter === name ? "active" : ""}`}
            onClick={() => toggleFilter(name)}
          >
            {name === "price" && "Price ▾"}
            {name === "shopfor" && "Shop For ▾"}
            {name === "occasion" && "Occasion ▾"}
            {name === "type" && "Product Type ▾"}

            {/* ⭐ DROPDOWN INSIDE ITEM (REAL FIX) */}
            {activeFilter === name && (
              <div
                className="filter-panel"
                onClick={(e) => e.stopPropagation()}
              >

                {/* PRICE */}
                {name === "price" && (
                  <>
                    <h4>Price Range</h4>

                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={filters.minPrice}
                      onChange={(e)=>
                        updateFilters({minPrice:Number(e.target.value)})
                      }
                    />

                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={filters.maxPrice}
                      onChange={(e)=>
                        updateFilters({maxPrice:Number(e.target.value)})
                      }
                    />

                    <div>
                      ₹{filters.minPrice} — ₹{filters.maxPrice}
                    </div>
                  </>
                )}

                {/* SHOP FOR */}
                {name === "shopfor" &&
                  ["Men","Women","Couples"].map((item) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        checked={filters.shopfor.includes(item)}
                        onChange={() =>
                          handleCheckboxChange("shopfor", item)
                        }
                      />
                      {item}
                    </label>
                  ))}

                {/* OCCASION */}
                {name === "occasion" &&
                  ["Wedding","Mehendi","Reception"].map((item) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        checked={filters.occasion.includes(item)}
                        onChange={() =>
                          handleCheckboxChange("occasion", item)
                        }
                      />
                      {item}
                    </label>
                  ))}

                {/* TYPE */}
                {name === "type" &&
                  ["Mukut","Gachkouto","Sidur Dani","Piri"].map((item) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        checked={filters.type.includes(item)}
                        onChange={() =>
                          handleCheckboxChange("type", item)
                        }
                      />
                      {item}
                    </label>
                  ))}

              </div>
            )}
          </div>
        ))}

        <div className="filter-clear" onClick={clearFilters}>
          Clear All
        </div>

      </div>

      {/* SORT */}
      <div className="filter-right">
        <span className="sort-label">Sort by:</span>

        <select
          className="sort-dropdown"
          value={filters.sort}
          onChange={(e)=>updateFilters({sort:e.target.value})}
        >
          <option>Best Selling</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

    </div>
  );
}

export default ShopFilterBar;