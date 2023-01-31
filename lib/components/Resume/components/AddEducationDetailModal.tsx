import { Controller, useForm } from 'react-hook-form';
import {
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  DialogActions,
  Stack,
} from '@mui/material';
import { TbSchool } from 'react-icons/tb';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid2 from '@mui/material/Unstable_Grid2';
import api from '@lib/utils/api';
import { useDialog, useDialogValue } from '@lib/hooks/dialog';
import useResume from '@lib/hooks/useResume';
import type { EducationDetail } from '../type';
import { toast } from 'react-toastify';
import { memo } from 'react';

const initDefaultData = {
  desc: '',
  end_on: '',
  name: '',
  sort_index: 0,
  start_on: '',
  university_majors: '',
};

// 编辑教育经历详情 Modal 框
const AddEducationDetailModal = ({ dialogName = 'AddEducationDetailModal' }) => {
  const theme = useTheme();
  const { resume, resumeSlug, mutate } = useResume();
  console.log(resumeSlug, 'resumeSlug');
  const { closeDialog } = useDialog();
  const { open, params } = useDialogValue(dialogName);

  console.log(params, 'params');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EducationDetail>({
    defaultValues: initDefaultData,
  });

  const handleClose = () => void closeDialog(dialogName);

  const handleDetailSubmit = (data: EducationDetail) => {
    mutate(
      async (originData: any) => {
        const { response, error } = await api.post<any, any>(
          `/api/v1/resumes/${resumeSlug}/education-details`,
          data,
        );

        if (error) {
          toast.error(error.message);
          return originData;
        }

        if (!response) return originData;

        toast.success('添加成功');
        handleClose();
        return response;
      },
      { revalidate: false },
    );
  };

  return (
    <Dialog maxWidth="xl" fullScreen={fullScreen} open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(handleDetailSubmit)}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TbSchool style={{ fontSize: 24 }} />
            <span>新增教育经历</span>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={1}>
            <Grid2 xs={6}>
              <Controller
                render={({ field }) => (
                  <TextField fullWidth margin="dense" label="学校名称" {...field} />
                )}
                name="name"
                control={control}
              />
            </Grid2>

            <Grid2 xs={6}>
              <Controller
                render={({ field }) => (
                  <TextField fullWidth margin="dense" label="专业名称" {...field} />
                )}
                name="university_majors"
                control={control}
              />
            </Grid2>

            <Grid2 xs={6}>
              <Controller
                render={({ field }) => (
                  <TextField fullWidth margin="dense" label="开始时间" {...field} />
                )}
                name="start_on"
                control={control}
              />
            </Grid2>

            <Grid2 xs={6}>
              <Controller
                render={({ field }) => (
                  <TextField fullWidth margin="dense" label="开始时间" {...field} />
                )}
                name="end_on"
                control={control}
              />
            </Grid2>

            <Grid2 xs={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    multiline
                    minRows={15}
                    maxRows={15}
                    fullWidth
                    margin="dense"
                    label="描述"
                    {...field}
                    helperText="支持 Markdown 语法"
                  />
                )}
                name="desc"
                control={control}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <LoadingButton loading={isSubmitting} variant="contained" type="submit">
            保存
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default memo(AddEducationDetailModal);
