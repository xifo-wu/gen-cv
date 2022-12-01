import { TbLineHeight } from 'react-icons/tb';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { moduleMap } from '@lib/components/Resume/modules';
import { useRaisedShadow } from '@lib/hooks/useRaisedShadow';
import type { ModuleMapKeys } from '@lib/components/Resume/modules';
import styles from './styles';

interface Props {
  item: ModuleMapKeys;
  disableReorder?: boolean;
  onEditClick: (item: ModuleMapKeys) => void;
}

const ModuleMenuItem = ({ item, onEditClick, disableReorder }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const controls = useDragControls();
  const module = moduleMap[item];

  return (
    <Reorder.Item
      value={item}
      id={item}
      dragListener={false}
      dragControls={controls}
      style={{ boxShadow, y }}
    >
      <Box className="item-box flex items-center py-[10px] px-[15px] mb-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 select-none">
        <ListItemIcon sx={styles.menuIcon}>
          <TbLineHeight onPointerDown={(e) => controls.start(e)} style={{ cursor: 'grab' }} />
        </ListItemIcon>
        <ListItemButton
          sx={{ px: 0, '&:hover': { backgroundColor: 'transparent' } }}
          disableTouchRipple
        >
          <ListItemText primaryTypographyProps={{ noWrap: true }} primary={module.name} />
        </ListItemButton>
      </Box>
    </Reorder.Item>
  );
};

export default ModuleMenuItem;
