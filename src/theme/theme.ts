import { createTheme } from '@mui/material/styles';

import { deathlabsTokens } from './tokens';

const deathlabsTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#261D29',
      paper: '#342B37',
    },
    primary: {
      main: '#54485A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E057C9',
    },
    divider: 'rgba(255,255,255,0.07)',
  },
  deathlabs: deathlabsTokens,
});

export default deathlabsTheme;
