import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import MockupShell from "@/components/v2/MockupShell";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "BrandHeist Redesign Mockup",
  robots: { index: false, follow: false },
};

export default function MockupPage() {
  return (
    <div className={mono.variable}>
      <MockupShell />
    </div>
  );
}
