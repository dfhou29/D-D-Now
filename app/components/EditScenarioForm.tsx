"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import background from "public/background-img-fighters.png";

export default function EditScenarioForm() {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [enemies, setEnemies] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleEnemies = (event) => {
    setEnemies(event.target.value);
  };

  useEffect(() => {
    const storedScenario: any = localStorage.getItem("scenario");
    const storedCampaignId: any = localStorage.getItem("campaignId");
    if (storedCampaignId) {
      const parsedCampaignId = JSON.parse(storedCampaignId);
      setCampaignId(parsedCampaignId);
      console.log(parsedCampaignId);
    }
    if (storedScenario) {
      const parsedScenario = JSON.parse(storedScenario);
      console.log(parsedScenario);
      if (parsedScenario.id) {
        setId(parsedScenario.id);
      }
      setTitle(parsedScenario.title);
      setLevel(parsedScenario.level);
      setDescription(parsedScenario.description);
      setEnemies(parsedScenario.enemies);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (id != null) {
      const response = await fetch("/api/update-scenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          level: level,
          description: description,
          enemies: enemies,
        }),
      });

      localStorage.removeItem("scenario");
      localStorage.removeItem("campaignId");
      router.refresh();
      router.push(`/campaign/scenario/${id}`);
    } else {
      const response = await fetch("/api/add-scenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          level: level,
          description: description,
          enemies: enemies,
          campaignId: campaignId,
        }),
      });

      localStorage.removeItem("setting");
      localStorage.removeItem("campaignId");
      router.refresh();
      router.push(`/campaign/${campaignId}`);
    }
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
      <div className="h-screen flex flex-col justify-start items-center w-2/3 bg-slate-100 ml-auto mr-auto pb-40 pt-16 overflow-y-auto bg-opacity-80">
        <div>
          <h2 className="mb-8 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
            Scenario Template
          </h2>
        </div>
        <div className="border-t-2 border-gray-300 mt-4 mb-8"></div>
        <form onSubmit={handleSubmit}>
          <div className="flex-col flex gap-y-8">
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
                className="block w-96 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
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
                className="block w-96 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex-col flex">
              <label
                htmlFor="description"
                className="text-gray-600 text-md font-bold mb-2 self-start"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={handleDescription}
                required
                className="block h-96 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
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
                className="block w-96 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
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
              <div className="flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 ml-auto mr-auto w-96 font-600"
                >
                  SAVE
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 self-center w-96 font-600"
                  onClick={() => router.back()}
                >
                  BACK
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
