import _ from 'lodash';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import styles from './styles';
import type { ReactNode } from 'react';
import type { Theme } from '@mui/material';

const title = 'GenCV';

export interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box sx={styles.container}>
      <Grid container>
        <Grid xl={8} lg={7} md={6} sx={styles.banner}>
          <Box sx={styles.info}>
            <Box sx={styles.waviy}>
              {_.map('welcometogencv', (item, index) => {
                return (
                  <Box key={index}>
                    <Box sx={(theme: Theme) => styles.char(theme, index)}>{item}</Box>
                    <Box sx={(theme: Theme) => styles.charReflect(theme, index)}>{item}</Box>
                  </Box>
                );
              })}
            </Box>
            <Typography variant="subtitle2">
              GenCV 是一个的简历生成器系统，可帮助您轻松创建、下载、管理和更新简历，
              还能够分享在线简历。为您提供海量免费的专业简历模板和高级简历模板。
              简历模版随意选择。不定期新增简历模版。
            </Typography>
          </Box>
        </Grid>

        <Grid xl={4} lg={5} md={6} xs={12} sx={styles.content}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
