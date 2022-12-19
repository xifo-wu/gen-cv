import type { Theme } from '@mui/material';

const drawerWidth = 208;

export default {
  container: {
    display: 'flex',
  },
  header: (theme: Theme) => ({
    zIndex: 9999,
    background: theme.palette.mode === 'dark' ? '#181c32' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#181c32',
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: 'none',
    '& .title-box': {
      width: '100%',
      cursor: 'pointer',
      px: 2,
      maxWidth: drawerWidth,
    },
    '& .header-container': {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      px: 2,
      py: 1,
      boxShadow: '0px 10px 30px 0px rgba(82,63,105,.05)',
    },
  }),
  drawerWrap: {
    display: { xs: 'none', sm: 'block' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      border: 'none',
      boxShadow: '0px 10px 30px 0px rgba(82,63,105,.05)',
      minHeight: '100vh',
      height: '100%',
    },
  },
  // 抽屉容器样式
  drawerContainer: {
    pt: 8, // 自身 Padding 16px + Header 高度 48px
    overflowX: 'hidden',
    height: '100%',
  },
  // 内容容器样式
  mainContainer: {
    flexShrink: 0,
    // flexGrow: 1,
    background: '#f1f5f9',
    p: 3,
    pt: 10,
    minHeight: '100vh',
    height: '100%',
    width: `calc(100% - ${drawerWidth}px)`,
    minWidth: 'calc(210mm + 64px)',
  },
  menuIcon: { minWidth: 32 },
  menuList: {
    width: '100%',
    bgcolor: 'background.paper',
  },
  // 模块菜单 Item
  moduleItem: {
    "& ul": {
      listStyle: 'none',
      my: 0,
      px: 0,
    },
    "& .item-box": {
      px: 2,
      display: 'flex',
      alignItems: 'center',
    },
  },
};
