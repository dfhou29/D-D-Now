import Link from "next/link";
import { getCookieData } from "@/helper/getCookieData";
import LogoutButton from "@/components/LogoutButton";

export default function Navbar() {
  const username = getCookieData().name;

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
            <>
              {username && <LogoutButton name={username}/>}
            </>
          </div>
        </nav>
      </header>
    </>
  );
}
