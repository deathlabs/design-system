import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [
      <MuiLink href="#" key="home">
        Home
      </MuiLink>,
      <MuiLink href="#" key="components">
        Components
      </MuiLink>,
      <Typography color="text.primary" key="navigation">
        Navigation
      </Typography>,
    ],
  },
};
