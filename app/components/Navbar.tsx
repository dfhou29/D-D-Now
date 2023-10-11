"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
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
    <div className="fixed top-0 w-full z-10">
      <header className="bg-gray-500 text-white">
        <h1>D&D now</h1>
        <nav className=" mx-auto px-4 py-2">
          <div className="flex justify-between space-x-4">
            <div>
              <Link href="/character">Your Characters</Link>
            </div>
            <div>
              <Link href="/campaign">Your Campaigns</Link>
            </div>
            <div>
              <Link href="/login">Login</Link>
            </div>
            <div>
              <Link href="/signup">Signup</Link>
            </div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
