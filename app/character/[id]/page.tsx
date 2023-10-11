import { sql } from "@vercel/postgres";
import dynamic from "next/dynamic";
import DeleteCharacterButton from "@/components/DeleteCharacterButton";

const Pdf = dynamic(() => import("../../components/CharacterPdf"), {
  ssr: false,
});

const EditCharacterButton = dynamic(
  () => import("../../components/EditCharacterButton"),
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

  console.log(rows);
  const character = rows[0];

  console.log("character/id", character);

  return (
    <div>
      <p>Page to display pdf</p>
      <p>{params.id}</p>
      <EditCharacterButton character={character} id={id} />
      <DeleteCharacterButton id={id} />
      <div className="flex justify-center items-center min-h-screen">
        <Pdf character={character} />
      </div>
    </div>
  );
}

export const revalidate = 0;
