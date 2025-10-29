import React from "react";
import Navbar from "@/components/Navbar";

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar lang="en" />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
