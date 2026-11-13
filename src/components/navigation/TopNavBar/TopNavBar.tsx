import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { forwardRef, type ReactNode } from 'react';

import { useDeathlabsColorMode } from '../../../theme';
import { AppBar, type AppBarProps } from '../AppBar';
import type { NavBarItem } from '../NavBarItem';
import { Toolbar, type ToolbarProps } from '../Toolbar';
import { UserMenu } from '../UserMenu';

export interface TopNavBarProps extends Omit<AppBarProps, 'children' | 'title'> {
  title?: ReactNode;
  userMenu: readonly NavBarItem[];
  toolbarProps?: ToolbarProps;
}

export const TopNavBar = forwardRef<HTMLElement, TopNavBarProps>(function TopNavBar(
  { title, userMenu, toolbarProps, position = 'sticky', ...props },
  ref,
) {
  const { mode, toggleColorMode } = useDeathlabsColorMode();

  return (
    <AppBar ref={ref} position={position} {...props}>
      <Toolbar {...toolbarProps}>
        <Box sx={{ alignItems: 'center', display: 'flex', flexGrow: 1 }}>
          {typeof title === 'string' ? (
            <Typography component="div" variant="h6">
              {title}
            </Typography>
          ) : (
            title
          )}
        </Box>
        <IconButton
          aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          color="inherit"
          onClick={toggleColorMode}
        >
          {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <UserMenu items={userMenu} />
      </Toolbar>
    </AppBar>
  );
});

TopNavBar.displayName = 'TopNavBar';
