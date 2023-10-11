"use client";

import { useRouter } from "next/navigation";

export default function DeleteSettingButton({ setting }) {
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/delete-setting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: setting.id,
      }),
    });
    router.refresh();
    router.push(`/campaign/${setting.campaign_id}`);
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
      onClick={handleClick}
    >
      Delete
    </button>
  );
}
