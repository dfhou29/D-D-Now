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

  return <button onClick={logout}>Logout</button>;
}
