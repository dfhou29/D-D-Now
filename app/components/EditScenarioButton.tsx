"use client";

import { useRouter } from "next/navigation";

export default function EditScenarioButton({ scenario }) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("scenario");
    localStorage.setItem("scenario", JSON.stringify(scenario));
    localStorage.removeItem("campaignId");
    localStorage.setItem("campaignId", JSON.stringify(scenario.campaign_id));
    router.push(`/campaign/scenario/${scenario.id}/edit`);
  };
  return (
    <button
      className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-24 font-600"
      onClick={handleClick}
    >
      EDIT
    </button>
  );
}
