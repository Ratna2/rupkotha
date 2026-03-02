import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";
import { db } from "../../firebase";
import emailjs from "@emailjs/browser";
import "../../assets/styles/adminEnquiry.css";

function Enquiry() {

  const [enquiries, setEnquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  // ================= LOAD ENQUIRIES =================
  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    const q = query(
      collection(db, "enquiries"),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    setEnquiries(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
    );
  };

  // ================= SEND REPLY =================
  const handleSendReply = async () => {
    if (!selected || !reply) return;

    try {

      // EMAIL SEND (EMAILJS)
      await emailjs.send(
        "service_eff3589",
        "template_d23rjys",
        {
          from_name: selected.name,
          from_email: selected.email,
          phone: selected.phone || "",
          original_message: selected.message,
          admin_reply: reply,
        },
        "Sds-mAuf4CgOVbZAr"
      );

      // WHATSAPP SEND
      if (selected.phone) {
        window.open(
          `https://wa.me/${selected.phone}?text=${encodeURIComponent(reply)}`
        );
      }

      // UPDATE FIREBASE
      await updateDoc(doc(db, "enquiries", selected.id), {
        reply,
        status: "replied"
      });

      alert("Reply sent successfully ✅");

      setReply("");
      setSelected(null);

      loadEnquiries();

    } catch (err) {
      console.error(err);
      alert("Reply failed ❌");
    }
  };

  return (
    <div className="admin-enquiry">

      <h1 className="title">Customer Enquiries</h1>

      <div className="layout">

        {/* LEFT LIST */}
        <div className="list-panel">

          {enquiries.map((e) => (
            <div
              key={e.id}
              className={`card ${
                selected?.id === e.id ? "active" : ""
              }`}
              onClick={() => setSelected(e)}
            >
              <h4>{e.name}</h4>
              <p>{e.email}</p>

              <span className={e.status || "new"}>
                {e.status || "new"}
              </span>
            </div>
          ))}

        </div>

        {/* RIGHT DETAILS */}
        <div className="detail-panel">

          {!selected ? (
            <p>Select enquiry to reply</p>
          ) : (
            <>
              <h2>{selected.name}</h2>

              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>

              <div className="message-box">
                {selected.message}
              </div>

              <textarea
                placeholder="Write your reply..."
                value={reply}
                onChange={(e) =>
                  setReply(e.target.value)
                }
              />

              <button
                className="send-btn"
                onClick={handleSendReply}
              >
                Send Reply
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Enquiry;