export type ModulesKey = 'education' | 'work_experience' | 'project';

export interface ResumeBasicField {
  id: string | number;
  value: string;
  visible?: boolean;
  is_show_label?: boolean;
  is_show_icon?: boolean;
  label?: string;
  icon?: string;
  sort_index?: number;
}

export interface ModuleBase {
  id: string | number;
  resume_id: string | number;
  key?: ModulesKey;
  visible: boolean;
  label: string;
  module_title_type: string;
  content_type: string;
  config: string;
  remove_ids?: (string | number)[];
}

// 个人信息的 Key
export type BasicsDataKeys =
  | 'name'
  | 'job'
  | 'mobile'
  | 'email'
  | 'educational_qualifications'
  | 'website'
  | 'birthday'
  | 'age'
  | 'avatar'
  | 'job_year'
  | 'in_a_word';

// 个人信息基础信息
export interface BasicsData extends Record<BasicsDataKeys, ResumeBasicField> {
  id: string | number;
}

export type ResumeBasicsDataKeys = BasicsDataKeys;
export interface ResumeBasicsData extends Record<BasicsDataKeys, ResumeBasicField> {
  id: number;
};

export interface ResumeModuleCommonDetail {
  id: number;
  desc: string;
  sortIndex: number;
}

export interface Education extends ModuleBase {
  educationDetails: EducationDetail[];
}

export interface EducationDetail {
  id?: number;
  name?: string;
  endOn: string | null;
  startOn: string | null;
  desc?: string;
  university_majors?: string;
  sortIndex: number;
}

export interface WorkExperienceDetail {
  id?: number;
  name?: string;
  endOn: string | null;
  startOn: string | null;
  desc?: string;
  sortIndex: number;
  jobTitle?: string;
}
export interface WorkExperience extends ModuleBase {
  workExperienceDetails: WorkExperienceDetail[];
}

export interface ProjectDetail {
  desc?: string;
  endOn: string | null;
  startOn: string | null;
  id?: number;
  name?: string;
  role?: string;
  sortIndex: number;
}

export interface Project extends ModuleBase {
  projectDetails: ProjectDetail[];
}

// 简历数据类型
export interface ResumeType {
  id: number;
  name: string;
  slug: string;
  theme_color: string;
  layout_type: string;
  module_order: string;
  // 基本信息
  resume_basic: ResumeBasicsData;
  education: Education;
  work_experience: WorkExperience;
  project: Project;
}

// Resume Template Component Props Type
export interface ResumePaperProps {
  preview: boolean;
  data: ResumeType;
}
