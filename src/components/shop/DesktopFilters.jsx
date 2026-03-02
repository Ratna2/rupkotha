// src/components/shop/DesktopFilters.jsx

function DesktopFilters() {
  return (
    <aside className="desktop-filters">

      {/* Price */}
      <div className="filter-section">
        <h3>Price</h3>
        <input type="range" min="0" max="100000" />
        <div className="price-values">
          <span>₹0</span>
          <span>₹100000</span>
        </div>
      </div>

      {/* Shop For */}
      <div className="filter-section">
        <h3>Shop For</h3>
        <label><input type="checkbox" /> Men</label>
        <label><input type="checkbox" /> Women</label>
        <label><input type="checkbox" /> Couples</label>
      </div>

      {/* Occasion */}
      <div className="filter-section">
        <h3>Occasion</h3>
        <label><input type="checkbox" /> Aiburo Bhaat</label>
        <label><input type="checkbox" /> Gaye Holud</label>
        <label><input type="checkbox" /> Dodhi Mangal</label>
        <label><input type="checkbox" /> Wedding</label>
        <label><input type="checkbox" /> Reception</label>
      </div>

      {/* Product Type */}
      <div className="filter-section">
        <h3>Product Type</h3>
        <label><input type="checkbox" /> Gachkouto</label>
        <label><input type="checkbox" /> Sidur Dani</label>
        <label><input type="checkbox" /> Piri</label>
        <label><input type="checkbox" /> Mukut</label>
        <label><input type="checkbox" /> Sharees</label>
        <label><input type="checkbox" /> Kurti</label>
      </div>

    </aside>
  );
}

export default DesktopFilters;
