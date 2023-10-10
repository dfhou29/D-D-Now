"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton(name) {
  const router = useRouter();

  const logout = async () => {
  const response = await fetch("/api/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

    router.push("/login");
  };

  return (
    <>
      <div>User: ${name}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
