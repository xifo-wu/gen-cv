import { useState, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Input } from '@mui/material';
import type { InputProps } from '@mui/material';
import type { FocusEventHandler } from 'react';
import type { Path, Control, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues, R> extends InputProps {
  control: Control<T, R>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: Path<T>;
  fontSize: number;
  minWidth: number;
}

const FieldInput = <T extends FieldValues, R>({
  name,
  control,
  onBlur,
  fontSize,
  sx,
  minWidth,
  ...rest
}: Props<T, R>) => {
  const [inputValue, setInputValue] = useState(control._getWatch(name) || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };


  return (
    <Box
      sx={{
        width: 'fit-content',
        display: 'inline-flex',
        position: 'relative',
        mb: 1,
        '& .width-block': {
          minWidth,
          minHeight: Math.round(fontSize / 0.66666667),
          display: 'inline-block',
          width: '100%',
          height: '100%',
          fontFamily: 'Monaco',
          visibility: 'hidden',
          fontSize: fontSize,
        },
        ...sx,
      }}
    >
      <span className="width-block">{inputValue}</span>
      <Controller
        render={({ field }) => (
          <Input
            {...rest}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              handleChange(e);
            }}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
            sx={{
              position: 'absolute',
              fontFamily: 'Monaco',
              width: '100%',
              '&:before': {
                display: inputValue.length === 0 ? 'inline-block' : 'none',
              },
              '& .MuiInputBase-input': {
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
