"use client";

import CharacterTemplate from "../../components/CharacterTemplate";

export default function NewCharacter() {
  return (
    <div>
      <h2 className="text-center text-4xl">Character Sheet</h2>
      <p className="text-center">
        For user to customize based on gpt suggestion
      </p>
      <CharacterTemplate />
    </div>
  );
}
