import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { title } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Given the preferences listed below, generate a detailed Dungeons & Dragons setting in the format of a single JSON object. Please limit your response to only be within the expected json format. If any preference is set to 'random', select an appropriate value that fits within the D&D 5e setting. Try not to provide repeated or very similar campaign settings, instead provide a unique, creative and detailed setting with an interesting location and overarching objective. Please have the setting description be in multiple paragraphs. Use new line escape sequence for new line.

Expected JSON Format:
{
  "title": "Scenario title",
  "description": "Scenario description"
}

Your Preferences:
- Title: ${title}
`;
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
    temperature: 1,
    n: 1,
  });

  const response = chatCompletion?.choices[0].message.content;
  const setting = response?.replace(/^Output: \s*/, "");
  console.log(response);

  if (setting) {
    return new Response(setting, {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Failed to generate setting.", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
