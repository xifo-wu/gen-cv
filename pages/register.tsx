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
import { TbBrandGithub, TbMail, TbShieldLock, TbHistory, TbEyeOff, TbEye } from 'react-icons/tb';
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

interface RegisterForm {
  email: string;
  password: string;
  verification_code: string;
}

const RegisterPage: NextPageWithLayout = () => {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (data: RegisterForm) => {
    const { response, error } = await api.post<any, any>('/api/v1/register', {
      registration_method: 'email_register',
      ...data,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    localStorage.setItem('accessToken', response.meta.access_token);
    localStorage.setItem('refreshToken', response.meta.refresh_token);
    router.push('/dashboard');
  };

  const handleSendVerificationCode = async () => {
    const email = watch('email');
    if (!email) {
      setError('verification_code', {
        type: 'custom',
        message: '请先填写邮箱',
      });
    } else {
      clearErrors('verification_code');
    }

    const { response, error } = await api.post<any, any>('/api/v1/verification_code', {
      data: email,
      purpose: 'email_register',
    });

    if (error) {
      setError('verification_code', {
        type: 'custom',
        message: error.message,
      });
      return;
    }

    clearErrors('verification_code');
    toast.success(response.message);
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h1" sx={styles.title}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={styles.subtitle}>
        创建一个账户
      </Typography>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputLabel htmlFor="email" sx={styles.fieldLabel}>
          邮箱地址
        </InputLabel>
        <Controller
          render={({ field }) => (
            <DarkerTextField
              id="email"
              hiddenLabel
              color="info"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    sx={!!errors.email ? { color: theme.palette.error.main } : { color: '#fff' }}
                    position="start"
                  >
                    <TbMail />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
          rules={{
            required: { value: true, message: '邮箱必填' },
            validate: {
              checkEmail: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || '邮箱格式不正确',
            },
          }}
          name="email"
          control={control}
        />

        <InputLabel htmlFor="verificationCode" sx={styles.fieldLabel}>
          验证码
        </InputLabel>
        <Controller
          render={({ field }) => (
            <DarkerTextField
              id="verificationCode"
              fullWidth
              margin="normal"
              error={!!errors.verification_code}
              helperText={errors.verification_code?.message}
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    sx={
                      !!errors.verification_code
                        ? { color: theme.palette.error.main }
                        : { color: '#fff' }
                    }
                    position="start"
                  >
                    <TbHistory />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleSendVerificationCode}>发送验证码</Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{
            required: { value: true, message: '验证码必填' },
          }}
          name="verification_code"
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
          注册
        </Button>
        <Divider sx={styles.divider}>其他登录方法</Divider>
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={2}>
            {/* <Button variant="contained" startIcon={<AiOutlineWechat />} sx={styles.wechatOAuthBtn}>
              微信登录
            </Button> */}
            <LoadingButton
              loading={isSubmitting}
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
          已经有账号了？
          <Link href="/login" sx={{ color: '#3b82f6' }}>
            立即登录
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
