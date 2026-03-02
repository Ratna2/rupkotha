import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import "../assets/styles/checkout.css";

function Checkout() {

  const { cart } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ======================
     USER ADDRESS STATE
  ====================== */
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [loadingAddress, setLoadingAddress] =
    useState(true);

  /* ⭐ NEW STATES (ADDED ONLY) */
  const [showAddressModal, setShowAddressModal] =
    useState(false);

  const [editingAddress, setEditingAddress] =
    useState(null);

  const [editData, setEditData] = useState({});

  /* ======================
     PAYMENT
  ====================== */
  const [paymentMethod, setPaymentMethod] =
    useState("upi");

  const [sameBilling, setSameBilling] =
    useState(true);

  /* ======================
     FETCH USER ADDRESSES
  ====================== */
  useEffect(() => {

    const loadAddresses = async () => {
      try {

        const user = auth.currentUser;
        if (!user) return;

        const ref = collection(
          db,
          "users",
          user.uid,
          "addresses"
        );

        const snap = await getDocs(ref);

        const list = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAddresses(list);

        if (list.length > 0) {
          setSelectedAddress(list[0]);
        }

      } catch (error) {
        console.log("Address load error", error);
      } finally {
        setLoadingAddress(false);
      }
    };

    loadAddresses();

  }, []);

  /* ======================
     SAVE EDITED ADDRESS
  ====================== */
  const saveAddressEdit = async () => {

    const user = auth.currentUser;
    if (!user || !editingAddress) return;

    const ref = doc(
      db,
      "users",
      user.uid,
      "addresses",
      editingAddress.id
    );

    await updateDoc(ref, editData);

    const updated = addresses.map(a =>
      a.id === editingAddress.id
        ? { ...a, ...editData }
        : a
    );

    setAddresses(updated);
    setSelectedAddress({
      ...editingAddress,
      ...editData
    });

    setEditingAddress(null);
  };

  /* ======================
     EMPTY CART
  ====================== */
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <section className="checkout-page">

      <div className="checkout-wrapper">

        {/* ================= LEFT ================= */}
        <div className="checkout-left">

          {/* ===== ADDRESS ===== */}
          <div className="address-section">

            <h2>Delivering To</h2>

            {loadingAddress && (
              <p>Loading address...</p>
            )}

            {!loadingAddress && !selectedAddress && (
              <div className="no-address">
                <p>No address found</p>

                <button
                  onClick={() =>
                    navigate("/account/address")
                  }
                >
                  Add Address
                </button>
              </div>
            )}

            {selectedAddress && (
              <div className="address-card">

                <h3>
                  {selectedAddress.fullName}
                </h3>

                <p>
                  {selectedAddress.address},
                  {selectedAddress.city},
                  {selectedAddress.state},
                  {selectedAddress.pin},
                  {selectedAddress.country}
                </p>

                <p>
                  Phone: {selectedAddress.phone}
                </p>

                {/* ⭐ UPDATED AMAZON STYLE */}
                <button
                  className="change-address-btn"
                  onClick={() =>
                    setShowAddressModal(true)
                  }
                >
                  Change Address
                </button>

              </div>
            )}

          </div>

          <button className="continue-btn">
            Continue
          </button>

          {/* ================= PAYMENT ================= */}

          <h2 className="payment-title">
            Payment Method
          </h2>

          <div className="payment-list">

            {["gpay","upi","card","cod"].map(type=>(
              <label key={type} className="payment-card">
                <input
                  type="radio"
                  checked={paymentMethod===type}
                  onChange={()=>setPaymentMethod(type)}
                />
                <div>
                  <h4>
                    {type==="gpay" && "Google Pay"}
                    {type==="upi" && "Pay by any UPI App"}
                    {type==="card" && "Credit / Debit Card"}
                    {type==="cod" && "Cash on Delivery"}
                  </h4>
                </div>
              </label>
            ))}

          </div>

          <h2>Billing Address</h2>

          <label className="radio">
            <input
              type="radio"
              checked={sameBilling}
              onChange={() =>
                setSameBilling(true)
              }
            />
            Same as delivery address
          </label>

          <label className="radio">
            <input
              type="radio"
              checked={!sameBilling}
              onChange={() =>
                setSameBilling(false)
              }
            />
            Use different billing address
          </label>

          <button className="pay-btn">
            Pay ₹{subtotal}
          </button>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="checkout-right">

          <h3>Order Summary</h3>

          <div className="order-preview">

            {cart.map((item) => (
              <div key={item.id} className="preview-item">

                <img
                  src={
                    item.image1 ||
                    item.images?.[0] ||
                    item.image
                  }
                  alt=""
                />

                <div>
                  <p>{item.name}</p>
                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>
            ))}

          </div>

          <div className="summary-box">

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

          </div>

        </div>

      </div>

      {/* ⭐ ADDRESS MODAL */}
      {showAddressModal && (
        <div className="address-modal">
          <div className="modal-box">

            <h3>Select Address</h3>

            {addresses.map(addr => (
              <div key={addr.id} className="address-option">

                <input
                  type="radio"
                  checked={selectedAddress?.id===addr.id}
                  onChange={()=>setSelectedAddress(addr)}
                />

                <div>
                  <p>{addr.fullName}</p>
                  <small>{addr.address}</small>
                </div>

                <button
                  onClick={()=>{
                    setEditingAddress(addr);
                    setEditData(addr);
                  }}
                >
                  Edit
                </button>

              </div>
            ))}

            <button
              className="continue-btn"
              onClick={()=>setShowAddressModal(false)}
            >
              Deliver to this Address
            </button>

          </div>
        </div>
      )}

      {/* ⭐ EDIT POPUP */}
      {editingAddress && (
        <div className="address-modal">
          <div className="modal-box">

            <h3>Edit Address</h3>

            <input
              value={editData.fullName || ""}
              onChange={e=>setEditData({
                ...editData,
                fullName:e.target.value
              })}
            />

            <input
              value={editData.address || ""}
              onChange={e=>setEditData({
                ...editData,
                address:e.target.value
              })}
            />

            <input
              value={editData.city || ""}
              onChange={e=>setEditData({
                ...editData,
                city:e.target.value
              })}
            />

            <input
              value={editData.pin || ""}
              onChange={e=>setEditData({
                ...editData,
                pin:e.target.value
              })}
            />

            <button
              className="pay-btn"
              onClick={saveAddressEdit}
            >
              Save Address
            </button>

          </div>
        </div>
      )}

    </section>
  );
}

export default Checkout;