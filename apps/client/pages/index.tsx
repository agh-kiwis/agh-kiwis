import { Text } from '@chakra-ui/react';
import { NavBar } from '../components/Login/NavBar';
import { Wrapper } from '../components/Containers/Wrapper';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <>
      <NavBar />
      <Wrapper>
        <Text fontSize="4xl">Hello in main</Text>
      </Wrapper>
    </>
  );
}

export default Index;
