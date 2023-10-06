import { useContext, useState } from "react";
import { CharacterContext } from "./CharacterTemplate";
import NestedObject from "./NestedObject";

import { set, unset } from "lodash"; // to set nested obj

export default function NestedTextInput({ label, title }) {
  const { character, setCharacter } = useContext(CharacterContext);

  const currentItems = character[label];

  const handleUpdate = (event, path) => {
    const currentValue = event.target.value;
    setCharacter((prev) => {
      const character = { ...prev };
      set(character, path, currentValue); // use lodash set method to set value to object using path
      return character;
    });
  };

  const handleDelete = (path) => {
    const upLevelPath = path.slice(0, -1); // go back a level
    setCharacter((prev) => {
      const character = { ...prev };
      unset(character, upLevelPath);
      return character;
    });
  };

  const renderChilds = (currentItems, path) => {
    return (
      <>
        {Object.entries(currentItems).map(([key, value]) => {
          const currentPath = [...path, key]; // add key into path arr

          return (
            <div key={key}>
              <label className="">{key}</label>
              {typeof value !== "object" ? (
                <div>
                  <input
                    type="text"
                    value={value as string}
                    onChange={(event) => handleUpdate(event, currentPath)}
                  />
                </div>
              ) : (
                <NestedObject
                  obj={value}
                  path={currentPath}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <label>{title}</label>

      {/* initialize path array with label */}
      {renderChilds(currentItems, [label])}
    </div>
  );
}
