import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
 
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const data = await sql`SELECT * FROM users WHERE email = ${email};`;
    const { rows } = data;
    const user = rows[0];
    
    if(user) {
      return NextResponse.json("User already exists", {status: 400});
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    
    const newUser = await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword});`;
    
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser
    });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}