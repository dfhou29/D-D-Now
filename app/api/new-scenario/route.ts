import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, level, enemies } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Given the preferences listed below, generate a unique and detailed Dungeons & Dragons combat scenario in the format of a single JSON object. If any preference is set to 'random', select an appropriate value that fits within the D&D 5e setting.

Expected JSON Format:
{
  "title": "Scenario title",
  "level": ${level},
  "description": "Scenario description",
  "enemies": {
    "Enemy1 name": {
      "description": "Description about Enemy1",
      "enemyCount": "Number of Enemy1",
      "alignment": "Enemy1 Alignment",
      "level": "Enemy1 Level",
      "abilityScores": {
        "strength": Value,
        "dexterity": Value,
        "constitution": Value,
        "intelligence": Value,
        "wisdom": Value,
        "charisma": Value
      },
      "hitPoints": Value,
      "armorClass": Value,
      "hitPoints": Value,
      "speed": Value,
      "attacks": [
        {
          "name": attack1 name,
          "type": attack1 type,
          "bonus": Value,
          "damage": attack1 damage
        },
        {
          "name": attack2 name,
          "type": attack2 type,
          "bonus": Value,
          "damage": attack2 damage
        }
      ],
      "spells": {
        "known": Value,
        "prepared": Value,
        "spellcastingAbility": Value,
        "spellsList": [
          spell1,
          spell2,
          spell3,
        ]
      },
    "Enemy2 name": {
      "description": "Description about Enemy2",
      "enemyCount": "Number of Enemy2",
      "alignment": "Enemy1 Alignment",
      "level": "Enemy2 Level",
      "abilityScores": {
        "strength": Value,
        "dexterity": Value,
        "constitution": Value,
        "intelligence": Value,
        "wisdom": Value,
        "charisma": Value
      },
      "hitPoints": Value,
      "armorClass": Value,
      "hitPoints": Value,
      "speed": Value,
      "attacks": [
        {
          "name": attack1 name,
          "type": attack1 type,
          "bonus": Value,
          "damage": attack1 damage
        },
        {
          "name": attack2 name,
          "type": attack2 type,
          "bonus": Value,
          "damage": attack2 damage
        }
      ],
      "spells": {
        "known": Value,
        "prepared": Value,
        "spellcastingAbility": Value,
        "spellsList": [
          spell1,
          spell2,
          spell3,
        ]
      }
    }
  }
}


Your Preferences:
- Title: ${title}
- Level: ${level}
- Enemies: ${enemies}
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
