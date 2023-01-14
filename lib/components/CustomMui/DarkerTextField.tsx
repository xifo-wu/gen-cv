import TextField from '@mui/material/TextField';
import { styled } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

const DarkerTextField = styled(TextField)<TextFieldProps>(({ theme, error }) => ({
  '.MuiInputBase-root': {
    color: '#fff',
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
  },
  '.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline, .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
    {
      borderColor: error ? theme.palette.error.main : '#fff',
    },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#f1f5f9',
  },
}));

export default DarkerTextField;
