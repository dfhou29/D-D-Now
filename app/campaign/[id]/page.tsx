import Link from "next/link";
import { sql } from "@vercel/postgres";
import dynamic from "next/dynamic";
import Image from "next/image";
import background from "public/background-img.jpg";

const DeleteSettingButton = dynamic(
  () => import("../../components/DeleteSettingButton"),
  {
    ssr: false,
  }
);
const DeleteScenarioButton = dynamic(
  () => import("../../components/DeleteScenarioButton"),
  {
    ssr: false,
  }
);
export default async function Campaign({ params }: { params: { id: number } }) {
  const id = params.id;
  let data1 = await sql`SELECT * FROM campaigns WHERE id = ${id}`;
  let data2 = await sql`SELECT * FROM settings WHERE campaign_id = ${id}`;
  let data3 = await sql`SELECT * FROM scenarios WHERE campaign_id = ${id};`;
  const { rows } = data1;
  const campaign = rows[0];
  const { rows: settings } = data2;
  const { rows: scenarios } = data3;

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
      <div className="flex flex-col justify-start items-center w-2/3 bg-slate-100 ml-auto mr-auto h-screen overflow-y-auto bg-opacity-80">
        <h1 className="mb-4 font-bold tracking-normal text-gray-600 text-4xl mt-24">
          Campaign: {campaign.title}
        </h1>
        <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
        <h2 className="mb-8 text-3xl font-bold tracking-normal text-gray-600 my-12">
          Settings
        </h2>
        <ul className="mb-12">
          {settings.map((setting) => (
            <li key={setting.id} className="my-6">
              <div className="flex flex-row gap-x-52 border-gray-400 border-2 p-4">
                <p className="text-gray-700 text-lg font-bold leading-tight self-center w-80">
                  {setting.title}
                </p>
                <div className="flex justify-around w-auto gap-x-4">
                  <Link href={`/campaign/setting/${setting.id}`}>
                    <button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-24">
                      VIEW
                    </button>
                  </Link>
                  <DeleteSettingButton setting={setting} />
                </div>
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 w-64">
            NEW SETTING
          </button>
        </Link>
        <div className="border-t-2 border-gray-300 my-8 w-1/2"></div>

        <h2 className="mb-8 font-bold tracking-normal text-gray-600 text-3xl my-8">
          Scenarios
        </h2>
        <ul className="mb-12">
          {scenarios.map((scenario) => (
            <li key={scenario.id} className="my-6">
              <div className="flex flex-row gap-x-52 border-gray-400 border-2 p-4">
                <p className="text-gray-700 text-lg leading-tight self-center w-80">
                  {scenario.title}
                </p>
                <div className="flex justify-around w-auto gap-x-4">
                  <Link href={`/campaign/scenario/${scenario.id}`}>
                    <button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-24">
                      VIEW
                    </button>
                  </Link>
                  <DeleteScenarioButton scenario={scenario} />
                </div>
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-64">
            NEW SCENARIO
          </button>
        </Link>
        <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
      </div>
    </div>
  );
}

export const revalidate = 0;
