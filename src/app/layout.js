import { Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

const outfit = Outfit({ subsets: ["latin"] });


export const metadata = {
  title: "Quick Note",
  description: "Fastest Way to Take Notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          outfit.className
        )}
      >
        <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
          <main className="relative flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
            <Toaster />
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
