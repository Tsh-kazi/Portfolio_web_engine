import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansBody = Inter({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
});

const sansHeading = Plus_Jakarta_Sans({
  variable: "--font-sans-heading",
  subsets: ["latin"],
  display: "swap",
});

const monoSystem = JetBrains_Mono({
  variable: "--font-mono-system",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "H.E. Tshibaza Kazi Christian | Systems Specialist & Network Infrastructure Administrator",
  description: "Designing resilient, high-scale network architectures, enterprise routing environments, and automated system infrastructure with absolute availability.",
  keywords: [
    "Systems Specialist",
    "Network Infrastructure Administrator",
    "Enterprise Routing",
    "VLAN Configuration",
    "System Automation",
    "Linux Systems Administration",
    "Infrastructure Security",
    "Digital Risk Mitigation",
    "H.E. Tshibaza Kazi Christian",
  ],
  authors: [{ name: "H.E. Tshibaza Kazi Christian" }],
  openGraph: {
    title: "H.E. Tshibaza Kazi Christian | Systems Specialist",
    description: "Designing resilient, high-scale network architectures and automated system environments with absolute availability.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sansBody.variable} ${sansHeading.variable} ${monoSystem.variable} antialiased min-h-screen relative`}
        style={{ backgroundColor: "#030303" }}
      >
        {/* Beautiful Ambient Background Glows */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Top purple glow */}
          <div className="absolute top-[-10%] left-[30%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
          {/* Middle left cyan glow */}
          <div className="absolute top-[30%] left-[-10%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-brand-indigo/5 blur-[100px] pointer-events-none" />
          {/* Right pink/magenta glow */}
          <div className="absolute top-[60%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] rounded-full bg-brand-pink/5 blur-[120px] pointer-events-none" />
        </div>

        {/* Minimal grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 matrix-grid opacity-15"
        />

        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
