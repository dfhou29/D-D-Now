export const revalidate = 0;
import CharacterTemplate from "../../components/CharacterTemplate";

import { getCookieData } from "@/helper/getCookieData";

export default function NewCharacterTemplate() {
  const userId = getCookieData().id;
  console.log("userId is: ", userId);
  return (
    <div>
      <h2 className="text-center text-4xl">Character Sheet</h2>
      <p className="text-center">
        For user to customize based on gpt suggestion
      </p>
      <CharacterTemplate user_id={userId} />
    </div>
  );
}
