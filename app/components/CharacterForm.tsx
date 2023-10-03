"use client";

import { useState } from "react";
import FormOption from "./FormOption";
import {
  loadRaces,
  loadBackgrounds,
  loadClasses,
  loadAlignments,
} from "../../helper/loadData";

export default function CharacterForm() {
  const [race, setRace] = useState("Random");
  const [background, setBackground] = useState("Random");
  const [rank, setRank] = useState("Random"); // use rank instead of class to avoid reserved key word
  const [alignment, setAlignment] = useState("Random");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        race: race,
        background: background,
        class: rank,
        alignment: alignment,
      }),
    });
  };

  const races = loadRaces();
  const backgrounds = loadBackgrounds();
  const classes = loadClasses();
  const alignments = loadAlignments();

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
      <input type="submit" value="Generate" />
    </form>
  );
}
