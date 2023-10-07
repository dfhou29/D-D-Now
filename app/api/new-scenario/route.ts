import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, level, enemies, campaign_id } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Generate a detailed and unique level ${level} scenario in JSON format with a title: ${title}, description and enemies: ${enemies}. If the title or enemies is random provide a title that fits the scenario.`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 1,
  });

  console.log(chatCompletion.choices);
  return new Response("OK");
}
