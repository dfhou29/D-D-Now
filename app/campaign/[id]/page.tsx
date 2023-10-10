import Link from "next/link";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const revalidate = 0;
export default async function Campaign({ params }: { params: { id: number } }) {
  const id = params.id;
  let data1 = await sql`SELECT * FROM campaigns WHERE id = ${id}`;
  let data2 = await sql`SELECT * FROM settings WHERE campaign_id = ${id}`;
  let data3 = await sql`SELECT * FROM scenarios WHERE campaign_id = ${id};`;
  const { rows: campaigns } = data1;
  const { rows: settings } = data2;
  const { rows: scenarios } = data3;

  revalidatePath(`/campaign/${id}`);
  return (
    <div className="flex flex-col justify-start items-center w-4/5 bg-slate-100 ml-auto mr-auto">
      <h2 className="mb-8 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
        My Settings
      </h2>
      <ul className="mb-12">
        {settings.map((setting) => (
          <li key={setting.id} className="my-6">
            <div className="flex flex-row gap-x-52">
              <p className="text-gray-700 text-lg leading-tight self-center w-60">
                {setting.title}
              </p>
              <Link href={`/campaign/setting/${setting.id}`}>
                <button className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
                  View
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link
        href={{
          pathname: "/campaign/setting/new",
          query: { campaignId: id },
        }}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
          New Setting
        </button>
      </Link>
      <div className="border-t-2 border-gray-300 my-8 w-1/2"></div>

      <h2 className="mb-8 text-md font-bold tracking-normal text-gray-600 text-4xl my-8">
        My Scenarios
      </h2>
      <ul className="mb-12">
        {scenarios.map((scenario) => (
          <li key={scenario.id} className="my-6">
            <div className="flex flex-row gap-x-52">
              <p className="text-gray-700 text-lg leading-tight self-center w-60">
                {scenario.title}
              </p>
              <Link href={`/campaign/scenario/${scenario.id}`}>
                <button className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
                  View
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link
        href={{
          pathname: "/campaign/scenario/new",
          query: { campaignId: id },
        }}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full mb-8">
          New Scenario
        </button>
      </Link>
    </div>
  );
}
