import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@fullcalendar/timegrid/main.css';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@agh-kiwis/redux';
import { theme } from '../styles/theme';
import './styles.css';

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${process.env.NEXT_PUBLIC_API_PREFIX}`,
  cache: new InMemoryCache(),
  credentials: 'include',
});

function KiwisApp({ Component, pageProps }: AppProps) {
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
