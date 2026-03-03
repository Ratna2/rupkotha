import LegalLayout from "../components/LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">

      <h2>1. Information We Collect</h2>
      <ul>
        <li>Name, email, phone number</li>
        <li>Shipping and billing address</li>
        <li>Order history and wishlist</li>
        <li>Technical data (IP address, browser type)</li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>Order processing and delivery</li>
        <li>Customer support</li>
        <li>Fraud prevention</li>
        <li>Marketing communication (with consent)</li>
      </ul>

      <h2>3. Payment Security</h2>
      <p>
        We do not store card details. All transactions are processed via
        secure third-party gateways using SSL encryption.
      </p>

      <h2>4. Data Protection</h2>
      <p>
        We implement strict security measures including encrypted
        authentication and secure cloud storage.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You may request access, correction, or deletion of your data by
        contacting privacy@rupkotha.com.
      </p>

    </LegalLayout>
  );
}