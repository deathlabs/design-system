import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

export interface AppLayoutProps {
  classificationBanner?: ReactNode;
  topNavigation?: ReactNode;
  sideNavigation?: ReactNode;
  children?: ReactNode;
}

export const AppLayout = ({
  classificationBanner,
  topNavigation,
  sideNavigation,
  children,
}: AppLayoutProps) => (
  <Box
    sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
  >
    <Box sx={{ flexShrink: 0 }}>{classificationBanner}</Box>
    <Box sx={{ flexShrink: 0 }}>{topNavigation}</Box>
    <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      {sideNavigation}
      <Box
        component="main"
        sx={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'auto' }}
      >
        {children}
      </Box>
    </Box>
  </Box>
);

AppLayout.displayName = 'AppLayout';
