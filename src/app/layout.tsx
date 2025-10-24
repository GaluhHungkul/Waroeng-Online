import "./globals.css";
import Navbar from "../components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/Footer";

export const metadata : Metadata = {
  title : "Waroeng Online"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-white">
        <QueryProvider>
          <SessionProviderWrapper session={session}>
          <Navbar />
          {children}
          <Footer />
          <Toaster closeButton duration={2000} theme="dark" position="bottom-right"/>         
        </SessionProviderWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
