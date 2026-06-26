import type { ReactNode } from "react"

export const metadata = {
  title: "Amantra Organics — Nature's Fuel for Peak Flow",
  description: "Premium organic wellness formulas crafted for peak performance.",
}

export default function AmantraLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Cabinet Grotesk + Satoshi from Fontshare */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&f[]=satoshi@400,500,700&display=swap"
      />
      {children}
    </>
  )
}
