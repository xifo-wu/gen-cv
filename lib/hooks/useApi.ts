import useSWR from 'swr';
import api from '@lib/utils/api';
import type { SWRConfiguration, Key } from 'swr';

/**
 * 统一格式的 Api 请求 Hooks
 * @param key 后端接口地址，同 SWR
 * @param config SWR 配置项
 */
const useApi = (key: Key, config?: SWRConfiguration) => {
  const { data, error, ...rest } = useSWR(key, api.get, config);

  return {
    loading: !error && !data,
    error,
    ...data,
    ...rest,
  };
};

export default useApi;
