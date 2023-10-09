import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
 
export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, campaignId } = body;
 
  try {
    await sql`INSERT INTO settings (title, description, campaign_id) VALUES (${title}, ${description}, ${campaignId});`;
    revalidatePath(`/campaign/${campaignId}`);
    
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}