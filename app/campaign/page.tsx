import Link from "next/link";
import { sql } from "@vercel/postgres";
import { getCookieData } from "@/helper/getCookieData";
import EditCampaignButton from "@/components/EditCampaignButton";
import DeleteCampaignButton from "@/components/DeleteCampaignButton";

export default async function Campaign() {
  const userId = getCookieData().id;
  let data = await sql`SELECT * FROM campaigns WHERE user_id = ${userId};`;
  const { rows: campaigns } = data;

  return (
    <div className="flex flex-col justify-start items-center h-screen w-4/5 bg-slate-100 ml-auto mr-auto">
      <h2 className="mb-16 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
        My Campaigns
      </h2>
      <ul className="mb-12">
        {campaigns.map((campaign) => (
          <li key={campaign.id} className="my-6">
            <div className="flex flex-row gap-x-52">
              <p className="text-gray-700 text-lg leading-tight self-center w-60">
                {campaign.title}
              </p>
              <Link href={`/campaign/${campaign.id}`}>
                <button className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
                  View
                </button>
              </Link>
              <EditCampaignButton campaign={campaign} />
              <DeleteCampaignButton id={campaign.id} />
            </div>
          </li>
        ))}
      </ul>
      <Link href="/campaign/new">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
          New Campaign
        </button>
      </Link>
    </div>
  );
}

export const revalidate = 0;
