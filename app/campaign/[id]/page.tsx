import Link from "next/link";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export default async function Campaign({ params }: { params: { id: number }}) {
  const id = params.id;
  let data1 = await sql`SELECT * FROM campaigns WHERE id = ${id}`;
  let data2 = await sql`SELECT * FROM settings WHERE campaign_id = ${id}`;
  let data3 = await sql`SELECT * FROM scenarios WHERE campaign_id = ${id};`;
  const { rows: campaigns } = data1;
  const { rows: settings } = data2;
  const { rows: scenarios } = data3;
  
  revalidatePath(`/campaign/${id}`);
  return (
    <>
      {campaigns.map((campaign) => (
        <div key={campaign.id}>
          <h1>{campaign.title}</h1>
        </div>
        ))}
      <h2>Your Settings</h2>
      <ul>
        {settings.map((setting) => (
          <li key={setting.id}>
            <Link href={`/campaign/setting/${setting.id}`}>
              {setting.title}
            </Link>
          </li>
        ))}
      </ul>  
      <button>
        <Link href={{
          pathname: "/campaign/setting/new",
          query: { campaignId: id },
        }}
        >
          Create Setting
        </Link>
      </button>
      <h2>Your Scenarios</h2>
      <ul>
        {scenarios.map((scenario) => (
          <li key={scenario.id}>
            <Link href={`/campaign/scenario/${scenario.id}`}>
              {scenario.title}
            </Link>
          </li>
        ))}
      </ul>
      <button>
        <Link href={{
          pathname: "/campaign/scenario/new",
          query: { campaignId: id },
        }}
        >
          Create Scenario
        </Link>
      </button>
    </>
  );
};

