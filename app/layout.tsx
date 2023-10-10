import "../styles/globals.css";
import Navbar from './components/Navbar'

export const metadata = {
  title: 'DnD Now',
  description: 'Start your DnD journey now',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
