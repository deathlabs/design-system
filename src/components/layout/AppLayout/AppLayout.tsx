import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

import type { NavBarItem } from '../../navigation/NavBarItem';
import { SideNavBar } from '../../navigation/SideNavBar';
import { TopNavBar } from '../../navigation/TopNavBar';
import { Classification, ClassificationBanner } from '../ClassificationBanner';

export interface AppLayoutTopNavBar {
  title: ReactNode;
  userMenu: readonly NavBarItem[];
}

export interface AppLayoutSideNavBar {
  items: readonly NavBarItem[];
}

export interface AppLayoutProps {
  classification: Classification;
  topNavBar: AppLayoutTopNavBar;
  sideNavBar: AppLayoutSideNavBar;
  children?: ReactNode;
}

export const AppLayout = ({
  classification,
  topNavBar,
  sideNavBar,
  children,
}: AppLayoutProps) => (
  <Box
    sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
  >
    <Box sx={{ flexShrink: 0 }}>
      <ClassificationBanner
        type={classification}
        sx={{ position: 'static', width: '100%' }}
      />
    </Box>
    <Box sx={{ flexShrink: 0 }}>
      <TopNavBar
        data-testid="top-navigation"
        position="static"
        title={topNavBar.title}
        userMenu={topNavBar.userMenu}
      />
    </Box>
    <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <SideNavBar items={sideNavBar.items} />
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
