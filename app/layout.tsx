import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "University Journal Website",
  description:
    "A digital journal publishing platform for our modern university",
};

import Providers from "../lib/providers/QueryProviders";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import InfoSidebar from "@/components/info-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-100 dark:selection:bg-blue-900 bg-gray-50/50 dark:bg-gray-950`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row max-w-[1500px] mx-auto w-full gap-8 px-4 py-8 md:px-6">
              {/* Content Area */}
              <div className="flex-1 order-1 min-w-0">{children}</div>

              {/* Info Sidebar */}
              <div className="order-2 mt-4 lg:order-2 shrink-0">
                <InfoSidebar />
              </div>
            </div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
