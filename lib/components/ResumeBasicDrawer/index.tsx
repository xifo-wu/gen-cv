import _ from 'lodash';
import { Box, Checkbox, Input, TextField, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { TbId } from 'react-icons/tb';
import { useMemo, useEffect, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { useAtom } from 'jotai';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { resumeBasicDrawer } from '@lib/atom/resume-atom';
import { resumeBasicDefaultZhCN } from '@lib/components/Resume/modules';
import styles from './styles';

import type { ResumeBasicsData, ResumeBasicsDataKeys } from '../Resume/type';
import api from '@lib/utils/api';

// 用于渲染字段列表
const resumeBasicArray: Array<ResumeBasicsDataKeys> = [
  'name',
  'job',
  'mobile',
  'email',
  'educationalQualifications',
  'website',
  'birthday',
  'age',
  'avatar',
  'jobYear',
  'inAWord',
];

const ResumeBasicDrawer = () => {
  const { mutate } = useSWRConfig();
  const debounceRef = useRef<NodeJS.Timer>();
  const [{ open, resume }, setValue] = useAtom(resumeBasicDrawer);

  const resumeBasic = useMemo(() => {
    return (resume?.resumeBasic || {}) as ResumeBasicsData;
  }, [resume]);

  const { control, watch, reset } = useForm<ResumeBasicsData>();

  useEffect(() => {
    reset(resumeBasic);
  }, [resumeBasic]);

  const handleToggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setValue({ open, resume });
  };

  const handleUpdateResumeBasic = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      mutate(
        `/api/v1/resumes/${resume?.id}`,
        async (originData: any) => {
          const { response, error } = await api.put<any, any>(
            `/api/v1/resumes/${resume?.id}/resume-basic`,
            watch(),
          );
          if (error) {
            toast.error(error.message);
            return originData;
          }

          return response;
        },
        { revalidate: false },
      );
    }, 2000);

    console.log(watch(), 'watch');
  };

  return (
    <SwipeableDrawer
      open={open}
      anchor="left"
      onClose={handleToggleDrawer(false)}
      onOpen={handleToggleDrawer(true)}
    >
      <Box sx={styles.containerWrap}>
        <Stack className="title-box" direction="row" alignItems="center" spacing={2}>
          <TbId className="title-icon" />
          <Typography className="title">编辑基本信息</Typography>
        </Stack>
        <Typography variant="body2">修改完成两秒后将自动保存</Typography>

        <Box sx={styles.formWrap}>
          {_.map(resumeBasicArray, (item) => {
            return (
              <Box key={item} sx={styles.formItem}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography variant="caption" display="block" gutterBottom>
                    {resumeBasicDefaultZhCN[item]}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="标题"
                        size="small"
                        hiddenLabel
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          // onBlur?.(e);
                        }}
                      />
                    )}
                    name={`${item}.label`}
                    defaultValue={resumeBasic[item]?.label || ''}
                    control={control}
                  />

                  <Controller
                    defaultValue={resumeBasic[item]?.value || ''}
                    render={({ field }) => (
                      <TextField
                        placeholder="内容"
                        size="small"
                        hiddenLabel
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          handleUpdateResumeBasic();
                        }}
                      />
                    )}
                    name={`${item}.value`}
                    control={control}
                  />

                  <Controller
                    render={({ field }) => (
                      <Checkbox
                        size="small"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleUpdateResumeBasic();
                        }}
                        checked={field.value}
                      />
                    )}
                    name={`${item}.visible`}
                    defaultValue={resumeBasic[item]?.visible || false}
                    control={control}
                  />
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default ResumeBasicDrawer;
