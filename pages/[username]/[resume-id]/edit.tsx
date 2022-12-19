import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import EditResumeLayout, { ResumeIdProvider } from '@lib/layouts/EditResumeLayout';
import useApi from '@lib/hooks/useApi';
import resumeTemplates from '@lib/components/Resume/templates';

const EditResumePage = () => {
  const router = useRouter();
  const { query } = router;

  const { data: resume } = useApi<any>(
    query['resume-id'] ? `/api/v1/resumes/${query['resume-id']}` : null,
  );

  const ResumeComponent = resumeTemplates[resume.layoutType]?.component;

  return (
    <Box
      sx={{
        display: 'flex',
        '@media print': {
          colorAdjust: 'exact',
        },
      }}
    >
      <ResumeComponent data={resume} />
    </Box>
  );
};

EditResumePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <ResumeIdProvider>
      <EditResumeLayout>{page}</EditResumeLayout>
    </ResumeIdProvider>
  );
};

export default EditResumePage;
