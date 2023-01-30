import { toast } from 'react-toastify';
import api from '@lib/utils/api';

export async function updateResumeBasic(resumeSlug: string, data: any) {
  const { response, error } = await api.put<any, any>(
    `/api/v1/resumes/${resumeSlug}/resume-basic`,
    data,
  );

  if (error) {
    toast.error(error.message);
    return;
  }

  return response;
}
