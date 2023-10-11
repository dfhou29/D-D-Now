import Link from "next/link";
import React from "react";
import { getCookieData } from "@/helper/getCookieData";
import { sql } from "@vercel/postgres";
import dynamic from "next/dynamic";
import Image from "next/image";
import background from "public/background-img.jpg";

const DeleteCharacterButton = dynamic(
  () => import("../components/DeleteCharacterButton"),
  {
    ssr: false,
  }
);

export default async function Character() {
  const userId = getCookieData().id;
  let data = await sql`SELECT * FROM characters WHERE user_id = ${userId};`;
  const { rows: characters } = data;
  return (
    <div className="relative">
      <Image
        src={background}
        alt="background"
        className="h-screen absolute -z-10"
        style={{
          objectFit: "cover",
        }}
      ></Image>
      <div className="flex flex-col justify-start items-center h-screen w-2/3 bg-slate-100 ml-auto mr-auto bg-opacity-80">
        <h2 className="mb-4 text-md font-bold tracking-normal text-gray-600 text-4xl mt-24">
          My Characters
        </h2>
        <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
        <ul className="mb-12">
          {characters.map((character) => (
            <li key={character.id} className="my-6">
              <div className="flex flex-row gap-x-52 border-gray-400 border-2 p-4">
                <p className="text-gray-700 text-lg font-bold leading-tight self-center w-60">
                  {character.name}
                </p>
                <div className="flex justify-around w-auto gap-x-4">
                  <Link href={`/character/${character.id}`}>
                    <button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-24">
                      VIEW
                    </button>
                  </Link>
                  <DeleteCharacterButton id={character.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/character/new">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 w-48">
            NEW CHARACTER
          </button>
        </Link>
      </div>
    </div>
  );
}

export const revalidate = 0;
