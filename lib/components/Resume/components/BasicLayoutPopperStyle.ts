import type { Theme } from '@mui/material';

export default {
  iconButton: (theme: Theme) => ({
    background: theme.palette.primary.main,
    borderRadius: 1,
    color: '#fff',
    '&:hover': {
      background: theme.palette.primary.light,
    },
  }),

  // BasicLayoutPopperMenuItem Styles Start
  menuItem: {
    flexDirection: 'column',
    alignItems: 'start',
    py: 1,
  },
  menuItemPreviewContainer: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    width: '100%',
    mt: 1,
    gap: 1,
  },
  menuItemPreviewBox: {
    display: 'flex',
    alignItems: 'end',
    width: '100%',
  },
  menuItemPreviewIcon: {
    fontSize: 24,
    marginLeft: 4,
    marginRight: 4,
  },
  // BasicLayoutPopperMenuItem Styles End
};
