import { useState } from "react";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore"; // ⭐ ADDED

function ReviewModal({ onClose, onSubmit }) {

  const [step,setStep] = useState(1);
  const [rating,setRating] = useState(5);
  const [text,setText] = useState("");
  const [media,setMedia] = useState("");

  const handleFile = async (e)=>{
    const file = e.target.files[0];
    if(!file) return;

    const url = await uploadToCloudinary(file);
    setMedia(url);
  };

  const submit = ()=>{

    const auth = getAuth();
    const user = auth.currentUser;

    onSubmit({
        rating,
        text,
        image: media,

        // ⭐ USER DATA FROM FIREBASE
        userName:
          user?.displayName ||
          user?.email?.split("@")[0] ||
          "Anonymous",

        // ⭐ FIREBASE SAFE TIMESTAMP (FIXED)
        createdAt: serverTimestamp(),

        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    });
  };

  return (
    <div className="review-overlay">

      <div className="review-modal">

        {/* STEP 1 */}
        {step===1 && (
          <>
            <h2>How was your experience?</h2>

            <div className="stars-input">
              {[1,2,3,4,5].map(s=>(
                <span
                  key={s}
                  className={s<=rating?"active":""}
                  onClick={()=>setRating(s)}
                >
                  ⭐
                </span>
              ))}
            </div>

            <button onClick={()=>setStep(2)}>
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step===2 && (
          <>
            <h2>Add Photo / Video</h2>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFile}
            />

            {media && <p>Uploaded ✔</p>}

            <div className="review-actions">
              <button onClick={()=>setStep(1)}>Back</button>
              <button onClick={()=>setStep(3)}>Next</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step===3 && (
          <>
            <h2>Tell us more</h2>

            <textarea
              value={text}
              onChange={(e)=>setText(e.target.value)}
              placeholder="Share your experience..."
            />

            <div className="review-actions">
              <button onClick={()=>setStep(2)}>Back</button>
              <button onClick={submit}>Submit</button>
            </div>
          </>
        )}

        <button className="close-modal" onClick={onClose}>
          ✕
        </button>

      </div>
    </div>
  );
}

export default ReviewModal;