import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDialog, useDialogValue, useSetDialog } from '@lib/hooks/dialog';
import useUser from '@src/hooks/useUser';
import useResumes from '@src/hooks/useResumes';
import api from '@lib/utils/api';
import { useRef, useEffect } from 'react';
import { mutate } from 'swr';

interface FormData {
  name: string;
}

const CreateResumeDialog = ({ dialogName = 'CreateResumeDialog' }) => {
  const router = useRouter();
  const { user } = useUser();
  const { closeDialog } = useDialog();
  const { open } = useDialogValue(dialogName);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: '' },
  });

  const handleClose = () => {
    if (isSubmitting) return;

    closeDialog(dialogName);
  };

  const handleCreateSubmit = async (values: FormData) => {
    const { response, error } = await api.post<any, any>('/api/v1/resumes', values);

    if (error) {
      toast.error(error.message);
      return;
    }

    const { data } = response;

    toast.success('创建成功');
    closeDialog(dialogName);
    mutate((key) => Array.isArray(key) && key[0] === '/api/v1/resumes');
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>新建简历</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleCreateSubmit)}>
        <DialogContent>
          <DialogContentText>输入简历名称创建一份新的简历吧。</DialogContentText>

          <Controller
            render={({ field }) => (
              <TextField
                variant="standard"
                autoFocus
                fullWidth
                margin="dense"
                label="简历名称"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
            name="name"
            rules={{
              required: { value: true, message: '简历名称必填' },
            }}
            control={control}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <LoadingButton loading={isSubmitting} variant="contained" type="submit">
            确定
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateResumeDialog;
