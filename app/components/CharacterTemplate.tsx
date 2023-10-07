import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import React from "react";
import NestedTextInput from "./NestedTextInput";

export const CharacterContext = React.createContext<any>(undefined);

export default function CharacterTemplate() {
  const [character, setCharacter] = useState({
    name: "",
    race: "",
    rank: "",
    background: "",
    alignment: "",
    level: "",
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
    armors: {
      // Armor1: {
      //   description: "Description about Armor1",
      // },
      // Armor2: {
      //   description: "Description about Armor2",
      // },
    },
    personality: "Personality Description",
    ideals: "Ideals Description",
    bonds: "Bonds Description",
    flaws: "Flaws Description",
    backstory: "Character Backstory",
    age: "Age",
    height: "Height",
    weight: "Weight",
    eyes: "Eye Color",
    skin: "Skin Tone",
    hair: "Hair Color",
  });

  useEffect(() => {
    const storedCharacter: any = localStorage.getItem("character");
    console.log(JSON.parse(storedCharacter));
    if (storedCharacter) {
      const parsedCharacter = JSON.parse(storedCharacter);
      setCharacter(parsedCharacter);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const numberFields = ["level", "age", "hitPoints"];

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

    const endpoint = `/api/db/add-character?${generateParams(rawData)}`;

    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <CharacterContext.Provider value={{ setCharacter, character }}>
      <div>
        <form
          className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center justify-items-center"
          onSubmit={handleSubmit}
        >
          <TextInput title="Name" label="name" />
          <TextInput title="Race" label="race" />
          <TextInput title="Rank" label="rank" />
          <TextInput title="Background" label="background" />
          <TextInput title="Alignment" label="alignment" />
          <TextInput title="Level" label="level" />
          <TextInput title="Hit Points" label="hitPoints" />
          <TextInput title="Hit Dice" label="hitDice" />
          <TextInput title="Personality" label="personality" />
          <TextInput title="Ideals" label="ideals" />
          <TextInput title="Bonds" label="bonds" />
          <TextInput title="Flaws" label="flaws" />
          <TextInput title="Backstory" label="backstory" />
          <TextInput title="Age" label="age" />
          <TextInput title="Height" label="height" />
          <TextInput title="Weight" label="weight" />
          <TextInput title="Eyes" label="eyes" />
          <TextInput title="Skin" label="skin" />
          <TextInput title="Hair" label="hair" />

          <NestedTextInput title="AbilityScores" label="abilityScores" />

          <NestedTextInput title="Spells" label="spells" />

          <NestedTextInput title="Proficiencies" label="proficiencies" />

          <NestedTextInput title="RacialTraits" label="racialTraits" />

          <NestedTextInput title="ClassFeatures" label="classFeatures" />

          <NestedTextInput title="Equipments" label="equipments" />

          <NestedTextInput title="Armors" label="armors" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </CharacterContext.Provider>
  );
}
