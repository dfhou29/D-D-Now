import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const body = await request.json();
  const { id, title, level, description, enemies } = body;
 
  try {
    const result =
      await sql`UPDATE scenarios SET title = ${title}, level = ${level}, description = ${description}, enemies = ${enemies} WHERE id = ${id};`;
  
    return NextResponse.json(
    {
      id: result["rows"][0]["id"],
      campaign_id: result["rows"][0]["campaign_id"],
    },
    { status: 200 }
  );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
