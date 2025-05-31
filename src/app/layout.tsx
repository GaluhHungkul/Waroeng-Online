import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast"
import type { Metadata } from "next"; 

export const metadata : Metadata = {
  title : "Waroeng Online"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-primary ">
        <Toaster position="top-right" reverseOrder={false}/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
