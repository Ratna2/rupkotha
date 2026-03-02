import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function PersonalInfo() {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // LOAD USER DATA
  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForm(snap.data());
      } else {
        setForm({
          firstName: "",
          lastName: "",
          email: user.email,
          phone: "",
        });
      }
    };

    loadUser();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    await setDoc(
      doc(db, "users", user.uid),
      form,
      { merge: true }
    );

    setLoading(false);
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 bg-white shadow-md rounded-xl p-8">

      <h2 className="text-2xl font-semibold mb-6">
        Personal Information
      </h2>

      <div className="space-y-4">

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          disabled={!editing}
          placeholder="First Name"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          disabled={!editing}
          placeholder="Last Name"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="email"
          value={form.email}
          disabled
          className="w-full border p-3 rounded-lg bg-gray-100"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={!editing}
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
        />

      </div>

      <div className="mt-6">

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-[#C6A14A] text-white px-6 py-2 rounded-lg"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        )}

      </div>
    </div>
  );
}

export default PersonalInfo;