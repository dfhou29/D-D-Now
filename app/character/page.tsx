import Link from "next/link";
import React from "react";
import { getCookieData } from "@/helper/getCookieData";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
export const revalidate = 0;
export default async function Character() {
  const userId = getCookieData().id;
  let data = await sql`SELECT * FROM characters WHERE user_id = ${userId};`;
  const { rows: characters } = data;
  revalidatePath("/campaign");
  return (
    <div className="flex flex-col justify-start items-center h-screen w-4/5 bg-slate-100 ml-auto mr-auto">
      <h2 className="mb-16 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
        My Characters
      </h2>
      <ul className="mb-12">
        {characters.map((character) => (
          <li key={character.id} className="my-6">
            <div className="flex flex-row gap-x-52">
              <p className="text-gray-700 text-lg leading-tight self-center w-60">
                {character.name}
              </p>
              <Link href={`/character/${character.id}`}>
                <button className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
                  View
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/character/new">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
          New Character
        </button>
      </Link>
    </div>
  );
}
