"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookieData } from "@/helper/getCookieData";

export default function Navbar() {
  const username = getCookieData().name;
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
      <h1>D&D now</h1>
      <header>
        <nav>
          <div>
            <div>
              <Link href="/character">Your Characters</Link>
            </div>
            <div>
              <Link href="/campaign">Your Champaigns</Link>
            </div>
            <div>
              <Link href="/login">Login</Link>
            </div>
            <div>
              <Link href="/signup">Signup</Link>
            </div>
            <div>
              <div>Logged in as: ${username}</div>
            </div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
