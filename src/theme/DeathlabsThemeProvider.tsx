import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

import deathlabsTheme from './theme';

export interface DeathlabsThemeProviderProps {
  children: ReactNode;
}

export function DeathlabsThemeProvider({ children }: DeathlabsThemeProviderProps) {
  return (
    <ThemeProvider theme={deathlabsTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
