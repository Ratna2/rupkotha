import React from "react";
import "../styles/auth.css";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h1>Rupkotha</h1>
        <p>Premium Jewellery Experience</p>
      </div>

      <div className="auth-right">
        {children}
      </div>
    </div>
  );
}