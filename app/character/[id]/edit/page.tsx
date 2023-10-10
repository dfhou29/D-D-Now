import { getCookieData } from "@/helper/getCookieData";

import CharacterTemplate from "../../../components/CharacterTemplate";
export const revalidate = 0;
export default function EditCharacter() {
  const userId = getCookieData().id;
  return (
    <div>
      <p>Edit character</p>
      <CharacterTemplate user_id={userId} />
    </div>
  );
}
