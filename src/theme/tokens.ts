import type { DeathlabsThemeTokens } from './theme.types';

export const deathlabsTokens = {
  colors: {
    ember: '#4D1E4A',
    raisedSurface: '#3F3542',
    classification: {
      unclassified: '#007A33',
      cui: '#502B85',
      confidential: '#0033A0',
      secret: '#C8102E',
      topSecret: '#FF8C00',
      topSecretSci: '#FCE83A',
    },
  },
  shadows: {
    glow: '0 0 12px rgba(224,87,201,0.7)',
  },
} satisfies DeathlabsThemeTokens;
