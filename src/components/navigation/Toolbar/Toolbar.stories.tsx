import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../inputs/Button';
import { AppBar } from '../AppBar';
import { Toolbar } from './Toolbar';

const meta = {
  title: 'Components/Navigation/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InAppBar: Story = {
  render: (args) => (
    <AppBar position="static">
      <Toolbar {...args}>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          Application title
        </Typography>
        <Button color="inherit">Help</Button>
        <Button color="inherit">Account</Button>
      </Toolbar>
    </AppBar>
  ),
};
