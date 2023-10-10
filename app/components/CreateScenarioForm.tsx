"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateScenarioForm({id}) {
  const [title, setTitle] = useState("Random");
  const [level, setLevel] = useState("Random");
  const [location, setLocation] = useState("Random");
  const [enemies, setEnemies] = useState("Random");

  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  
  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleEnemies = (event) => {
    setEnemies(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/new-scenario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        location: location,
        level: level,
        enemies: enemies,
      }),
    });

    const scenario = await response.json();
    localStorage.removeItem("scenario");
    localStorage.setItem("scenario", JSON.stringify(scenario));
    localStorage.removeItem("campaignId");
    localStorage.setItem("campaignId", JSON.stringify(id));

    router.push("/campaign/scenario/form");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Scenario title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={handleTitle}
        required 
      />

      <label htmlFor="level">Scenario level</label>
      <input
        type="text"
        name="level"
        id="level"
        value={level}
        onChange={handleLevel}
        required 
      />

      <label htmlFor="location">Scenario location</label>
      <input
        type="text"
        name="location"
        id="location"
        value={location}
        onChange={handleLocation}
        required 
      />

      <label htmlFor="enemies">Scenario enemies</label>
      <input
        type="text"
        name="enemies"
        id="enemies"
        value={enemies}
        onChange={handleEnemies}
        required 
      />
      <button type="submit">Generate</button>
    </form>
  );
}
