import Link from "next/link";
import { sql } from "@vercel/postgres";

export const revalidate = 0;
export default async function Setting({ params } : { params: { id: number } }) {
  const id = params.id;
  let data = await sql`SELECT * FROM settings WHERE id = ${id} ORDER BY id;`;
  const { rows } = data;
  const setting = rows[0];
  return (
    <>
      <h1>{setting.title}</h1>
      <div>{setting.description}</div>
      <Link href={`/campaign/${id}`}>Back to campaign page</Link>
    </>
  );
};

