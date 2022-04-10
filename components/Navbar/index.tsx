import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaCamera } from 'react-icons/fa';
import Logo from './Logo';
import AppMenu from './Menu';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const hideUpload = !session || router.asPath === '/upload';
  const hideHome = router.asPath === '/';

  return (
    <Flex
      as="nav"
      align="center"
      direction={{ base: 'column', sm: 'row' }}
      justify="space-between"
      w="100%"
      m={{base: 4, md: 6}}
      p={{base: 4, md: 6}}
      bg={['primary.500']}
      color={['brand.700']}
    >
      {hideHome ? <Logo disabled /> : <Logo /> }
      <Flex w="50%" justify="space-between" direction={{ base: 'column-reverse', sm: 'row' }} align="center">
      <Box fontSize="2xl" marginTop={{base: 6, md: 0}}>
        {hideUpload ? (
          <FaCamera fill="grey" />
        ) : (
          <Link href="/upload" passHref>
            <ChakraLink display="flex" alignItems="center">
              <FaCamera />
              <Text ml="10px">Upload</Text>
            </ChakraLink>
          </Link>
        )}
      </Box>
      <AppMenu />
      </Flex>

    </Flex>
  );
};

export default Navbar;
