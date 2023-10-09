import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
 
export async function POST(req: Request) {
  const body = await req.json();
  const { title } = body;
 
 
  try {
    await sql`INSERT INTO campaigns (title) VALUES (${title});`;
    revalidatePath(`/campaign`);

  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}