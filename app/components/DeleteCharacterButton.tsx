"use client";

import { useRouter } from "next/navigation";

export default function DeleteCharacterButton({ id }) {
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/delete-character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    router.refresh();
    router.push("/character");
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
