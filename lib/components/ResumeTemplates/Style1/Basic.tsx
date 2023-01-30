import _ from 'lodash';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Box, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version
import type {
  ResumeBasicsData,
  ResumeBasicsDataKeys,
} from '@lib/components/Resume/type';
import styles from './styles';
import FieldInput from '@lib/components/Resume/components/FieldInput';
import BasicLayoutPopper from '@lib/components/Resume/components/BasicLayoutPopper';
import basicDefaultIcon from '@lib/components/Resume/basicDefaultIcon';
import SortResumeBasicFieldPopper from '@lib/components/Resume/SortResumeBasicFieldPopper';
import useResume from '@lib/hooks/useResume';
import { resumeBasicInitData } from '@lib/components/Resume/initData';
import { updateResumeBasic } from '@lib/services/resume';

interface Props {
  data: ResumeBasicsData;
  preview?: boolean;
}

const infoKeys: Array<ResumeBasicsDataKeys> = [
  'mobile',
  'email',
  'educational_qualifications',
  'website',
  'birthday',
  'age',
  'job_year',
];

const Basic = ({ data, preview }: Props) => {
  const { resume, mutate } = useResume();
  const { control, watch } = useForm<ResumeBasicsData>({
    defaultValues: resumeBasicInitData,
    values: resume?.resume_basic,
  });

  if (_.isEmpty(resume)) return <Box />;

  const theme = useTheme();
  const debounceRef = useRef<NodeJS.Timer>();

  const infoItems = _.chain(resume?.resume_basic)
    .pick(infoKeys)
    .map((item, key) => ({
      ...item,
      key: key as ResumeBasicsDataKeys,
    }))
    .filter((item) => !!item.visible)
    .sortBy((item) => item.sort_index)
    .value();

  const handleBlur = async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      mutate(
        async (originData: any) => {
          const response = await updateResumeBasic(resume.slug, watch());
          if (response) {
            return response;
          }

          return originData;
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
              {data.job.is_show_label && (
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
              />
            </Box>
          )}

          {data?.in_a_word?.visible && (
            <Box sx={{ mb: 1 }}>
              <FieldInput
                multiline
                name="in_a_word.value"
                control={control}
                readOnly={preview}
                onBlur={handleBlur}
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
                    {item.is_show_icon && (
                      <Icon style={{ flexShrink: 0, fontSize: 22, marginRight: 8 }} />
                    )}
                    {item.is_show_label && (
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
          {data?.avatar?.visible && (
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
