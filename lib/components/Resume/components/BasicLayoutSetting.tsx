import _ from 'lodash';
import produce from 'immer';
import { useRef, useState } from 'react';
import { useImmer } from "use-immer";
import {
  MenuList,
  MenuItem,
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  Paper,
  Popper,
} from '@mui/material';
import { TbEyeOff, TbEye, TbArrowBigDownLine, TbArrowBigUpLine, TbSettings } from 'react-icons/tb';
import { useResumeId } from '@lib/layouts/EditResumeLayout';
import useApi from '@lib/hooks/useApi';
import styles from './BasicLayoutSettingStyle';
import { updateResumeBasic } from '@lib/services/resume';
import { resumeBasicDefaultZhCN } from '../modules';
import type { BasicsData, BasicsDataKeys } from '../type';

interface Props {
  keys: string[];
}

function getNewOrderKeys(keys: Array<string>, resumeKeys: Array<string>): Array<BasicsDataKeys> {
  const map = new Map();
  [...keys, ...resumeKeys, ...resumeKeys].forEach((item) => {
    map.set(item, (map.get(item) || 0) + 1);
  });

  return Array.from(map)
    .filter((item) => {
      return item[1] > 1;
    })
    .map((item) => {
      return item[0];
    });
}

const BasicLayoutSetting = ({ keys }: Props) => {
  const resumeId = useResumeId() as string;
  const { data: resume, mutate } = useApi<any>(resumeId ? `/api/v1/resumes/${resumeId}` : null);
  const [basicFields, setBasicFields] = useImmer(() => {
    // 简历基本信息表上不存在排序时，默认改简历的列表信息（keys）
    const resumeKeys = (resume.resumeBasic.orderKeys || '').split(',');

    return getNewOrderKeys(resumeKeys, keys).map((item) => ({
      key: item,
      label: resume.resumeBasic[item].label || resumeBasicDefaultZhCN[item],
      visible: resume.resumeBasic[item].visible,
    }));
  });

  const basicFieldsLen = basicFields.length;

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

  const mutateResumeBasic = (newData: any) => {
    mutate(
      async (originData: any) => {
        const response = await updateResumeBasic(resumeId, newData);
        if (response) {
          return response;
        }

        return originData;
      },
      { revalidate: false },
    );
  };

  function handleChangeBasic(newOrderKeys: string) {
    const nextData = _.cloneDeep(resume.resumeBasic);
    nextData.orderKeys = newOrderKeys;
    mutateResumeBasic(nextData);
  }

  // 向上移动一格或向下移动一格
  const handleUpDownClick = (index: number, direction: 'up' | 'down') => {
    if (index === 0 && direction === 'up') return;
    if (index === basicFieldsLen - 1 && direction === 'down') return;

    const cloned = _.cloneDeep(basicFields);
    const removed = cloned.splice(index, 1);
    let nextDirection = index;
    if (direction === 'up') {
      nextDirection -= 1;
    }

    if (direction === 'down') {
      nextDirection += 1;
    }

    cloned.splice(nextDirection, 0, ...removed);
    const newOrderKeys = cloned.map((item) => item.key).join(',');
    handleChangeBasic(newOrderKeys);
    setBasicFields(cloned);
  };

  const handleVisibleChange = (key: BasicsDataKeys, visible: boolean) => {
    const nextBasicData = produce(resume.resumeBasic, (draftState: BasicsData) => {
      draftState[key].visible = visible;
    });

    setBasicFields((draft) => {
      const target = draft.find((todo) => todo.key === key);

      if (!target) return draft;

      target.visible = visible;
    })
    mutateResumeBasic(nextBasicData);
  };

  return (
    <Box>
      <IconButton ref={anchorRef} onClick={handleToggle} size="small" sx={styles.iconButton}>
        <TbSettings />
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
            <Paper sx={styles.paperWrap}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box onKeyDown={handleListKeyDown}>
                  {basicFields.map((item, index) => {
                    return (
                      <Box key={item.key} sx={styles.menuItem}>
                        <Box className="menu-item-lable">{item.label}</Box>
                        <IconButton
                          onClick={() => handleUpDownClick(index, 'up')}
                          disabled={index === 0}
                          size="small"
                          sx={styles.upButton}
                        >
                          <TbArrowBigUpLine />
                        </IconButton>
                        <IconButton
                          onClick={() => handleUpDownClick(index, 'down')}
                          disabled={basicFieldsLen === index + 1}
                          size="small"
                          sx={styles.downButton}
                        >
                          <TbArrowBigDownLine />
                        </IconButton>
                        {item.visible ? (
                          <IconButton
                            onClick={() => handleVisibleChange(item.key, false)}
                            size="small"
                            sx={styles.visibleButton}
                          >
                            <TbEyeOff />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => handleVisibleChange(item.key, true)}
                            size="small"
                            sx={styles.visibleButton}
                          >
                            <TbEye />
                          </IconButton>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default BasicLayoutSetting;
