import _ from 'lodash';
import dayjs from 'dayjs';
import { TbHome, TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { FaUserCog, FaStore, FaRegCopyright } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
// import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Timeline, { timelineClasses } from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import Link from '@src/Link';
import CreateResumeDialog from '@src/components/CreateResumeDialog';
import ConfirmDeleteResumeDialog from '@src/components/ConfirmDeleteResumeDialog';
import BorderLinearProgress from '@lib/components/CustomMui/BorderLinearProgress';
import { useRouter } from 'next/router';
import { useDialog, useSetDialog } from '@lib/hooks/dialog';
import useApi from '@lib/hooks/useApi';
import useResumes, { Resume } from '@src/hooks/useResumes';
import api from '@lib/utils/api';
import { useState } from 'react';
import useUser from '@src/hooks/useUser';

const DashBoard = () => {
  const router = useRouter();
  const [resumesPage, setResumesPage] = useState(1)
  // const { data: user = {}, error } = useApi<any>('/api/v1/user');
  const { user } = useUser();
  const { resumes, resumesMeta, mutate: resumesMutate, ...rest } = useResumes({ page: resumesPage });

  const { openDialog } = useDialog();
  // const openCreateResumeDialog= useSetDialog('CreateResumeDialog');

  const handleCreateCV = () => {
    openDialog('CreateResumeDialog');
  };

  const handleDeleteCV = (resume: Resume) => {
    openDialog('ConfirmDeleteResumeDialog', { slug: resume.slug, name: resume.name });
  };

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setResumesPage(page);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100%',
        backgroundColor: '#f1f5f9',
      }}
    >
      <Box className="header"></Box>
      <Box className="toolbar" sx={{ background: '#17191E', pt: 3, pb: 12 }}>
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ '& .MuiBreadcrumbs-separator': { color: '#fff' } }}>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}
              color="inherit"
              href="/"
            >
              <TbHome />
            </Link>

            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}
              color="inherit"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </Breadcrumbs>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ pt: 5, pb: 3, color: '#fff' }}
          >
            <Box>
              <Box sx={{ fontSize: '1.5rem', fontWeight: 700 }}>欢迎回来，{user.nickname}</Box>
              <Box sx={{ pt: 1, color: '#e2e8f0' }}>祝你找到好工作</Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
      >
        <Box sx={{ mt: -8, color: '#fff', flex: 1 }}>
          <Grid container alignItems="flex-start" spacing={4} disableEqualOverflow>
            <Grid container spacing={2} md={5} lg={4} xl={4} disableEqualOverflow>
              <Grid xs={6} sm={3} md={6}>
                <Card
                  sx={{
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  }}
                >
                  <CardActionArea sx={{ p: 5 }}>
                    <FaUserCog style={{ fontSize: '2.75rem', color: '#cbd5e1' }} />
                    <Box sx={{ mt: 1, color: '#3F4254', fontSize: '1rem', fontWeight: 600 }}>
                      个人资料
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid xs={6} sm={3} md={6}>
                <Card
                  sx={{
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  }}
                >
                  <CardActionArea sx={{ p: 5 }}>
                    <FaStore style={{ fontSize: '2.75rem', color: '#cbd5e1' }} />
                    <Box sx={{ mt: 1, color: '#3F4254', fontSize: '1rem', fontWeight: 600 }}>
                      模版列表
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid xs={12} sm={6} md={12}>
                <Card
                  sx={{
                    p: 5,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="baseline"
                    sx={{ mb: 1.5, color: '#3F4254', fontSize: '1rem', fontWeight: 600 }}
                  >
                    <Box>简历数量</Box>
                    <Box sx={{ fontSize: '0.875rem' }}>{resumesMeta.total} / ♾️</Box>
                  </Stack>
                  <BorderLinearProgress
                    variant="determinate"
                    value={((resumesMeta.total || 0) / Infinity) * 100}
                  />
                </Card>
              </Grid>

              <Grid xs={12} sm={6} md={12}>
                <Card
                  sx={{
                    p: 5,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>操作日志</Typography>

                  <Timeline
                    sx={{
                      [`&.${timelineClasses.root}`]: {
                        px: 0,
                      },
                      [`& .${timelineOppositeContentClasses.root}`]: {
                        fontSize: 12,
                        pl: 0,
                        flex: '0 0 78px',
                      },
                    }}
                  >
                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">
                        2023-01-01 22:00:33
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>还没写呢。</TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">
                        2023-01-01 22:02:46
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="success" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>就先单纯占个位置。</TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">
                        2023-01-01 22:02:46
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>就先单纯占个位置。</TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">
                        2023-01-01 22:04:53
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="warning" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>先鸽了，先鸽了。</TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </Card>
              </Grid>

              <Grid xs={12} sm={6} md={12}>
                <Card
                  sx={{
                    p: 5,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    display: 'flex',
                    minHeight: 256,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  不知道放什么，就先来个广告占位吧
                </Card>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={7} lg={8} xl={8}>
              <Card
                sx={{
                  p: 5,
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

                  backgroundPosition: '100% 50px',
                  backgroundSize: '200px auto',
                  backgroundImage: 'url("https://cdn2.agideo.com/221216/d43302901cee.svg")',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600 }}>来都来了，</Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 3 }}>
                  那就新建一份简历吧。
                </Typography>

                <Button variant="contained" onClick={handleCreateCV}>
                  新建简历
                </Button>
              </Card>

              <Card
                sx={{
                  py: 4,
                  px: 5,
                  mt: 2,
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
              >
                <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>简历列表</Typography>

                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>名称</TableCell>
                        <TableCell align="right">更新时间</TableCell>
                        <TableCell align="right">操作</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {resumes.map((resume) => {
                        return (
                          <TableRow key={resume.id}>
                            <TableCell>
                              <Link
                                underline="none"
                                href={`/${encodeURIComponent(user.username)}/${resume.slug}/edit`}
                              >
                                {resume.name}
                              </Link>
                            </TableCell>
                            <TableCell align="right">
                              {resume.updated_at
                                ? dayjs(resume.updated_at).format('YYYY-MM-DD HH:mm:ss')
                                : '-'}
                            </TableCell>
                            <TableCell align="right">
                              {/* TODO 添加简历在线地址，即预览地址 */}
                              <IconButton
                                onClick={() => handleDeleteCV(resume)}
                                color="error"
                                aria-label="delete"
                                size="small"
                              >
                                <MdDelete fontSize="inherit" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>

                    {!_.isEmpty(resumesMeta) && (
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            sx={{
                              '& .MuiTablePagination-displayedRows': {
                                display: 'none',
                              },
                              '& .MuiTablePagination-selectLabel': {
                                display: 'none',
                              }
                            }}
                            rowsPerPageOptions={[]}
                            onPageChange={handlePageChange}
                            count={resumesMeta.total!}
                            page={resumesMeta.page! - 1}
                            rowsPerPage={resumesMeta.per_page!}
                          />
                        </TableRow>

                        {/* <Box sx={{ fontSize: 22}}><TbChevronLeft /></Box>
                          <TbChevronRight /> */}
                        {/* <TableCell align="right" colSpan={1000}>

                        </TableCell> */}
                        {/* <Pagination count={resumesMeta.total} /> */}
                        {/* <TablePagination
                          sx={{
                            "& .MuiTablePagination-displayedRows": {
                              display: 'none',
                            }
                          }}
                          // rowsPerPageOptions={[]}
                          // labelRowsPerPage={false}
                          onPageChange={handlePageChange}
                          count={Math.ceil(resumesMeta.total! / resumesMeta.total!)}
                          page={resumesMeta.page! - 1}
                          rowsPerPage={resumesMeta.per_page!}
                        /> */}
                      </TableFooter>
                    )}
                  </Table>
                </TableContainer>

                {resumes.length === 0 && (
                  <Stack alignItems="center" justifyContent="center">
                    <Box
                      component="img"
                      src="https://cdn2.agideo.com/230117/508d3d9e2ad8.png"
                      sx={{ maxWidth: 256, width: '100%' }}
                    />
                    <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                      暂无数据
                    </Typography>
                  </Stack>
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box className="footer" sx={{ width: '100%', py: 3, fontSize: 12 }}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#A1A5B7' }}>
              <Box>{dayjs().format('YYYY')}</Box>
              <FaRegCopyright style={{ fontSize: 12 }} />
              <Box sx={{ color: '#3F4254' }}>Xifo</Box>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Link underline="none" href="https://github.com/xifo-wu/gen-cv" target="_blank">
                Github
              </Link>

              <Link underline="none" href="/about">
                关于
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

DashBoard.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      {page}
      <CreateResumeDialog />
      <ConfirmDeleteResumeDialog />
    </>
  );
};

export default DashBoard;
