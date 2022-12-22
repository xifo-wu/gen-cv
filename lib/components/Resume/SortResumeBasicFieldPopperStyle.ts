import type { Theme } from "@mui/material";

export default {
  iconButton: (theme: Theme) => ({
    background: theme.palette.primary.main,
    borderRadius: 1,
    color: '#fff',
    '&:hover': {
      background: theme.palette.primary.light,
    },
  }),
  reorderUl: {
    '& ul': {
      listStyle: 'none',
      my: 0,
      px: 0,
    },
    '& .item-box': {
      px: 2,
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    },
  }
}
