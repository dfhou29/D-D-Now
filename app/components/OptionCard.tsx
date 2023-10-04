import { on } from "events";

export default function OptionCard({ value, onChange, onDelete }) {
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
