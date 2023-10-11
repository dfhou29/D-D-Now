import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";

export const getCookieData = () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || '';
    const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
}