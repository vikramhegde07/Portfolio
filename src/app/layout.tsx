import "./globals.css";
import { Inter } from 'next/font/google'
import TopNav from "./components/TopNav";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vikram Hegde | Web Developer',
  description: 'Portfolio of Vikram Hegde — a passionate frontend developer skilled in React, Next.js, and UI design.',
  keywords: ['Vikram Hegde', 'Frontend Developer', 'React Portfolio', 'Next.js', 'Web Developer India'],
  authors: [{ name: 'Vikram Hegde', url: 'https://nodenomad.in' }],
  creator: 'Vikram Hegde',
  openGraph: {
    title: 'Vikram Hegde | Web Developer',
    description: 'Frontend developer building beautiful web experiences.Explore my work, projects, and contact details.',
    url: 'https://nodenomad.in',
    siteName: "NodeNomad",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Vikram Hegde Portfolio",
      },
    ], locale: 'en_IN',
    type: 'website',
  },
  linkedin: {
    card: 'summary_large_image',
    title: 'Vikram Hegde Portfolio',
    description: 'Frontend developer building beautiful web experiences.',
    creator: '@yourhandle',
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-white text-black dark:bg-[#0f0f0f] dark:text-white transition-colors`}>
        <TopNav />
        <main>{children}</main>
      </body>
    </html>
  )
}
