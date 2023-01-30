import { Controller, useWatch } from 'react-hook-form';
import { Box, Input } from '@mui/material';
import type { InputProps } from '@mui/material';
import type { FocusEventHandler } from 'react';
import type { Path, Control, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues, R> extends InputProps {
  control: Control<T, R>;
  name: Path<T>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  fontSize?: number;
  minWidth?: number;
}

const FieldInput = <T extends FieldValues, R>({
  name,
  control,
  onBlur,
  sx,
  fontSize = 16,
  minWidth = 20,
  ...rest
}: Props<T, R>) => {
  const value = useWatch({ name, control });

  return (
    <Box
      sx={{
        width: 'fit-content',
        display: 'inline-flex',
        position: 'relative',
        minWidth: 0,
        mb: 1,
        '& .width-block': {
          minWidth,
          minHeight: Math.round(fontSize / 0.66666667),
          whiteSpace: 'nowrap',
          display: 'inline-block',
          width: '100%',
          height: '100%',
          fontFamily: 'Monaco',
          visibility: 'hidden',
          fontSize,
        },
        ...sx,
      }}
    >
      <span className="width-block">{control._getWatch(name) || ''}</span>
      <Controller
        render={({ field }) => (
          <Input
            {...rest}
            {...field}
            value={field.value || ''}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
            sx={{
              position: 'absolute',
              fontFamily: 'Monaco',
              width: '100%',
              '&:before': {
                display: (value || '').length === 0 ? 'inline-block' : 'none',
              },
              '& .MuiInputBase-input': {
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontSize,
              },
              minWidth,
            }}
          />
        )}
        name={name}
        control={control}
      />
    </Box>
  );
};

export default FieldInput;
