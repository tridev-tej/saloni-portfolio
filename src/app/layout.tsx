import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import MouseSpotlight from "@/components/MouseSpotlight";
import Starfield from "@/components/Starfield";
import BackToTop from "@/components/BackToTop";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL("https://salonidabgar.com"),
  title: "Saloni Dabgar | Engineer, Builder, Thinker",
  description: "Software Developer at Jaguar Land Rover. I build embedded systems, full-stack apps, and blockchain platforms. IIT Kanpur alumna who thinks about code, nature, and the systems that run inside people.",
  keywords: ["software developer", "embedded systems", "Jaguar Land Rover", "IIT Kanpur", "systems thinker", "Saloni Dabgar", "portfolio", "full-stack", "blockchain"],
  authors: [{ name: "Saloni Dabgar" }],
  creator: "Saloni Dabgar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://salonidabgar.com",
    siteName: "Saloni Dabgar",
    title: "Saloni Dabgar | Engineer, Builder, Thinker",
    description: "I write software that runs inside Jaguar Land Rover vehicles. I study the systems that run inside people.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saloni Dabgar | Engineer, Builder, Thinker",
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
      <body className="antialiased min-h-screen flex flex-col grain">
        <Preloader />
        <SmoothScroll />
        <div className="aurora" />
        <Starfield />
        <MouseSpotlight />
        <CustomCursor />
        <Navigation />
        <main className="flex-1 pt-20 relative z-10 isolate">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
