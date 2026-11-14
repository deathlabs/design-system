import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Classification } from '../ClassificationBanner';
import { AppLayout } from './AppLayout';

const meta = {
  title: 'Components/Layout/AppLayout',
  component: AppLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof AppLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllRegions: Story = {
  args: {
    classification: Classification.UNCLASSIFIED,
    topNavBar: {
      title: 'Application',
      userMenu: [
        { name: 'Account', href: '#account', icon: <AccountCircleIcon /> },
      ],
    },
    sideNavBar: {
      items: ['Dashboard', 'Projects', 'Settings'].map((name) => ({
        name,
        href: `#${name.toLowerCase()}`,
        icon: name[0],
      })),
    },
    children: (
      <Box sx={{ minHeight: 1400, p: 3 }}>
        <Typography variant="h4">Page content</Typography>
        <Typography color="text.secondary">Scrollable application content</Typography>
      </Box>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const topNavigationBounds = canvas
      .getByTestId('top-navigation')
      .getBoundingClientRect();
    const topNavigationRegion = canvas.getByTestId('top-navigation').parentElement!;
    const sideNavigation = canvasElement.querySelector<HTMLElement>('.MuiDrawer-root')!;
    const sideNavigationPaper = sideNavigation.querySelector<HTMLElement>(
      '.MuiDrawer-paper',
    )!;
    const sideNavigationBounds = sideNavigation.getBoundingClientRect();
    const main = canvas.getByRole('main');
    const mainRow = main.parentElement as HTMLElement;
    const layout = mainRow.parentElement as HTMLElement;
    const mainRowBounds = mainRow.getBoundingClientRect();
    const layoutBounds = layout.getBoundingClientRect();
    const sideNavigationTop = sideNavigationBounds.top;

    await expect(sideNavigationBounds.top).toBeGreaterThanOrEqual(
      topNavigationBounds.bottom,
    );
    await expect(Number(getComputedStyle(topNavigationRegion).zIndex)).toBeGreaterThan(
      Number(getComputedStyle(sideNavigationPaper).zIndex),
    );
    await expect(sideNavigationBounds.top).toBeCloseTo(mainRowBounds.top);
    await expect(sideNavigationBounds.bottom).toBeCloseTo(mainRowBounds.bottom);
    await expect(mainRowBounds.bottom).toBeCloseTo(layoutBounds.bottom);

    main.scrollTop = 300;
    main.dispatchEvent(new Event('scroll'));

    await expect(main.scrollTop).toBeGreaterThan(0);
    await expect(
      sideNavigation.getBoundingClientRect().top,
    ).toBeCloseTo(sideNavigationTop);
    await expect(
      sideNavigation.getBoundingClientRect().top,
    ).toBeGreaterThanOrEqual(topNavigationBounds.bottom);
  },
};
