import { useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { SideNavBar } from './SideNavBar';

const meta = {
  title: 'Components/Navigation/SideNavBar',
  component: SideNavBar,
  decorators: [
    (Story) => (
      <Box data-testid="side-nav-layout" sx={{ display: 'flex', height: 480 }}>
        <Story />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          Page content
        </Box>
      </Box>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof SideNavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const Navigation = () => (
  <>
    <Typography sx={{ overflow: 'hidden', p: 2 }} variant="h6">
      Navigation
    </Typography>
    <List>
      {['Dashboard', 'Projects', 'Settings'].map((label) => (
        <ListItemButton key={label} aria-label={label}>
          <Box aria-hidden sx={{ flexShrink: 0, textAlign: 'center', width: 24 }}>
            {label[0]}
          </Box>
          <ListItemText primary={label} sx={{ ml: 2 }} />
        </ListItemButton>
      ))}
    </List>
  </>
);

export const Collapsed: Story = {
  args: { children: <Navigation /> },
};

export const Expanded: Story = {
  args: { children: <Navigation />, defaultOpen: true },
};

export const FillsContainer: Story = {
  args: {
    children: <Navigation />,
    'data-testid': 'side-nav',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const layoutBounds = canvas.getByTestId('side-nav-layout').getBoundingClientRect();
    const sideNav = canvas.getByTestId('side-nav');
    const sideNavBounds = sideNav.getBoundingClientRect();
    const paperBounds = (
      sideNav.querySelector('.MuiDrawer-paper') as HTMLElement
    ).getBoundingClientRect();

    await expect(sideNavBounds.top).toBeCloseTo(layoutBounds.top);
    await expect(sideNavBounds.bottom).toBeCloseTo(layoutBounds.bottom);
    await expect(paperBounds.top).toBeCloseTo(sideNavBounds.top);
    await expect(paperBounds.bottom).toBeCloseTo(sideNavBounds.bottom);
  },
};

export const ToggleEmptySpace: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <SideNavBar open={open} onOpenChange={setOpen}>
        <Navigation />
      </SideNavBar>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Dashboard' }));
    await expect(canvas.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );

    await userEvent.click(canvas.getByRole('button', { name: 'Expand sidebar' }));
    await expect(
      canvas.getByRole('button', { name: 'Collapse sidebar' }),
    ).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  },
};

export const OverflowingNavigation: Story = {
  args: {
    children: (
      <List>
        {Array.from({ length: 20 }, (_, index) => (
          <ListItemButton key={index}>
            <ListItemText primary={`Navigation item ${index + 1}`} />
          </ListItemButton>
        ))}
      </List>
    ),
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emptySpace = canvas.getByRole('button', { name: 'Collapse sidebar' });

    await expect(emptySpace).toBeVisible();
    await expect(emptySpace.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      canvasElement.getBoundingClientRect().bottom,
    );
  },
};

export const FixedOpen: Story = {
  args: { children: <Navigation />, collapsible: false },
};
