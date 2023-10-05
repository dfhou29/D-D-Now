export default function FormText({ name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name}>{name} </label>
      <input type="text" id={name} onChange={onChange} value={value} />
    </div>
  );
}
