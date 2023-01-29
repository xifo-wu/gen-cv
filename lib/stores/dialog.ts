import { atom } from 'jotai';

export interface DialogData {
  open: boolean;
  params?: Record<string, any>;
}

export const dataAtom = atom<Record<string, DialogData>>({});
