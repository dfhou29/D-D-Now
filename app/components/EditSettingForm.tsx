"use client";

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
    if (storedCampaignId) {
      const parsedCampaignId = JSON.parse(storedCampaignId);
      console.log(parsedCampaignId);
      setCampaignId(parsedCampaignId);
    }
    if (storedSetting) {
      const parsedSetting = JSON.parse(storedSetting);
      console.log(parsedSetting);
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
    <div className="flex flex-col justify-start items-center w-4/5 bg-slate-100 ml-auto mr-auto">
      <div>
        <h2 className="mb-8 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
          Setting template
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-col flex gap-y-8">
          <div className="flex-col flex">
            <label
              htmlFor="title"
              className="text-gray-600 text-md font-bold mb-2 self-start"
            >
              Title
            </label>
            <textarea
              name="title"
              id="title"
              value={title}
              onChange={handleTitle}
              required
              className="block w-96 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex-col flex">
            <label
              htmlFor="description"
              className="text-gray-600 text-md font-bold mb-2 self-center"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={handleDescription}
              required
              className="block w-96 h-96 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full ml-auto mr-auto mb-8"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
