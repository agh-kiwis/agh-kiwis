import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@agh-kiwis/redux';
import { theme } from '../styles/theme';

function KiwisApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${process.env.NEXT_PUBLIC_API_PREFIX}`,
    cache: new InMemoryCache(),
    credentials: 'include',
  });
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ChakraProvider resetCSS theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </Provider>
        </ApolloProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default KiwisApp;
