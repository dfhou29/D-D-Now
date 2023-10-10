"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCampaignForm({userId}) {
  const [title, setTitle] = useState("")

  const router = useRouter();
  
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/new-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title: title, userId: userId}),
    });

    router.push("/campaign");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Name your campaign</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={handleTitle}
        required 
      />
      <button type="submit">Create</button>
    </form>
  );
}
