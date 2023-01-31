import { Box } from '@mui/material';
import resumeTemplates from '@lib/components/Resume/templates';
import EditResumeLayout, { ResumeIdProvider } from '@lib/layouts/EditResumeLayout';
import EditEducationDetailModal from '@lib/components/Resume/components/EditEducationDetailModal';
import AddEducationDetailModal from '@lib/components/Resume/components/AddEducationDetailModal';
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

      <EditEducationDetailModal />
      <AddEducationDetailModal />
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
