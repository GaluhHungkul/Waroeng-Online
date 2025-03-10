"use client";

import "./globals.css";
import Navbar from "./Components/Navbar";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const disableNavbar = ["/login", "/register"];
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-900 via-gray-800 opacity-80" />
          {/* <div className="absolute inset-0 backdrop-blur-sm"/> */}
        </div>
        <Provider store={store}>
          {!disableNavbar.includes(pathname) && <Navbar />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
