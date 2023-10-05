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
  level: number;
  age: number;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  hitPoints: number;
  hitDice: string;
  proficiencies: string[];
  racialTraits: string[];
  classFeatures: string[];
  equipments: string[];
  spells: {
    [key: string]: string[];
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
    level: 0,
    age: 0,
    height: "",
    weight: "",
    eyes: "",
    skin: "",
    hair: "",
    hitPoints: 0,
    hitDice: "",
    abilityScores: {
      charisma: 0,
      constitution: 0,
      dexterity: 0,
      intelligence: 0,
      strength: 0,
      wisdom: 0,
    },
    proficiencies: [],
    racialTraits: [],
    classFeatures: [],
    spells: {},
    equipments: [],
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

      setCharacter((prev) => ({
        ...prev,
        ...parsedData,
      }));

      for (const key in parsedData) {
        (setValue as any)(key, parsedData[key]);
      }
    } else {
      console.log("localstorage empty");
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // type conversion before submission
        data.level = Number(data.level);
        data.age = Number(data.age);
        data.hitPoints = Number(data.hitPoints);

        console.log("character before submission: ", character);
        console.log("data before submission: ", data);
        for (const ability in data.abilityScores) {
          data.abilityScores[ability] = Number(data.abilityScores[ability]);
        }
        const reqJSON = JSON.stringify(data);
        localStorage.setItem("character", reqJSON);
        //console.log(reqJSON);
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
      <input
        {...register("abilityScores.strength")}
        id="strength"
        type="number"
      />

      <label htmlFor="dexterity">Dexterity </label>
      <input
        {...register("abilityScores.dexterity")}
        id="dexterity"
        type="number"
      />

      <label htmlFor="constitution">Constitution </label>
      <input
        {...register("abilityScores.constitution")}
        id="constitution"
        type="number"
      />

      <label htmlFor="intelligence">Intelligence </label>
      <input
        {...register("abilityScores.intelligence")}
        id="intelligence"
        type="number"
      />

      <label htmlFor="wisdom">Wisdom </label>
      <input {...register("abilityScores.wisdom")} id="wisdom" type="number" />

      <label htmlFor="charisma">Charisma </label>
      <input
        {...register("abilityScores.charisma")}
        id="charisma"
        type="number"
      />

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
        label="Racial Traits"
        optionName="racialTraits"
        character={character}
        setCharacter={setCharacter}
        register={register}
        setValue={setValue}
        items={character.racialTraits}
      />

      <OptionCardGroup
        label="Class Features"
        optionName="classFeatures"
        character={character}
        setCharacter={setCharacter}
        register={register}
        setValue={setValue}
        items={character.classFeatures}
      />

      <OptionCardGroup
        label="Equipments"
        optionName="equipments"
        character={character}
        setCharacter={setCharacter}
        register={register}
        items={character.equipments}
        setValue={setValue}
      />

      <OptionCardGroup
        label="Proficiencies"
        optionName="proficiencies"
        character={character}
        setCharacter={setCharacter}
        register={register}
        setValue={setValue}
        items={character.proficiencies}
      />
      {/* 
      <OptionCardGroup
        label="Spells"
        optionName="spells"
        character={character}
        setCharacter={setCharacter}
        register={register}
        items={character.spells}
      /> */}

      <input type="submit" value="submit" />
    </form>
  );
}
