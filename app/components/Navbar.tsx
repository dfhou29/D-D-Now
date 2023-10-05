"use client"

import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <h1>D&D now</h1>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/character">Your Characters</Link>
            </li>
            <li>
              <Link href="/campaign">Your Champaigns</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
