import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { race, background, rank, alignment, level } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
Given the preferences listed below, generate a detailed Dungeons & Dragons 5e character sheet in the format of a single JSON object. If any preference is set to 'random', select an appropriate value that fits within the D&D 5e setting. Always assign an appropriate name when generating a character. Replace placeholders with appropriate values. Output should be pure JSON without any other text.

Expected JSON Format:
{
  "name": "Character Name",
  "race": "Character Race",
  "rank": "Character Class",
  "background": "Character Background",
  "alignment": "Character Alignment",
  "level": "Character Level",
  "armorClass": value,
  "abilityScores": {
    "strength": Value,
    "dexterity": Value,
    "constitution": Value,
    "intelligence": Value,
    "wisdom": Value,
    "charisma": Value
  },
  "hitPoints": Value,
  "hitDice": "Dice Format",
  "proficiencies": {
    "PLACEHOLDER_PROFICIENCY_NAME": {
      "description": "Description about Proficiency1",
    },
    "PLACEHOLDER_PROFICIENCY_NAME": {
      "description": "Description about Proficiency2",

    }
  },
  "racialTraits": {
    "PLACEHOLDER_RACIAL_TRAITS_NAME": {
      "description": "PLACEHOLDER_DESCRIPTION",
    },
    "PLACEHOLDER_RACIAL_TRAITS_NAME": {
      "description": "PLACEHOLDER_DESCRIPTION",
    }
  },
  "classFeatures": {
    "PLACEHOLDER_CLASS_FEATURE_NAME": {
      "description": "PLACEHOLDER_DESCRIPTION",
    },
    "PLACEHOLDER_CLASS_FEATURE_NAME": {
      "description": "PLACEHOLDER_DESCRIPTION",
    }
  },
  "equipments": {
    "PLACEHOLDER_EQUIPMENT_NAME": {
      "description": "PLACEHOLDER_DESCRIPTION",
    },
    "PLACEHOLDER_EQUIPMENT_NAME": {
      "description": "PLACEHOLDER_DESCRIPTION",
    }
  },
  "spells": {
    "Cantrips": {
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      },
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      },
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      }
    },
    "Level "PLACEHOLDER_SPELL_LEVEL"": {
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      },
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      },
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      }
    },
    "Level "PLACEHOLDER_SPELL_LEVEL"": {
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      },
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      },
      "PLACEHOLDER_SPELL_NAME": {
        "description": "PLACEHOLDER_DESCRIPTION",
      }
    },
    ....
  },
  "personality": "PLACEHOLDER_DESCRIPTION",
  "ideals": "PLACEHOLDER_DESCRIPTION",
  "bonds": "PLACEHOLDER_DESCRIPTION",
  "flaws": "PLACEHOLDER_DESCRIPTION",
  "backstory": "PLACEHOLDER_DESCRIPTION",
  "age": "PLACEHOLDER_VALUE",
  "height": "PLACEHOLDER_HEIGHT",
  "weight": "PLACEHOLDER_WEIGHT",
  "eyes": "PLACEHOLDER_COLOR",
  "skin": "PLACEHOLDER_SKIN",
  "hair": "PLACEHOLDER_HAIR"
}


Your Preferences:
- Race: ${race}
- Class: ${rank}
- Background: ${background}
- Alignment: ${alignment}
- Level: ${level}
`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
    temperature: 0.5,
  });

  const response = chatCompletion?.choices[0].message.content;
  console.log(response);
  const character = response?.replace(/^Output: \s*/, "");

  if (character) {
    return new Response(character, {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Failed to generate character.", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
