import { Box, BoxProps, Typography } from '@mui/material';
import { TbPhone, TbMail } from 'react-icons/tb';
import styles from './BasicLayoutPopperStyle';

interface BasicLayoutPopperMenuItemProps extends BoxProps {
  title: string;
  isShowIcon?: boolean;
  isShowLabel?: boolean;
}

const BasicLayoutPopperMenuItem = ({
  title,
  isShowIcon,
  isShowLabel,
  sx,
  ...rest
}: BasicLayoutPopperMenuItemProps) => {
  return (
    <Box sx={{ width: '100%' }} {...rest}>
      <Typography variant="caption">{title}</Typography>

      <Box sx={styles.menuItemPreviewContainer}>
        <Box sx={styles.menuItemPreviewBox}>
          {isShowIcon && <TbMail style={styles.menuItemPreviewIcon} />}
          {isShowLabel && <Typography sx={{ mx: 0.5 }}>邮箱</Typography>}
          <Typography>resume@gencv.com</Typography>
        </Box>

        <Box sx={{ ...styles.menuItemPreviewBox, flex: 1 }}>
          {isShowIcon && <TbPhone style={styles.menuItemPreviewIcon} />}
          {isShowLabel && <Typography sx={{ mx: 0.5 }}>电话</Typography>}
          <Typography>133****3333</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default BasicLayoutPopperMenuItem;
