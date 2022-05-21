import { useRouter } from 'next/router';
import Home from '../../components/Home/Home';

export function Index() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Home />
      <h1>Hello {id}</h1>
    </>
  );
}

export default Index;
