import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import StoreProvider from "./StoreProvider";
import "./globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <StoreProvider>
          <Navbar />
          {children}
          <Player />
        </StoreProvider>
      </body>
    </html>
  );
}
