import Link from "next/link";
import { sql } from "@vercel/postgres";

export default async function Scenario({ params } : { params: { id: number } }) {
  const id = params.id;
  let data = await sql`SELECT * FROM scenarios WHERE id = ${id} ORDER BY id;`;
  const { rows: scenarios } = data;
  return (
    <>
      <ul>
          {scenarios.map((scenario) => (
            <li key={scenario.id}>
              <h1>{scenario.title}</h1>
              <div>{scenario.description}</div>
              <div>{scenario.enemies}</div>
            </li>
          ))}
        </ul>
      <Link href="/scenario">Back to scenario page</Link>
    </>
  );
};

