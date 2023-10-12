"use client";

import { useRouter } from "next/navigation";

export default function EditSettingButton({ campaign }) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("campaign");
    localStorage.setItem("campaign", JSON.stringify(campaign));
    router.push(`/campaign/${campaign.id}/edit`);
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
