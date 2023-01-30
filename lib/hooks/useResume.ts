import { useRouter } from 'next/router';
import useApi from './useApi';
import type { ResumeType } from '@lib/components/Resume/type';

const useResume = () => {
  const router = useRouter();
  const { query } = router;
  const apiUrl = `/api/v1/resumes/${query['resume-slug']}` || null;

  const { data, ...rest } = useApi<ResumeType>(apiUrl);

  return {
    apiUrl,
    resume: data,
    resumeSlug: query['resume-slug'],
    ...rest,
  };
};

export default useResume;
