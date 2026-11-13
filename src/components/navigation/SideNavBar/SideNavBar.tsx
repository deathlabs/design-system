import { useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import type { NavBarItem } from '../NavBarItem';

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

export interface SideNavBarProps {
  items: readonly NavBarItem[];
}

export const SideNavBar = ({ items }: SideNavBarProps) => {
  const [open, setOpen] = useState(false);
  const [selectedHref, setSelectedHref] = useState(items[0]?.href);
  const sideNavWidth = open ? 240 : 44;

  const toggle = () => {
    setOpen((currentOpen) => !currentOpen);
  };

  return (
    <StyledDrawer sideNavWidth={sideNavWidth} variant="permanent">
      <Box
        sx={{
          flex: '0 1 auto',
          minHeight: 0,
          minWidth: 0,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <List aria-label="Navigation">
          {items.map((item) => (
            <ListItemButton
              key={item.href}
              component="a"
              href={item.href}
              aria-label={item.name}
              selected={selectedHref === item.href}
              onClick={() => setSelectedHref(item.href)}
              sx={{ minHeight: 44, px: 1.25 }}
            >
              <Box aria-hidden sx={{ flexShrink: 0, textAlign: 'center', width: 24 }}>
                {item.icon}
              </Box>
              <ListItemText primary={item.name} sx={{ ml: 2, opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        aria-expanded={open}
        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
        onClick={toggle}
        sx={{ alignSelf: open ? 'flex-end' : 'center', m: 0.25 }}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </StyledDrawer>
  );
};

SideNavBar.displayName = 'SideNavBar';
