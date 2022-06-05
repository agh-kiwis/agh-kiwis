import { AppProps } from 'next/app';
import './styles.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
function CustomApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
  });
  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default CustomApp;
