import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { SocketProvider } from '@/context/SocketProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMU Connect",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SocketProvider>
      <body className={`${inter.className} w-screen grid grid-cols-4 bg-gray-100 overflow-x-hidden`}>
        {children}
      </body>
      </SocketProvider>
    </html>
  );
}



