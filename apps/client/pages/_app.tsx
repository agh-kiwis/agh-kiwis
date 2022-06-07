import './styles.css';
import { store } from '../redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { Counter } from '../components/Counter/Counter';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider>
          <Counter />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default CustomApp;
