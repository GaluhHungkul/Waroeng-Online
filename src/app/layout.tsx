import "./globals.css";
import Navbar from "../components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/Footer";
import DialogAuthCard from "@/components/DialogAuthCard";
import Script from "next/script";

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
          <DialogAuthCard />
          <Footer />
          <Toaster closeButton duration={2000} theme="dark" position="top-center" className="bg-black"/>         
          <Script 
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
            strategy="afterInteractive"
          />
        </SessionProviderWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
