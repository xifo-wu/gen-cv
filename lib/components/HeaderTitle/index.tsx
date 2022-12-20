import { Typography } from '@mui/material';
import type { HtmlHTMLAttributes } from 'react';

const titleBase = {
  fontSize: '2.375rem',
  userSelect: 'none',
  fontWeight: 700,
  fontFamily: 'monospace',
};

const titleGradient = {
  display: 'inline',
  color: 'transparent',
  backgroundClip: 'text',
  backgroundImage: 'linear-gradient(to right, #2065d1, #05befe)',
};

const HeaderTitle = (props: HtmlHTMLAttributes<HTMLSpanElement>) => {
  return (
    <Typography variant="h1" sx={titleBase} {...props}>
      <Typography variant="inherit" sx={titleGradient}>
        Gen
      </Typography>
      CV
    </Typography>
  );
};

export default HeaderTitle;
