import Link from "next/link";
import { sql } from "@vercel/postgres";
import EditSettingButton from "@/components/EditSettingButton";
import DeleteSettingButton from "@/components/DeleteSettingButton";
import Image from "next/image";
import background from "public/background-img.jpg";

export default async function Setting({ params }: { params: { id: number } }) {
  const id = params.id;
  let data = await sql`SELECT * FROM settings WHERE id = ${id} ORDER BY id;`;
  const { rows } = data;
  const setting = rows[0];
  return (
    <div className="relative">
      <Image
        src={background}
        alt="background"
        className="h-screen absolute -z-10"
        style={{
          objectFit: "cover",
        }}
      ></Image>
      <div className="flex flex-col justify-start items-center h-screen w-2/3 bg-slate-100 ml-auto mr-auto pt-16 overflow-y-auto bg-opacity-80">
        <div className="flex flex-col justify-center items-center gap-y-16">
          <h1 className=" text-md font-bold tracking-normal text-gray-600 text-4xl mt-12">
            Setting: {setting.title}
          </h1>
          <div className="border-t-2 border-gray-300 w-1/2 ml-auto mr-auto"></div>

          <div className="min-w-3/5 w-10/12 text-md">{setting.description}</div>
          <div className="flex justify-around w-60 gap-x-4">
            <EditSettingButton setting={setting} />
            <DeleteSettingButton setting={setting} />
          </div>

          <div>
            <Link href={`/campaign/${setting.campaign_id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-56">
                BACK TO CAMPAIGN
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
