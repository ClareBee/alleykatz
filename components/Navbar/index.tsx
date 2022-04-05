import { Box, Flex, Text,  Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { FaCamera } from 'react-icons/fa';
import Logo from './Logo';
import AppMenu from './Menu';

const Navbar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      direction={{ base: 'column', sm: 'row' }}
      justify="space-between"
      w="100%"
      m={8}
      p={8}
      bg={['primary.500']}
      color={['brand.700']}
    >
      <Logo />
      <Box fontSize="2xl">
        <Link href="/upload" passHref>
          <ChakraLink display="flex" alignItems="center"><FaCamera /><Text ml="10px">Upload</Text></ChakraLink>
        </Link>
      </Box>

      <AppMenu />
    </Flex>
  );
};

export default Navbar;
