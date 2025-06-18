import "./globals.css";
import Navbar from "../components/navbar";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-white">
        <Toaster position="top-right" reverseOrder={false} />
        <SessionProviderWrapper session={session}>
          <Navbar />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
