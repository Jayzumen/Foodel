"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const ToastProvider = () => {
  return <Toaster position="bottom-center" reverseOrder={false} />;
};

const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProviders>
        <AuthProvider>
          {children}
          <ToastProvider />
          <ReactQueryDevtools />
        </AuthProvider>
      </ThemeProviders>
    </QueryProvider>
  );
};
