import { sql } from "@vercel/postgres";
//import CharacterPdf from "../../components/CharacterPdf";
import dynamic from "next/dynamic";

const Pdf = dynamic(() => import("../../components/CharacterPdf"), {
  ssr: false,
});
export default async function CharacterDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const { rows } = await sql`SELECT * FROM characters WHERE id = ${id}`;

  const character = rows[0];

  console.log("character/id", character);

  return (
    <div>
      <p>Page to display pdf</p>
      <p>{params.id}</p>
      <div className="flex justify-center items-center min-h-screen">
        <Pdf character={character} />
      </div>
    </div>
  );
}
