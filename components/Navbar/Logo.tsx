import React from "react"
import { Box, BoxProps, Text, Link as ChakraLink } from "@chakra-ui/react"
import Link from "next/link"
import { FaCat } from "react-icons/fa"

const Logo: React.FC<BoxProps> = () => {
  return (
    <Box fontSize="3xl">
      <Link href="/" passHref>
        <ChakraLink display="flex" alignItems="center"><FaCat /><Text ml="10px">AlleyKatz</Text></ChakraLink>
      </Link>
    </Box>
  )
}

export default Logo