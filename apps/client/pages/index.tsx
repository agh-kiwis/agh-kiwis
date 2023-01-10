import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CustomSpinner } from '@agh-kiwis/ui-components';

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/todo-list');
  }, [router]);

  return <CustomSpinner />;
};

export default Index;
