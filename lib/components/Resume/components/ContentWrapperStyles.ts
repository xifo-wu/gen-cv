import type { Theme } from "@mui/material";

export default {
  container: (theme: Theme) => ({
    py: 0.5,
    px: 1,
    mx: -1,
    my: -0.5,
    position: 'relative',
    border: '1px dashed transparent',
    '& .tools': {
      opacity: 0,
      position: 'absolute',
      zIndex: 999,
      right: 0,
      top: -32,
      height: 56,
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
      borderRadius: 1,
      '& .tools': {
        opacity: 1,
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '600ms',
        display: 'block',
      },
    },
  }),
  iconButton: (theme: Theme) => ({
    background: theme.palette.primary.main,
    borderRadius: 1,
    color: '#fff',
    '&:hover': {
      background: theme.palette.primary.light,
    },
  }),
};
