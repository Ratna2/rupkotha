import { useState } from "react";

function MobileBottomBar({
  filters,
  updateFilters,
  clearFilters,
}) {

  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // checkbox helper
  const handleCheckboxChange = (category, value) => {
    const current = filters[category];

    let updated;
    if (current.includes(value)) {
      updated = current.filter((i) => i !== value);
    } else {
      updated = [...current, value];
    }

    updateFilters({ [category]: updated });
  };

  return (
    <>
      {/* ===================== */}
      {/* MOBILE BOTTOM BAR */}
      {/* ===================== */}

      <div className="mobile-filter-bar">

        <button onClick={() => setShowFilter(true)}>
          Filter
        </button>

        <button onClick={() => setShowSort(true)}>
          Sort
        </button>

      </div>

      {/* ===================== */}
      {/* FILTER SHEET (FIXED UI) */}
      {/* ===================== */}

      {showFilter && (
        <div
          className="mobile-sheet-overlay"
          onClick={() => setShowFilter(false)}
        >
          <div
            className="mobile-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Filters</h3>

            <div className="mobile-filter-content">

              {/* PRICE */}
              <h4>Price</h4>
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.maxPrice}
                onChange={(e) =>
                  updateFilters({
                    maxPrice: Number(e.target.value),
                  })
                }
              />
              <p className="mobile-price">
                ₹0 — ₹{filters.maxPrice}
              </p>

              {/* SHOP FOR */}
              <h4>Shop For</h4>
              {["Men", "Women", "Couples"].map((item) => (
                <label key={item} className="mobile-option">
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
              <h4>Occasion</h4>
              {["Wedding", "Mehendi", "Reception"].map((item) => (
                <label key={item} className="mobile-option">
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

              {/* PRODUCT TYPE */}
              <h4>Product Type</h4>
              {["Mukut", "Gachkouto", "Sidur Dani", "Piri"].map((item) => (
                <label key={item} className="mobile-option">
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

              <button
                className="close-sheet"
                onClick={() => setShowFilter(false)}
              >
                Apply Filters
              </button>

              <button
                className="mobile-clear"
                onClick={clearFilters}
              >
                Clear All
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ===================== */}
      {/* SORT SHEET (UNCHANGED) */}
      {/* ===================== */}

      {showSort && (
        <div
          className="mobile-sheet-overlay"
          onClick={() => setShowSort(false)}
        >
          <div
            className="mobile-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Sort By</h3>

            {[
              "Best Selling",
              "Price: Low to High",
              "Price: High to Low",
              "Newest",
            ].map((s) => (
              <button
                key={s}
                className="sort-option"
                onClick={() => {
                  updateFilters({ sort: s });
                  setShowSort(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MobileBottomBar;