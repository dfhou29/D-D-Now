import Link from "next/link";
import "../styles/globals.css";
import Image from "next/image";
import background from "public/background-img-monster.png";
import { cookies } from "next/headers";
import { getCookieData } from "@/helper/getCookieData";

export default function Page() {
  let username = null;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  if (token) {
    username = getCookieData().name;
  }
  return (
    <main className="w-full mt-16 font-poppins overflow-y-hidden">
      <div className="relative overflow-hidden">
        <Image
          src={background}
          alt="background"
          className="h-screen fixed -z-10 "
          style={{
            objectFit: "cover",
            overflow: "hidden",
          }}
        ></Image>
        <div className="flex flex-col justify-start h-screen items-center w-2/3 bg-slate-100 ml-auto mr-auto overflow-y-auto bg-opacity-80">
          <div className="flex flex-col">
            <div>
              <img src="/banner.jpg" alt="banner" />
            </div>
            <div>
              <h1 className="mb-8 font-bold tracking-normal text-gray-700 text-4xl mt-12 text-center">
                Welcome to D&D Now!
              </h1>
              <p className="mb-4 text-lg tracking-normal text-gray-700 t-12 text-start w-2/3 ml-auto mr-auto">
                Step into the exciting world of Dungeons and Dragons without any
                fuss. Whether you're a regular player looking for a quick
                character setup or a gamemaster wanting to build your own
                Campaigns with custom scenarios and settings. D&D Now got you
                covered.
              </p>
            </div>
            <div className="border-t-2 border-gray-300 my-12 w-2/3 ml-auto mr-auto"></div>
            <h2 className=" font-bold tracking-normal text-gray-600 text-3xl text-center">
              Core Features
            </h2>

            <div>
              <h3 className="mb-8 font-bold tracking-normal text-stone-500 text-2xl mt-12 text-center">
                Instant Character Creation
              </h3>
              <p className="mb-4 text-md tracking-normal text-gray-700 t-12 text-start w-2/3 ml-auto mr-auto">
                No more hours of crunching numbers and diving into rulebooks.
                With just a few clicks, D&D Now provides a comprenhensive
                character sheet in PDF powered by OpenAI GPT, ready for your
                next game.
              </p>
            </div>
            <div>
              <h3 className="mb-8 font-bold tracking-normal text-stone-500 text-2xl mt-12 text-center">
                Tailored Campaign Setup
              </h3>
              <p className="mb-4 text-md tracking-normal text-gray-700 t-12 text-start w-2/3 ml-auto mr-auto">
                D&D Now generates unique campaigns with creative settings and
                scenarios for GMs. GMs can craft custom scenarios and settings
                that perfectly suit their preference and playstyle in no time.
              </p>
            </div>
            <div>
              <h3 className="mb-8 font-bold tracking-normal text-stone-500 text-2xl mt-12 text-center">
                Save, Manage and Updates
              </h3>
              <p className="mb-4 text-md tracking-normal text-gray-700 t-12 text-start w-2/3 ml-auto mr-auto">
                Save your creations, manage them with simplicity, and refine as
                your narrative progresses.
              </p>
            </div>
            <div className="border-t-2 border-gray-300 my-12 w-2/3 ml-auto mr-auto"></div>
            {username ? (
              <>
                <h3 className=" font-bold tracking-normal text-gray-600 text-3xl text-center">
                  Quick Start
                </h3>
                <div className="flex justify-center gap-x-24 mb-48">
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <h3 className="mb-1 font-600 tracking-normal text-stone-500 text-lg mt-12 text-center">
                      For Player
                    </h3>
                    <Link href="/character/new">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-48 font-600">
                        New Character
                      </button>
                    </Link>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <h3 className="mb-1 font-600 tracking-normal text-stone-500 text-lg mt-12 text-center">
                      For Gamemaster(GM)
                    </h3>
                    <Link href="/campaign/new">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 w-48 font-600">
                        New Campaign
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
