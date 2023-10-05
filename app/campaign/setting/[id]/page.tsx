import Link from "next/link";
import { sql } from "@vercel/postgres";

export default async function Setting({ params } : { params: { id: number } }) {
  const id = params.id;
  let data = await sql`SELECT * FROM settings WHERE id = ${id} ORDER BY id;`;
  const { rows: settings } = data;
  return (
    <>
      <ul>
          {settings.map((setting) => (
            <li key={setting.id}>
              <h1>{setting.title}</h1>
              <div>{setting.description}</div>
            </li>
          ))}
        </ul>
      <Link href="/setting">Back to setting page</Link>
    </>
  );
};

