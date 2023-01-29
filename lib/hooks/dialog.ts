import { isEqual } from 'lodash';
import { useCallback, useMemo } from 'react';
import { selectAtom } from 'jotai/utils';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { dataAtom, DialogData } from '@lib/stores/dialog';
import { focusAtom } from 'jotai-optics';

export const useDialog = () => {
  const updateFunc = useSetAtom(dataAtom);

  const openDialog = useCallback((dialogName: string, params?: Record<string, any>) => {
    updateFunc((s) => {
      return {
        ...s,
        [dialogName]: {
          open: true,
          params,
        },
      };
    });
  }, []);

  const closeDialog = useCallback((dialogName: string, params?: Record<string, any>) => {
    updateFunc((s) => ({
      ...s,
      [dialogName]: {
        open: false,
        params,
      },
    }));
  }, []);

  return { openDialog, closeDialog };
};

export const useSetDialog = (dialogName: string) => {
  // const elementAtom = useMemo(
  //   () =>
  //     atom<null, any, void>(null, (get, set, data) =>
  //       set(dataAtom, { ...get(dataAtom), [dialogName]: data }),
  //     ),
  //   [dialogName],
  // );
  // return useSetAtom(elementAtom);
};

export const useDialogValue = (dialogName: string) => {
  const initialData = {
    open: false,
    params: {},
  };
  const selectedAtom = selectAtom(
    dataAtom,
    useCallback((data) => data[dialogName], []),
    // isEqual,
    // useCallback((a: DialogData, b: DialogData) => {
    //   const x = isEqual(a, b);
    //   console.log(a, b, dialogName, ':', x);
    //   return x;
    // }, []),
  );

  return useAtomValue(selectedAtom) || initialData;

  // const readOnlyAtom = useMemo(() => atom((get) => get(dataAtom)[dialogName]), [dialogName]);
  // const dialogValue = useAtomValue(readOnlyAtom);

  // console.log('dialogName: ', dialogName);
  // const initialData = {
  //   open: false,
  //   params: {},
  // };

  // return dialogValue || initialData;
};
