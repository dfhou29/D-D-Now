import OptionCard from "./OptionCard";

export default function OptionCardGroup({
  name,
  label,
  items,
  character,
  setCharacter,
}) {
  const handleUpdateItem = (event, index) => {
    const value = event.target.value;
    const storedItems = [...items];
    storedItems[index] = value;

    setCharacter((prev) => ({
      ...prev,
      [name]: storedItems,
    }));
  };

  const handleDeleteItem = (index) => {
    const storedItems = [...items];
    storedItems.splice(index, 1);

    setCharacter((prev) => ({
      ...prev,
      [name]: storedItems,
    }));
  };

  const handleAddItem = () => {
    const storedItems = [...items, ""];
    setCharacter((prev) => ({
      ...prev,
      [name]: storedItems,
    }));
  };

  return (
    <div>
      <label>
        <p>{label}</p>
        {character[name].map((item, index) => (
          <OptionCard
            key={index}
            value={item}
            onChange={(event) => handleUpdateItem(event, index)}
            onDelete={() => handleDeleteItem(index)}
          />
        ))}
      </label>
      <button type="button" onClick={handleAddItem}>
        Add {label}
      </button>
    </div>
  );
}
