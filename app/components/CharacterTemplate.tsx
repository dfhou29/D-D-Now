"use client";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import React from "react";
import NestedTextInput from "./NestedTextInput";
import { useRouter } from "next/navigation";

export const CharacterContext = React.createContext<any>(undefined);

export default function CharacterTemplate({ user_id }) {
  const [character, setCharacter] = useState({
    id: "",
    user_id: "",
    name: "",
    race: "",
    rank: "",
    background: "",
    alignment: "",
    level: "",
    armorClass: "",
    abilityScores: {
      strength: "",
      dexterity: "",
      constitution: "",
      intelligence: "",
      wisdom: "",
      charisma: "",
    },
    hitPoints: "",
    hitDice: "",
    proficiencies: {
      // Proficiency1: {
      //   description: "",
      // },
      // Proficiency2: {
      //   description: "Description about Proficiency2",
      // },
    },
    racialTraits: {
      // Trait1: {
      //   description: "Description about Trait1",
      // },
      // Trait2: {
      //   description: "Description about Trait2",
      // },
    },
    classFeatures: {
      // Feature1: {
      //   description: "Description about Feature1",
      // },
      // Feature2: {
      //   description: "Description about Feature2",
      // },
    },
    equipments: {
      // Equipment1: {
      //   description: "Description about Equipment1",
      // },
      // Equipment2: {
      //   description: "Description about Equipment2",
      // },
    },
    spells: {
      // cantrips: {
      //   "Mage Hand": {
      //     description: "Description about Mage Hand spell",
      //   },
      //   Prestidigitation: {
      //     description: "Description about Prestidigitation spell",
      //   },
      // },
      // level1: {
      //   "Mage Armor": {
      //     description: "Description about Mage Armor spell",
      //   },
      //   "Magic Missile": {
      //     description: "Description about Magic Missile spell",
      //   },
      // },
    },
    personality: "",
    ideals: "",
    bonds: "",
    flaws: "",
    backstory: "",
    age: "",
    height: "",
    weight: "",
    eyes: "",
    skin: "",
    hair: "",
  });

  const router = useRouter();

  useEffect(() => {
    const storedCharacter: any = localStorage.getItem("character");
    console.log("stored character:", JSON.parse(storedCharacter));
    if (storedCharacter) {
      const parsedCharacter = JSON.parse(storedCharacter);
      parsedCharacter["user_id"] = user_id;
      setCharacter(parsedCharacter);
    }
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    console.log("Character when submit", character);

    event.preventDefault();

    const numberFields = [
      "level",
      "age",
      "hitPoints",
      "armorClass",
      "id",
      "user_id",
    ];

    const rawData = { ...character };

    // convert string to number for number field
    numberFields.forEach((field) => {
      let values = rawData[field];
      if (typeof values === "string") {
        rawData[field] = parseInt(values);
        console.log(field, rawData[field]);
      }
    });

    const generateParams = (data) => {
      return Object.entries(data)
        .map(([key, value]) => {
          if (typeof value === "object") {
            return `${key}=${encodeURIComponent(JSON.stringify(value))}`;
          } else if (typeof value === "string" || typeof value === "number") {
            return `${key}=${encodeURIComponent(value)}`;
          }
        })
        .join("&");
    };

    if (rawData.id) {
      const searchParams = generateParams(rawData);
      console.log("update");
      console.log("update character with id:", rawData.id);
      console.log("searchParams", searchParams);
      const endpoint = `/api/update-character?${searchParams}`;
      fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("request passed");
          console.log("response data:", data);
          const { id, user_id } = data;
          localStorage.removeItem("character");
          router.refresh();
          router.push(`/character/${id}`);
        })
        .catch((error) => console.error("Update Error:", error));
    } else {
      console.log("insert");
      const endpoint = `/api/add-character?${generateParams(rawData)}`;

      fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const { id, user_id } = data;
          localStorage.removeItem("character");
          router.refresh();
          router.push(`/character/${id}`);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <CharacterContext.Provider value={{ setCharacter, character }}>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            {/* basic info section */}
            <div className="text-gray-600 text-xl font-semibold mb-2 text-center capitalize my-8">
              <p>Character Basics</p>
            </div>
            <div className="flex flex-row flex-wrap">
              <div className="w-1/3 p-4">
                <TextInput
                  title="Name"
                  label="name"
                  onKeyPress={handleKeyPress}
                  required={true}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Race"
                  label="race"
                  onKeyPress={handleKeyPress}
                  required={true}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Rank"
                  label="rank"
                  onKeyPress={handleKeyPress}
                  required={true}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Background"
                  label="background"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Alignment"
                  label="alignment"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Level"
                  label="level"
                  onKeyPress={handleKeyPress}
                  required={true}
                />
              </div>
            </div>
            <div className="text-gray-600 text-xl font-semibold mb-2 text-center capitalize my-8">
              <p>Physical Attributes</p>
            </div>
            {/* appearance */}
            <div className="flex flex-row flex-wrap">
              <div className="w-1/3 p-4">
                <TextInput
                  title="Age"
                  label="age"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Height"
                  label="height"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Weight"
                  label="weight"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Eyes"
                  label="eyes"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Skin"
                  label="skin"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Hair"
                  label="hair"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
            </div>
            <div className="text-gray-600 text-xl font-semibold mb-2 text-center capitalize my-8">
              <p>Defensive Stats</p>
            </div>
            <div className="flex flex-row flex-wrap">
              <div className="w-1/3 p-4">
                <TextInput
                  title="Armor Class"
                  label="armorClass"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Hit Points"
                  label="hitPoints"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="w-1/3 p-4">
                <TextInput
                  title="Hit Dice"
                  label="hitDice"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
            </div>
            <div className="text-gray-600 text-xl font-semibold mb-2 text-center capitalize my-8">
              <p>Character Insights</p>
            </div>
            <div className="flex flex-col">
              <div className="p-4">
                <TextInput
                  title="Personality"
                  label="personality"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="p-4">
                <TextInput
                  title="Ideals"
                  label="ideals"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="p-4">
                <TextInput
                  title="Bonds"
                  label="bonds"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="p-4">
                <TextInput
                  title="Flaws"
                  label="flaws"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
              <div className="p-4">
                <TextInput
                  title="Backstory"
                  label="backstory"
                  onKeyPress={handleKeyPress}
                  required={false}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="p-4">
                <NestedTextInput title="Ability Scores" label="abilityScores" />
              </div>
              <div className="p-4">
                <NestedTextInput title="Spells" label="spells" />
              </div>
              <div className="p-4">
                <NestedTextInput title="Proficiencies" label="proficiencies" />
              </div>
              <div className="p-4">
                <NestedTextInput title="Racial Traits" label="racialTraits" />
              </div>
              <div className="p-4">
                <NestedTextInput title="Class Features" label="classFeatures" />
              </div>
              <div className="p-4">
                <NestedTextInput title="Equipments" label="equipments" />
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </CharacterContext.Provider>
  );
}
