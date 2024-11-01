import type { Metadata } from "next";
import localFont from "next/font/local";
import { Source_Code_Pro } from "next/font/google";

import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans-pro",
  weight: ["400", "600", "700"],
});
export const metadata: Metadata = {
  title: "Next Auth",
  description: "Aplicação base para autenticação",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${sourceCodePro.className} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session} refetchOnWindowFocus>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
