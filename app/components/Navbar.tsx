import Link from "next/link";
import { getCookieData } from "@/helper/getCookieData";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";

export default function Navbar() {
  let username = null;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  if (token) {
    username = getCookieData().name;
  }

  return (
    <div className="fixed top-0 w-full z-10 font-lato font-600">
      <header className="bg-gray-600 text-white flex">
        <div className="ml-4">
          <Link href="/">
            <img src="/logo.svg" alt="D&D Now Logo" className="h-16 p-2" />
          </Link>
        </div>
        <nav className=" mx-auto px-4 py-2 flex justify-end items-center space-x-4 w-full mr-4">
          {!username ? (
            <>
              <div>
                <Link href="/login">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 w-24 font-600">
                    Sign In
                  </button>
                </Link>
              </div>
              <div>
                <Link
                  href="/signup"
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 w-24 font-600"
                >
                  Register
                </Link>
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between max-w-md  gap-x-4">
                <div className="flex gap-x-8 items-center">
                  <Link
                    href="/character"
                    className="font-700 hover:text-zinc-100 text-zinc-300"
                  >
                    Characters
                  </Link>

                  <Link
                    href="/campaign"
                    className="font-700 hover:text-zinc-100 text-zinc-300"
                  >
                    Campaigns
                  </Link>

                  <div className="text-stone-400 min-w-40 whitespace-nowrap">
                    User: {username}
                  </div>
                </div>

                <div>
                  <LogoutButton />
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
