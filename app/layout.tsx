import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Cladex — Transaction workflow for real estate",
  description:
    "Structured, legally-safe workflow tools for buyers and sellers. Not a broker, attorney, or escrow provider.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
