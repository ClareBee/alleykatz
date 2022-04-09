import React from 'react';
import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { FaCat } from 'react-icons/fa';
import { LogoProps } from '../../ts/interfaces';

const Logo: React.FC<LogoProps> = ({ disabled }) => (
  <Box fontSize="3xl" pointerEvents={disabled ? 'none' : 'auto'}>
    <Link href="/" passHref>
      <ChakraLink display="flex" alignItems="center">
        <FaCat />
        <Text ml="10px">AlleyKatz</Text>
      </ChakraLink>
    </Link>
  </Box>
);

export default Logo;
