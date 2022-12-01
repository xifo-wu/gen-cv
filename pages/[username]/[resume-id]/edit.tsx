import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import EditResumeLayout from '@lib/layouts/EditResumeLayout';
import useApi from '@lib/hooks/useApi';

const EditResumePage = () => {
  const router = useRouter();
  const { query } = router;

  const { data: resume } = useApi<any>(
    query['resume-id'] ? `/api/v1/resumes/${query['resume-id']}` : null,
  );

  return <Box sx={{ display: 'flex' }}>Resume</Box>;
};

EditResumePage.getLayout = function getLayout(page: React.ReactElement) {
  return <EditResumeLayout>{page}</EditResumeLayout>;
};

export default EditResumePage;
