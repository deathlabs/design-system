export interface DeathlabsThemeTokens {
  colors: {
    ember: string;
    raisedSurface: string;
  };
  shadows: {
    glow: string;
  };
}

declare module '@mui/material/styles' {
  interface Theme {
    deathlabs: DeathlabsThemeTokens;
  }

  interface ThemeOptions {
    deathlabs?: DeathlabsThemeTokens;
  }
}
