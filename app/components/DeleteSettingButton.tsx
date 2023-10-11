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
      className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 w-24"
      onClick={handleClick}
    >
      DELETE
    </button>
  );
}
