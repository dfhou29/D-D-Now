import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { race, background, rank, alignment, level } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Create a Dungeons & Dragons 5e character sheet in JSON format using the provided details. If any of the level, race, class, background, or alignment attributes are set to 'random', choose an appropriate value from the D&D 5e universe. 
                  Preference:
                  - Race: ${race}
                  - Class: ${rank}
                  - Background: ${background}
                  - Alignment: ${alignment}
                  - Level: ${level}
                `;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 1,
  });

  console.log(chatCompletion.choices);
  return new Response("OK");
}
