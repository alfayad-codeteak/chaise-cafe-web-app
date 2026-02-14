import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashScreen } from "@/components/ui/splash-screen";

const excalifont = localFont({
  src: "../../public/font/Excalifont-Regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brew & Bite",
  description: "Order your favorite coffee and meals",
};

import { FloatingControls } from "@/components/layout/floating-controls";

// ... previous code

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={excalifont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <FloatingControls />
            <Toaster />
            <SplashScreen />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
