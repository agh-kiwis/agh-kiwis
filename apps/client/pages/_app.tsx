import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@agh-kiwis/redux';
import { theme } from '../styles/theme';

function CustomApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
  });
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default CustomApp;
