import Link from "next/link";
import { sql } from "@vercel/postgres";

export default async function Campaign({ params, searchParams }: { params: { id: number }, searchParams: { campaignTitle: string }}) {
  const id = params.id;
  const campaignTitle = searchParams.campaignTitle;
  let data1 = await sql`SELECT * FROM settings WHERE campaign_id = ${id}`;
  let data2 = await sql`SELECT * FROM scenarios WHERE campaign_id = ${id};`;
  const { rows: settings } = data1;
  const { rows: scenarios } = data2;
  console.log(data1);
  return (
    <>
      <h1>{campaignTitle}</h1>
      <h2>Your Settings</h2>
      <ul>
        {settings.map((setting) => (
          <li key={setting.id}>
            <Link href={{pathname: `/campaign/setting/${setting.id}`}}>
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
            <Link href={{pathname: `/campaign/scenario/${scenario.id}`}}>
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

