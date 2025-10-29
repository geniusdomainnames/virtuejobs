import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./(main)/components/Navigation";
import Footer from "./(main)/components/Footer";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Outfit } from 'next/font/google';


const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});
export const metadata = {
  title: "Virtue Jobs – Find Jobs Near You",
  description: "Discover local job opportunities in your city. Apply quickly and get hired faster with Virtue Jobs.",
  keywords: ["job listings near me","jobs", "local jobs", "nigerian jobs","lagos jobs","abuja jobs","Virtue Jobs", "apply for jobs", "jobs near me", "job listings near me","remote jobs"],
  authors: [{ name: "Virtue Jobs", url: "https://virtuejobs.com" }],
  creator: "Chima Longy",
  publisher: "Virtue Jobs",
  metadataBase: new URL("https://virtuejobs.com"),

  openGraph: {
    title: "Virtue Jobs – Find ",
    description: "Search jobs in your area and connect with employers directly.",
    url: "https://virtuejobs.com",
    siteName: "Virtue Jobs",
    images: [
      {
        url: "https://virtuejobs.com/og-image.png", // recommended image size: 1200x630
        width: 1200,
        height: 630,
        alt: "Virtue Jobs Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Virtue Jobs – Find Jobs Near You",
    description: "Quickly find local jobs in your area with Virtue Jobs.",
    images: ["https://virtuejobs.com/og-image.png"],
    site: "@virtuejobs",
    creator: "@chimalongy",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <header>
          <Navigation/>
        </header>

        <main className="min-h-screen"> {children}</main>
        <Footer/>

        <Toaster
            toastOptions={{
              duration: 4000,
              position: 'top-center',
            }}
          />
          <SpeedInsights/>
          <Analytics/>
      </body>
    </html>
  );
}
