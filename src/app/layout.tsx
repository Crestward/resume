import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import SectionTransitions from "@/components/ui/SectionTransitions";
import MicroInteractions from "@/components/ui/MicroInteractions";
import EasterEggs from "@/components/ui/EasterEggs";
import LoadingScreen from "@/components/ui/LoadingScreen";
import MobileOptimizations from "@/components/ui/MobileOptimizations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oladimeji Adeyemi | Portfolio - Data Scientist & AI Engineer",
  description: "Portfolio of Oladimeji Adeyemi - Data Scientist, AI Engineer, and Machine Learning Specialist. Expertise in predictive modeling, data engineering, and cloud deployment.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingScreen />
        <BackgroundEffects />
        <CustomCursor />
        <ScrollProgress />
        <SectionTransitions />
        <MicroInteractions />
        <EasterEggs />
        <MobileOptimizations />
        {children}
      </body>
    </html>
  );
}
