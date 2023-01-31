import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { TbEdit, TbPlus, TbSortAscending, TbSortDescending, TbTrash } from 'react-icons/tb';
import { deleteEducationDetail } from '@lib/services/resume';
import { useDialog } from '@lib/hooks/dialog';
import useResume from '@lib/hooks/useResume';
import styles from './ContentWrapperStyles';
import type { ModulesKey } from '../type';

interface Props {
  moduleName?: ModulesKey;
  data: any;
  children: React.ReactNode;
}

/**
 * 包裹内容的组件，增加排序、编辑、新增、删除等按钮以及功能
 */
const ContentWrapper = ({ moduleName, data, children }: Props) => {
  const { openDialog } = useDialog();
  const { resume, mutate } = useResume();

  const handleAdd = () => {
    if (moduleName === 'education') {
      openDialog('AddEducationDetailModal', data);
      return;
    }
  };

  const handleEdit = () => {
    if (moduleName === 'education') {
      openDialog('EditEducationDetailModal', { ...data });
      return;
    }
  };

  const handelMutate = async (originData: any) => {
    if (moduleName === 'education') {
      const res = await deleteEducationDetail(resume!.slug, data.id);
      if (res) {
        return res;
      }
      return originData;
    }

    return originData;
  };

  const handelDelete = () => {
    mutate(handelMutate, { revalidate: false });
  };

  return (
    <Box sx={styles.container}>
      <Box className="tools">
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleAdd} size="small" sx={styles.iconButton}>
            <TbPlus />
          </IconButton>

          <IconButton onClick={handleEdit} size="small" sx={styles.iconButton}>
            <TbEdit />
          </IconButton>

          <IconButton size="small" sx={styles.iconButton}>
            <TbSortAscending />
          </IconButton>

          <IconButton size="small" sx={styles.iconButton}>
            <TbSortDescending />
          </IconButton>

          <IconButton onClick={handelDelete} size="small" sx={styles.iconButton}>
            <TbTrash />
          </IconButton>
        </Stack>
      </Box>

      {children}
    </Box>
  );
};

export default ContentWrapper;
