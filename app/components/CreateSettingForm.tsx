"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSettingForm({id}) {
  const [title, setTitle] = useState("Random");

  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/new-setting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    const setting = await response.json();
    console.log(JSON.stringify(setting));
    localStorage.removeItem("setting");
    localStorage.setItem("setting", JSON.stringify(setting));
    localStorage.removeItem("campaignId");
    localStorage.setItem("campaignId", JSON.stringify(id));

    await router.push("/campaign/setting/form");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Setting title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={handleTitle}
        required
      />
      <button type="submit">Generate</button>
    </form>
  );
}
