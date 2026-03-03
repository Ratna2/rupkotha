import React, { useState, useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import { registerUser, resendVerificationEmail } from "../services/authService";
import { auth } from "../../firebase";

export default function Signup({ isModal = false, onClose }) {

  const [form, setForm] = useState({
    firstName:"",
    lastName:"",
    username:"",
    phone:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [waitingVerification,setWaitingVerification] = useState(false);

  const getPasswordStrength = (password) => {
    if(password.length < 6) return "Weak";
    if(password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) return "Medium";
    if(password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)) return "Strong";
    return "Weak";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.password !== form.confirmPassword){
      setError("Passwords do not match");
      return;
    }

    try{
      setLoading(true);
      setError("");
      setSuccess("");

      await registerUser(form);

      setWaitingVerification(true);
      setSuccess("Account created! Please verify your email.");

    }catch(err){
      setError("Signup failed. Try again.");
    }finally{
      setLoading(false);
    }
  };

  // 🔥 Auto check verification every 3 seconds
  useEffect(() => {
    let interval;

    if (waitingVerification) {
      interval = setInterval(async () => {
        await auth.currentUser?.reload();
        if (auth.currentUser?.emailVerified) {
          if (onClose) onClose();
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [waitingVerification, onClose]);

  const passwordStrength = getPasswordStrength(form.password);

  // 🔥 VERIFICATION SCREEN
  if (waitingVerification) {
    const verificationContent = (
      <>
        <div className="auth-title">Verify Your Email</div>
        <div className="auth-subtitle">
          We sent a verification link to your email.
        </div>

        <button
          className="auth-btn"
          onClick={async () => {
            await auth.currentUser?.reload();
            if (auth.currentUser?.emailVerified) {
              if (onClose) onClose();
            } else {
              alert("Email not verified yet.");
            }
          }}
        >
          I Have Verified
        </button>

        <div
          style={{
            marginTop: "15px",
            cursor: "pointer",
            color: "#c9a227",
            textAlign: "center"
          }}
          onClick={async () => {
            await resendVerificationEmail();
            alert("Verification email resent.");
          }}
        >
          Resend Verification Email
        </div>
      </>
    );

    if (isModal) return verificationContent;
    return <AuthLayout>{verificationContent}</AuthLayout>;
  }

  // 🔥 NORMAL SIGNUP FORM
  const content = (
    <>
      <div className="auth-title">Create Account</div>
      <div className="auth-subtitle">Join Rupkotha today</div>

      <form onSubmit={handleSubmit} className="auth-form signup-compact">

        <div className="grid-2">
          <AuthInput
            label="First Name"
            type="text"
            value={form.firstName}
            onChange={(e)=>setForm({...form, firstName:e.target.value})}
          />

          <AuthInput
            label="Last Name"
            type="text"
            value={form.lastName}
            onChange={(e)=>setForm({...form, lastName:e.target.value})}
          />
        </div>

        <AuthInput
          label="Username"
          type="text"
          value={form.username}
          onChange={(e)=>setForm({...form, username:e.target.value})}
        />

        <AuthInput
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={(e)=>setForm({...form, phone:e.target.value})}
        />

        <AuthInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(e)=>setForm({...form, email:e.target.value})}
        />

        <AuthInput
          label="Password"
          type="password"
          value={form.password}
          onChange={(e)=>setForm({...form, password:e.target.value})}
        />

        {form.password && (
          <div className="password-strength">
            Strength: {passwordStrength}
          </div>
        )}

        <AuthInput
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={(e)=>setForm({...form, confirmPassword:e.target.value})}
        />

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

      </form>
    </>
  );

  if (isModal) return content;

  return <AuthLayout>{content}</AuthLayout>;
}