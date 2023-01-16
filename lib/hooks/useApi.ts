import useSWR from 'swr';
import api from '@lib/utils/api';
import type { SWRResponse, SWRConfiguration, Key } from 'swr';

interface ApiError {
  message?: string;
  httpStatus: number;
  success?: boolean;
}

export interface Meta {
  has_next?: boolean;
  has_prev?: boolean;
  page?: number;
  per_page?: number;
  total?: number;
}

export interface UseApi<Data = any> extends SWRResponse<Data, ApiError> {
  loading: boolean;
  meta?: Meta;
}

/**
 * 统一格式的 Api 请求 Hooks
 * @param key 后端接口地址，同 SWR
 * @param config SWR 配置项
 */
const useApi = <R>(key: Key, config?: SWRConfiguration): UseApi<R> => {
  const { data, error, ...rest } = useSWR(key, api.get, config);

  return {
    loading: rest.isLoading || rest.isValidating,
    error,
    ...data,
    ...rest,
  };
};

export default useApi;
