import CreateCampaignForm from "@/components/CreateCampaignForm";
import { getCookieData } from "@/helper/getCookieData";

export default function NewCampaign() {
  const userId = getCookieData().id;
  return (
    <div className="flex flex-col justify-start items-center h-screen w-4/5 bg-slate-100 ml-auto mr-auto pt-12">
      <div className="mb-16 text-md font-bold tracking-normal text-gray-600 text-4xl">
        <h2>New Campaign</h2>
      </div>
      <CreateCampaignForm userId={userId} />
    </div>
  );
}
