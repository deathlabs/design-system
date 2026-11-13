import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import MuiDrawer, { type DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'sideNavWidth',
})<{ sideNavWidth: number | string }>(({ sideNavWidth, theme }) => ({
  alignSelf: 'stretch',
  flexShrink: 0,
  height: 'auto',
  minHeight: 0,
  width: sideNavWidth,
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.sharp,
  }),
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: sideNavWidth,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.sharp,
    }),
  },
}));

export interface SideNavBarProps
  extends Omit<DrawerProps, 'children' | 'open' | 'variant'> {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsible?: boolean;
  expandedWidth?: number | string;
  collapsedWidth?: number | string;
  expandAriaLabel?: string;
  collapseAriaLabel?: string;
}

export const SideNavBar = ({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  collapsible = true,
  expandedWidth = 240,
  collapsedWidth = 44,
  expandAriaLabel = 'Expand sidebar',
  collapseAriaLabel = 'Collapse sidebar',
  ...props
}: SideNavBarProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const controlled = open !== undefined;
  const sideNavOpen = !collapsible || (open ?? uncontrolledOpen);
  const sideNavWidth = sideNavOpen ? expandedWidth : collapsedWidth;

  const toggle = () => {
    if (!collapsible) return;

    const nextOpen = !sideNavOpen;
    if (!controlled) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) toggle();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <StyledDrawer sideNavWidth={sideNavWidth} variant="permanent" {...props}>
      <Box
        sx={{
          flex: '0 1 auto',
          minHeight: 0,
          minWidth: 0,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
      <Box
        aria-expanded={collapsible ? sideNavOpen : undefined}
        aria-label={
          collapsible ? (sideNavOpen ? collapseAriaLabel : expandAriaLabel) : undefined
        }
        onClick={collapsible ? handleClick : undefined}
        onKeyDown={collapsible ? handleKeyDown : undefined}
        role={collapsible ? 'button' : undefined}
        tabIndex={collapsible ? 0 : undefined}
        sx={{
          cursor: collapsible ? 'pointer' : 'default',
          flexGrow: 1,
          flexShrink: 0,
          minHeight: 44,
          outline: 'none',
          '&:focus-visible': collapsible
            ? {
                boxShadow: (theme) => `inset 0 0 0 2px ${theme.palette.secondary.main}`,
              }
            : undefined,
        }}
      />
    </StyledDrawer>
  );
};

SideNavBar.displayName = 'SideNavBar';
