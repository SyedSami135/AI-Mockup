import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  subsets: ["latin", "latin-ext"],
  display: "block",
  weight: ["300", "400", "700", "100", "500"],
});

export const metadata: Metadata = {
  title: "AI Interview Mockup App",
  description: "AI Interview Mockup App",
  keywords: ["AI", "Interview", "Mockup", "App", "InterView Preparation"],
  creator: "Syed Sami",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Header />

          {children}
        </ClerkProvider>
        <Toaster gap={2} richColors={true} visibleToasts={2} theme="light" />
      </body>
    </html>
  );
}
