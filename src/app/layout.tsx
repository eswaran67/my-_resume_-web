import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090e",
};

export const metadata: Metadata = {
  title: "ESWARAN K | System Engineer",
  description:
    "Personal Portfolio and Resume of ESWARAN K — System Engineer at IT Solutions Private Limited, Coimbatore. Specializing in Custom PC Workstations, Hardware Assembly, All-Brand CCTV & IP Surveillance, T568B Structured Cabling, and Technical Support.",
  keywords: [
    "ESWARAN K",
    "System Engineer",
    "IT Solutions Private Limited Coimbatore",
    "Hardware Assembly",
    "Custom PC Workstations",
    "All-Brand CCTV",
    "CCTV Installation",
    "IP Cameras",
    "NVR Setup",
    "T568B RJ45 Cabling",
    "Biometric Punch Machines",
    "Multimeter Testing",
    "Hardware Diagnostics",
    "Technical Support",
    "Coimbatore",
    "Portfolio",
    "Resume",
  ],
  authors: [{ name: "ESWARAN K" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#07090e] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden w-full max-w-full">
        {children}
      </body>
    </html>
  );
}
