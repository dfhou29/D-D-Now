import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { title } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

    const prompt = `Given the preferences listed below, generate a unique and detailed Dungeons & Dragons setting in the format of a single JSON object. If any preference is set to 'random', select an appropriate value that fits within the D&D 5e setting.

Expected JSON Format:
{
  "title": "Scenario title",
  "description": "Scenario description",
}

Your Preferences:
- Title: ${title}
`;
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 1,
  });

  const response = chatCompletion?.choices[0].message.content;
  console.log(response);

  if (response) {
    return new Response(response, {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Failed to generate setting.", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}