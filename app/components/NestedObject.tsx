import { useState, useContext } from "react";
import { set, unset } from "lodash";
import { CharacterContext } from "./CharacterTemplate";

export default function NestedObject({ obj, path }) {
  const isAtRoot = [...path].length === 1;
  const isAtAbilityScoresRoot = [...path].slice(-1)[0] === "abilityScores";
  const isAtSpellsRoot = [...path].slice(-1)[0] === "spells";
  const isAtSpellLevels = [...path][0] === "spells" && [...path].length === 2;
  const { setCharacter } = useContext(CharacterContext);

  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newSpellLevel, setNewSpellLevel] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleUpdate = (event, path) => {
    const currentValue = event.target.value;
    console.log("Updating path", path, "with value", currentValue);
    setCharacter((prev) => {
      const character = { ...prev };
      set(character, path, currentValue); // use lodash set method to set value to object using path
      return character;
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    // const upLevelPath = path.slice(0, -1); // go back a level
    setCharacter((prev) => {
      const character = { ...prev };
      unset(character, path);
      return character;
    });
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (newItemName && newItemDesc) {
      if (isAtSpellLevels) {
        setCharacter((prev) => {
          const character = { ...prev };
          set(character, [...path, newItemName, "description"], newItemDesc);
          return character;
        });
      } else {
        setCharacter((prev) => {
          const character = { ...prev };
          set(character, [...path, newItemName, "description"], newItemDesc);
          return character;
        });
      }
    } else {
      setErrorMessage(
        "Both the item name and description are required. Please fill in both fields."
      );
    }
    console.log(obj);
    setNewItemName("");
    setNewItemDesc("");
  };

  const handleAddSpellLevel = (event) => {
    event.preventDefault();
    if (newSpellLevel) {
      setErrorMessage("");
      setCharacter((prev) => {
        const character = { ...prev };
        set(character, [...path, newSpellLevel], {});
        return character;
      });
    } else {
      setErrorMessage(
        "Level name cannot be empty. Please enter the level name as 'Level x' (e.g. 'Level 1', 'Level 2') or 'Cantrips'."
      );
    }
    setNewSpellLevel("");
  };

  const handleDeleteSpellLevel = (event) => {
    event.preventDefault();
    setCharacter((prev) => {
      const character = { ...prev };
      unset(character, path);
      return character;
    });
  };

  return (
    // <div className="flex wrap">
    <div className="flex flex-col">
      {obj &&
        Object.entries(obj).map(([key, value]) => {
          const currentPath = [...path, key];

          return (
            <div key={key}>
              {typeof value === "object" ? (
                <div className="flex flex-col">
                  {key.includes("Cantrips") || key.includes("Level") ? (
                    <>
                      <div className="border-t-2 border-gray-300 my-4 w-full"></div>
                      <label className="text-xl self-center">{key}</label>
                    </>
                  ) : (
                    <label className="text-gray-600 text-md font-bold mb-2 self-start">
                      {key}
                    </label>
                  )}

                  <NestedObject obj={value} path={currentPath} />
                </div>
              ) : (
                <div key={key}>
                  {key !== "description" && (
                    <label className="text-gray-600 text-md font-bold mb-2 capitalize">
                      {key}
                    </label>
                  )}
                  {isAtAbilityScoresRoot ? (
                    <input
                      onKeyDown={handleKeyPress}
                      type="text"
                      value={value as string}
                      onChange={(event) => handleUpdate(event, currentPath)}
                      className="block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                    />
                  ) : (
                    <div className="w-full flex flex-col items-center">
                      <textarea
                        onKeyDown={handleKeyPress}
                        value={value as string}
                        onChange={(event) => handleUpdate(event, currentPath)}
                        className="block w-full h-16 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500 my-2"
                      />
                      <button
                        type="button"
                        className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full w-20 my-2 "
                        onClick={(event) => handleDelete(event)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      {/* to add new spell level category */}
      {isAtSpellsRoot && (
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-x-4">
            <label className="text-gray-600 text-md font-bold mb-2 self-center">
              New Level (format: Level x)
            </label>
            <input
              onKeyDown={handleKeyPress}
              type="text"
              placeholder=""
              value={newSpellLevel}
              onChange={(e) => setNewSpellLevel(e.target.value)}
              className="block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
            <button
              className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
              type="button"
              onClick={(event) => handleAddSpellLevel(event)}
            >
              Add Level
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          <div className="border-t-2 border-gray-300 my-4 w-full"></div>
        </div>
      )}
      {/* to add new spell under spell -> level */}
      {isAtSpellLevels && (
        <div className="flex flex-col justify-center items-center w-full my-12">
          <div className="flex justify-start items-center gap-x-4 w-full">
            <label className="text-gray-600 text-md font-bold mb-2">
              New Spell
            </label>
            <input
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="block w-60 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
            <input
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="description"
              value={newItemDesc}
              onChange={(e) => setNewItemDesc(e.target.value)}
              className="block flex-grow bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />

            <button
              type="button"
              className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
              onClick={(event) => handleAddItem(event)}
            >
              Add
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          <div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded-full my-8"
              type="button"
              onClick={(event) => handleDeleteSpellLevel(event)}
            >
              Delete Level
            </button>
          </div>
        </div>
      )}
      {/* add new name, description into current obj */}
      {!isAtSpellsRoot && !isAtAbilityScoresRoot && isAtRoot && (
        <div className="flex flex-col justify-center">
          <div className="flex my-12 gap-x-4">
            <label className="text-gray-600 text-md font-bold mb-2 self-center">
              New Item
            </label>
            <input
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="block w-60 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
            <input
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="description"
              value={newItemDesc}
              onChange={(e) => setNewItemDesc(e.target.value)}
              className="block flex-grow bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
            <button
              type="button"
              onClick={() => handleAddItem(event)}
              className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
            >
              Add
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          <div className="border-t-2 border-gray-300 my-4 w-full"></div>
        </div>
      )}
    </div>
  );
}
