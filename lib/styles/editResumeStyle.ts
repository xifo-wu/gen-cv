import type { Theme } from '@mui/material';

export default {
  header: (theme: Theme) => ({
    zIndex: 9999,
    background: theme.palette.mode === 'dark' ? '#181c32' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#181c32',
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 10px 30px 0px rgba(82,63,105,.05)',
  }),
  titleBox: {
    width: '100%',
    cursor: 'pointer',
    p: 1,
    pl: 2,
  },
  headerContentBox: {
    flex: 1,
    p: 1,
  },
  // 抽屉容器样式
  drawerContainer: {
    pt: 8, // 自身 Padding 16px + Header 高度 48px
    px: 2,
    overflowX: 'hidden',
  },
  // 用户信息样式
  userBox: {
    display: 'flex',
    gap: 2,
  },
  // 头像样式
  avatar: {
    width: 48,
    height: 48,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  // 用户名
  username: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  // 邮箱
  email: {
    fontSize: '0.875rem',
  }
};
