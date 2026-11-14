import Box, { type BoxProps } from '@mui/material/Box';
import { forwardRef } from 'react';

export type PageContentProps = BoxProps;

export const PageContent = forwardRef<HTMLDivElement, PageContentProps>(
  function PageContent({ children, sx, ...props }, ref) {
    return (
      <Box
        ref={ref}
        sx={[
          {
            boxSizing: 'border-box',
            minWidth: 0,
            p: { xs: 2, sm: 3 },
            textAlign: 'left',
            width: '100%',
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

PageContent.displayName = 'PageContent';
