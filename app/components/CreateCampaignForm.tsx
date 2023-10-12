"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCampaignForm({ userId }) {
  const [title, setTitle] = useState("");

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
      body: JSON.stringify({ title: title, userId: userId }),
    });
    router.refresh();
    router.push("/campaign");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col w-80 mb-4">
          <label
            htmlFor="title"
            className="text-gray-600 text-md font-bold mb-2 self-start"
          >
            Name
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitle}
            required
            className="block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-80 self-center font-600"
          type="submit"
        >
          CREATE
        </button>
        <button
          type="button"
          className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-80 self-center font-600"
          onClick={() => router.back()}
        >
          BACK TO ALL CAMPAIGNS
        </button>
      </div>
    </form>
  );
}
