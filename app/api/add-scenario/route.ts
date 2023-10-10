import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const body = await request.json();
  const { title, level, description, campaignId } = body;
 
  try {
    await sql`INSERT INTO scenarios (title, level, description, campaign_id) VALUES (${title}, ${level}, ${description}, ${campaignId});`;
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}