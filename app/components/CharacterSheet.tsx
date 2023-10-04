"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OptionCardGroup from "./OptionCardGroup";

type FormValues = {
  name: string;
  race: string;
  rank: string; // class
  background: string;
  alignment: string;
  level: number | string;
  age: number | string;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
  strength: number | string;
  dexterity: number | string;
  constitution: number | string;
  intelligence: number | string;
  wisdom: number | string;
  charisma: number | string;
  hitPoints: number | string;
  hitDice: number | string;
  proficiencies: string[];
  racialTraits: string[];
  classFeatures: string[];
  equipments: string[];
  spells: string[];
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
};

type Character = {
  name: string;
  race: string;
  rank: string; // class
  background: string;
  alignment: string;
  level: any;
  age: number;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitPoints: string;
  hitDice: string;
  proficiencies: string[];
  racialTraits: string[];
  classFeatures: string[];
  equipments: string[];
  spells: string[];
  abilityScores: {
    charisma: number;
    constitution: number;
    dexterity: number;
    intelligence: number;
    strength: number;
    wisdom: number;
  };
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
};

export default function CharacterSheet() {
  // set up initial states
  const [character, setCharacter] = useState({
    name: "",
    race: "",
    rank: "", // class
    background: "",
    alignment: "",
    level: "",
    age: "",
    height: "",
    weight: "",
    eyes: "",
    skin: "",
    hair: "",
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
    hitPoints: "",
    hitDice: "",
    abilityScores: {
      charisma: "",
      constitution: "",
      dexterity: "",
      intelligence: "",
      strength: "",
      wisdom: "",
    },
    proficiencies: [""],
    racialTraits: [""],
    classFeatures: [""],
    spells: [""],
    equipments: [""],
    personality: "",
    ideals: "",
    bonds: "",
    flaws: "",
    backstory: "",
  });

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: character,
  });

  // useEffect to update fetch data from local storage to character

  useEffect(() => {
    const localData = localStorage.getItem("character");
    if (localData) {
      const parsedData = JSON.parse(localData);
      console.log(parsedData);
      setCharacter((prev) => ({
        ...prev,
        ...parsedData,
      }));
    } else {
      console.log("localstorage empty");
    }
  }, []);

  useEffect(() => {
    const primaryProps: any = [
      // porps without nested key value pair
      "name",
      "race",
      "rank",
      "background",
      "alignment",
      "level",
      "age",
      "height",
      "weight",
      "eyes",
      "skin",
      "hair",
      "hitPoints",
      "hitDice",
      "proficiencies",
      "racialTraits",
      "classFeatures",
      "equipments",
      "spells",
      "personality",
      "ideals",
      "bonds",
      "flaws",
      "backstory",
    ];

    primaryProps.forEach((prop) => {
      setValue(prop, character[prop]);
    });

    Object.entries(character.abilityScores).forEach(([key, value]) => {
      (setValue as any)(key, value);
    });
  }, [character]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <label htmlFor="name">Name </label>
      <input {...register("name")} id="name" />

      <label htmlFor="race">Race </label>
      <input {...register("race")} id="race" />

      <label htmlFor="rank">Class </label>
      <input {...register("rank")} id="rank" />

      <label htmlFor="background">Background </label>
      <input {...register("background")} id="background" />

      <label htmlFor="alignment">Alignment </label>
      <input {...register("alignment")} id="alignment" />

      <label htmlFor="level">Level </label>
      <input {...register("level")} id="level" type="number" />

      <label htmlFor="age">Age </label>
      <input {...register("age")} id="age" type="number" />

      <label htmlFor="height">Height </label>
      <input {...register("height")} id="height" />

      <label htmlFor="weight">Weight </label>
      <input {...register("weight")} id="weight" />

      <label htmlFor="eyes">Eyes </label>
      <input {...register("eyes")} id="eyes" />

      <label htmlFor="skin">Skin </label>
      <input {...register("skin")} id="skin" />

      <label htmlFor="hair">Hair </label>
      <input {...register("hair")} id="hair" />

      <label htmlFor="strength">Strength </label>
      <input {...register("strength")} id="strength" type="number" />

      <label htmlFor="dexterity">Dexterity </label>
      <input {...register("dexterity")} id="dexterity" type="number" />

      <label htmlFor="constitution">Constitution </label>
      <input {...register("constitution")} id="constitution" type="number" />

      <label htmlFor="intelligence">Intelligence </label>
      <input {...register("intelligence")} id="intelligence" type="number" />

      <label htmlFor="wisdom">Wisdom </label>
      <input {...register("wisdom")} id="wisdom" type="number" />

      <label htmlFor="charisma">Charisma </label>
      <input {...register("charisma")} id="charisma" type="number" />

      <label htmlFor="hitPoints">Hit Points </label>
      <input {...register("hitPoints")} id="hitPoint" />

      <label htmlFor="hitDice">Hit Dice </label>
      <input {...register("hitDice")} id="hitDice" />

      <label htmlFor="personality">Personality </label>
      <input {...register("personality")} id="personality" />

      <label htmlFor="ideals">Ideals </label>
      <input {...register("ideals")} id="ideals" />

      <label htmlFor="bonds">Bonds </label>
      <input {...register("bonds")} id="bonds" />

      <label htmlFor="flaws">Flaws </label>
      <input {...register("flaws")} id="flaws" />

      <label htmlFor="backstory">Backstory </label>
      <input {...register("backstory")} id="backstory" />

      <OptionCardGroup
        label="Proficiencies"
        name="proficiencies"
        character={character}
        setCharacter={setCharacter}
        items={character.proficiencies}
      />

      <OptionCardGroup
        label="Racial Traits"
        name="racialTraits"
        character={character}
        setCharacter={setCharacter}
        items={character.racialTraits}
      />

      <OptionCardGroup
        label="Class Features"
        name="classFeatures"
        character={character}
        setCharacter={setCharacter}
        items={character.classFeatures}
      />

      <OptionCardGroup
        label="Equipments"
        name="equipments"
        character={character}
        setCharacter={setCharacter}
        items={character.equipments}
      />

      <OptionCardGroup
        label="Proficiencies"
        name="proficiencies"
        character={character}
        setCharacter={setCharacter}
        items={character.proficiencies}
      />

      <OptionCardGroup
        label="Spells"
        name="spells"
        character={character}
        setCharacter={setCharacter}
        items={character.spells}
      />

      <input type="submit" value="submit" />
    </form>
  );
}
