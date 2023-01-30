import _ from 'lodash';
import produce from 'immer';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import BasicLayoutPopperMenuItem from './BasicLayoutPopperMenuItem';
import { TbMist } from 'react-icons/tb';
import { useRef, useState } from 'react';
import { updateResumeBasic } from '@lib/services/resume';
import useResume from '@lib/hooks/useResume';
import styles from './BasicLayoutPopperStyle';

const BasicLayoutPopper = () => {
  const { resume, mutate } = useResume();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function handleChangeBasic(isShowIcon: boolean, isShowLabel: boolean) {
    if (!resume) return;

    const newResumeBasic = produce(resume.resume_basic, (draft) => {
      _.forEach(draft, (item) => {
        if (typeof item === 'number') return;

        if (_.has(item, 'is_show_label')) {
          item.is_show_label = isShowLabel;
        }

        if (_.has(item, 'is_show_icon')) {
          item.is_show_icon = isShowIcon;
        }
      });
    });

    mutate(
      async (originData: any) => {
        const response = await updateResumeBasic(resume.slug, newResumeBasic);
        if (response) {
          return response;
        }

        return originData;
      },
      { revalidate: false },
    );
  }

  function handleMenuClick(key: string) {
    switch (key) {
      case 'hasAll': {
        handleChangeBasic(true, true);
        break;
      }
      case 'onlyIcon': {
        handleChangeBasic(true, false);
        break;
      }
      case 'onlyLable': {
        handleChangeBasic(false, true);
        break;
      }
      case 'none': {
        handleChangeBasic(false, false);
        break;
      }
    }

    setOpen(false);
  }

  return (
    <Box>
      <IconButton ref={anchorRef} onClick={handleToggle} size="small" sx={styles.iconButton}>
        <TbMist />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom',
            }}
          >
            <Paper sx={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={() => handleMenuClick('hasAll')} sx={styles.menuItem}>
                    <BasicLayoutPopperMenuItem title="有标题、有图标" isShowIcon isShowLabel />
                  </MenuItem>
                  <MenuItem sx={styles.menuItem} onClick={() => handleMenuClick('onlyIcon')}>
                    <BasicLayoutPopperMenuItem title="无标题、有图标" isShowIcon />
                  </MenuItem>
                  <MenuItem sx={styles.menuItem} onClick={() => handleMenuClick('onlyLable')}>
                    <BasicLayoutPopperMenuItem title="有标题、无图标" isShowLabel />
                  </MenuItem>
                  <MenuItem sx={styles.menuItem} onClick={() => handleMenuClick('none')}>
                    <BasicLayoutPopperMenuItem title="无标题、无图标" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default BasicLayoutPopper;
