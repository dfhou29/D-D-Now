import Link from "next/link";
import { sql } from "@vercel/postgres";

export default async function Campaign() {
  let data = await sql`SELECT * FROM campaigns;`;
  const { rows: campaigns } = data;
  return (
    <>
      <h1>Your Champaigns</h1>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <Link href={{
              pathname: `/campaign/${campaign.id}`,
              query: { campaignTitle: campaign.title },
            }}
            >
              {campaign.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/campaign/new">Create Campaign</Link>
    </>
  );
}
