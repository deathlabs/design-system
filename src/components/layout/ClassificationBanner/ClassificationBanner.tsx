import Box, { type BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { forwardRef } from 'react';

export const CLASSIFICATION_BANNER_HEIGHT = 23;

export enum Classification {
  UNCLASSIFIED = 'Unclassified',
  CUI = 'CUI',
  CONFIDENTIAL = 'Confidential',
  SECRET = 'Secret',
  TOP_SECRET = 'Top Secret',
  TOP_SECRET_SCI = 'Top Secret // SCI',
}

export interface ClassificationBannerProps extends Omit<BoxProps, 'type'> {
  type: Classification;
}

const tokenNames = {
  [Classification.UNCLASSIFIED]: 'unclassified',
  [Classification.CUI]: 'cui',
  [Classification.CONFIDENTIAL]: 'confidential',
  [Classification.SECRET]: 'secret',
  [Classification.TOP_SECRET]: 'topSecret',
  [Classification.TOP_SECRET_SCI]: 'topSecretSci',
} as const;

const darkTextClassifications = new Set<Classification>([
  Classification.TOP_SECRET,
  Classification.TOP_SECRET_SCI,
]);

export const ClassificationBanner = forwardRef<
  HTMLDivElement,
  ClassificationBannerProps
>(function ClassificationBanner({ type, sx, children, ...props }, ref) {
  const theme = useTheme();
  const tokenName = tokenNames[type];

  return (
    <Box
      ref={ref}
      data-testid="classification-banner"
      sx={[
        {
          alignItems: 'center',
          backgroundColor: theme.deathlabs.colors.classification[tokenName],
          color: darkTextClassifications.has(type)
            ? theme.palette.common.black
            : theme.palette.common.white,
          display: 'flex',
          fontWeight: 500,
          height: CLASSIFICATION_BANNER_HEIGHT,
          justifyContent: 'center',
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: theme.zIndex.tooltip + 1,
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    >
      {children ?? type.toUpperCase()}
    </Box>
  );
});

ClassificationBanner.displayName = 'ClassificationBanner';
