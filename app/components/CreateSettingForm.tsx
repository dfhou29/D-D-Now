"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import background from "public/background-img-dragon.png";

export default function CreateSettingForm({ id }) {
  const [title, setTitle] = useState("Random");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
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
    const settingJSON = JSON.stringify(setting);
    console.log("setting JSON: ", settingJSON);
    console.log("setting Parsed: ", JSON.parse(settingJSON));
    localStorage.removeItem("setting");
    localStorage.setItem("setting", JSON.stringify(setting));
    localStorage.removeItem("campaignId");
    localStorage.setItem("campaignId", JSON.stringify(id));

    await router.push("/campaign/setting/form");
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
      <div
        className="flex flex-col justify-start items-center h-screen w-2/3 bg-slate-100 ml-auto mr-auto pt-16 overflow-y-auto bg-opacity-80
"
      >
        <h2 className="mb-4 text-md font-bold tracking-normal text-gray-600 text-4xl mt-12">
          New Setting
        </h2>
        <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col w-80 mb-4">
              <label
                className="text-gray-600 text-md font-bold mb-2 self-start"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-80 self-center font-bold"
                  type="submit"
                >
                  GENERATE
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-80 self-center font-bold"
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
