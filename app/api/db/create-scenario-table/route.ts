import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE scenarios (id SERIAL PRIMARY KEY NOT NULL, title varchar(255) NOT NULL, description TEXT NOT NULL, enemies JSONB, campaign_id INTEGER REFERENCES campaigns(id) NOT NULL);`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// http://localhost:3000/api/db/create-scenario-table