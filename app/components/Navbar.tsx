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
    </>
  );
}
