import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import { loginUser, googleLogin, forgotPassword } from "../services/authService";

export default function Login({ isModal = false, onClose }) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [showForgot,setShowForgot] = useState(false);
  const [resetMessage,setResetMessage] = useState("");

  // 🔥 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setResetMessage("");

      await loginUser(email,password);

      if(isModal && onClose){
        onClose();
      }

    } catch (err) {
      if (err.message?.toLowerCase().includes("verify")) {
        setError("Please verify your email before login.");
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GOOGLE LOGIN (FULL SAFE HANDLER)
  const handleGoogleLogin = async () => {
    try {

      setError("");
      setResetMessage("");
      setLoading(true);

      const user = await googleLogin();

      // if login success close modal
      if(user && isModal && onClose){
        onClose();
      }

    } catch (err) {

      // Ignore popup closed by user
      if (err.code === "auth/popup-closed-by-user") {
        return;
      }

      // Popup blocked
      if (err.code === "auth/popup-blocked") {
        setError("Popup blocked. Please allow popups and try again.");
        return;
      }

      // Unauthorized domain
      if (err.code === "auth/unauthorized-domain") {
        setError("Domain not authorized for Google login.");
        return;
      }

      console.error("Google Login Error:", err);
      setError("Google login failed. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  // 🔥 FORGOT PASSWORD
  const handleForgotPassword = async () => {

    setError("");
    setResetMessage("");

    if (!email) {
      setError("Please enter your registered email.");
      return;
    }

    try {
      await forgotPassword(email);
      setResetMessage("Password reset link sent to your email.");
    } catch (err) {
      setError("Failed to send reset email.");
    }
  };

  // 🔥 FORGOT PASSWORD VIEW
  if (showForgot) {
    const forgotContent = (
      <>
        <div className="auth-title">Reset Password</div>
        <div className="auth-subtitle">
          Enter your registered email
        </div>

        <div className="auth-form">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          {error && <div className="auth-error">{error}</div>}
          {resetMessage && <div className="auth-success">{resetMessage}</div>}

          <button
            type="button"
            className="auth-btn"
            onClick={handleForgotPassword}
          >
            Send Reset Link
          </button>

          <div
            style={{
              marginTop:"15px",
              fontSize:"14px",
              cursor:"pointer",
              color:"#c9a227",
              textAlign:"center"
            }}
            onClick={()=> {
              setShowForgot(false);
              setError("");
              setResetMessage("");
            }}
          >
            Back to Login
          </div>
        </div>
      </>
    );

    if (isModal) return forgotContent;
    return <AuthLayout>{forgotContent}</AuthLayout>;
  }

  // 🔥 NORMAL LOGIN VIEW
  const content = (
    <>
      <div className="auth-title">Welcome Back</div>
      <div className="auth-subtitle">Continue to Rupkotha</div>

      <form onSubmit={handleLogin} className="auth-form">

        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {/* 🔥 Forgot Password Link */}
        <div
          style={{
            textAlign:"right",
            fontSize:"13px",
            marginBottom:"10px",
            cursor:"pointer",
            color:"#c9a227"
          }}
          onClick={()=> {
            setError("");
            setResetMessage("");
            setShowForgot(true);
          }}
        >
          Forgot Password?
        </div>

        {error && (
          <div className="auth-error">{error}</div>
        )}

        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="google-modern-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="google-icon"
          />
          Continue with Google
        </button>

      </form>
    </>
  );

  if (isModal) return content;

  return <AuthLayout>{content}</AuthLayout>;
}