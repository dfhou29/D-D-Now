import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const campaign_id = searchParams.get('campaign_id');
 
  try {
    if (!title) throw new Error('Scenario title required');
    await sql`INSERT INTO scenarios (title, description, enemies, campaign_id) VALUES (${title}, ${description}, ${campaign_id});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  revalidatePath("/campaign/[id]");
  const scenarios = await sql`SELECT * FROM scenarios;`;
  return NextResponse.json({ scenarios }, { status: 200 });
}
