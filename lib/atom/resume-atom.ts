import { atom } from 'jotai';
import type { ResumeType } from '@lib/components/Resume/type';

// 简历基础信息 Atom
interface ResumeBasicDrawer {
  open: boolean;
  resume?: ResumeType;
}

export const resumeBasicDrawer = atom<ResumeBasicDrawer>({
  open: false,
  resume: undefined,
});
