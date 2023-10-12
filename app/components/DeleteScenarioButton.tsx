"use client";

import { useRouter } from "next/navigation";

export default function DeleteScenarioButton({ scenario }) {
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/delete-scenario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: scenario.id,
      }),
    });
    router.refresh();
    router.push(`/campaign/${scenario.campaign_id}`);
  };
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 w-24 font-600"
      onClick={handleClick}
    >
      DELETE
    </button>
  );
}
