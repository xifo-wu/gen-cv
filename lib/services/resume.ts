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

export async function deleteEducationDetail(resumeSlug: string, educationDetailID: number) {
  const { response, error } = await api.delete<any, any>(
    `/api/v1/resumes/${resumeSlug}/education-details/${educationDetailID}`,
  );

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success('删除成功');
  return response;
}
