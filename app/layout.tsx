import "../styles/globals.css";
import Navbar from "./components/Navbar";
import { Inter, Poppins, Lato } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata = {
  title: "DnD Now",
  description: "Start your DnD journey now",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${lato.variable} font-poppins overflow-y-hidden`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
