"use client";

import { useRouter } from "next/navigation";

export default function EditCharacter({ character, id }) {
  const router = useRouter();

  const handleClick = () => {
    let updatedCharacter = { ...character };
    updatedCharacter.armorClass = character.armor_class;
    updatedCharacter.abilityScores = character.ability_scores;
    updatedCharacter.hitPoints = character.hit_points;
    updatedCharacter.hitDice = character.hit_dice;
    updatedCharacter.racialTraits = character.racial_traits;
    updatedCharacter.classFeatures = character.class_features;

    delete updatedCharacter.armor_class;
    delete updatedCharacter.ability_scores;
    delete updatedCharacter.hit_points;
    delete updatedCharacter.hit_dice;
    delete updatedCharacter.racial_traits;
    delete updatedCharacter.class_features;

    const characterJSON = JSON.stringify(updatedCharacter);
    localStorage.removeItem("character");
    localStorage.setItem("character", characterJSON);

    router.push(`/character/${id}/edit`);
  };
  return (
    <button
      className="bg-gray-400 hover:bg-blue-700 text-white py-2 px-3 w-24 font-600"
      onClick={handleClick}
    >
      EDIT
    </button>
  );
}
