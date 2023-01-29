import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import useApi from '@lib/hooks/useApi';
import resumeTemplates from '@lib/components/Resume/templates';
import EditResumeLayout, { ResumeIdProvider } from '@lib/layouts/EditResumeLayout';
import EditEducationDetailModal from '@lib/components/Resume/EditEducationDetailModal';

const EditResumePage = () => {
  const router = useRouter();
  const { query } = router;

  const { data: resume } = useApi<any>(
    query['resume-slug'] ? `/api/v1/resumes/${query['resume-slug']}` : null,
  );

  // const ResumeComponent = resumeTemplates[resume.layoutType]?.component;

  return (
    <Box
      sx={{
        display: 'flex',
        '@media print': {
          colorAdjust: 'exact',
        },
      }}
    >
      {/* <ResumeComponent preview={false} data={resume} /> */}
    </Box>
  );
};

EditResumePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <ResumeIdProvider>
      <EditResumeLayout>{page}</EditResumeLayout>

      <EditEducationDetailModal />
    </ResumeIdProvider>
  );
};

export default EditResumePage;
