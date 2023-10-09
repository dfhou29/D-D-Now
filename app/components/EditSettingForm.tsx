"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSettingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [campaignId, setCampaignId] = useState();

  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    const storedSetting: any = localStorage.getItem("setting");
    const storedCampaignId: any = localStorage.getItem("campaignId");
    console.log(JSON.parse(storedSetting));
    console.log(JSON.parse(storedCampaignId));
    if (storedCampaignId) {
      const parsedCampaignId = JSON.parse(storedCampaignId);
      setCampaignId(parsedCampaignId);
    }
    if (storedSetting) {
      const parsedSetting = JSON.parse(storedSetting);
      setTitle(parsedSetting.title);
      setDescription(parsedSetting.description);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/add-setting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        campaignId: campaignId,
      }),
    });

    router.push(`/campaign/${campaignId}`);
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

      <label htmlFor="description">Setting description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={handleDescription}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}
