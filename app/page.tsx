import Link from "next/link";
import "../styles/globals.css";
import Image from "next/image";
import background from "public/background-img.jpg";

export default function Page() {
  return (
    <main className="w-full h-full mt-16">
      <div className="relative">
        <Image
          src={background}
          alt="background"
          className="h-screen absolute -z-10"
          style={{
            objectFit: "cover",
          }}
        ></Image>
        <div className="flex flex-col justify-start h-screen items-center w-2/3 bg-slate-100 ml-auto mr-auto pt-16 overflow-y-auto bg-opacity-80">
          <h1>D&D now</h1>
          <div>
            <Link href="/character/new">New Character</Link>
          </div>
          <div>
            <Link href="/campaign/new">New Champaign</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
