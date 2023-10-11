import { sql } from "@vercel/postgres";
import dynamic from "next/dynamic";
import Image from "next/image";
import background from "public/background-img.jpg";
import Link from "next/link";
const Pdf = dynamic(() => import("../../components/CharacterPdf"), {
  ssr: false,
});

const EditCharacterButton = dynamic(
  () => import("../../components/EditCharacterButton"),
  {
    ssr: false,
  }
);

const DeleteCharacterButton = dynamic(
  () => import("../../components/DeleteCharacterButton"),
  {
    ssr: false,
  }
);

const CharacterSheetBackButton = dynamic(
  () => import("../../components/CharacterSheetBackButton"),
  {
    ssr: false,
  }
);

export default async function CharacterDetail({
  params,
}: {
  params: { id: string };
  git;
}) {
  const id = params.id;

  const { rows } = await sql`SELECT * FROM characters WHERE id = ${id}`;

  const character = rows[0];

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
      <div className="h-screen overflow-y-auto w-2/3 flex flex-col justify-start items-stretch bg-slate-100 ml-auto mr-auto pb-36 bg-opacity-80">
        <p className="mb-4 text-md font-bold tracking-normal text-gray-600 text-4xl mt-24 text-center">
          Character Sheet
        </p>
        <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
        <p className="w-84 text-lg text-center mb-8">
          Preview your D&D character sheet as a printable PDF. Below, find
          options to edit or delete your character details.
        </p>
        <div className="flex flex-col justify-around items-center">
          <div className="flex justify-center items-center mb-8">
            <div className="flex gap-x-8">
              <EditCharacterButton character={character} id={id} />
              <DeleteCharacterButton id={id} />
            </div>
          </div>
          <Pdf character={character} />
          <Link href="/character" className="mt-8">
            <button className="bg-blue-400 hover:bg-blue-700 text-white py-2 px-3 w-48">
              ALL CHARACTERS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
