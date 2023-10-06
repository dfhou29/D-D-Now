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
        {...register(`${label}[${index}]`)}
        type="text"
        defaultValue={value}
        //onChange={(event) => handleUpdateItem(event, index)}
      />

      <button type="button" onClick={(e) => handleDeleteItem(e, index)}>
        Delete
      </button>
    </div>
  );
}

// add register for input
