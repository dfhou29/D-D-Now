"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import background from "public/background-img.jpg";

export default function EditSettingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [campaignId, setCampaignId] = useState();
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

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
      if (parsedSetting.id) {
        setId(parsedSetting.id);
      }
      setTitle(parsedSetting.title);
      setDescription(parsedSetting.description);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (id != null) {
      const response = await fetch("/api/update-setting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          description: description,
        }),
      });

      localStorage.removeItem("setting");
      localStorage.removeItem("campaignId");
      router.refresh();
      router.push(`/campaign/${campaignId}`);
    } else {
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
      <div className="flex flex-col justify-start h-screen items-center w-2/3 bg-slate-100 ml-auto mr-auto pt-16 overflow-y-auto bg-opacity-80">
        <div>
          <h2 className="mb-8 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
            Setting Template
          </h2>
        </div>
        <div className="border-t-2 border-gray-300 mt-4 mb-8 w-1/2"></div>
        <form onSubmit={handleSubmit}>
          <div className="flex-col flex gap-y-8 items-center">
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
                className="block w-96 h-96 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 ml-auto mr-auto w-96"
                >
                  SAVE
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-red-700 text-white py-2 px-3 w-96 self-center"
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
