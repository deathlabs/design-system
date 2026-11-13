import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HeadsetIcon from '@mui/icons-material/Headset';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { useId, useState, type MouseEvent } from 'react';

import { Button } from '../../inputs/Button';
import { Menu } from '../Menu';

const DEFAULT_LINK = 'https://github.com/orgs/deathlabs/';

export interface UserMenuProps {
  userGuideHref?: string;
  developerGuideHref?: string;
  submitFeedbackHref?: string;
  contactUsHref?: string;
}

export const UserMenu = ({
  userGuideHref = DEFAULT_LINK,
  developerGuideHref = DEFAULT_LINK,
  submitFeedbackHref = DEFAULT_LINK,
  contactUsHref = DEFAULT_LINK,
}: UserMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const id = useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const open = Boolean(anchorElement);
  const menuItems = [
    {
      href: userGuideHref,
      icon: <BookIcon fontSize="small" />,
      label: 'User guide',
    },
    {
      href: developerGuideHref,
      icon: <CodeIcon fontSize="small" />,
      label: 'Developer guide',
    },
    {
      href: submitFeedbackHref,
      icon: <FeedbackIcon fontSize="small" />,
      label: 'Submit feedback',
    },
    {
      href: contactUsHref,
      icon: <HeadsetIcon fontSize="small" />,
      label: 'Contact us',
    },
  ];

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
        startIcon={<AccountCircleIcon />}
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
        {menuItems.map(({ href, icon, label }) => (
          <MenuItem
            component="a"
            href={href}
            key={label}
            onClick={closeMenu}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
