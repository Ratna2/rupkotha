import "../../assets/styles/authInput.css";

const AuthInput = ({ label, type, value, onChange }) => {
  return (
    <div className="input-group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
      />
      <label>{label}</label>
    </div>
  );
};

export default AuthInput;