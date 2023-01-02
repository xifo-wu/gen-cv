import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import useApi from '@lib/hooks/useApi';
import api from '@lib/utils/api';
import FieldInput from '@lib/components/Resume/components/FieldInput';
import type { ResumeType, ModulesKey } from '@lib/components/Resume/type';

interface Props {
  data: ResumeType[ModulesKey];
  themeColor: string;
  preview: boolean;
}

const toLine = (str: string | undefined) => {
  return str?.replace(/([A-Z])/g, '-$1').toLowerCase();
};

const ModuleTitle = ({ data, themeColor, preview }: Props) => {
  const theme = useTheme();
  const debounceRef = useRef<NodeJS.Timer>();
  const { control, reset, watch } = useForm<ResumeType[ModulesKey]>({ defaultValues: data });
  const baseApi = `api/v1/resumes/${data.resumeID}`;
  const { mutate } = useApi<any>(data.resumeID ? baseApi : null);

  const handleBlur = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      mutate(
        async (originData: any) => {
          const { response, error } = await api.patch<any, any>(`${baseApi}/${toLine(data.key)}`, watch());
          if (error) {
            toast.error(error.message);
            return originData;
          }

          return response;
        },
        { revalidate: false },
      );
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
      }}
    >
      <FieldInput
        name="label"
        control={control}
        readOnly={preview}
        onBlur={handleBlur}
        minWidth={56}
        fontSize={16}
        disableUnderline
        sx={{
          mb: 0,
          background: themeColor,
          maxWidth: 'fit-content',
          px: 2,
          lineHeight: '32px',
          borderTopLeftRadius: 2,
          borderBottomLeftRadius: 2,
          '& .MuiInputBase-input': {
            fontWeight: 600,
            lineHeight: '32px',
            color: theme.palette.getContrastText(themeColor),
          },
        }}
      />

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
