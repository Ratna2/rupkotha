import { Send } from "lucide-react";
import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function ContactForm() {

  // 🔥 FORM STATE (ADDED)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // 🔥 HANDLE INPUT CHANGE (ADDED)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 SUBMIT TO FIREBASE (ADDED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "enquiries"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        status: "new",
        createdAt: serverTimestamp(),
      });

      alert("Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {
      console.error("Enquiry error:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="bg-[#f9f7f2] p-8 md:p-10 rounded-xl shadow-sm border border-[#eee]">
      <form className="space-y-8" onSubmit={handleSubmit}>

        {/* NAME */}
        <div>
          <label className="text-xs tracking-widest uppercase text-stone-600">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full mt-2 border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-xs tracking-widest uppercase text-stone-600">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-2 border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-xs tracking-widest uppercase text-stone-600">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full mt-2 border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        {/* MESSAGE BOX */}
        <div>
          <label className="text-xs tracking-widest uppercase text-stone-600">
            Your Message *
          </label>
          <textarea
            rows="5"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your requirements..."
            className="w-full mt-3 border border-stone-300 rounded-md p-4 bg-white focus:outline-none focus:border-black transition resize-none"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-4 flex items-center justify-center gap-2 bg-black text-white py-4 rounded-md uppercase tracking-widest text-sm transition-all duration-300 hover:bg-[#c6a75e] hover:text-black"
        >
          Send Message
          <Send size={18} />
        </button>

      </form>
    </div>
  );
}

export default ContactForm;