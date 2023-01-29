import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDialog, useDialogValue } from '@lib/hooks/dialog';
import useResumes from '@src/hooks/useResumes';
import api from '@lib/utils/api';

const ConfirmDeleteResumeDialog = ({ dialogName = 'ConfirmDeleteResumeDialog' }) => {
  // const { mutate: resumesMutate } = useResumes();
  const { closeDialog } = useDialog();
  const { open, params = {} } = useDialogValue(dialogName);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    if (submitting) return;

    closeDialog(dialogName);
  };

  const handleDelete = async () => {
    setSubmitting(true);
    const { error } = await api.delete<any, any>(`/api/v1/resumes/${params.slug}`);
    setSubmitting(false);
    closeDialog(dialogName);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('删除成功');
    // todo reload
    // resumesMutate();
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>确定删除吗？</DialogTitle>
      <DialogContent>
        <DialogContentText>
          确定要删除 {params.name} 这份简历吗？删除后无法恢复哦。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <LoadingButton loading={submitting} variant="contained" onClick={handleDelete}>
          确定
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteResumeDialog;
