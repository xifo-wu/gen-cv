import type { BasicsDataKeys } from './type';

export const resumeBasicDefaultZhCN: Record<BasicsDataKeys, string> = {
  name: '姓名',
  mobile: '联系电话',
  job: '求职意向',
  email: '电子邮箱',
  educationalQualifications: '最高学历',
  website: '个人网站',
  birthday: '出生日期',
  jobYear: '工作年限',
  age: '年龄',
  avatar: '头像',
};

export const moduleMap = {
  resumeBasic: {
    id: 'resumeBasic',
    name: '基本信息',
    en: 'Basic Info',
  },
  workExperience: {
    id: 'workExperience',
    name: '工作经历',
    en: 'Work Experience',
  },
  education: {
    id: 'education',
    name: '教育经历',
    en: 'Education',
  },
  project: {
    id: 'project',
    name: '项目经历',
    en: 'Project',
  },
  // others: {
  //   id: 'others',
  //   name: '其他自定义',
  //   en: 'Other Custom'
  // }
  // skill: {
  //   id: 'skill',
  //   name: '专业技能',
  //   en: 'Professional Skill',
  // },
  // certificate: {
  //   id: 'certificate',
  //   name: '技能证书',
  //   en: 'Skill Certificate',
  // },
};

export type ModuleMapKeys = keyof typeof moduleMap;

const modules = [
  moduleMap.resumeBasic,
  moduleMap.workExperience,
  moduleMap.education,
  moduleMap.project,
  // moduleMap.others,
  // moduleMap.skill,
  // moduleMap.certificate,
];

export default modules;
