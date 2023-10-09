"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateScenarioForm() {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [enemies, setEnemies] = useState("");
  const [campaignId, setCampaignId] = useState("");

  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  
  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  
  const handleEnemies = (event) => {
    setEnemies(event.target.value);
  };

  useEffect(() => {
    const storedScenario: any = localStorage.getItem("scenario");
    const storedCampaignId: any = localStorage.getItem("campaignId");
    console.log(JSON.parse(storedScenario));
    console.log(JSON.parse(storedCampaignId));
    if (storedCampaignId) {
      const parsedCampaignId = JSON.parse(storedCampaignId);
      setCampaignId(parsedCampaignId);
    }
    if (storedScenario) {
      const parsedScenario = JSON.parse(storedScenario);
      setTitle(parsedScenario.title);
      setLevel(parsedScenario.level);
      setDescription(parsedScenario.description);
      setEnemies(parsedScenario.description);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/add-scenario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        level: level,
        description: description,
        enemies: enemies,
        campaignId: campaignId,
      }),
    });

    router.push("/scenario");
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

      <label htmlFor="description">Scenario description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={handleDescription}
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
      <button type="submit">Create</button>
    </form>
  );
}
