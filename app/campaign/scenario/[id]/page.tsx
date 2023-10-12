import Link from "next/link";
import { sql } from "@vercel/postgres";
import EditScenarioButton from "@/components/EditScenarioButton";
import DeleteScenarioButton from "@/components/DeleteScenarioButton";
import Image from "next/image";
import background from "public/background-img-fighters.png";

export default async function Scenario({ params }: { params: { id: number } }) {
  const id = params.id;
  let data = await sql`SELECT * FROM scenarios WHERE id = ${id} ORDER BY id;`;
  const { rows } = data;
  const scenario = rows[0];
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
      <div className="flex flex-col justify-start items-center h-screen w-2/3 bg-slate-100 ml-auto mr-auto pt-16 overflow-y-auto bg-opacity-80">
        <div className="flex flex-col justify-center items-center gap-y-16">
          <h1 className="text-md font-bold tracking-normal text-gray-600 text-4xl mt-12">
            Scenario: {scenario.title}
          </h1>
          <div className="border-t-2 border-gray-300 w-1/2 ml-auto mr-auto"></div>
          <div className="flex flex-col justify-start items-start w-10/12 gap-y-4">
            <h2 className="self-start font-bold">Level</h2>
            <p className="text-md">{scenario.level}</p>
          </div>
          <div className="flex flex-col justify-center items-center min-w-3/5 w-10/12 gap-y-4">
            <h2 className="self-start font-bold">Description</h2>
            <p className="text-md leading-8">{scenario.description}</p>
          </div>
          <div className="flex flex-col justify-center items-start w-10/12 gap-y-4">
            <h2 className="self-start font-bold">Enemies</h2>
            <p className="text-md">{scenario.enemies}</p>
          </div>
          <div className="flex justify-around w-60 gap-x-2">
            <EditScenarioButton scenario={scenario} />
            <DeleteScenarioButton scenario={scenario} />
          </div>
          <Link href={`/campaign/${scenario.campaign_id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-56 font-600 mb-16">
              BACK TO CAMPAIGNS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export const revalidate = 0;
