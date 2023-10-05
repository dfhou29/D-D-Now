"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateScenarioForm({id}) {
  const [title, setTitle] = useState("Random");
  const [location, setLocation] = useState("Random");
  const [level, setLevel] = useState("Random");
  const [enemies, setEnemies] = useState("Random");

  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  
  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
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
        campaign_id: {id},
      }),
    });

    const scenario = await response.json();
    localStorage.removeItem("scenario");
    localStorage.setItem("scenario", JSON.stringify(scenario));

    router.push("/scenario/form");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Scenario title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={handleTitle}
        required 
      />

      <label>Scenario location</label>
      <input
        type="text"
        name="location"
        id="location"
        value={location}
        onChange={handleLocation}
        required 
      />

      <label>Scenario level</label>
      <input
        type="text"
        name="level"
        id="level"
        value={level}
        onChange={handleLevel}
        required 
      />

      <label>Scenario enemies</label>
      <input
        type="text"
        name="enemies"
        id="enemies"
        value={enemies}
        onChange={handleEnemies}
        required 
      />
      <button className="btn-primary" type="submit">
        Create
      </button>
    </form>
  );
}
