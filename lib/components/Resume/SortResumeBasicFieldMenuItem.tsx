import { Reorder, useMotionValue } from 'framer-motion';
import { Box, ListItemButton, ListItemText } from '@mui/material';
import { useRaisedShadow } from '@lib/hooks/useRaisedShadow';
import type { ResumeBasicFieldAndKey } from './SortResumeBasicFieldPopper';

interface Props {
  item: ResumeBasicFieldAndKey;
}

const SortResumeBasicFieldMenuItem = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={item} id={item.key} style={{ boxShadow, y }}>
      <Box className="item-box">
        <ListItemButton
          sx={{ px: 0, cursor: 'grab', '&:hover': { backgroundColor: 'transparent' } }}
          disableTouchRipple
        >
          <ListItemText primaryTypographyProps={{ noWrap: true }} primary={item.label} />
        </ListItemButton>
      </Box>
    </Reorder.Item>
  );
};

export default SortResumeBasicFieldMenuItem;
