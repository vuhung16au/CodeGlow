import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeGlow - Code Beautifier",
  description: "The ultimate code beautifier for Python, Java, & JavaScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
