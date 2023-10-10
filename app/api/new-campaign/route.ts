import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(req: Request) {
  const body = await req.json();
  const { title, userId } = body;
 
 
  try {
    await sql`INSERT INTO campaigns (title, user_id) VALUES (${title}, ${userId});`;
    return NextResponse.json({
      message: "Campaign created successfully",
      success: true
    })
    
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}