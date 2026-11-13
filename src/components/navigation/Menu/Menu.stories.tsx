import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Menu } from './Menu';

const meta = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: false,
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

function MenuExample() {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);
  const closeMenu = () => setAnchorElement(null);

  return (
    <>
      <Button onClick={(event) => setAnchorElement(event.currentTarget)}>Open menu</Button>
      <Menu anchorEl={anchorElement} open={open} onClose={closeMenu}>
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={closeMenu}>Sign out</MenuItem>
      </Menu>
    </>
  );
}

export const Basic: Story = {
  render: () => <MenuExample />,
};
