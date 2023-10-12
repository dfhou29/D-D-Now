import CreateCampaignForm from "@/components/CreateCampaignForm";
import { getCookieData } from "@/helper/getCookieData";
import Image from "next/image";
import background from "public/background-img-warrior.png";

export default function NewCampaign() {
  const userId = getCookieData().id;
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
      <div className="flex flex-col justify-start items-center h-screen w-2/3 bg-slate-100 ml-auto mr-auto pt-16 overflow-y-auto bg-opacity-80">
        <div className="mb-4 mt-12 text-md font-bold tracking-normal text-gray-600 text-4xl">
          <h2>New Campaign</h2>
        </div>
        <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
        <CreateCampaignForm userId={userId} />
      </div>
    </div>
  );
}
