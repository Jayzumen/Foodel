import Navbar from "../components/Nav/Navbar";
import "./globals.css";
import { MainProvider } from "../components/providers/providers";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";

const poppins = Poppins({
  style: "normal",
  weight: ["200", "400", "600", "700", "900"],
  fallback: ["sans-serif", "system-ui"],
  subsets: ["latin-ext", "latin"],
});

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
    <html suppressHydrationWarning lang="en">
      <body className={`${poppins.className} bg-zinc-100 dark:bg-zinc-950`}>
        <MainProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
        </MainProvider>
      </body>
    </html>
  );
}
