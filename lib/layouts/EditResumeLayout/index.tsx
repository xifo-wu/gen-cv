import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer } from '@mui/material';
import Header from './Header';
import Menu from './Menu';
import useApi from '@lib/hooks/useApi';
import styles from './styles';

const drawerWidth = 208;

interface Props {
  children?: React.ReactNode;
}

export const ResumeIdContext = createContext<string | string[]>('');

export const ResumeIdProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { query } = router;

  return (
    <ResumeIdContext.Provider value={query['resume-id'] || ''}>{children}</ResumeIdContext.Provider>
  );
};

export const useResumeId = () => useContext(ResumeIdContext);

const EditResumeLayout = ({ children }: Props) => {
  const router = useRouter();
  const resumeId = useResumeId();
  const { error: resumeError, loading: resumeLoading } = useApi<any>(
    resumeId ? `/api/v1/resumes/${resumeId}` : null,
  );

  const { query } = router;

  // TODO: Fix any type
  const { data: user = {}, error, loading } = useApi<any>('/api/v1/users/current');

  if (loading || resumeLoading) {
    // TODO: Add Loading Component;
    return <>Loading</>;
  }

  if (error || resumeError) {
    // TODO: Solution Error
    return <>获取数据出错</>;
  }

  if (user.username !== query.username) {
    // TODO: Add 403 Component
    return <>无权修改</>;
  }

  const drawer = (
    <Box sx={styles.drawerContainer}>
      <Menu />
    </Box>
  );

  return (
    <Box sx={styles.container}>
      <Header />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="permanent" sx={styles.drawerWrap} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={styles.mainContainer}>
        {children}
      </Box>
    </Box>
  );
};

export default EditResumeLayout;
