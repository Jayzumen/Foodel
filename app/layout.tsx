import Navbar from "./components/Nav/Navbar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import ToastProvider from "./components/ToastProvider";
import QueryProvider from "./components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <QueryProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-80px)]">{children}</main>
            <ToastProvider />
            <ReactQueryDevtools />
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
