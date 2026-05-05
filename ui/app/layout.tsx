import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import Provider from "@/provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <head>
        <title>Form Fluoce | Build, Share, and Collect Data</title>
        <meta
          name="description"
          content="Form Fluoce is your platform to easily build, share, and collect data with interactive forms."
        />
        <link rel="icon" href="/Form-Fluoce.svg" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
