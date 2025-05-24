import "./globals.css";
import Navbar from "./Components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-900 via-gray-800 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm z-[-100]"/>
        </div>
          <Navbar />
          {children}
      </body>
    </html>
  );
}
