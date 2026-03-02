import { useEffect, useState } from "react";
import "../../assets/styles/myAddress.css";

import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

/* ================= DATA ================= */

const tripuraDistricts = {
  "799001": "West Tripura",
  "799102": "Sepahijala",
  "799201": "Khowai",
  "799250": "North Tripura",
  "799270": "Unakoti",
  "799275": "Dhalai",
  "799120": "Gomati",
  "799130": "South Tripura",
};

const deliveryETA = {
  "West Tripura": "1 Day Delivery",
  "Sepahijala": "1-2 Days",
  "Khowai": "2 Days",
  "North Tripura": "3 Days",
  "Unakoti": "3 Days",
  "Dhalai": "3 Days",
  "Gomati": "2 Days",
  "South Tripura": "2-3 Days",
};

export default function MyAddress() {

  const emptyForm = {
    firstName: "",
    lastName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    district: "",
    pincode: "",
    isDefault: false,
  };

  const [form, setForm] = useState(emptyForm);
  const [addresses, setAddresses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const uid = auth.currentUser?.uid;

  const loadAddresses = async () => {
    if (!uid) return;

    const snap = await getDocs(collection(db, "users", uid, "addresses"));

    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));

    setAddresses(list);
  };

  useEffect(() => {
    loadAddresses();
  }, [uid]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    let updated = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "pincode") {
      updated.district = tripuraDistricts[value] || "";
    }

    setForm(updated);
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    // 🛡 SAFE CHECK (NO CRASH)
    if (!form?.pincode || !String(form.pincode).startsWith("79")) {
        alert("Delivery available only in Tripura");
        return;
    }

    if (!uid) {
        alert("User not logged in");
        return;
    }

    try {
        if (editId) {
        await updateDoc(
            doc(db, "users", uid, "addresses", editId),
            form
        );
        } else {
        await addDoc(
            collection(db, "users", uid, "addresses"),
            form
        );
        }

        setForm(emptyForm);
        setEditId(null);
        setShowForm(false);
        loadAddresses();

    } catch (err) {
        console.error("Save address error:", err);
    }
  };

  const editAddress = (a) => {
    setForm(a);
    setEditId(a.id);
    setShowForm(true);
  };

  const removeAddress = async (id) => {
    await deleteDoc(doc(db, "users", uid, "addresses", id));
    loadAddresses();
  };

  const setDefault = async (id) => {
    for (let a of addresses) {
      await updateDoc(
        doc(db, "users", uid, "addresses", a.id),
        { isDefault: a.id === id }
      );
    }
    loadAddresses();
  };

  return (
    <div className="address-page">

      <main className="address-main">

        <h2 className="title">My Addresses</h2>

        {/* CENTER BUTTON */}
        <div className="btn-center">
          <button
            className="add-btn"
            onClick={() => {
              setShowForm(true);
              setForm(emptyForm);
            }}
          >
            + Add New Address
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <form className="address-form" onSubmit={saveAddress}>

            <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
            <input name="line1" placeholder="Address Line 1" value={form.line1} onChange={handleChange} required />
            <input name="line2" placeholder="Address Line 2" value={form.line2} onChange={handleChange} />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
            <input name="pincode" placeholder="Tripura Pincode" value={form.pincode || ""} onChange={handleChange} required />

            <select name="district" value={form.district} onChange={handleChange}>
              <option>Select District</option>
              {Object.values(tripuraDistricts).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <label className="check">
              <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={handleChange}/>
              Set as default
            </label>

            <button className="save-btn">
              {editId ? "Update Address" : "Save Address"}
            </button>

          </form>
        )}

        {/* ADDRESS CARDS */}
        <div className="address-list">

          {addresses.map((a) => (
            <div className="address-card" key={a.id}>

              {a.isDefault && <span className="address-default-badge">DEFAULT</span>}

              <h4>{a.firstName} {a.lastName}</h4>
              <p>{a.line1}, {a.line2}</p>
              <p>{a.city}, {a.district}</p>
              <p>Pincode: {a.pincode}</p>

              <p className="eta">🚚 ETA: {deliveryETA[a.district]}</p>

              <div className="actions">
                <button onClick={() => editAddress(a)}>Edit</button>
                <button className="delete" onClick={() => removeAddress(a.id)}>Delete</button>
                {!a.isDefault && (
                  <button onClick={() => setDefault(a.id)}>Make Default</button>
                )}
              </div>

            </div>
          ))}

        </div>
      </main>
    </div>
  );
}