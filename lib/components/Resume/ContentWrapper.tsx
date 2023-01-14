import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { TbEdit, TbSortAscending, TbSortDescending, TbTrash } from 'react-icons/tb';
import { useSetAtom } from 'jotai';
import { resumeModuleModal } from '@lib/atom/resume-atom';
import styles from './ContentWrapperStyles';
import type { ModulesKey } from './type';

interface Props {
  moduleName?: ModulesKey;
  data: any;
  children: React.ReactNode;
}

const ContentWrapper = ({ moduleName, data, children }: Props) => {
  const setResumeModuleModal = useSetAtom(resumeModuleModal);

  const handleEdit = () => {
    setResumeModuleModal((draft) => {
      if (moduleName === 'education') {
        draft.educationDetail.open = true;
        draft.educationDetail.params = data;
      }
    });
  };

  return (
    <Box sx={styles.container}>
      <Box className="tools">
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleEdit} size="small" sx={styles.iconButton}>
            <TbEdit />
          </IconButton>

          <IconButton size="small" sx={styles.iconButton}>
            <TbSortAscending />
          </IconButton>

          <IconButton size="small" sx={styles.iconButton}>
            <TbSortDescending />
          </IconButton>

          <IconButton size="small" sx={styles.iconButton}>
            <TbTrash />
          </IconButton>
        </Stack>
      </Box>

      {children}
    </Box>
  );
};

export default ContentWrapper;
