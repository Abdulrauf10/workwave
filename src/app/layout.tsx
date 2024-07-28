import type { Metadata } from "next"
import ChakraUIProvider from "@/providers/ChakraProvider"
import ReactQueryProvider from "@/providers/ReactQueryProvider"

export const metadata: Metadata = {
  title: "WorkWave~",
  description: "Find your perfect job"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraUIProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ChakraUIProvider>
      </body>
    </html>
  )
}
