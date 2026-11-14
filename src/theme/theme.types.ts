export interface DeathlabsThemeTokens {
  colors: {
    ember: string;
    raisedSurface: string;
    classification: {
      unclassified: string;
      cui: string;
      confidential: string;
      secret: string;
      topSecret: string;
      topSecretSci: string;
    };
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
