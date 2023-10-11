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
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
      onClick={handleClick}
    >
      Edit
    </button>
  );
}
