import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cladex — Structured Transaction Workflow",
  description:
    "Guided workflow software for real estate buyers and sellers. Not a broker. Not legal advice. Close confidently.",
  metadataBase: new URL("https://cladex.io"),
  openGraph: {
    title: "Cladex — Structured Transaction Workflow",
    description:
      "Guided workflow software for real estate buyers and sellers.",
    siteName: "Cladex",
    type: "website",
    images: [
      {
        url: "https://cladex.io/banner.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cladex — Structured Transaction Workflow",
    description:
      "Guided workflow software for real estate buyers and sellers.",
  },
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
