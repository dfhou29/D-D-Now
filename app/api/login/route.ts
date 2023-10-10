import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const data = await sql`SELECT * FROM users WHERE email = ${email};`;
    const { rows } = data;
    const user = rows[0];

    if(!user) {
      return NextResponse.json({error: "User does not exists"}, {status: 400});
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    
    if(!validPassword){
      return NextResponse.json({error: "Invalid password"}, {status: 400});
    }
          
    //create token data
    const tokenData = {
      id: user.id,
      name: user.name
    }

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true, 
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}