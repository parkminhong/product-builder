import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "신비의 서 - 사주, 손금, 고민해결",
  description: "당신의 미래를 확인하고 고민을 해결하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white flex flex-col`}>
        <Header />
        <main className="flex-grow pt-20 px-4">
          <div className="max-w-4xl mx-auto w-full h-full">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}