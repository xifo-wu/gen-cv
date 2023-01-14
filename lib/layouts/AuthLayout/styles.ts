import { keyframes, lighten } from '@mui/material';
import type { Theme } from '@mui/material';

const waviy = keyframes`
  0%, 40%, 100% {
      transform: translateY(0)
    }
    20% {
      transform: translateY(-20px)
    }
`;

const waviyReflect = keyframes`
  0%, 40%, 100% {
    transform: rotate(180deg) translateY(0)
  }
  20% {
    transform: rotate(180deg) translateY(-20px)
  }
`;

export default {
  container: {
    backgroundColor: '#f1f5f9',
    userSelect: 'none',
  },
  banner: {
    position: 'relative',
    display: { xs: 'none', sm: 'none', md: 'flex' },
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    height: '100%',
  },
  info: function (theme: Theme) {
    return {
      textAlign: 'right',
      margin: '0 112px 0 auto',
      maxWidth: 700,
      [theme.breakpoints.down('lg')]: {
        mx: 6,
      },
    };
  },
  waviy: function (theme: Theme) {
    return {
      position: 'relative',
      fontSize: 50,
      fontWeight: 700,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      mb: 9,
      display: 'flex',
      [theme.breakpoints.down('xl')]: {
        fontSize: 44,
        mb: 6,
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 30,
        mb: 5,
      },
    };
  },
  char: function (theme: Theme, delayIndex: number) {
    return {
      position: 'relative',
      color: [7, 8].includes(delayIndex) ? theme.palette.primary.main : '#353535',
      textTransform: 'uppercase',
      animation: `${waviy} 1s infinite`,
      animationDelay: `calc(.1s * ${delayIndex + 1})`,
      display: 'inline-block',
    };
  },
  charReflect: function (theme: Theme, delayIndex: number) {
    return {
      transform: 'rotate(180deg)',
      backgroundImage: [7, 8].includes(delayIndex) ? `linear-gradient(${lighten(theme.palette.primary.main, 0.2)}, transparent)` : 'linear-gradient(rgba(0,0,0,.2), transparent)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      position: 'relative',
      textTransform: 'uppercase',
      animation: `${waviyReflect} 1s infinite`,
      animationDelay: `calc(.1s * ${delayIndex + 1})`,
      display: 'inline-block',
    };
  },
  // Chidren 容器
  content: {
    px: 2,
    py: 3,
    minHeight: '100vh',
    background: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
