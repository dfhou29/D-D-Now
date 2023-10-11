import Link from "next/link";
import { getCookieData } from "@/helper/getCookieData";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from 'next/headers'

export default function Navbar() {
  let username = null;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || '';
  if(token) {
    username = getCookieData().name;
  }

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
            {!username ? (
              <div>
                <div>
                  <Link href="/login">Login</Link>
                </div>
                <div>
                  <Link href="/signup">Signup</Link>
                </div>
              </div>
            ) : (
            <>
              <div>
                User: {username}
              </div>
              <div>
                <LogoutButton />
              </div>
            </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
