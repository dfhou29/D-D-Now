"use client";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import React from "react";
import NestedTextInput from "./NestedTextInput";
import { useRouter } from "next/navigation";

export const CharacterContext = React.createContext<any>(undefined);

export default function CharacterTemplate() {
  const [character, setCharacter] = useState({
    id: "",
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
      setCharacter(parsedCharacter);
    }
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    console.log("Charactter when submit", character);

    event.preventDefault();

    const numberFields = ["level", "age", "hitPoints", "armorClass", "id"];

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
      const endpoint = `/api/db/update-character?${searchParams}`;
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
          router.push(`/character/${id}`);
        })
        .catch((error) => console.error("Update Error:", error));
    } else {
      console.log("insert");
      const endpoint = `/api/db/add-character?${generateParams(rawData)}`;

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
          router.push(`/character/${id}`);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <CharacterContext.Provider value={{ setCharacter, character }}>
      <div>
        <form
          className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center justify-items-center"
          onSubmit={handleSubmit}
        >
          <TextInput title="Name" label="name" onKeyPress={handleKeyPress} />
          <TextInput title="Race" label="race" onKeyPress={handleKeyPress} />
          <TextInput title="Rank" label="rank" onKeyPress={handleKeyPress} />
          <TextInput
            title="Background"
            label="background"
            onKeyPress={handleKeyPress}
          />
          <TextInput
            title="Alignment"
            label="alignment"
            onKeyPress={handleKeyPress}
          />
          <TextInput title="Level" label="level" onKeyPress={handleKeyPress} />
          <TextInput
            title="Armor Class"
            label="armorClass"
            onKeyPress={handleKeyPress}
          />
          <TextInput
            title="Hit Points"
            label="hitPoints"
            onKeyPress={handleKeyPress}
          />
          <TextInput
            title="Hit Dice"
            label="hitDice"
            onKeyPress={handleKeyPress}
          />
          <TextInput
            title="Personality"
            label="personality"
            onKeyPress={handleKeyPress}
          />
          <TextInput
            title="Ideals"
            label="ideals"
            onKeyPress={handleKeyPress}
          />
          <TextInput title="Bonds" label="bonds" onKeyPress={handleKeyPress} />
          <TextInput title="Flaws" label="flaws" onKeyPress={handleKeyPress} />
          <TextInput
            title="Backstory"
            label="backstory"
            onKeyPress={handleKeyPress}
          />
          <TextInput title="Age" label="age" onKeyPress={handleKeyPress} />
          <TextInput
            title="Height"
            label="height"
            onKeyPress={handleKeyPress}
          />
          <TextInput
            title="Weight"
            label="weight"
            onKeyPress={handleKeyPress}
          />
          <TextInput title="Eyes" label="eyes" onKeyPress={handleKeyPress} />
          <TextInput title="Skin" label="skin" onKeyPress={handleKeyPress} />
          <TextInput title="Hair" label="hair" onKeyPress={handleKeyPress} />

          <NestedTextInput title="AbilityScores" label="abilityScores" />

          <NestedTextInput title="Spells" label="spells" />

          <NestedTextInput title="Proficiencies" label="proficiencies" />

          <NestedTextInput title="RacialTraits" label="racialTraits" />

          <NestedTextInput title="ClassFeatures" label="classFeatures" />

          <NestedTextInput title="Equipments" label="equipments" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </CharacterContext.Provider>
  );
}
