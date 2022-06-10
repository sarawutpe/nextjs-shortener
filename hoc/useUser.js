import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const useUser = () => {
  const { data: user } = useSWR('/api/user');
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    // protected routes
    if (!user.auth) {
      router.push('/login');
    }
  }, [user]);

  return { user };
};

export default useUser;
