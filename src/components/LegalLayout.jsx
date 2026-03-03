import "../assets/styles/legal.css";

export default function LegalLayout({ title, children }) {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>{title}</h1>
        <p className="legal-subtitle">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="legal-content">
          {children}
      </div>
    </div>
  );
}