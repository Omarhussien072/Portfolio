import type { Metadata } from "next";
import { Fira_Code } from 'next/font/google';
import "./globals.css";

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code', // هذا الاسم سنستخدمه في Tailwind
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Terminal Like Portfolio",
  icons:{
    icon: "/terminal.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaCode.variable} h-full antialiased`}
    >
      <body className={` ${firaCode.variable} font-mono antialiased min-h-full flex flex-col`}>{children}
      </body>
    </html>
  );
}
