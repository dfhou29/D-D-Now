"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import background from "public/background-img.jpg";

export default function CreateScenarioForm({ id }) {
  const [title, setTitle] = useState("Random");
  const [level, setLevel] = useState("Random");
  const [location, setLocation] = useState("Random");
  const [enemies, setEnemies] = useState("Random");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
    <div className="relative">
      <Image
        src={background}
        alt="background"
        className="h-screen absolute -z-10"
        style={{
          objectFit: "cover",
        }}
      ></Image>
      <div className="h-screen flex flex-col justify-start items-center w-2/3 bg-slate-100 ml-auto mr-auto pt-16 overflow-y-auto bg-opacity-80">
        <h2 className="mb-4 text-md font-bold tracking-normal text-gray-600 text-4xl mt-12">
          New Scenario
        </h2>
        <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
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
            <div className="flex-col flex mb-4">
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
            {loading ? (
              <div className="flex justify-center">
                <Oval
                  height={40}
                  width={40}
                  color="#1D4ED8"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#60A5FA"
                  strokeWidth={6}
                  strokeWidthSecondary={4}
                />
              </div>
            ) : (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-64 self-center"
                  type="submit"
                >
                  GENERATE
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-64 self-center"
                  onClick={() => router.back()}
                >
                  BACK TO CAMPAIGN
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
