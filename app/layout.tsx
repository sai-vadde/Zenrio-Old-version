import type { Metadata } from "next";

import "./globals.css";
import Footer from "./components/Footer";
import "keen-slider/keen-slider.min.css";



export const metadata: Metadata = {
  title: "Zenrio Agency",
  description: "We are tech agency how can bulid website with auesthicness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="no-scrollbar::-webkit-scrollbar">
        {children}
        <Footer />
      </body>
    </html>
  );
}
