// app/layout.tsx
// import "./globals.css";
import '../../styles/globals.css'
import { Inter } from "next/font/google";
import NextAuthProvider from "./NextAuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Finance Advisor",
  description: "AI-powered personal finance manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
