import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import Layout from '../components/Layout';
import { theme } from '../styles/chakraTheme';
import ErrorBoundary from '../components/ErrorBoundary';
import { store } from '../redux/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Layout>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
