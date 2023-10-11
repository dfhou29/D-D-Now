import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const race = searchParams.get("race");
  const rank = searchParams.get("rank");
  const background = searchParams.get("background");
  const alignment = searchParams.get("alignment");
  const armor_class = searchParams.get("armorClass");
  const level = searchParams.get("level");
  const age = searchParams.get("age");
  const height = searchParams.get("height");
  const weight = searchParams.get("weight");
  const eyes = searchParams.get("eyes");
  const skin = searchParams.get("skin");
  const hair = searchParams.get("hair");
  const hit_points = searchParams.get("hitPoints");
  const hit_dice = searchParams.get("hitDice");
  const ability_scores = searchParams.get("abilityScores");
  const proficiencies = searchParams.get("proficiencies");
  const racial_traits = searchParams.get("racialTraits");
  const class_features = searchParams.get("classFeatures");
  const equipments = searchParams.get("equipments");
  const spells = searchParams.get("spells");
  const personality = searchParams.get("personality");
  const ideals = searchParams.get("ideals");
  const bonds = searchParams.get("bonds");
  const flaws = searchParams.get("flaws");
  const backstory = searchParams.get("backstory");
  const user_id = searchParams.get("user_id");

  try {
    if (!id) throw new Error("id required");
    if (!name) throw new Error("Name required");
    if (!race) throw new Error("Race required");
    if (!rank) throw new Error("Rank required");
    if (!level) throw new Error("level required");

    const result =
      await sql`UPDATE characters SET name = ${name}, race = ${race}, rank = ${rank}, background = ${background}, alignment = ${alignment}, level = ${level}, armor_class = ${armor_class}, age =${age}, height = ${height}, weight = ${weight}, eyes = ${eyes}, skin =${skin}, hair = ${hair}, hit_points = ${hit_points}, hit_dice= ${hit_dice}, ability_scores = ${ability_scores}, proficiencies = ${proficiencies}, racial_traits = ${racial_traits}, class_features = ${class_features}, equipments = ${equipments}, spells = ${spells}, personality = ${personality}, ideals = ${ideals}, bonds = ${bonds}, flaws = ${flaws}, backstory = ${backstory}, user_id = ${user_id} WHERE id = ${id} RETURNING id, user_id;`;

    return NextResponse.json(
      {
        id: result["rows"][0]["id"],
        user_id: result["rows"][0]["user_id"],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("id", id);
    console.log("name", name);
    console.log("race", race);
    console.log("rank", rank);
    console.log("background", background);
    console.log("alignment", alignment);
    console.log("armor_class", armor_class);
    console.log("level", level);
    console.log("age", age);
    console.log("height", height);
    console.log("weight", weight);
    console.log("eyes", eyes);
    console.log("skin", skin);
    console.log("hair", hair);
    console.log("hit_points", hit_points);
    console.log("hit_dice", hit_dice);
    console.log("ability_scores", ability_scores);
    console.log("proficiencies", proficiencies);
    console.log("racial_traits", racial_traits);
    console.log("class_features", class_features);
    console.log("equipments", equipments);
    console.log("spells", spells);
    console.log("personality", personality);
    console.log("ideals", ideals);
    console.log("bonds", bonds);
    console.log("flaws", flaws);
    console.log("backstory", backstory);
    console.log("user_id", user_id);

    console.error("Updated Error:", error.message);
    return NextResponse.json({ error }, { status: 500 });
  }
}
