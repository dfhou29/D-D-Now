"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateScenarioForm({ id }) {
  const [title, setTitle] = useState("Random");
  const [level, setLevel] = useState("Random");
  const [location, setLocation] = useState("Random");
  const [enemies, setEnemies] = useState("Random");

  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
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
      }),
    });

    const scenario = await response.json();
    localStorage.removeItem("scenario");
    localStorage.setItem("scenario", JSON.stringify(scenario));
    localStorage.removeItem("campaignId");
    localStorage.setItem("campaignId", JSON.stringify(id));

    router.push("/campaign/scenario/form");
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen w-4/5 bg-slate-100 ml-auto mr-auto">
      <h2 className="mb-8 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
        New Scenario
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <div className="flex-col flex">
            <label
              htmlFor="title"
              className="text-gray-600 text-md font-bold mb-2 self-start"
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
          </div>
          <div className="flex-col flex">
            <label
              htmlFor="level"
              className="text-gray-600 text-md font-bold mb-2 self-start"
            >
              Level
            </label>
            <input
              type="text"
              name="level"
              id="level"
              value={level}
              onChange={handleLevel}
              required
              className="block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex-col flex">
            <label
              htmlFor="location"
              className="text-gray-600 text-md font-bold mb-2 self-start"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={handleLocation}
              required
              className="block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex-col flex">
            <label
              htmlFor="enemies"
              className="text-gray-600 text-md font-bold mb-2 self-start"
            >
              Enemies
            </label>
            <input
              type="text"
              name="enemies"
              id="enemies"
              value={enemies}
              onChange={handleEnemies}
              required
              className="block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
          </div>
          <button
            type="submit"
            className=" w-24 bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full ml-auto mr-auto"
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
