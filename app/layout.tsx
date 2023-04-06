import { User } from "@clerk/nextjs/dist/api";
import Navbar from "./components/Nav/Navbar";
import "./globals.css";
import { ClerkProvider, currentUser } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import ToastProvider from "./components/ToastProvider";

export const metadata = {
  title: "Foodel",
  description: "Foodel is a food delivery service",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className="bg-slate-900 text-white">
          <Navbar />
          <main className="min-h-[calc(100vh-80px)]">{children}</main>
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
