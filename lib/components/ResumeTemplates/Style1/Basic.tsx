import _ from 'lodash';
import { useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { TbSettings } from 'react-icons/tb';
import { Grid, Box, IconButton, useTheme, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version
import useApi from '@lib/hooks/useApi';
import type {
  BasicsData,
  ResumeBasicsDataKeys,
  ResumeBasicField,
} from '@lib/components/Resume/type';
import styles from './styles';

import api from '@lib/utils/api';
import { toast } from 'react-toastify';
import FieldInput from '@lib/components/Resume/components/FieldInput';
import BasicLayoutPopper from '@lib/components/Resume/components/BasicLayoutPopper';
import BasicLayoutSetting from '@lib/components/Resume/components/BasicLayoutSetting';

import basicDefaultIcon from '@lib/components/Resume/basicDefaultIcon';
import { useResumeId } from '@lib/layouts/EditResumeLayout';
import SortResumeBasicFieldPopper from '@lib/components/Resume/SortResumeBasicFieldPopper';

interface Props {
  data: BasicsData;
  preview?: boolean;
  themeColor: string;
}

const infoKeys: Array<ResumeBasicsDataKeys> = [
  'mobile',
  'email',
  'educationalQualifications',
  'website',
  'birthday',
  'age',
  'jobYear',
];

const Basic = ({ themeColor, data, preview }: Props) => {
  const { control, reset, watch } = useForm<BasicsData>({ defaultValues: data });

  const resumeId = useResumeId() as string;
  const baseApi = `/api/v1/resumes/${resumeId}`;
  const { mutate } = useApi<any>(resumeId ? baseApi : null);

  const theme = useTheme();
  const debounceRef = useRef<NodeJS.Timer>();

  const infoItems = _.chain(data)
    .pick(infoKeys)
    .map((item, key) => ({
      ...item,
      key,
    }))
    .filter((item) => !!item.visible)
    .sortBy((item) => item.sortIndex)
    .value();

  useEffect(() => {
    reset(data);
  }, [data]);

  if (_.isEmpty(data)) return <Box />;

  const handleBlur = async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      mutate(
        async (originData: any) => {
          const { response, error } = await api.put<any, any>(`${baseApi}/resume-basic`, watch());
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
    <Box sx={styles.basicBox}>
      <Grid container spacing={2}>
        <Grid item xs>
          <FieldInput
            name="name.value"
            control={control}
            readOnly={preview}
            onBlur={handleBlur}
            minWidth={80}
            fontSize={34}
          />
          {data.job.visible && (
            <Box sx={{ display: 'inline-block', ml: 1 }}>
              {data.job.isShowLabel && (
                <FieldInput
                  name="job.label"
                  control={control}
                  readOnly={preview}
                  onBlur={handleBlur}
                  minWidth={20}
                  sx={{ mr: 1 }}
                  fontSize={12}
                />
              )}
              <FieldInput
                name="job.value"
                control={control}
                readOnly={preview}
                onBlur={handleBlur}
                minWidth={20}
                fontSize={16}
              />
            </Box>
          )}

          {data.inAWord.visible && (
            <Box sx={{ mb: 1 }}>
              <FieldInput
                multiline
                name="inAWord.value"
                control={control}
                readOnly={preview}
                onBlur={handleBlur}
                minWidth={20}
                fontSize={12}
                sx={{ mr: 1, flexShrink: 0 }}
              />
            </Box>
          )}

          <Box
            sx={{
              position: 'relative',
              py: 1,
              '& .edit-content': {
                border: '1px dashed transparent',
                transitionProperty:
                  'color, background-color, border-color, text-decoration-color, fill, stroke',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '600ms',
              },
              '&:hover': {
                '& .edit-content': {
                  borderColor: theme.palette.primary.main,
                  borderRadius: 1,
                },

                '& .tools': {
                  opacity: 1,
                  transitionProperty: 'all',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDuration: '600ms',
                  display: 'block',
                },
              },
            }}
          >
            <Box
              className="tools"
              sx={{
                opacity: 0,
                position: 'absolute',
                zIndex: 999,
                right: 0,
                top: -32,
                height: 56,
                minWidth: '45%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'start',
                }}
              >
                <BasicLayoutPopper />
                <SortResumeBasicFieldPopper resumeBaisc={data} items={infoItems} />
              </Box>
            </Box>
            <Grid2 className="edit-content" container spacing={2}>
              {_.map(infoItems, (item) => {
                const Icon = basicDefaultIcon?.[item.key] || (() => <div />);

                return (
                  <Grid2 xs={6} key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.isShowIcon && (
                      <Icon style={{ flexShrink: 0, fontSize: 22, marginRight: 8 }} />
                    )}
                    {item.isShowLabel && (
                      <FieldInput
                        // @ts-ignore
                        name={`${item.key}.label`}
                        control={control}
                        readOnly={preview}
                        onBlur={handleBlur}
                        minWidth={20}
                        fontSize={16}
                        sx={{ mr: 1, flexShrink: 0 }}
                      />
                    )}

                    <FieldInput
                      // @ts-ignore
                      name={`${item.key}.value`}
                      control={control}
                      readOnly={preview}
                      onBlur={handleBlur}
                      minWidth={20}
                      fontSize={16}
                    />
                  </Grid2>
                );
              })}
            </Grid2>
          </Box>
        </Grid>
        <Grid item xs="auto">
          {data.avatar.visible && (
            <Box sx={{ float: 'right', clear: 'left', width: '3.5cm', height: '5.2cm' }}>
              <Box
                component="img"
                src={data.avatar.value}
                sx={{
                  borderRadius: 1,
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Basic;
