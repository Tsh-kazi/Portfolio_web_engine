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
  title: "H.E. Tshibaza Kazi Christian | Systems & Network Administrator",
  description:
    "Official portfolio of H.E. Tshibaza Kazi Christian, an IT professional and systems specialist specializing in Network Administration and Web Development.",
  keywords: [
    "Tshibaza Kazi",
    "Tshibaza Kazi Christian",
    "Computer Networking",
    "Bugema University",
    "Systems Specialist",
    "IT Professional",
  ],
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "H.E. Tshibaza Kazi Christian" }],
  openGraph: {
    type: "profile",
    title: "H.E. Tshibaza Kazi Christian | Portfolio",
    description:
      "IT Professional & Systems Specialist. Double-check my latest network architecture deployments and projects.",
    images: [
      {
        url: "https://your-portfolio-domain.com/assets/tshibaza-kazi-christian-it-specialist.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "H.E. Tshibaza Kazi Christian",
              "givenName": "Christian",
              "familyName": "Tshibaza Kazi",
              "jobTitle": "IT Professional & Systems Specialist",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Bugema University"
              },
              "url": "https://your-portfolio-domain.com",
              "image": "https://your-portfolio-domain.com/assets/tshibaza-kazi-christian-it-specialist.jpg",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kampala",
                "addressRegion": "Central Region",
                "addressCountry": "Uganda"
              },
              "sameAs": [
                "https://www.linkedin.com/in/your-exact-linkedin-username"
              ]
            })
          }}
        />
      </head>
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
