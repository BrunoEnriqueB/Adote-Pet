import "./Input.css";


export default function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
  required
}) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={required}
        {...(multiple ? { multiple } : '')}
      />
    </div>
  );
}
