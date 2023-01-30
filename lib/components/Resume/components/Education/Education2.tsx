import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CommonContent1 from '../CommonContent1';
import { TbCircleDot } from 'react-icons/tb';
import type { EducationDetail } from '@lib/components/Resume/type';

interface Props {
  data: EducationDetail;
}

const styles = {
  title: {
    fontWeight: 500,
  },
  content: {
    pl: 3
  }
};

const Education2 = ({ data }: Props) => {
  return (
    <Box>
      <Grid container>
        <Grid xs={5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TbCircleDot />
            <Box sx={styles.title}>
              {data.start_on} - {data.end_on}
            </Box>
          </Stack>
        </Grid>
        <Grid xs>
          <Box sx={styles.title}>{data.name}</Box>
        </Grid>
        <Grid xs="auto" justifySelf="end">
          <Box sx={styles.title}>{data.university_majors}</Box>
        </Grid>
      </Grid>

      <Box sx={styles.content}>
        <CommonContent1 data={data} />
      </Box>
    </Box>
  );
};

export default Education2;
