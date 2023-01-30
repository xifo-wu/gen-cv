// 简历表单默认的值，给 react-hook-form 用。意图是去除警告
import type { ResumeBasicsData } from './type';

const resumeBasicFieldInitData = {
  id: -1,
  is_show_icon: false,
  is_show_label: false,
  label: '',
  sort_index: 0,
  value: '',
  visible: true,
}

export const resumeBasicInitData: ResumeBasicsData = {
  id: -1,
  name: resumeBasicFieldInitData,
  job: resumeBasicFieldInitData,
  mobile: resumeBasicFieldInitData,
  email: resumeBasicFieldInitData,
  educational_qualifications: resumeBasicFieldInitData,
  website: resumeBasicFieldInitData,
  birthday: resumeBasicFieldInitData,
  age: resumeBasicFieldInitData,
  avatar: resumeBasicFieldInitData,
  job_year: resumeBasicFieldInitData,
  in_a_word: resumeBasicFieldInitData,
};
