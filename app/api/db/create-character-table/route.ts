import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE characters (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        race VARCHAR(255) NOT NULL,
        rank VARCHAR(255) NOT NULL,
        background TEXT,
        alignment VARCHAR(255),
        level INTEGER NOT NULL,
        ability_scores JSONB
        hit_points INTEGER,
        hit_dice VARCHAR(50),
        proficiencies JSONB,
        racial_traits JSONB,
        class_features JSONB,
        equipments JSONB,
        spells JSONB,
        personality TEXT,
        ideals TEXT,
        bonds TEXT,
        flaws TEXT,
        backstory TEXT,
        age INTEGER,
        height VARCHAR(50),
        weight VARCHAR(50),
        eyes VARCHAR(50),
        skin VARCHAR(50),
        hair VARCHAR(50),
        user_id INTEGER REFERENCES users(id));`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// http://localhost:3000/api/db/create-character-table