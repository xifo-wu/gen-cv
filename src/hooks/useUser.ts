import { useRouter } from 'next/router';
import useApi from '@lib/hooks/useApi';
import type { SWRConfiguration } from 'swr';

export interface User {
  id: number;
  created_at: string;
  email: string;
  gravatar_url: string;
  nickname: string;
  updated_at?: string;
  username: string;
}

const useUser = (config?: SWRConfiguration) => {
  const router = useRouter();
  const { data: user, ...rest } = useApi<User>('/api/v1/user', {
    onError(err, key, config) {
      if (err.httpStatus === 401) {
        router.push('/login');
      }
      console.log(err, key, config);
    },
    ...config,
  });

  return {
    ...rest,
    user: user || ({} as User),
  };
};

export default useUser;
