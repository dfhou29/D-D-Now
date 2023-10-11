import { getCookieData } from "@/helper/getCookieData";

import CharacterTemplate from "../../../components/CharacterTemplate";
export default function EditCharacter() {
  const userId = getCookieData().id;
  return <CharacterTemplate user_id={userId} />;
}

export const revalidate = 0;
