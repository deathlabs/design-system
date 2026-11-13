import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Paper } from './Paper';

const meta = {
  title: 'Components/Surfaces/Paper',
  component: Paper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  args: {
    children: <Typography>Elevated surface</Typography>,
    elevation: 8,
    sx: { p: 4 },
  },
};
