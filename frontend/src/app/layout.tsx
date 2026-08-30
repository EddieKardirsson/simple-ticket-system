import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Ticket System",
  description: "A simple ticket management system",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-sm flex flex-col gap-6">
        {children}
      </div>
    </div>
    </body>
    </html>
  );
}
