import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-white">
        <Toaster position="top-right" reverseOrder={false}/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
