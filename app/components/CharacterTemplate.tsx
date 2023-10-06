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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formJSON = JSON.stringify(character);
    console.log(character);
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

          <button type="submit">Submit</button>
        </form>
      </div>
    </CharacterContext.Provider>
  );
}
