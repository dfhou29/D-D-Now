import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
 
export async function POST(req: Request) {
  const body = await req.json();
  const { title, level, description, enemies, campaignId } = body;
 
  try {
    await sql`INSERT INTO scenarios (title, level, description, enemies, campaign_id) VALUES (${title}, ${level}, ${description}, ${enemies}, ${campaignId});`;
    revalidatePath(`/campaign/${campaignId}`);
    
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}