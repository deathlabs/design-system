import Box from '@mui/material/Box';
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

const items = ['Dashboard', 'Projects', 'Settings'].map((name) => ({
  name,
  href: `#${name.toLowerCase()}`,
  icon: name[0],
}));

export const Collapsed: Story = { args: { items } };

export const FillsContainer: Story = {
  args: { items },
  play: async ({ canvasElement }) => {
    const layoutBounds = canvasElement
      .querySelector<HTMLElement>('[data-testid="side-nav-layout"]')!
      .getBoundingClientRect();
    const sideNav =
      canvasElement.querySelector<HTMLElement>('.MuiDrawer-root')!;
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

export const ToggleControl: Story = {
  args: { items },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dashboard = canvas.getByRole('link', { name: 'Dashboard' });
    dashboard.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    });
    await userEvent.click(dashboard);
    await expect(
      canvas.getByRole('button', { name: 'Expand sidebar' }),
    ).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Expand sidebar' }),
    );
    await expect(
      canvas.getByRole('button', { name: 'Collapse sidebar' }),
    ).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Enter}');
    await expect(
      canvas.getByRole('button', { name: 'Expand sidebar' }),
    ).toHaveAttribute('aria-expanded', 'false');
  },
};

export const OverflowingNavigation: Story = {
  args: {
    items: Array.from({ length: 20 }, (_, index) => ({
      name: `Navigation item ${index + 1}`,
      href: `#navigation-item-${index + 1}`,
      icon: index + 1,
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleControl = canvas.getByRole('button', {
      name: 'Expand sidebar',
    });
    await expect(toggleControl).toBeVisible();
    await expect(
      toggleControl.getBoundingClientRect().bottom,
    ).toBeLessThanOrEqual(canvasElement.getBoundingClientRect().bottom);
  },
};

export const Selection: Story = {
  args: { items },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const projects = canvas.getByRole('link', { name: 'Projects' });
    projects.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    });
    await userEvent.click(projects);
    await expect(projects).toHaveClass('Mui-selected');
  },
};
