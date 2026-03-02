import { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "../../assets/styles/myAddress.css";

const TRIPURA_DISTRICTS = [
  "West Tripura",
  "Sepahijala",
  "Khowai",
  "Gomati",
  "South Tripura",
  "Dhalai",
  "Unakoti",
  "North Tripura"
];

export default function AddAddress() {

  const [form, setForm] = useState({
    firstName:"",
    lastName:"",
    phone:"",
    address1:"",
    address2:"",
    district:"",
    city:"",
    pincode:"",
    isDefault:false,
  });

  const isTripuraPin = (pin) => /^79\d{4}$/.test(pin);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!isTripuraPin(form.pincode)){
      alert("Delivery available ONLY inside Tripura.");
      return;
    }

    const user = auth.currentUser;

    await addDoc(
      collection(db,"users",user.uid,"addresses"),
      {
        ...form,
        createdAt: serverTimestamp()
      }
    );

    alert("Address Added Successfully");
  };

  return (
    <div className="address-wrapper">

      <h2>Add New Address</h2>

      <form onSubmit={handleSubmit} className="address-form">

        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />

        <input name="address1" placeholder="Address Line 1" onChange={handleChange} required />
        <input name="address2" placeholder="Address Line 2" onChange={handleChange} />

        <select name="district" onChange={handleChange} required>
          <option value="">Select District</option>
          {TRIPURA_DISTRICTS.map(d=>(
            <option key={d}>{d}</option>
          ))}
        </select>

        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />

        <label>
          <input type="checkbox" name="isDefault" onChange={handleChange}/>
          Set as default address
        </label>

        <button type="submit">Save Address</button>

      </form>

    </div>
  );
}