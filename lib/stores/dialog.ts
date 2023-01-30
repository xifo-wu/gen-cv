import { atom } from 'jotai';

export interface DialogData {
  open: boolean;
  params?: any;
}

export const dataAtom = atom<Record<string, DialogData>>({});
