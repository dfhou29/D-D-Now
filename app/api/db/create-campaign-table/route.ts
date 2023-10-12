import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE campaigns (id SERIAL PRIMARY KEY NOT NULL, title VARCHAR(255) NOT NULL, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE);`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// http://localhost:3000/api/db/create-campaign-table
