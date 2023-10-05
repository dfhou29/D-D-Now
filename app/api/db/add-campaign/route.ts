import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
 
  try {
    if (!title) throw new Error('Campaign title required');
    await sql`INSERT INTO campaigns (title) VALUES (${title});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  
  revalidatePath("/campaign");
  const campaigns = await sql`SELECT * FROM campaigns;`;
  return NextResponse.json({ campaigns }, { status: 200 });
}

// http://localhost:3000/api/db/add-campaign?title=The%20damnation%20of%20Zarovich
// http://localhost:3000/api/db/add-campaign?title=Journey%20through%20the%20radiant%20citadel