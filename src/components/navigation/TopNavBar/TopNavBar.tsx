import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { forwardRef, type ReactNode } from 'react';

import { AppBar, type AppBarProps } from '../AppBar';
import { Toolbar, type ToolbarProps } from '../Toolbar';

export interface TopNavBarProps extends Omit<AppBarProps, 'children' | 'title'> {
  title?: ReactNode;
  children?: ReactNode;
  toolbarProps?: ToolbarProps;
}

export const TopNavBar = forwardRef<HTMLElement, TopNavBarProps>(function TopNavBar(
  { title, children, toolbarProps, position = 'sticky', ...props },
  ref,
) {
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
        {children}
      </Toolbar>
    </AppBar>
  );
});

TopNavBar.displayName = 'TopNavBar';
