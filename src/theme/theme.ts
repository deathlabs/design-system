import { createTheme, type PaletteMode } from '@mui/material/styles';

import { deathlabsTokens } from './tokens';

export const createDeathlabsTheme = (mode: PaletteMode) =>
  createTheme({
    typography: {
      fontFamily: "'JetBrains Mono', monospace",
    },
    palette: {
      mode,
      background:
        mode === 'dark'
          ? { default: '#261D29', paper: '#342B37' }
          : { default: '#F7F4F8', paper: '#FFFFFF' },
      primary: {
        main: '#54485A',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#E057C9',
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.12)',
    },
    deathlabs: deathlabsTokens,
  });

const deathlabsTheme = createDeathlabsTheme('dark');

export default deathlabsTheme;
