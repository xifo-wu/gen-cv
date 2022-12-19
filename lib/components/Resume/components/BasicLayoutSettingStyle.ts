import { lighten, Theme } from '@mui/material';

export default {
  // Paper Wrap Style Start
  paperWrap: {
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    p: 2,
  },
  // Paper Wrap Style End

  // MenuItem Style Start
  menuItem: {
    minWidth: 64,
    py: 1,
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    '& .menu-item-lable': {
      cursor: 'default',
      flex: 1,
    }
  },
  // MenuItem Style End

  iconButton: (theme: Theme) => ({
    background: theme.palette.primary.main,
    borderRadius: 1,
    color: '#fff',
    '&:hover': {
      background: theme.palette.primary.light,
    },
  }),

  upButton: {
    background: '#0ea5e9',
    borderRadius: 1,
    color: '#fff',
    '&:hover': {
      background: lighten('#0ea5e9', 0.35),
    },
    '&.Mui-disabled': {
      background: lighten('#0ea5e9', 0.8),
    },
  },

  downButton: {
    background: '#06b6d4',
    borderRadius: 1,
    color: '#fff',
    '&:hover': {
      background: lighten('#06b6d4', 0.35),
    },
    '&.Mui-disabled': {
      background: lighten('#06b6d4', 0.8),
    },
  },

  visibleButton: {
    background: '#94a3b8',
    borderRadius: 1,
    color: '#fff',
    '&:hover': {
      background: lighten('#94a3b8', 0.35),
    },
  },
};
