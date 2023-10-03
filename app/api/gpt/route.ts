import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { race, background, classe, alignment } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Generate a detailed Dungeons & Dragons 5e character sheet in JSON format based on the following preferences: race: ${race}, class: ${classe}, background: ${background}, alignment: ${alignment}.`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 5,
  });

  console.log(chatCompletion.choices);
  return new Response("OK");
}
