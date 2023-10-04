"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormOption from "./FormOption";
import {
  loadRaces,
  loadBackgrounds,
  loadClasses,
  loadAlignments,
  loadLevels,
} from "../../helper/loadData";

export default function CharacterForm() {
  const [race, setRace] = useState("Random");
  const [background, setBackground] = useState("Random");
  const [rank, setRank] = useState("Random"); // use rank instead of class to avoid reserved key word
  const [alignment, setAlignment] = useState("Random");
  const [level, setLevel] = useState("Random");

  const router = useRouter();

  const handleRace = (event) => {
    setRace(event.target.value);
  };

  const handleBackground = (event) => {
    setBackground(event.target.value);
  };

  const handleRank = (event) => {
    setRank(event.target.value);
  };

  const handleAlignment = (event) => {
    setAlignment(event.target.value);
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/new-character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        race: race,
        background: background,
        rank: rank,
        alignment: alignment,
        level: level,
      }),
    });

    const character = await response.json();
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(character));

    router.push("/character/form");
  };

  const races = loadRaces();
  const backgrounds = loadBackgrounds();
  const classes = loadClasses();
  const alignments = loadAlignments();
  const levels = loadLevels();

  return (
    <form onSubmit={handleSubmit}>
      <FormOption
        title="race"
        selections={races}
        value={race}
        onChange={handleRace}
      />
      <FormOption
        title="background"
        selections={backgrounds}
        value={background}
        onChange={handleBackground}
      />
      <FormOption
        title="class"
        selections={classes}
        value={rank}
        onChange={handleRank}
      />
      <FormOption
        title="alignment"
        selections={alignments}
        value={alignment}
        onChange={handleAlignment}
      />
      <FormOption
        title="level"
        selections={levels}
        value={level}
        onChange={handleLevel}
      />
      <input type="submit" value="Generate" />
    </form>
  );
}
