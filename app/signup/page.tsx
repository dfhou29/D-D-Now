"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });

    router.push("/login");
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Enter your name"
          onChange={handleName}
          required
        />
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          onChange={handleEmail}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handlePassword}
          required
        />
        <button
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
