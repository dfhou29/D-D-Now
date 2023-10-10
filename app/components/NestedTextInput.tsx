import { useContext } from "react";
import { CharacterContext } from "./CharacterTemplate";
import NestedObject from "./NestedObject";

export default function NestedTextInput({ label, title }) {
  const { character } = useContext(CharacterContext);

  return (
    <div className="flex flex-col">
      <label className="text-gray-600 text-xl font-bold mb-2 text-center capitalize">
        {title}
      </label>
      <NestedObject obj={character[label]} path={[label]} />
    </div>
  );
}
