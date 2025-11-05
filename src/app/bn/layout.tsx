import React from "react";
import Navbar from "@/components/Navbar";

export default function BanglaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <Navbar lang="bn" />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
