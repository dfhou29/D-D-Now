export const revalidate = 0;
import CharacterTemplate from "../../components/CharacterTemplate";

import { getCookieData } from "@/helper/getCookieData";

export default function NewCharacterTemplate() {
  const userId = getCookieData().id;
  return (
    <div className="flex flex-col justify-center items-center w-4/5 bg-slate-100 ml-auto mr-auto">
      <h2 className="mb-16 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
        Character Template
      </h2>

      <CharacterTemplate user_id={userId} />
    </div>
  );
}
