import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SpeedDial } from './SpeedDial';

const meta = {
  title: 'Components/Navigation/SpeedDial',
  component: SpeedDial,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpeedDial>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    'ariaLabel': 'Create item',
    icon: <SpeedDialIcon />,
    open: false,
  },
};
