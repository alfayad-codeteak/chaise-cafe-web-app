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
  title: "Chaise : Cafeteria & Restaurant",
  description: "Experience the finest coffee and culinary delights at Chaise : Cafeteria & Restaurant. A perfect blend of taste and ambiance.",
  openGraph: {
    title: "Chaise : Cafeteria & Restaurant",
    description: "Experience the finest coffee and culinary delights at Chaise. A perfect blend of taste and ambiance.",
    siteName: "Chaise : Cafeteria & Restaurant",
    images: [
      {
        url: "/chaise-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Chaise : Cafeteria & Restaurant Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaise : Cafeteria & Restaurant",
    description: "Experience the finest coffee and culinary delights at Chaise.",
    images: ["/chaise-logo.jpg"],
  },
  icons: {
    icon: "/chaise-logo.jpg",
    apple: "/chaise-logo.jpg",
  },
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
          defaultTheme="dark"
          forcedTheme="dark"
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
