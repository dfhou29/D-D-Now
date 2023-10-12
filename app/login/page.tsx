"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "public/background-img-monster.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    router.refresh();
    router.push("/");
  };

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
      <div className="flex flex-col justify-start h-screen items-center w-2/3 bg-slate-100 ml-auto mr-auto pt-16 overflow-y-auto bg-opacity-80">
        <h2 className=" text-md font-bold tracking-normal text-gray-600 text-4xl mt-12">
          Login
        </h2>
        <div className="border-t-2 border-gray-300 my-12 w-2/3 ml-auto mr-auto"></div>
        <form
          onSubmit={handleSubmit}
          className="w-auto md:w-10/12 ml-auto mr-auto"
        >
          <div className="flex flex-col justify-center mb-3 gap-x-4 w-80 ml-auto mr-auto">
            <label
              htmlFor="email"
              className="text-gray-600 text-md font-bold mb-2 self-start capitalize"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleEmail}
              required
              className="block w-full bg-gray-100 text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col justify-center gap-x-4 w-80 ml-auto mr-auto mb-4">
            <label
              htmlFor="password"
              className="text-gray-600 text-md font-bold mb-2 self-start capitalize"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handlePassword}
              required
              className="block w-full bg-gray-100 text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col justify-center items-center mb-3 gap-x-4 w-80 ml-auto mr-auto">
            <button
              className={
                "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 w-80 font-600"
              }
              type="submit"
            >
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
