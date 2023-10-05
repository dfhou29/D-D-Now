import { useEffect } from "react";

export default function OptionCard({
  value,
  handleUpdateItem,
  handleDeleteItem,
  register,
  index,
  label,
}) {
  return (
    <div>
      <input
        // {...register(`${label}[${index}]`)}
        type="text"
        value={value}
        onChange={(event) => handleUpdateItem(event, index)}
      />

      <button type="button" onClick={() => handleDeleteItem(index)}>
        Delete
      </button>
    </div>
  );
}

// add register for input
