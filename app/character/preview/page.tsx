import CharacterTemplate from "../../components/CharacterTemplate";

import { getCookieData } from "@/helper/getCookieData";

export default function NewCharacterTemplate() {
  const userId = getCookieData().id;
  return <CharacterTemplate user_id={userId} />;
}

export const revalidate = 0;
