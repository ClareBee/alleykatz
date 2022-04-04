import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: '1200px' }}
      m="0 auto"
      minH="100vh"
    >
      <Head>
        <title>AlleyKatz</title>
        <meta name="description" content="All the cats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Box as="main" bg="white" w="100%" p="20px" flexGrow={1}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
