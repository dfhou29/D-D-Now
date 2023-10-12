"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "public/background-img-warrior.png";

export default function EditCampaignForm() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const router = useRouter();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    const storedCampaign: any = localStorage.getItem("campaign");
    if (storedCampaign) {
      const parsedCampaign = JSON.parse(storedCampaign);
      setId(parsedCampaign.id);
      setTitle(parsedCampaign.title);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/update-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, title: title }),
    });
    router.refresh();
    router.push("/campaign");
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
      <div className="h-screen w-2/3 flex flex-col justify-start items-stretch bg-slate-100 ml-auto mr-auto pb-36 overflow-y-auto bg-opacity-80">
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-md font-bold tracking-normal text-gray-600 text-4xl mt-24 text-center">
            Edit Campaign
          </p>
          <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
          <div className="flex flex-col gap-y-4 items-center">
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
                className="block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-80 font-bold"
              type="submit"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
