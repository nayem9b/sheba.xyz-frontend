import Providers from "@/lib/Providers";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { GlobalLoadingBar } from "@/components/ui/GlobalLoadingBar";
import NavigationHandler from "@/components/ui/NavigationHandler";
// import MessengerCustomerChat from "react-messenger-customer-chat";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sheba.xyz",
  description: "Daily Services by Sheba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>
            <NavigationHandler />
            <GlobalLoadingBar />
            <Navbar />
            {children}
            <Footer />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
