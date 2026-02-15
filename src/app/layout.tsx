import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Throttle Connectors",
  description: "Throttle Connectors — Since 2012",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${inter.variable} antialiased`}>
        {children}

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/918467042523"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-[100] w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.5)] transition-all duration-300"
        >
          <svg
            viewBox="0 0 32 32"
            fill="white"
            className="w-7 h-7 sm:w-8 sm:h-8"
          >
            <path d="M16.004 2.667A13.22 13.22 0 0 0 2.89 19.889L1.333 30.667l11.04-1.527A13.22 13.22 0 1 0 16.004 2.667zm0 24.266a10.93 10.93 0 0 1-5.867-1.707l-.413-.253-4.32.6.6-4.24-.267-.427a10.96 10.96 0 1 1 10.267 6.027zm6.027-8.2c-.333-.167-1.96-.967-2.267-1.08-.307-.107-.527-.167-.747.167s-.86 1.08-1.053 1.3c-.193.22-.387.247-.72.08-.333-.167-1.407-.52-2.68-1.653-.993-.88-1.66-1.967-1.853-2.3-.193-.333-.02-.513.147-.68.147-.147.333-.387.5-.58.167-.193.22-.333.333-.553.113-.22.06-.413-.027-.58s-.747-1.8-1.02-2.467c-.273-.653-.547-.56-.747-.573h-.64a1.23 1.23 0 0 0-.893.42c-.307.333-1.173 1.147-1.173 2.793s1.2 3.24 1.367 3.467c.167.22 2.367 3.607 5.733 5.06.8.347 1.427.553 1.913.707.807.26 1.54.22 2.12.133.647-.1 1.96-.8 2.24-1.573.28-.773.28-1.44.193-1.573-.08-.14-.3-.22-.633-.387z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
