import { sql } from '@vercel/postgres';
 
export async function GET(request: Request) {
  const name = await request.json();
 
  try {
    await sql`INSERT INTO campaigns (name) VALUES (${name});`;
    
    return { message: `Added campaign ${name}` }
  } catch (e) {
    return { message: 'Failed to add campaign' }
  }
}