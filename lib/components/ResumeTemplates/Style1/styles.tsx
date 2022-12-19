import type { Theme } from "@mui/material";

export default {
  container: {
    p: 3,
    pt: 0,
  },
  basicBox: {
    pt: 4,
  },
  nameInput: (theme: Theme, width: number) => ({
    width: '100%',
    minWidth: 80,
    '&:before': {
      display: width === 0 ? 'inline-block' : 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: '2.125rem',
    },
  }),
};
