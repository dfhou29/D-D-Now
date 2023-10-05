"use client"

import { useState } from "react";

export default function CreateCampaignForm() {
  const [name, setName] = useState()

  const handleTitle = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/new-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: name}),
    });

  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Name your campaign</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={handleTitle}
        required 
      />
      <button className="btn-primary" type="submit">
        Create
      </button>
    </form>
  );
}
