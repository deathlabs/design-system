import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

import { DeathlabsTheme } from "./theme.js";

export type DeathlabsThemeProviderProps = PropsWithChildren;

export function DeathlabsThemeProvider({
  children,
}: DeathlabsThemeProviderProps) {
  return (
    <ThemeProvider theme={DeathlabsTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
