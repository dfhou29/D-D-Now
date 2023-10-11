import React, { useContext } from "react";
import { CharacterContext } from "./CharacterTemplate";

export default function TextInput({
  title,
  label,
  onKeyPress,
  required,
  height,
}) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCharacter((prev) => ({
      ...prev,
      [label]: newValue,
    }));
  };
  return (
    <div className="flex flex-col justify-center mb-3 gap-x-4">
      <label
        className="text-gray-600 text-md font-bold mb-2 self-start capitalize"
        htmlFor={label}
      >
        {title}
      </label>
      <textarea
        className={`block w-full ${
          height ? height : ""
        } bg-gray-100 text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:border-gray-500 whitespace-normal resize-none`}
        value={character[label]}
        onChange={handleChange}
        onKeyDown={onKeyPress}
        required={required}
      />
    </div>
  );
}
