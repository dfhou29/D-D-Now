import Link from "next/link";
import { sql } from "@vercel/postgres";

export const revalidate = 0;
export default async function Scenario({ params }: { params: { id: number } }) {
  const id = params.id;
  let data = await sql`SELECT * FROM scenarios WHERE id = ${id} ORDER BY id;`;
  const { rows } = data;
  const scenario = rows[0];
  return (
    <div className="flex flex-col justify-start items-center h-screen w-4/5 bg-slate-100 ml-auto mr-auto">
      <div className="flex flex-col justify-center items-center gap-y-16">
        <h1 className="mb-8 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
          {scenario.title}
        </h1>
        <div className="flex flex-col justify-center items-center">
          <h2>Level</h2>
          <p>{scenario.level}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2>Description</h2>
          <p>{scenario.description}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2>Enemies</h2>
          <p>{scenario.enemies}</p>
        </div>
        <Link href={`/campaign/${id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
            Back to Campaigns
          </button>
        </Link>
      </div>
      <p>to do: styling</p>
      <p>fix back button</p>
    </div>
  );
}
