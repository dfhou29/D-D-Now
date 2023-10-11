import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const body = await request.json();
  const { title, level, description, enemies, campaignId } = body;
 
  try {
    await sql`INSERT INTO scenarios (title, level, description, enemies, campaign_id) VALUES (${title}, ${level}, ${description}, ${enemies},${campaignId});`;
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}