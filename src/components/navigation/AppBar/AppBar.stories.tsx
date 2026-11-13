import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppBar } from './AppBar';

const meta = {
  title: 'Components/Navigation/AppBar',
  component: AppBar,
  tags: ['autodocs'],
} satisfies Meta<typeof AppBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <Toolbar>
        <Typography variant="h6">deathlabs</Typography>
      </Toolbar>
    ),
    position: 'static',
  },
};
