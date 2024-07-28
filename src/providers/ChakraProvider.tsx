"use client"
import type { FC, PropsWithChildren } from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const defaultTheme = extendTheme({
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif"
  }
})

const ChakraUIProvider: FC<PropsWithChildren> = ({ children }) => (
  <ChakraProvider theme={defaultTheme}>{children}</ChakraProvider>
)

export default ChakraUIProvider
