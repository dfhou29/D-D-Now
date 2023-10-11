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
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
      onClick={handleClick}
    >
      Edit
    </button>
  );
}
