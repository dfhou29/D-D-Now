"use client";

import { useRouter } from "next/navigation";

export default function EditSettingButton({ setting }) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("setting");
    localStorage.setItem("setting", JSON.stringify(setting));
    localStorage.removeItem("campaignId");
    localStorage.setItem("campaignId", JSON.stringify(setting.campaign_id));
    router.push(`/campaign/setting/${setting.id}/edit`);
  };
  return (
    <button
      className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-24"
      onClick={handleClick}
    >
      EDIT
    </button>
  );
}
