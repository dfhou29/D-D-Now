"use client";
import { useRouter } from "next/navigation";
export default function CharacterSheetBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-gray-500 hover:bg-red-700 text-white py-2 px-3 rounded-full w-24 self-center"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
}
