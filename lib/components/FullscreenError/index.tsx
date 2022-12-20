import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './indexStyles';

export interface FullscreenErrorProps {
  httpStatus?: number;
  description?: string;
}

const errorEnum: Record<number, { title: string; message: string }> = {
  400: {
    title: '400 Bad Request',
    message: '服务器无法或不会处理请求',
  },
  403: {
    title: '403 Forbidden',
    message: '客户端没有访问内容的权限',
  },
  404: {
    title: '404 Not Found',
    message: '服务器找不到请求的资源',
  },
  500: {
    title: '500 Internal Server Error',
    message: '服务器遇到了不知道如何处理的情况。',
  },
  502: {
    title: '502 Bad Gateway',
    message: '此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应',
  },
};

const FullscreenError = (props: FullscreenErrorProps) => {
  const { httpStatus = 400, description } = props;
  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100%',
        background: '#f1f5f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          fontSize: '25vw',
          textAlign: 'center',
          position: 'fixed',
          width: '100vw',
          zIndex: '1',
          color: '#cbd5e1',
          textShadow: '0 0 50px rgba(226,232,240, 0.5)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: '"Montserrat", monospace',
          userSelect: 'none',
        }}
      >
        {httpStatus}
      </Box>
      <Box
        sx={{
          borderRadius: 5,
          background: 'rgba(0, 0, 0, 0.45)',
          width: '70vw',
          margin: '0 auto',
          py: 4,
          px: 2,
          boxShadow: '0 0 150px -20px rgba(0, 0, 0, 0.5)',
          zIndex: 3,
          minHeight: '45vh',
          color: '#fff',
        }}
      >
        <Box sx={styles.contentWrapp}>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            {'> '}
          </Typography>
          <Typography sx={styles.titleText} variant="button">
            Error Code:
          </Typography>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            "{errorEnum[httpStatus].title}"
          </Typography>
        </Box>

        <Box sx={styles.contentWrapp}>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            {'> '}
          </Typography>
          <Typography sx={styles.titleText} variant="button">
            Error Description:
          </Typography>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            "{errorEnum[httpStatus].message}"
          </Typography>
        </Box>

        <Box sx={styles.contentWrapp}>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            {'> '}
          </Typography>
          <Typography sx={styles.titleText} variant="button">
            Error Response:
          </Typography>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            "{description}"
          </Typography>
        </Box>

        <Box sx={styles.contentWrapp}>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            {'> '}
          </Typography>
          <Typography sx={styles.titleText} variant="button">
            Next you can:
          </Typography>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            [<a>首页</a>, <a>控制台</a>, <a>文档</a>]
          </Typography>
        </Box>

        <Box sx={styles.contentWrapp}>
          <Typography sx={styles.contentText} variant="button" gutterBottom>
            {'> '}
          </Typography>
          <Typography sx={styles.titleText} variant="button">
            Exit...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FullscreenError;
