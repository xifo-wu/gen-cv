import useApi from '@lib/hooks/useApi';

export interface Resume {
  id: number;
  created_at: string;
  custom_styles?: Record<string, any>;
  layout_type: string;
  module_order?: string;
  name: string;
  slug: string;
  updated_at?: string;
}

const useResumes = (params: Record<string, any> = {}) => {
  const {
    data: resumes = [],
    meta: resumesMeta = {},
    ...rest
  } = useApi<Array<Resume>>(['/api/v1/resumes', { params }]);

  return {
    ...rest,
    resumes,
    resumesMeta,
  };
};

export default useResumes;
