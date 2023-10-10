"use client";

import CharacterTemplate from "../../../components/CharacterTemplate";
export const revalidate = 0;
export default function EditCharacter() {
  return (
    <div>
      <p>Edit character</p>
      <CharacterTemplate />
    </div>
  );
}
