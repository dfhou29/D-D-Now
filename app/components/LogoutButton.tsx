"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const response = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.refresh();
    router.push("/login");
  };

  return (
    <button
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 w-24 font-600"
      onClick={logout}
    >
      Logout
    </button>
  );
}
