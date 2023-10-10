import Link from "next/link";
import { sql } from "@vercel/postgres";

export const revalidate = 0;
export default async function Scenario({ params } : { params: { id: number } }) {
  const id = params.id;
  let data = await sql`SELECT * FROM scenarios WHERE id = ${id} ORDER BY id;`;
  const { rows } = data;
  const scenario = rows[0];
  return (
    <>
      <h1>{scenario.title}</h1>
      <div>{scenario.level}</div>
      <div>{scenario.description}</div>
      <div>{scenario.enemies}</div>
      <Link href={`/campaign/${id}`}>Back to campaign page</Link>
    </>
  );
};

