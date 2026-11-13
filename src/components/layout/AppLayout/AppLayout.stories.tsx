import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { SideNavBar } from '../../navigation/SideNavBar';
import { TopNavBar } from '../../navigation/TopNavBar';
import { Classification, ClassificationBanner } from '../ClassificationBanner';
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
    classificationBanner: (
      <ClassificationBanner
        type={Classification.UNCLASSIFIED}
        sx={{ position: 'static', width: '100%' }}
      />
    ),
    topNavigation: (
      <TopNavBar data-testid="top-navigation" position="static" title="Application" />
    ),
    sideNavigation: (
      <SideNavBar data-testid="side-navigation" defaultOpen>
        <List aria-label="Application navigation">
          {['Dashboard', 'Projects', 'Settings'].map((label) => (
            <ListItemButton key={label}>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </SideNavBar>
    ),
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
    const sideNavigationBounds = canvas
      .getByTestId('side-navigation')
      .getBoundingClientRect();
    const main = canvas.getByRole('main');
    const mainRow = main.parentElement as HTMLElement;
    const layout = mainRow.parentElement as HTMLElement;
    const mainRowBounds = mainRow.getBoundingClientRect();
    const layoutBounds = layout.getBoundingClientRect();
    const sideNavigationTop = sideNavigationBounds.top;

    await expect(sideNavigationBounds.top).toBeGreaterThanOrEqual(
      topNavigationBounds.bottom,
    );
    await expect(sideNavigationBounds.top).toBeCloseTo(mainRowBounds.top);
    await expect(sideNavigationBounds.bottom).toBeCloseTo(mainRowBounds.bottom);
    await expect(mainRowBounds.bottom).toBeCloseTo(layoutBounds.bottom);

    main.scrollTop = 300;
    main.dispatchEvent(new Event('scroll'));

    await expect(main.scrollTop).toBeGreaterThan(0);
    await expect(
      canvas.getByTestId('side-navigation').getBoundingClientRect().top,
    ).toBeCloseTo(sideNavigationTop);
    await expect(
      canvas.getByTestId('side-navigation').getBoundingClientRect().top,
    ).toBeGreaterThanOrEqual(topNavigationBounds.bottom);
  },
};
