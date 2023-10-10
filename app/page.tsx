import Link from "next/link";
import "../styles/globals.css";

export default function Page() {
  return (
    <main>
      <h1>D&D now</h1>
      <div>
        <Link href="/character/new">New Character</Link>
      </div>
      <div>
        <Link href="/campaign/new">New Champaign</Link>
      </div>
    </main>
  );
}
