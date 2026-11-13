import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  optimizeDeps: {
    include: [
      '@mui/material/AppBar',
      '@mui/material/Box',
      '@mui/material/BottomNavigation',
      '@mui/material/BottomNavigationAction',
      '@mui/material/Breadcrumbs',
      '@mui/material/Button',
      '@mui/material/CssBaseline',
      '@mui/material/Drawer',
      '@mui/material/Link',
      '@mui/material/List',
      '@mui/material/ListItem',
      '@mui/material/ListItemText',
      '@mui/material/Menu',
      '@mui/material/MenuItem',
      '@mui/material/Paper',
      '@mui/material/Pagination',
      '@mui/material/SpeedDial',
      '@mui/material/SpeedDialIcon',
      '@mui/material/Stack',
      '@mui/material/Step',
      '@mui/material/StepLabel',
      '@mui/material/Stepper',
      '@mui/material/Tab',
      '@mui/material/Tabs',
      '@mui/material/Toolbar',
      '@mui/material/Typography',
      '@mui/material/styles',
    ],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
