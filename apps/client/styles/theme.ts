import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: '#2F855A',
    secondary: '#2D3748',
    insignificant: '#718096',
  },
  fonts: {
    body: 'Quicksand, sans-serif',
    heading: 'Quicksand, serif',
    mono: 'Quicksand, monospace',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'green',
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: 'green',
      },
    },
  },
});
