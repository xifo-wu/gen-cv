import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer'
import type { ResumeType, EducationDetail } from '@lib/components/Resume/type';

// 简历基础信息 Atom
interface ResumeBasicDrawer {
  open: boolean;
  resume?: ResumeType;
}

export const resumeBasicDrawer = atom<ResumeBasicDrawer>({
  open: false,
  resume: undefined,
});

export const resumeModuleModal = atomWithImmer({
  educationDetail: {
    open: false,
    params: {},
  }
});
