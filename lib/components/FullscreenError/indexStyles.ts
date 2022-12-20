import { Theme } from '@mui/material';

export default {
  contentWrapp: {
    mb: 1,
  },
  titleText: (theme: Theme) => ({
    color: '#fbbf24',
    fontFamily: '"Share Tech Mono", monospace',
    fontSize: '2rem',
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.375rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  }),
  contentText: (theme: Theme) => ({
    fontFamily: '"Share Tech Mono", monospace',
    fontSize: '2rem',
    ml: 1,
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.375rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  }),
};
