import useSWR from "swr";
import api from "@lib/utils/api";
import type { SWRHook, SWRConfiguration, Key } from "swr";

interface ApiError {
  message?: string;
  httpStatus: number;
  success?: boolean;
}
export interface UseApi<R> extends SWRHook {
  data?: R;
  error?: ApiError;
  loading: boolean;
}

/**
 * 统一格式的 Api 请求 Hooks
 * @param key 后端接口地址，同 SWR
 * @param config SWR 配置项
 */
const useApi = <R>(key: Key, config?: SWRConfiguration): UseApi<R> => {
  const { data, error, ...rest } = useSWR(key, api.get, config);

  return {
    loading: !error && !data,
    error,
    ...data,
    ...rest,
  };
};

export default useApi;
