"use client";

import { useEffect } from "react";
import CharacterSheet from "../../components/CharacterSheet";
import CharacterTemplate from "../../components/CharacterTemplate";

export default function NewCharacter() {
  // useEffect(() => {

  // })
  // const character = localStorage.getItem("character");

  return (
    <div>
      <h2>Character Sheet</h2>
      <p>For user to customize based on gpt suggestion</p>
      <CharacterTemplate />
    </div>
  );
}
