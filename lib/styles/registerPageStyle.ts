import { darken } from '@mui/material';
import type { Theme } from '@mui/material';

export default {
  container: {
    maxWidth: 400,
    width: '100%',
    margin: '0 auto',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    mb: 2,
  },
  subtitle: function (theme: Theme) {
    return {
      textAlign: 'center',
      mb: 3,
      fontSize: 24,
      color: '#3b82f6',
      fontWeight: 500,
    };
  },
  fieldLabel: function (theme: Theme) {
    return {
      mt: 1,
      textAlign: 'left',
      color: '#fff',
    };
  },
  submitBtn: {
    mt: 2,
  },
  divider: {
    my: 2,
    "&.MuiDivider-root:before, &.MuiDivider-root:after": {
      borderTop: 'thin solid #fff'
    }
  },
  githubOAuthBtn: {
    textTransform: 'capitalize',
    background: '#000',
    "&:hover": {
      background: '#000',
    }
  },
  wechatOAuthBtn: {
    background: '#4ade80',
    "&:hover": {
      background: darken('#4ade80', 0.2),
    }
  },
};
