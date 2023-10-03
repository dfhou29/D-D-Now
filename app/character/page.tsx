import Link from "next/link";
import React from "react";

const Character = () => {
  return (
    <div>
      <h1>List of Created Characters</h1>
      <button>
        <Link href={"character/new"}>New Character</Link>
      </button>
    </div>
  );
};

export default Character;
