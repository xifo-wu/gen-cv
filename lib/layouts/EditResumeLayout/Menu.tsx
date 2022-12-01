import _ from 'lodash';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDebounce } from 'react-use';
import { toast } from 'react-toastify';
import { Reorder } from 'framer-motion';
import { TbMist, TbLayout2, TbListDetails } from 'react-icons/tb';
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import useApi from '@lib/hooks/useApi';
import api from '@lib/utils/api';
import ModuleMenuItem from './ModuleMenuItem';
import type { ModuleMapKeys } from '@lib/components/Resume/modules';
import styles from './styles';

const menuList = [
  {
    key: 'layout',
    icon: <TbLayout2 />,
    name: '选择模板',
  },
  {
    key: 'module',
    icon: <TbListDetails />,
    name: '模块管理',
  },
];

const Menu = () => {
  const router = useRouter();
  const { query } = router;

  const resumeApi = query['resume-id'] ? `/api/v1/resumes/${query['resume-id']}` : null;
  const { data: resume, mutate } = useApi<any>(resumeApi);
  const [reordered, setReordered] = useState(resume.moduleOrder);
  const [debouncedReordered, setDebouncedReordered] = useState('');

  const reorderedGroupValue = useMemo(
    () =>
      _.chain(reordered)
        .split(',')
        .filter((i) => !!i)
        .value(),
    [reordered],
  );

  useEffect(() => {
    setReordered(resume.moduleOrder);
  }, [resume.moduleOrder]);

  useDebounce(
    () => {
      if (debouncedReordered) {
        // TODO fix any
        mutate(
          async (originData: any) => {
            try {
              const response = await api.put(resumeApi!, {
                data: {
                  moduleOrder: reordered,
                },
              });

              return response;
            } catch (error: any) {
              // TODO fix any
              toast.error(error.message);
              return originData;
            }
          },
          { revalidate: false },
        );
      }

      setDebouncedReordered(reordered);
    },
    1000,
    [reordered],
  );

  const handleReorder = useCallback((newItems: string[]) => setReordered(newItems.join(',')), []);
  const handleActionClick = () => {};

  return (
    <Box>
      <List
        sx={styles.menuList}
        component="nav"
        subheader={
          <ListSubheader disableSticky component="div">
            功能列表
          </ListSubheader>
        }
      >
        {menuList.map((item) => (
          <ListItemButton key={item.key}>
            <ListItemIcon sx={styles.menuIcon}>{item.icon}</ListItemIcon>
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary={item.name} />
          </ListItemButton>
        ))}
      </List>
      <ListSubheader disableSticky component="div">
        模块列表
      </ListSubheader>

      <ListItemButton disableTouchRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
        <ListItemIcon sx={styles.menuIcon}>
          <TbMist />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="基础信息" />
      </ListItemButton>

      <Box sx={styles.moduleItem}>
        <Reorder.Group axis="y" onReorder={handleReorder} values={reorderedGroupValue}>
          {_.map(
            reorderedGroupValue.filter((i: string) => i !== 'resumeBasic'),
            (item: ModuleMapKeys) => (
              <ModuleMenuItem
                onEditClick={handleActionClick}
                disableReorder={item === 'resumeBasic'}
                key={item}
                item={item}
              />
            ),
          )}
        </Reorder.Group>
      </Box>
    </Box>
  );
};

export default Menu;
