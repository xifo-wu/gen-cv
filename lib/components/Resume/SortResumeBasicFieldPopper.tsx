import _ from 'lodash';
import produce from 'immer';
import { useRef, useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { Box, ClickAwayListener, Grow, IconButton, Paper, Popper } from '@mui/material';
import { TbLineHeight } from 'react-icons/tb';
import { updateResumeBasic } from '@lib/services/resume';
import styles from './SortResumeBasicFieldPopperStyle';
import SortResumeBasicFieldMenuItem from './SortResumeBasicFieldMenuItem';
import useResume from '@lib/hooks/useResume';
import type { ResumeBasicsDataKeys, ResumeBasicField, ResumeBasicsData } from './type';

export interface ResumeBasicFieldAndKey extends ResumeBasicField {
  key: ResumeBasicsDataKeys;
}

interface Props {
  resumeBaisc: ResumeBasicsData;
  items: ResumeBasicFieldAndKey[];
}

const SortResumeBasicFieldPopper = ({ resumeBaisc, items }: Props) => {
  const { resume, mutate } = useResume();

  const debounceRef = useRef<NodeJS.Timer>();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [reordered, setReordered] = useState(items);

  useEffect(() => {
    setReordered(items);
  }, [items]);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);

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

  const handleReorder = (newItems: ResumeBasicFieldAndKey[]) => {
    setReordered(newItems);

    if (!resume) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const newResumeBasic = produce(resume.resume_basic, (draft) => {
        _.forEach(newItems, (item, index) => {
          if (!item.key) return;

          draft[item.key].sort_index = index
        });
      });

      mutate(
        async (originData: any) => {

          const response = updateResumeBasic(resume!.slug, newResumeBasic);
          if (!response) return originData;

          return response;
        },
        { revalidate: false },
      );
    }, 1000);
  };

  return (
    <Box>
      <IconButton ref={anchorRef} onClick={handleToggle} size="small" sx={styles.iconButton}>
        <TbLineHeight />
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
            <Paper sx={styles.reorderUl}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box onKeyDown={handleListKeyDown}>
                  <Reorder.Group axis="y" onReorder={handleReorder} values={reordered}>
                    {_.map(reordered, (item) => {
                      return <SortResumeBasicFieldMenuItem key={item.key} item={item} />;
                    })}
                  </Reorder.Group>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default SortResumeBasicFieldPopper;
