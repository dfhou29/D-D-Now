import React, { useContext } from "react";
import { CharacterContext } from "./CharacterTemplate";

export default function TextInput({ title, label, onKeyPress }) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCharacter((prev) => ({
      ...prev,
      [label]: newValue,
    }));
  };
  return (
    <div className="flex flex-row justify-center mb-3 gap-x-4">
      <label htmlFor={label}>{title}</label>
      <input
        type="text"
        className="text-center"
        value={character[label]}
        onChange={handleChange}
        onKeyDown={onKeyPress}
      />
    </div>
  );
}
