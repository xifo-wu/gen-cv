import type { Theme } from "@mui/material";

export default {
  containerWrap: (theme: Theme) => ({
    position: 'relative',
    width: '35vw',
    py: 2,
    px: 3,
    [theme.breakpoints.down('xl')]: {
      width: '45vw',
    },
    [theme.breakpoints.down('lg')]: {
      width: '55vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '60vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '90vw',
    },
    '& .title-box': {
      mb: 2,
    },
    '& .title-icon': {
      fontSize: '1.675rem',
      color: theme.palette.primary.main,
    },
    '& .title': {
      fontSize: '1.125rem',
      fontWeight: 500,
    }
  }),
  formWrap: {
    py: 2
  },
  formItem: {
    mb: 2,
  }
}