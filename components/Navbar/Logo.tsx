import React from "react"
import { Box, BoxProps, Text } from "@chakra-ui/react"

const Logo: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <Text as="h1" fontWeight="bold" fontSize="lg" >
        AlleyKatz
      </Text>
    </Box>
  )
}

export default Logo