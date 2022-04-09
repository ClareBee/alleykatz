import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import { theme } from '../styles/chakraTheme';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
