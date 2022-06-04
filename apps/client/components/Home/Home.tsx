import { useEffect, useState } from 'react';
import { doSomething } from './HomeService';

export function Home() {
  const [string, setString] = useState('');

  useEffect(() => {
    setString(doSomething());
  }, []);

  return (
    <>
      <h1>Hello in component!</h1>
      <h1>{string}</h1>
    </>
  );
}

export default Home;
