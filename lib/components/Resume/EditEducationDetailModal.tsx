import { useEffect } from 'react';
import { useAtom } from 'jotai';
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
import Grid2 from '@mui/material/Unstable_Grid2';
import { resumeModuleModal } from '@lib/atom/resume-atom';
import type { EducationDetail } from './type';

// 编辑教育背景详情 Modal 框
const EditEducationDetailModal = () => {
  const [modal, setResumeModuleModal] = useAtom(resumeModuleModal);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { control, reset, handleSubmit } = useForm<EducationDetail>({
    defaultValues: modal.educationDetail.params,
  });

  useEffect(() => {
    if (modal.educationDetail.open) {
      reset(modal.educationDetail.params);
    }
  }, [modal.educationDetail.open]);

  const handleClose = () => {
    setResumeModuleModal((draft) => {
      draft.educationDetail.open = false;
    });
  };

  const handleDetailSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Dialog
      maxWidth="xl"
      fullScreen={fullScreen}
      open={modal.educationDetail.open}
      onClose={handleClose}
    >
      <Box component="form" onSubmit={handleSubmit(handleDetailSubmit)}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TbSchool style={{ fontSize: 24 }} />
            <span>编辑详情</span>
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
                name="startOn"
                control={control}
              />
            </Grid2>

            <Grid2 xs={6}>
              <Controller
                render={({ field }) => (
                  <TextField fullWidth margin="dense" label="开始时间" {...field} />
                )}
                name="endOn"
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
          <Button variant="contained" type="submit">
            保存
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditEducationDetailModal;
