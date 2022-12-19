import Box from '@mui/material/Box';
import type { ResumeType, ModulesKey } from '@lib/components/Resume/type';
import { useTheme } from '@mui/material';

interface Props {
  data: ResumeType[ModulesKey];
  themeColor: string;
}

const ModuleTitle = ({ data, themeColor }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          background: themeColor,
          color: theme.palette.getContrastText(themeColor),
          maxWidth: 'fit-content',
          px: 2,
          fontWeight: 600,
          lineHeight: '32px',
          borderTopLeftRadius: 2,
          borderBottomLeftRadius: 2,
        }}
      >
        {data.label}
      </Box>

      <Box
        sx={{
          width: 20,
          ml: -1,
          background: themeColor,
          clipPath: 'polygon(0 0, 55% 0, 100% 100%, 0% 100%)',
        }}
      />

      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          borderBottom: `1px solid ${themeColor}`,
        }}
      />
    </Box>
  );
};

export default ModuleTitle;
