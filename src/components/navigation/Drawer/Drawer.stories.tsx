import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Drawer } from './Drawer';

const meta = {
  title: 'Components/Navigation/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Permanent: Story = {
  args: {
    children: (
      <List sx={{ width: 240 }}>
        <ListItem>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    ),
    open: true,
    variant: 'permanent',
  },
};
