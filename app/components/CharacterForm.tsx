"use client";
import Image from "next/image";
import backgroundImg from "public/background-img.jpg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormOption from "./FormOption";
import { Oval } from "react-loader-spinner";
import {
  loadRaces,
  loadBackgrounds,
  loadClasses,
  loadAlignments,
  loadLevels,
} from "../../helper/loadData";

export default function CharacterForm() {
  const [race, setRace] = useState("Random");
  const [background, setBackground] = useState("Random");
  const [rank, setRank] = useState("Random"); // use rank instead of class to avoid reserved key word
  const [alignment, setAlignment] = useState("Random");
  const [level, setLevel] = useState("Random");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRace = (event) => {
    setRace(event.target.value);
  };

  const handleBackground = (event) => {
    setBackground(event.target.value);
  };

  const handleRank = (event) => {
    setRank(event.target.value);
  };

  const handleAlignment = (event) => {
    setAlignment(event.target.value);
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(`openai request started... at ${Date.now()}`);
    const response = await fetch("/api/new-character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        race: race,
        background: background,
        rank: rank,
        alignment: alignment,
        level: level,
      }),
    });

    const character = await response.json();
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(character));
    router.push("/character/preview");
  };

  const races = loadRaces();
  const backgrounds = loadBackgrounds();
  const classes = loadClasses();
  const alignments = loadAlignments();
  const levels = loadLevels();

  return (
    <div className="relative">
      <Image
        src={backgroundImg}
        alt="background"
        className="h-screen absolute -z-10"
        style={{
          objectFit: "cover",
        }}
      ></Image>
      <div className="flex flex-col justify-start items-center h-screen w-2/3 bg-slate-100 ml-auto mr-auto bg-opacity-80 overflow-y-auto pt-16">
        <div className="text-md font-bold tracking-normal text-gray-600 text-4xl mt-12">
          <h2>Generate Your D&D Character Template</h2>
        </div>
        <div className="border-t-2 border-gray-300 my-12 w-1/2"></div>
        <div className="mb-8 w-4/5 md:w-3/5 text-center text-lg">
          <p>
            You can shape your character by selecting desired traits from each
            of the dropdown lists. Set a selection to 'Random' if you're feeling
            uncertain.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-1/5">
          <div className={"flex flex-col mb-10 gap-y-8 items-center"}>
            <FormOption
              title="race"
              selections={races}
              value={race}
              onChange={handleRace}
            />
            <FormOption
              title="background"
              selections={backgrounds}
              value={background}
              onChange={handleBackground}
            />
            <FormOption
              title="class"
              selections={classes}
              value={rank}
              onChange={handleRank}
            />
            <FormOption
              title="alignment"
              selections={alignments}
              value={alignment}
              onChange={handleAlignment}
            />
            <FormOption
              title="level"
              selections={levels}
              value={level}
              onChange={handleLevel}
            />
          </div>
          <div className="flex justify-center">
            {loading ? (
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
            ) : (
              <div className="flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-56"
                >
                  Generate
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-56 self-center"
                  onClick={() => router.back()}
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
