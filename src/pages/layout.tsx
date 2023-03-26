import Header from '@/component/Header'
import { CacheProvider } from '@chakra-ui/next-js'
import { Box, ChakraProvider } from '@chakra-ui/react'
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
    return (
        <>
            <Header/>
            <Box as="main">
                {children}
            </Box>
        </>
  )
}