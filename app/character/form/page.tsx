"use client";

import CharacterTemplate from "../../components/CharacterTemplate";

export default function NewCharacter() {
  // useEffect(() => {

  // })
  // const character = localStorage.getItem("character");

  return (
    <div>
      <h2>Character Sheet</h2>
      <p className="text-center">
        For user to customize based on gpt suggestion
      </p>
      <CharacterTemplate />
    </div>
  );
}
