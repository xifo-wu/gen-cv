import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import useApi from '@lib/hooks/useApi';
import resumeTemplates from '@lib/components/Resume/templates';
import EditResumeLayout, { ResumeIdProvider } from '@lib/layouts/EditResumeLayout';
import EditEducationDetailModal from '@lib/components/Resume/EditEducationDetailModal';
import useResume from '@lib/hooks/useResume';

const EditResumePage = () => {
  const { resume, loading } = useResume();

  if (loading || !resume) {
    return <div>Loading</div>;
  }

  const ResumeComponent = resumeTemplates[resume.layout_type]?.component;

  return (
    <Box
      sx={{
        display: 'flex',
        '@media print': {
          colorAdjust: 'exact',
        },
      }}
    >
      <ResumeComponent preview={false} data={resume} />
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
