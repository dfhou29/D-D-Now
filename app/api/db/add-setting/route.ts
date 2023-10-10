import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const campaign_id = searchParams.get('campaign_id');
 
  try {
    if (!title) throw new Error('Setting title required');
    await sql`INSERT INTO settings (title, description, campaign_id) VALUES (${title}, ${description}, ${campaign_id});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  revalidatePath("/campaign/[id]");
  const settings = await sql`SELECT * FROM settings;`;
  return NextResponse.json({ settings }, { status: 200 });
}

// http://localhost:3000/api/db/add-setting?title=Vampire%20lord%20of%20Barovia%20valley&description=The%20dark%20lord%20Von%20Zarovich%20has%20had%20a%20strangle%20hold%20on%20the%20Barovian%20valley%20for%20centuries%20...&campaign_id=1