import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};
export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oswald:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
