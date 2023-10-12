import Link from "next/link";
import { sql } from "@vercel/postgres";
import { getCookieData } from "@/helper/getCookieData";
import EditCampaignButton from "@/components/EditCampaignButton";
import DeleteCampaignButton from "@/components/DeleteCampaignButton";
import Image from "next/image";
import background from "public/background-img-warrior.png";

export default async function Campaign() {
  const userId = getCookieData().id;
  let data = await sql`SELECT * FROM campaigns WHERE user_id = ${userId};`;
  const { rows: campaigns } = data;

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
      <div className="flex flex-col justify-start items-center h-screen w-2/3 bg-slate-100 ml-auto mr-auto bg-opacity-80 overflow-y-auto">
        <h2 className="mb-4 text-md font-bold tracking-normal text-gray-600 text-4xl mt-24">
          My Campaigns
        </h2>
        <div className="border-t-2 border-gray-300 my-8 w-1/2 ml-auto mr-auto"></div>
        <ul className="mb-12">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="my-6">
              <div className="flex flex-row gap-x-52 border-gray-400 border-2 p-4">
                <p className="text-gray-600 text-lg font-bold leading-tight self-center w-60">
                  {campaign.title}
                </p>
                <div className="flex justify-around w-auto gap-x-4">
                  <Link href={`/campaign/${campaign.id}`}>
                    <button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-3 w-24 font-600">
                      VIEW
                    </button>
                  </Link>
                  <EditCampaignButton campaign={campaign} />
                  <DeleteCampaignButton id={campaign.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/campaign/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-48 font-600">
            NEW CAMPAIGN
          </button>
        </Link>
      </div>
      <Link href="/campaign/new">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-48 font-600">
          BACK TO CAMPAIGNS
        </button>
      </Link>
    </div>
  );
}

export const revalidate = 0;
