import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, type PaletteMode } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { createDeathlabsTheme } from './theme';

interface DeathlabsColorMode {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const DeathlabsColorModeContext = createContext<DeathlabsColorMode>({
  mode: 'dark',
  toggleColorMode: () => undefined,
});

export const useDeathlabsColorMode = () => useContext(DeathlabsColorModeContext);

export interface DeathlabsThemeProviderProps {
  children: ReactNode;
}

export function DeathlabsThemeProvider({ children }: DeathlabsThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const theme = useMemo(() => createDeathlabsTheme(mode), [mode]);
  const colorMode = useMemo<DeathlabsColorMode>(
    () => ({
      mode,
      toggleColorMode: () => setMode((currentMode) => currentMode === 'dark' ? 'light' : 'dark'),
    }),
    [mode],
  );

  return (
    <DeathlabsColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </DeathlabsColorModeContext.Provider>
  );
}
