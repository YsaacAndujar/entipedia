import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { Providers } from "@/providers/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entipedia",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer autoClose={3000} pauseOnFocusLoss={false} pauseOnHover={false}/>
        <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Providers>
          <AppSidebar />
          <main className="flex-1 p-6 overflow-y-auto bg-background">
            {children}
          </main>
        </Providers>
      </div>
    </div>
      </body>
    </html>

  );
}
