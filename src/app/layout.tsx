import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://salonidabgar.com"),
  title: "Saloni | IIT Kanpur | 10x engineer",
  description: "10x Engineer at Jaguar Land Rover building embedded systems, full-stack apps, and blockchain platforms. IIT Kanpur alumna who thinks about code, nature, and the systems that run inside people.",
  keywords: ["10x engineer", "software developer", "embedded systems", "Jaguar Land Rover", "IIT Kanpur", "systems thinker", "Saloni Dabgar", "portfolio", "full-stack", "blockchain"],
  authors: [{ name: "Saloni Dabgar" }],
  creator: "Saloni Dabgar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://salonidabgar.com",
    siteName: "Saloni Dabgar",
    title: "Saloni | IIT Kanpur | 10x engineer",
    description: "I write software that runs inside Jaguar Land Rover vehicles. I study the systems that run inside people.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saloni | IIT Kanpur | 10x engineer",
    description: "I write software that runs inside Jaguar Land Rover vehicles. I study the systems that run inside people.",
    creator: "@salonidabgar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
