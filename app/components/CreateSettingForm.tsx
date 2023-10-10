"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSettingForm({ id }) {
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
    <div className="flex flex-col justify-start items-center h-screen w-4/5 bg-slate-100 ml-auto mr-auto">
      <h2 className="mb-8 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
        New Setting
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-4">
          <label
            className="text-gray-600 text-md font-bold mb-2 self-center"
            htmlFor="title"
          >
            Title
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
            Generate
          </button>
        </div>
      </form>
      <p>to do: loading spinner</p>
      <p>to do: back button</p>
    </div>
  );
}
