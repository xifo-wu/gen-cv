import { Typography } from '@mui/material';
import type { HtmlHTMLAttributes } from 'react';

const titleBase = {
  fontSize: '1.5rem',
  lineHeight: '2rem',
  userSelect: 'none',
  fontWeight: 700,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
