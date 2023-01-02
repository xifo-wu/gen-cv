export type ModulesKey = 'education' | 'workExperience' | 'project';

export interface ResumeBasicField {
  id: string | number;
  value: string;
  visible?: boolean;
  isShowLabel?: boolean;
  isShowIcon?: boolean;
  label?: string;
  icon?: string;
  sortIndex?: number;
}

export interface ModuleBase {
  id: string | number;
  resumeID: string | number;
  key?: string;
  visible: boolean;
  label: string;
  moduleTitleType: string;
  contentType: string;
  config: string;
  removeIds?: (string | number)[];
}

// 个人信息的 Key
export type BasicsDataKeys =
  | 'name'
  | 'job'
  | 'mobile'
  | 'email'
  | 'educationalQualifications'
  | 'website'
  | 'birthday'
  | 'age'
  | 'avatar'
  | 'jobYear'
  | 'inAWord';

// 个人信息基础信息
export interface BasicsData extends Record<BasicsDataKeys, ResumeBasicField> {
  id: string | number;
  orderKeys: string;
}

export type ResumeBasicsDataKeys = BasicsDataKeys;
export type ResumeBasicsData = BasicsData;

export interface Education extends ModuleBase {
  educationDetails: EducationDetail[];
}

export interface EducationDetail {
  id?: number;
  name?: string;
  endOn: string | null;
  startOn: string | null;
  desc?: string;
  universityMajors?: string;
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

export interface ResumeType {
  id: number;
  name: string;
  slug: string;
  themeColor: string;
  layoutType: string;
  moduleOrder: string;
  resumeBasic: BasicsData;
  education: Education;
  workExperience: WorkExperience;
  project: Project;
}

// Resume Template Component Props Type
export interface ResumePaperProps {
  preview: boolean;
  data: ResumeType;
}
