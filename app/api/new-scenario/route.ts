import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, level, enemies } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Given the preferences listed below, generate a unique and detailed Dungeons & Dragons combat scenario in the format of a single JSON object. Please limit your response to only be within the expected json format. If any preference is set to 'random', select an appropriate value that fits within the D&D 5e setting. Provide a unique, creative and detailed D&D encounter scenario with an interesting location, description and enemies. Please have the setting description be in multiple paragraphs. Use new line escape sequence for new line.

Expected JSON Format:
{
  "title": "Scenario title",
  "level": ${level},
  "description": "Scenario description",
  "enemies": "Scenario enemies"
}


Your Preferences:
- Title: ${title}
- Level: ${level}
- Enemies: ${enemies}
`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
    temperature: 1,
    n: 1,
  });

  const response = chatCompletion?.choices[0].message.content;
  const scenario = response?.replace(/^Output: \s*/, "");
  console.log(response);

  if (response) {
    return new Response(scenario, {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Failed to generate scenario.", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
