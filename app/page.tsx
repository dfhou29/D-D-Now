import Link from "next/link";
import "../styles/globals.css";

export default function Page() {
  return (
    <>
      <h1>D&D now</h1>
      <Link href="/character/new">
        <button>New Character</button>
      </Link>
    </>
  );
}
