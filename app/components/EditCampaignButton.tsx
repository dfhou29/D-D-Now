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
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
      onClick={handleClick}
    >
      Rename
    </button>
  );
}
