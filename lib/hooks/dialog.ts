import { useCallback, useMemo } from 'react';
import { selectAtom } from 'jotai/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { dataAtom } from '@lib/stores/dialog';

// TODO 想办法减少重新渲染
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

const initialData = {
  open: false,
  params: {},
};

export const useDialogValue = (dialogName: string) => {
  const selectedAtom = useMemo(
    () =>
      selectAtom(
        dataAtom,
        (data) => data[dialogName],
      ),
    [],
  );

  return useAtomValue(selectedAtom) || initialData;
};
