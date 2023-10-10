import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, campaignId } = body;
 
  try {
    await sql`INSERT INTO settings (title, description, campaign_id) VALUES (${title}, ${description}, ${campaignId});`;
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
