import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../inputs/Button';
import { TopNavBar } from './TopNavBar';

const meta = {
  title: 'Components/Navigation/TopNavBar',
  component: TopNavBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TopNavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleAndActions: Story = {
  args: {
    children: (
      <>
        <Button color="inherit">Help</Button>
        <Button color="inherit">Account</Button>
      </>
    ),
    position: 'static',
    title: 'deathlabs',
  },
};

export const CustomTitle: Story = {
  args: {
    children: <Button color="inherit">Account</Button>,
    position: 'static',
    title: (
      <Box sx={{ alignItems: 'baseline', display: 'flex', gap: 1 }}>
        <Typography variant="h6">Operations</Typography>
        <Typography color="text.secondary" variant="body2">
          Dashboard
        </Typography>
      </Box>
    ),
  },
};
