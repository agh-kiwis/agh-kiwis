import './styles.css';
import { store } from '../redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Counter } from '../components/Counter/Counter';
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
          <ChakraProvider>
            <Counter />
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default CustomApp;
