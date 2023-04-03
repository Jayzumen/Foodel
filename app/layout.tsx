import Navbar from "./components/Nav/Navbar";
import "./globals.css";

export const metadata = {
  title: "Foodel",
  description: "Foodel is a food delivery service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">
        <Navbar />
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
      </body>
    </html>
  );
}
