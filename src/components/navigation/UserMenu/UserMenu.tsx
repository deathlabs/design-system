import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { useId, useState, type MouseEvent } from 'react';

import { Button } from '../../inputs/Button';
import type { NavBarItem } from '../NavBarItem';
import { Menu } from '../Menu';

export interface UserMenuProps {
  items: readonly NavBarItem[];
}

export const UserMenu = ({ items }: UserMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const id = useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const open = Boolean(anchorElement);
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <Button
        aria-controls={open ? menuId : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="menu"
        color="inherit"
        id={buttonId}
        onClick={openMenu}
      >
        Account
      </Button>
      <Menu
        anchorEl={anchorElement}
        id={menuId}
        open={open}
        onClose={closeMenu}
        slotProps={{ list: { 'aria-labelledby': buttonId } }}
      >
        {items.map(({ name, href, icon }) => (
          <MenuItem
            component="a"
            href={href}
            key={name}
            onClick={closeMenu}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
