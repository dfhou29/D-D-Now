import { sql } from "@vercel/postgres";
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
    </div>
  );
}
