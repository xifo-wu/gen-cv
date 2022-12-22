import _ from 'lodash';
import { useRef, useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { Box, ClickAwayListener, Grow, IconButton, Paper, Popper } from '@mui/material';
import { TbLineHeight } from 'react-icons/tb';
import { useResumeId } from '@lib/layouts/EditResumeLayout';
import { updateResumeBasic } from '@lib/services/resume';
import styles from './SortResumeBasicFieldPopperStyle';
import type { ResumeBasicField, ResumeBasicsData } from './type';
import { useSWRConfig } from 'swr';
import SortResumeBasicFieldMenuItem from './SortResumeBasicFieldMenuItem';

export interface ResumeBasicFieldAndKey extends ResumeBasicField {
  key?: string;
}

interface Props {
  resumeBaisc: ResumeBasicsData;
  items: ResumeBasicFieldAndKey[];
}

const SortResumeBasicFieldPopper = ({ resumeBaisc, items }: Props) => {
  const { mutate } = useSWRConfig();
  const resumeId = useResumeId();
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

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      mutate(
        `/api/v1/resumes/${resumeId}`,
        async (originData: any) => {
          // TODO: Fix any
          const newBasic = _.reduce<ResumeBasicFieldAndKey, any>(
            newItems,
            (sum, item, index) => {
              if (!item.key) return sum;

              sum[item.key] = {
                ...item,
                sortIndex: index,
              };
              return sum;
            },
            { ...resumeBaisc },
          );

          const response = updateResumeBasic(resumeId as string, newBasic);
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
