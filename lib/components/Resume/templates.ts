import Style1 from '@lib/components/ResumeTemplates/Style1';
import type { ResumeType } from './type';

export type ResumeTemplateComponentProps = {
  preview: boolean;
  data: ResumeType;
};

export type ResumeTemplate = {
  key: string;
  cover: string;
  name: string;
  desc?: string;
  themeColor: string;
  component: React.FC<ResumeTemplateComponentProps>;
};

const resumeTemplates: Record<string, ResumeTemplate> = {
  style1: {
    key: 'style1',
    cover: 'https://s1.ax1x.com/2022/10/21/x6Wl7V.jpg',
    name: '通用简历模版 (1)',
    themeColor: '#2065d1',
    component: Style1,
  },
};

export default resumeTemplates;
