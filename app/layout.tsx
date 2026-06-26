import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Anjali Aggarwal — Full Stack & Mobile Developer",
  description:
    "Portfolio of Anjali Aggarwal, Full Stack & Mobile Developer specialising in React, Next.js, React Native, Node.js and Go. B.Tech IT, 2025.",
  openGraph: {
    title: "Anjali Aggarwal — Full Stack & Mobile Developer",
    description:
      "Full Stack & Mobile Developer — React, Next.js, React Native, Node.js, Go. B.Tech IT (GGSIPU) 2025.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFF8F3] text-[#2B1B2E]">{children}</body>
    </html>
  )
}
