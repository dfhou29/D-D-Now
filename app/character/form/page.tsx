"use client";

import { useEffect } from "react";
import CharacterSheet from "../../components/CharacterSheet";

export default function NewCharacter() {
  // useEffect(() => {

  // })
  // const character = localStorage.getItem("character");

  return (
    <div>
      <h2>Character Sheet</h2>
      <p>For user to customize based on gpt suggestion</p>
      <CharacterSheet />
    </div>
  );
}
