import { ReactNode, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Avatar, AppBar, Box } from '@mui/material';
import HeaderTitle from '@lib/components/HeaderTitle';
import useApi from '@lib/hooks/useApi';
import styles from './styles';

interface Props {
  children?: ReactNode;
}

const Header = ({ children }: Props) => {
  const router = useRouter();
  const { data: user = {} } = useApi<any>('/api/v1/users/current');

  const handleGotoDashboard = useCallback(() => router.push('/dashboard'), []);

  return (
    <AppBar sx={styles.header} position="fixed">
      <Box className="title-box" title="返回仪表盘页面" onClick={handleGotoDashboard}>
        <HeaderTitle />
      </Box>
      <Box className="header-container">
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Box>
          <Avatar className="avatar" src={user.gravatar} variant="rounded" />
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
