import { useContext } from "react";
import { CharacterContext } from "./CharacterTemplate";
import NestedObject from "./NestedObject";

export default function NestedTextInput({ label, title }) {
  const { character, setCharacter } = useContext(CharacterContext);

  return (
    <div className="flex flex-col justify-center text-center gap-y-2">
      <label className="text-2xl">{title}</label>
      <NestedObject obj={character[label]} path={[label]} />
    </div>
  );
}
