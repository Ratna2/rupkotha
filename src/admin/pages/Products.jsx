import { useState, useEffect } from "react";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../services/productService";
import { uploadToCloudinary } from "../services/cloudinaryService";
import "../../assets/styles/adminProducts.css";

function Products() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    stock: "",
    gender: "female",
    occasion: "wedding",
    bestseller: false,
  });

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // ======================
  // DISCOUNT AUTO
  // ======================
  const discount =
    form.originalPrice && form.price
      ? Math.round(
          ((form.originalPrice - form.price) /
            form.originalPrice) *
            100
        )
      : 0;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ======================
  // MEDIA HANDLING
  // ======================
  const handleFiles = (selected) => {
    const arr = Array.from(selected);
    setFiles(arr);
    setPreviews(
      arr.map((f) => ({
        url: URL.createObjectURL(f),
        type: f.type,

    }))
   );
  };

  const removeMedia = (index) => {
    const updatedFiles = [...files];
    const updatedPreview = [...previews];
    updatedFiles.splice(index, 1);
    updatedPreview.splice(index, 1);

    setFiles(updatedFiles);
    setPreviews(updatedPreview);
  };

  const moveMedia = (index, dir) => {
    const arr = [...files];
    const prev = [...previews];

    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= arr.length) return;

    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    [prev[index], prev[newIndex]] = [prev[newIndex], prev[index]];

    setFiles(arr);
    setPreviews(prev);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  // ======================
  // SAVE PRODUCT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploaded = [];

      for (const file of files) {
        const url = await uploadToCloudinary(file);
        uploaded.push(url);
      }

      await addProduct({
        ...form,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice || 0),
        stock: Number(form.stock || 0),
        discount,
        images: uploaded,
      });

      setForm({
        name: "",
        price: "",
        originalPrice: "",
        stock: "",
        gender: "female",
        occasion: "wedding",
        bestseller: false,
      });

      setFiles([]);
      setPreviews([]);

      loadProducts();

      alert("Product Uploaded ✅");
    } catch (err) {
      console.error(err);
      alert("Upload Failed ❌");
    }
  };

  // ======================
  // EDIT / DELETE
  // ======================
  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  const handleEdit = async (p, field, value) => {
    await updateProduct(p.id, {
      ...p,
      [field]: value,
    });
    loadProducts();
  };

  return (
    <div className="admin-products">

      <h1 className="title">Product Manager (Shopify Style)</h1>

      {/* ================= FORM ================= */}
      <form className="product-form" onSubmit={handleSubmit}>

        <div className="form-grid">

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Selling Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="originalPrice"
            type="number"
            placeholder="Original Price"
            value={form.originalPrice}
            onChange={handleChange}
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock Available"
            value={form.stock}
            onChange={handleChange}
          />

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="couple">Couple</option>
          </select>

          <select name="occasion" value={form.occasion} onChange={handleChange}>
            <option value="aiburobhat">Aiburo Bhat</option>
            <option value="haldi">Haldi</option>
            <option value="mehendi">Mehendi</option>
            <option value="sangeet">Sangeet</option>
            <option value="wedding">Wedding</option>
            <option value="reception">Reception</option>
          </select>

          <label className="bestseller">
            <input
              type="checkbox"
              name="bestseller"
              checked={form.bestseller}
              onChange={handleChange}
            />
            Best Seller
          </label>

          <div className="discount-box">
            Discount: {discount}% OFF
          </div>

        </div>

        {/* MEDIA DROP ZONE */}
        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() =>
            document.getElementById("fileInput").click()
          }
        >
          Drag & Drop Media OR Click to Upload
          <input
            id="fileInput"
            type="file"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* PREVIEW */}
        <div className="preview-row">
          {previews.map((media, i) => (
            <div className="preview-card" key={i}>

              {media.type.startsWith("video") ? (
                <video
                  src={media.url}
                  controls
                  className="preview-media"  
                />
              ) : (
                <img
                  src={media.url}
                  alt=""
                  className="preview-media"
                />      
              )}

              <div className="preview-actions">
                <button
                  type="button"
                  onClick={() => moveMedia(i, -1)} 
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => moveMedia(i, 1)}
                >
                  →
                </button>

                <button
                  type="button"
                  onClick={() => removeMedia(i)}  
                >
                  ❌
                </button>
              </div>  
            </div>
          ))}
        </div>

        <button className="save-btn">
          Upload Product
        </button>

      </form>

      {/* ================= LIVE PRODUCTS ================= */}
      <h2 className="live-title">Live Products</h2>

      <div className="live-products">
        {products.map((p) => (
          <div className="admin-product-card" key={p.id}>

            <img src={p.images?.[0]} alt="" />

            <input
              value={p.name}
              onChange={(e) =>
                handleEdit(p, "name", e.target.value)
              }
            />

            <input
              value={p.price}
              onChange={(e) =>
                handleEdit(p, "price", e.target.value)
              }
            />

            <input
              value={p.stock}
              onChange={(e) =>
                handleEdit(p, "stock", e.target.value)
              }
            />

            <button
              className="delete-btn"
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Products;