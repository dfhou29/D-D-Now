import React, { useContext } from "react";
import { CharacterContext } from "./CharacterTemplate";

export default function TextInput({ title, label }) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCharacter((prev) => ({
      ...prev,
      [label]: newValue,
    }));
  };
  return (
    <div>
      <label htmlFor={label}>{title}</label>
      <input type="text" value={character[label]} onChange={handleChange} />
    </div>
  );
}
