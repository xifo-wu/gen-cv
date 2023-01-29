import _ from 'lodash';
import {
  Box,
  Button,
  Typography,
  Divider,
  InputLabel,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller } from 'react-hook-form';
import { TbBrandGithub, TbUser, TbShieldLock, TbEyeOff, TbEye } from 'react-icons/tb';
import { AiOutlineWechat } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from '@src/Link';
import AuthLayout from '@lib/layouts/AuthLayout';
import DarkerTextField from '@lib/components/CustomMui/DarkerTextField';
import api from '@lib/utils/api';
import styles from '@lib/styles/registerPageStyle';
import type { NextPageWithLayout } from '@pages/_app';

const title = 'GenCV';

interface LoginForm {
  username: string;
  password: string;
}

const RegisterPage: NextPageWithLayout = () => {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (data: LoginForm) => {
    const { response, error } = await api.post<any, any>('/api/v1/login', data);

    if (error) {
      toast.error(error.message);
      return;
    }

    localStorage.setItem('accessToken', response.meta.access_token);
    localStorage.setItem('refreshToken', response.meta.refresh_token);
    router.push('/dashboard');
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h1" sx={styles.title}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={styles.subtitle}>
        登录您的账户
      </Typography>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputLabel htmlFor="username" sx={styles.fieldLabel}>
          用户名
        </InputLabel>
        <Controller
          render={({ field }) => (
            <DarkerTextField
              id="username"
              hiddenLabel
              color="info"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    sx={!!errors.username ? { color: theme.palette.error.main } : { color: '#fff' }}
                    position="start"
                  >
                    <TbUser />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
          rules={{
            required: { value: true, message: '用户名必填' },
          }}
          name="username"
          control={control}
        />

        <InputLabel htmlFor="password" sx={styles.fieldLabel}>
          密码
        </InputLabel>
        <Controller
          render={({ field }) => (
            <DarkerTextField
              id="password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    sx={!!errors.password ? { color: theme.palette.error.main } : { color: '#fff' }}
                    position="start"
                  >
                    <TbShieldLock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      sx={{
                        color: '#fff',
                      }}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <TbEyeOff /> : <TbEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{
            required: { value: true, message: '密码必填' },
          }}
          name="password"
          control={control}
        />

        <Button type="submit" size="large" variant="contained" fullWidth sx={styles.submitBtn}>
          登录
        </Button>
        <Divider sx={styles.divider}>其他登录方法</Divider>
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button  onClick={() => toast.info('即将上线')} variant="contained" startIcon={<AiOutlineWechat />} sx={styles.wechatOAuthBtn}>
              微信登录
            </Button>
            <LoadingButton
              sx={styles.githubOAuthBtn}
              onClick={() => toast.info('即将上线')}
              variant="contained"
              startIcon={<TbBrandGithub />}
            >
              Github
            </LoadingButton>
          </Stack>
        </Box>
        <Box>
          还没有账号？
          <Link href="/register" sx={{ color: '#3b82f6' }}>
            立即注册
          </Link>
        </Box>
      </form>
    </Box>
  );
};

RegisterPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default RegisterPage;
