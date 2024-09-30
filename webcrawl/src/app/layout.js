import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ScrapDataProvider } from "@/context/ScrapeDataContent";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Procurement",
  description: "Price Benchmark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          <ScrapDataProvider>
            {children}
          </ScrapDataProvider>

      </body>
    </html>
  );
}
