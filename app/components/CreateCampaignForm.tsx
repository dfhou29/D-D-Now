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
      <div className="flex flex-row gap-x-4">
        <label
          htmlFor="title"
          className="text-gray-600 text-md font-bold mb-2 self-center"
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
          className="block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}
