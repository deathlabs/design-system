import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { DeathlabsThemeProvider } from './DeathlabsThemeProvider';
import deathlabsTheme from './theme';

const meta = {
  title: 'Theme/DeathlabsThemeProvider',
  component: DeathlabsThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeathlabsThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Baseline: Story = {
  args: {
    children: (
      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5">deathlabs theme</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Primary</Button>
            <Button color="secondary" variant="contained">
              Secondary
            </Button>
          </Stack>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.deathlabs.colors.raisedSurface,
              boxShadow: theme.deathlabs.shadows.glow,
              p: 2,
            })}
          >
            Custom theme tokens
          </Box>
        </Stack>
      </Paper>
    ),
  },
  play: async () => {
    await expect(deathlabsTheme.palette.mode).toBe('dark');
    await expect(deathlabsTheme.palette.background.default).toBe('#261D29');
    await expect(deathlabsTheme.palette.background.paper).toBe('#342B37');
    await expect(deathlabsTheme.palette.primary.main).toBe('#54485A');
    await expect(deathlabsTheme.palette.primary.contrastText).toBe('#FFFFFF');
    await expect(deathlabsTheme.palette.secondary.main).toBe('#E057C9');
    await expect(deathlabsTheme.palette.divider).toBe('rgba(255,255,255,0.07)');
    await expect(deathlabsTheme.typography.fontFamily).toBe(
      "'JetBrains Mono', monospace",
    );
    await expect(deathlabsTheme.deathlabs.colors.ember).toBe('#4D1E4A');
    await expect(deathlabsTheme.deathlabs.colors.raisedSurface).toBe('#3F3542');
    await expect(deathlabsTheme.deathlabs.shadows.glow).toBe(
      '0 0 12px rgba(224,87,201,0.7)',
    );
  },
};
