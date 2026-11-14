import BookIcon from '@mui/icons-material/Book';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

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
    title: 'deathlabs',
    userMenu: [{ name: 'Help', href: '#help', icon: <BookIcon /> }],
    position: 'static',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: 'Switch to light mode' });

    await expect(canvas.getByTestId('DarkModeIcon')).toBeVisible();
    await userEvent.click(toggle);
    await expect(
      canvas.getByRole('button', { name: 'Switch to dark mode' }),
    ).toBeVisible();
    await expect(canvas.getByTestId('LightModeIcon')).toBeVisible();
  },
};

export const CustomTitle: Story = {
  args: {
    title: (
      <Box sx={{ alignItems: 'baseline', display: 'flex', gap: 1 }}>
        <Typography variant="h6">Operations</Typography>
        <Typography color="text.secondary" variant="body2">
          Dashboard
        </Typography>
      </Box>
    ),
    userMenu: [{ name: 'Help', href: '#help', icon: <BookIcon /> }],
    position: 'static',
  },
};
